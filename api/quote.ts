/**
 * Cotação de frete real para a landing /pele-radiante.
 *
 * Por que isso vive no servidor e não no navegador:
 * - A API de frete do Melhor Envio exige `Authorization: Bearer <token>` e
 *   bloqueia CORS no navegador. Token em JS de front = qualquer visitante cota
 *   com a sua conta.
 * - A API da Yampi exige `User-Token` + `User-Secret-Key`, credenciais de
 *   administrador da loja. Nunca podem ir para o cliente.
 * - A API pública da Yampi (CORS aberto) não expõe frete.
 *
 * O Melhor Envio devolve o custo da transportadora. O valor mostrado ao
 * cliente é esse custo menos o subsídio da AREUM, que é o número que o
 * checkout cobra. Confirme o subsídio contra um checkout real antes de
 * publicar: se o desconto também estiver configurado dentro da conta do
 * Melhor Envio, ele sai dobrado.
 */

const ME_BASE_URL = process.env.MELHOR_ENVIO_BASE_URL || "https://www.melhorenvio.com.br";
const ME_TOKEN = process.env.MELHOR_ENVIO_TOKEN;

// Origem: CEP 88306-040, Itajaí/SC.
const ORIGIN_ZIP = process.env.FRETE_CEP_ORIGEM || "88306040";

// Embalagem do sérum de 30 ml já embalado para envio. O peso (0,2 kg) vem do
// cadastro do SKU na Yampi; confirme as dimensões finais antes de tratar o
// valor como definitivo.
const PACKAGE = {
  width: Number(process.env.FRETE_PACOTE_LARGURA ?? 11),
  height: Number(process.env.FRETE_PACOTE_ALTURA ?? 17),
  length: Number(process.env.FRETE_PACOTE_COMPRIMENTO ?? 11),
  weight: Number(process.env.FRETE_PACOTE_PESO ?? 0.2),
};

const INSURANCE_VALUE = Number(process.env.FRETE_VALOR_SEGURADO ?? 79.9);

/** Subsídio de frete da AREUM, em %. */
export const SUBSIDY_PERCENT = (() => {
  const raw = Number(process.env.FRETE_SUBSIDIO_PERCENT ?? 30);
  if (!Number.isFinite(raw) || raw < 0) return 0;
  return Math.min(raw, 90);
})();

export type QuoteOption = {
  carrier: string;
  service: string;
  price: number;
  days: number;
};

export type QuoteResult =
  | { ok: true; city: string; uf: string; cheapest: QuoteOption; options: QuoteOption[] }
  | { ok: false; reason: "invalid" | "not_found" | "unavailable" };

/** Só os 8 dígitos do CEP. O CEP nunca é persistido nem registrado em log. */
export function normalizeZip(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const digits = input.replace(/\D/g, "");
  return digits.length === 8 ? digits : null;
}

/** Custo da transportadora -> valor cobrado do cliente, já com o subsídio. */
export function applySubsidy(price: number, percent = SUBSIDY_PERCENT): number {
  return Math.round(price * (1 - percent / 100) * 100) / 100;
}

/** Cidade/UF via ViaCEP. `null` = CEP inexistente; lança em falha de rede. */
async function lookupCity(zip: string): Promise<{ city: string; uf: string } | null> {
  const response = await fetch(`https://viacep.com.br/ws/${zip}/json/`, {
    signal: AbortSignal.timeout(4000),
  });
  if (!response.ok) throw new Error(`viacep ${response.status}`);
  const data = (await response.json()) as { erro?: unknown; localidade?: string; uf?: string };
  if (data.erro || !data.localidade || !data.uf) return null;
  return { city: data.localidade, uf: data.uf };
}

async function quoteCarriers(zip: string, quantity: number): Promise<QuoteOption[]> {
  const response = await fetch(`${ME_BASE_URL}/api/v2/me/shipment/calculate`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${ME_TOKEN}`,
      // A Melhor Envio exige um User-Agent identificando a aplicação.
      "User-Agent": "Areum (contato@areumco.com.br)",
    },
    body: JSON.stringify({
      from: { postal_code: ORIGIN_ZIP },
      to: { postal_code: zip },
      products: [
        {
          id: "serum-30ml",
          ...PACKAGE,
          insurance_value: INSURANCE_VALUE,
          quantity,
        },
      ],
      options: { receipt: false, own_hand: false },
    }),
    signal: AbortSignal.timeout(6000),
  });

  if (!response.ok) throw new Error(`melhor-envio ${response.status}`);

  const raw = (await response.json()) as Array<{
    name?: string;
    price?: string | number;
    delivery_time?: number;
    error?: string | null;
    company?: { name?: string };
  }>;

  return raw
    .filter((item) => !item.error && item.price !== undefined && item.price !== null)
    .map((item) => ({
      carrier: item.company?.name ?? "Transportadora",
      service: item.name ?? "",
      price: applySubsidy(Number(item.price)),
      days: Number(item.delivery_time ?? 0),
    }))
    .filter((option) => Number.isFinite(option.price) && option.price > 0)
    .sort((a, b) => a.price - b.price);
}

// Cache curto: absorve o vaivém do mesmo visitante sem martelar a Melhor Envio.
// A chave é o CEP, então não guarda nada além de preço e prazo.
const CACHE_TTL_MS = 10 * 60 * 1000;
const CACHE_MAX_ENTRIES = 500;
const quoteCache = new Map<string, { at: number; value: QuoteResult }>();

type Request = { method?: string; body?: unknown; query?: Record<string, unknown> };
type Response = {
  status: (code: number) => Response;
  json: (payload: unknown) => void;
  setHeader: (name: string, value: string) => void;
};

export default async function handler(req: Request, res: Response) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") {
    res.status(204).json({});
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ ok: false, reason: "invalid" } satisfies QuoteResult);
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = undefined;
    }
  }
  const payloadIn = body as { zipcode?: unknown; quantity?: unknown } | undefined;

  const zip = normalizeZip(payloadIn?.zipcode ?? req.query?.zipcode);
  if (!zip) {
    res.status(400).json({ ok: false, reason: "invalid" } satisfies QuoteResult);
    return;
  }

  const quantity = Math.min(Math.max(Math.trunc(Number(payloadIn?.quantity ?? 1)) || 1, 1), 5);

  const cached = quoteCache.get(zip);
  if (cached && Date.now() - cached.at <= CACHE_TTL_MS) {
    res.status(200).json(cached.value);
    return;
  }
  if (cached) quoteCache.delete(zip);

  if (!ME_TOKEN) {
    // Sem token a página não quebra: devolve indisponível e o front mantém o
    // aviso de que o frete aparece no checkout.
    res.status(200).json({ ok: false, reason: "unavailable" } satisfies QuoteResult);
    return;
  }

  try {
    const [city, options] = await Promise.all([lookupCity(zip), quoteCarriers(zip, quantity)]);

    if (!city) {
      res.status(200).json({ ok: false, reason: "not_found" } satisfies QuoteResult);
      return;
    }
    if (options.length === 0) {
      res.status(200).json({ ok: false, reason: "unavailable" } satisfies QuoteResult);
      return;
    }

    const payload: QuoteResult = {
      ok: true,
      city: city.city,
      uf: city.uf,
      cheapest: options[0],
      options,
    };

    if (quoteCache.size >= CACHE_MAX_ENTRIES) {
      const oldest = quoteCache.keys().next().value;
      if (oldest !== undefined) quoteCache.delete(oldest);
    }
    quoteCache.set(zip, { at: Date.now(), value: payload });

    res.status(200).json(payload);
  } catch {
    res.status(200).json({ ok: false, reason: "unavailable" } satisfies QuoteResult);
  }
}
