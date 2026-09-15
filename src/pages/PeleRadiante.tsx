import { FormEvent, useEffect, useId, useState } from "react";
import {
  ArrowRight,
  Droplets,
  Sparkles,
  Gem,
  Hourglass,
  MapPin,
  ShieldCheck,
  Truck,
  MessageCircle,
  Sun,
  Plus,
  Check,
  Star,
  Loader2,
} from "lucide-react";
import serum from "@/assets/areum-serum.webp";
import { CHECKOUT_URL } from "@/lib/analytics-config";
import {
  trackCheckoutClick,
  trackContact,
  trackShippingEstimate,
  trackViewContent,
} from "@/lib/analytics";
import "./pele-radiante.css";
import "./pele-radiante-editorial.css";

// Espelha QuoteResult de api/quote.ts. Vive aqui para o front não importar do
// diretório de funções serverless.
type ShippingQuote =
  | {
      ok: true;
      city: string;
      uf: string;
      cheapest: QuoteOption;
      options: QuoteOption[];
    }
  | { ok: false; reason: "invalid" | "not_found" | "unavailable" };

const supportUrl =
  "https://wa.me/5547989258264?text=" +
  encodeURIComponent("Olá! Quero ajuda para comprar o Sérum Facial AREUM.");

// Forward only campaign attribution, never arbitrary query parameters or personal data.
function checkoutUrl() {
  const url = new URL(CHECKOUT_URL);
  const params = new URLSearchParams(window.location.search);
  for (const key of [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "fbclid",
    "gclid",
  ]) {
    const value = params.get(key);
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}

function PurchaseLink({
  placement,
  compact = false,
}: {
  placement: string;
  compact?: boolean;
}) {
  return (
    <a
      className="pr-button"
      href={checkoutUrl()}
      onClick={() => trackCheckoutClick(`pele_radiante_${placement}`)}
    >
      <span>
        {compact ? "COMPRAR AGORA" : "QUERO MINHA PELE MAIS RADIANTE"}
      </span>
      <ArrowRight aria-hidden="true" size={22} />
    </a>
  );
}

function SupportLink({ placement }: { placement: string }) {
  return (
    <a
      className="pr-support"
      href={supportUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContact("whatsapp", `pele_radiante_${placement}`)}
    >
      <MessageCircle size={22} aria-hidden="true" /> Ajuda para comprar pelo
      WhatsApp<span className="pr-sr-only"> (abre em nova aba)</span>
    </a>
  );
}

const formatCep = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
};

type QuoteOption = { carrier: string; service: string; price: number; days: number };

type ShippingState =
  | { status: "idle" | "loading" | "invalid" | "not_found" | "error" | "unavailable" }
  | { status: "found"; city: string; uf: string; cheapest: QuoteOption; options: QuoteOption[] };

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

// Cotação real, via /api/quote (Melhor Envio no servidor, ver api/quote.ts).
// O navegador nunca vê token: as credenciais ficam só no backend.
function ShippingEstimate({ placement }: { placement: string }) {
  const id = useId();
  const [cep, setCep] = useState("");
  const [state, setState] = useState<ShippingState>({ status: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) {
      setState({ status: "invalid" });
      return;
    }
    setState({ status: "loading" });
    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zipcode: digits, quantity: 1 }),
      });
      const data: ShippingQuote = await response.json();

      if (data.ok) {
        setState({
          status: "found",
          city: data.city,
          uf: data.uf,
          cheapest: data.cheapest,
          options: data.options,
        });
        trackShippingEstimate("found", `pele_radiante_${placement}`, data.uf, {
          price: data.cheapest.price,
          days: data.cheapest.days,
          carrier: data.cheapest.carrier,
          service: data.cheapest.service,
          optionCount: data.options.length,
        });
        return;
      }

      if (data.reason === "not_found") setState({ status: "not_found" });
      else if (data.reason === "invalid") setState({ status: "invalid" });
      else setState({ status: "unavailable" });

      trackShippingEstimate(
        data.reason === "not_found" ? "not_found" : "error",
        `pele_radiante_${placement}`,
      );
    } catch {
      setState({ status: "error" });
      trackShippingEstimate("error", `pele_radiante_${placement}`);
    }
  }

  return (
    <form className="pr-cep" onSubmit={onSubmit} noValidate>
      <label className="pr-cep-label" htmlFor={`${id}-cep`}>
        <Truck size={20} aria-hidden="true" /> Calcule o frete pelo seu CEP
      </label>
      <div className="pr-cep-row">
        <input
          id={`${id}-cep`}
          name="cep"
          inputMode="numeric"
          autoComplete="postal-code"
          placeholder="00000-000"
          maxLength={9}
          value={cep}
          aria-describedby={`${id}-cep-info`}
          aria-invalid={state.status === "invalid" || undefined}
          onChange={(event) => {
            setCep(formatCep(event.target.value));
            if (state.status !== "idle" && state.status !== "loading")
              setState({ status: "idle" });
          }}
        />
        <button type="submit" disabled={state.status === "loading"}>
          {state.status === "loading" ? (
            <Loader2 className="pr-spin" size={18} aria-label="Calculando" />
          ) : (
            "Calcular"
          )}
        </button>
      </div>
      <p className="pr-cep-info" id={`${id}-cep-info`}>
        Cálculo na hora • Envio rastreado para todo o Brasil
      </p>
      <div className="pr-cep-result" aria-live="polite">
        {state.status === "found" && (
          <>
            <p className="pr-quote-head">
              <MapPin size={17} aria-hidden="true" />
              <span>
                Entregamos em{" "}
                <strong>
                  {state.city}/{state.uf}
                </strong>
              </span>
            </p>
            <ul className="pr-quote-list">
              {state.options.slice(0, 4).map((option) => (
                <li key={`${option.carrier}-${option.service}`}>
                  <span className="pr-quote-name">
                    {option.carrier}
                    {option.service ? ` · ${option.service}` : ""}
                  </span>
                  <span className="pr-quote-days">
                    {option.days > 0 ? `até ${option.days} dias úteis` : ""}
                  </span>
                  <strong className="pr-quote-price">
                    {option.price > 0 ? money.format(option.price) : "Grátis"}
                  </strong>
                </li>
              ))}
            </ul>
            <p className="pr-quote-foot">
              Valor final conferido no checkout, antes de pagar.
            </p>
          </>
        )}
        {state.status === "invalid" && <span>Digite os 8 números do seu CEP.</span>}
        {state.status === "not_found" && (
          <span>Não encontramos esse CEP. Confira os números e tente de novo.</span>
        )}
        {(state.status === "error" || state.status === "unavailable") && (
          <span>
            Não conseguimos calcular agora. O frete para o seu CEP aparece no
            checkout, antes de pagar.
          </span>
        )}
      </div>
    </form>
  );
}

const benefits = [
  {
    icon: Droplets,
    title: "Hidratação profunda",
    text: "Pele mais macia, confortável e nutrida o dia todo.",
  },
  {
    icon: Gem,
    title: "Efeito preenchimento",
    text: "Ajuda a dar aparência mais preenchida e firme.",
  },
  {
    icon: Sparkles,
    title: "Luminosidade",
    text: "Pele com aspecto mais radiante e saudável.",
  },
  {
    icon: Hourglass,
    title: "Cuidado anti-idade",
    text: "Suaviza a aparência das linhas de expressão e sinais do tempo.",
  },
];
const steps = [
  "Limpe bem o rosto",
  "Com a pele levemente úmida, aplique 3 a 4 gotas",
  "Massageie suavemente até absorver",
  "Em seguida, aplique seu hidratante de costume",
];
const faqs = [
  [
    "O que vem no frasco?",
    "Um Sérum Facial AREUM de 30 ml, com Ácido Hialurônico & Colágeno Vegano e aplicador conta-gotas.",
  ],
  [
    "Como devo usar?",
    "Limpe bem o rosto. Com a pele levemente úmida, aplique 3 a 4 gotas e massageie suavemente até absorver. Em seguida, aplique seu hidratante de costume. Use de manhã e à noite — pode ser o primeiro passo da sua rotina ou usado sozinho. Durante o dia, finalize com protetor solar.",
  ],
  [
    "Como consulto o frete e o prazo?",
    "Digite seu CEP na calculadora do topo da página: mostramos as transportadoras disponíveis, o valor e o prazo antes de você ir para o checkout. O envio é rastreado.",
  ],
  [
    "Quais são as formas de pagamento?",
    "Você pode pagar com Pix ou cartão de crédito. O parcelamento divulgado é de 3x de R$ 26,63 sem juros. Confira as condições e o valor total na etapa de pagamento.",
  ],
  [
    "Vou conseguir acompanhar a entrega?",
    "Sim, o envio é rastreado. Se precisar de ajuda para localizar o rastreio do seu pedido, fale com o atendimento AREUM pelo WhatsApp.",
  ],
  [
    "Posso pedir ajuda para comprar?",
    "Sim. Toque no link de WhatsApp desta página e fale com o atendimento AREUM. Podemos ajudar com dúvidas sobre o produto, a compra e a entrega.",
  ],
];

export default function PeleRadiante() {
  useEffect(() => {
    trackViewContent();
    const oldTitle = document.title;
    const updates = [
      [
        'meta[name="description"]',
        "content",
        "A transformação que a sua pele estava pedindo: mais hidratada, preenchida e luminosa. Sérum AREUM com Ácido Hialurônico + Colágeno Vegano. R$ 79,90.",
      ],
      [
        'link[rel="canonical"]',
        "href",
        "https://www.areumco.com.br/pele-radiante",
      ],
      [
        'meta[property="og:url"]',
        "content",
        "https://www.areumco.com.br/pele-radiante",
      ],
      [
        'meta[property="og:title"]',
        "content",
        "Pele mais radiante | Sérum Facial AREUM 30 ml",
      ],
      [
        'meta[property="og:description"]',
        "content",
        "Mais hidratada, preenchida e luminosa. Ácido Hialurônico + Colágeno Vegano. AREUM. Beleza em todas as fases.",
      ],
      [
        'meta[name="twitter:title"]',
        "content",
        "Pele mais radiante | Sérum Facial AREUM 30 ml",
      ],
      [
        'meta[name="twitter:description"]',
        "content",
        "Mais hidratada, preenchida e luminosa. Ácido Hialurônico + Colágeno Vegano. AREUM. Beleza em todas as fases.",
      ],
    ];
    const previous = updates.map(([selector, attribute, value]) => {
      const element = document.querySelector(selector);
      const oldValue = element?.getAttribute(attribute);
      element?.setAttribute(attribute, value);
      return { element, attribute, oldValue };
    });
    document.title = "Pele mais radiante | Sérum Facial AREUM 30 ml";
    return () => {
      document.title = oldTitle;
      previous.forEach(({ element, attribute, oldValue }) => {
        if (oldValue != null) element?.setAttribute(attribute, oldValue);
        else element?.removeAttribute(attribute);
      });
    };
  }, []);

  return (
    <div className="pr-page">
      <a className="pr-skip" href="#pr-main">
        Pular para o conteúdo
      </a>
      <div className="pr-topline">
        Inspirado no skincare coreano. Feito para o seu momento.
      </div>
      <header className="pr-header pr-wrap">
        <a className="pr-brand" href="/" aria-label="AREUM — página inicial">
          <img
            className="pr-logo"
            src="/pele-radiante/logo-areum-oficial.png"
            width="533"
            height="237"
            alt="AREUM 아름"
          />
        </a>
        <nav aria-label="Navegação da página">
          <a href="#pr-beneficios">Benefícios</a>
          <a href="#pr-experiencias">Quem usa</a>
          <a href="#pr-uso">Como usar</a>
          <a href="#pr-duvidas">Dúvidas</a>
        </nav>
        <a
          className="pr-header-help"
          href={supportUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackContact("whatsapp", "pele_radiante_header")}
        >
          <MessageCircle size={21} aria-hidden="true" />
          <span>
            Fale com a AREUM
            <span className="pr-sr-only"> (abre em nova aba)</span>
          </span>
        </a>
      </header>
      <main id="pr-main">
        <section className="pr-hero pr-wrap" aria-labelledby="pr-title">
          <div className="pr-intro">
            <p className="pr-eyebrow">BELEZA EM TODAS AS FASES</p>
            <h1 id="pr-title">
              A transformação que a sua pele estava pedindo.
              <span className="pr-h1-sub">
                Mais hidratada, preenchida e <em>luminosa.</em>
              </span>
            </h1>
            <p className="pr-lead">Ácido Hialurônico + Colágeno Vegano</p>
            <p className="pr-dose">3 a 4 gotas. Manhã e noite.</p>
          </div>
          <figure className="pr-product-stage">
            <img
              className="pr-model"
              src="/pele-radiante/editorial-madura.webp"
              width="1100"
              height="1375"
              fetchPriority="high"
              alt="Mulher madura de cabelos prateados sorrindo e tocando suavemente a pele"
            />
            <img
              className="pr-hero-bottle"
              src={serum}
              width="1000"
              height="1500"
              fetchPriority="high"
              alt="Frasco oficial do Sérum AREUM 30 ml, com Ácido Hialurônico e Colágeno Vegano"
            />
            <figcaption>
              <span>UM MOMENTO SEU.</span>
              <strong>
                O cuidado aparece.
                <br />
                Você continua sendo você.
              </strong>
            </figcaption>
          </figure>
          <div className="pr-hero-buy">
            <div className="pr-buybox" aria-label="Comprar Sérum Facial AREUM">
              <p className="pr-price pr-price-hero">R$ 79,90</p>
              <p className="pr-payment">ou 3x de R$ 26,63 sem juros</p>
              <p className="pr-payment pr-payment-methods">
                Pix e cartão de crédito
              </p>
              <ShippingEstimate placement="hero" />
              <PurchaseLink placement="hero" />
              <p className="pr-trustline">
                <span className="pr-trust-pair">
                  <span>
                    <ShieldCheck size={16} aria-hidden="true" /> Compra segura
                  </span>
                  <span>Envio rastreado</span>
                </span>
                <span className="pr-trust-pair">
                  <span>Atendimento AREUM</span>
                  <a
                    href={supportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackContact("whatsapp", "pele_radiante_hero_trustline")
                    }
                  >
                    <MessageCircle size={15} aria-hidden="true" /> Ajuda no
                    WhatsApp
                    <span className="pr-sr-only"> (abre em nova aba)</span>
                  </a>
                </span>
              </p>
            </div>
          </div>
        </section>
        <div className="pr-ribbon">
          <span>
            <Check aria-hidden="true" /> Ácido Hialurônico
          </span>
          <span>
            <Check aria-hidden="true" /> Colágeno Vegano
          </span>
          <span>
            <Check aria-hidden="true" /> Cuidado diário
          </span>
        </div>
        <section
          id="pr-experiencias"
          className="pr-section pr-wrap pr-experiences"
          aria-labelledby="pr-experiences-title"
        >
          <div className="pr-section-head">
            <div>
              <p className="pr-eyebrow">AREUM NA ROTINA REAL</p>
              <h2 id="pr-experiences-title">
                Já usado e aprovado por mulheres
                <br />
                <em>que confiam na AREUM</em>
              </h2>
            </div>
          </div>
          <div className="pr-proof-grid">
            <div className="pr-video-grid">
              {[
                {
                  file: "flavia",
                  title: "Flávia e seu momento AREUM",
                  label: "Na rotina",
                },
                {
                  file: "primeiro-uso",
                  title: "Primeiras impressões com o sérum",
                  label: "Primeiras impressões",
                },
                {
                  file: "glow",
                  title: "A textura do sérum na pele",
                  label: "Textura e aplicação",
                },
              ].map((video) => (
                <figure className="pr-video-card" key={video.file}>
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={`/videos/poster-${video.file}.jpg`}
                    aria-label={video.title}
                  >
                    <source
                      src={`/videos/ugc-${video.file}.mp4`}
                      type="video/mp4"
                    />
                    Seu navegador não suporta vídeo.
                  </video>
                  <figcaption>
                    <span>{video.label}</span>
                    <strong>{video.title}</strong>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="pr-reviews">
              <div className="pr-reviews-heading">
                <span>★★★★★</span>
                <p>
                  O que já falaram
                  <br />
                  <strong>sobre a AREUM</strong>
                </p>
              </div>
              <article>
                <div className="pr-review-stars" aria-label="5 de 5 estrelas">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Star key={n} size={15} aria-hidden="true" />
                  ))}
                </div>
                <blockquote>
                  “O sérum tem uma textura ótima, é fácil de aplicar e deixa a
                  pele bem macia e hidratada”
                </blockquote>
                <p>
                  M*****a <span>• Ago 2026</span>
                </p>
              </article>
              <article>
                <div className="pr-review-stars" aria-label="5 de 5 estrelas">
                  {[0, 1, 2, 3, 4].map((n) => (
                    <Star key={n} size={15} aria-hidden="true" />
                  ))}
                </div>
                <blockquote>
                  “Embalagem bem protegida e chegou rápido. Recomendo a compra.”
                </blockquote>
                <p>
                  P*****o <span>• Ago 2026</span>
                </p>
              </article>
              <a className="pr-review-source" href="/#depoimentos">
                Ler as avaliações completas{" "}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <section
          id="pr-beneficios"
          className="pr-section pr-wrap"
          aria-labelledby="pr-benefits-title"
        >
          <h2 id="pr-benefits-title">
            O que o <em>Sérum AREUM</em> entrega
          </h2>
          <div className="pr-benefits">
            {benefits.map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon size={32} strokeWidth={1.4} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
        <section
          id="pr-uso"
          className="pr-ritual"
          aria-labelledby="pr-ritual-title"
        >
          <div className="pr-wrap pr-ritual-grid">
            <div>
              <p className="pr-eyebrow">POUCAS GOTAS. UM MOMENTO SEU.</p>
              <h2 id="pr-ritual-title">
                Como usar o <em>Sérum AREUM</em>
              </h2>
              <p className="pr-lead">Use de manhã e à noite.</p>
              <p>Pode ser o primeiro passo da sua rotina ou usado sozinho.</p>
            </div>
            <ol className="pr-steps">
              {steps.map((step, index) => (
                <li key={step}>
                  <span aria-hidden="true">{index + 1}.</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section
          id="pr-comprar"
          className="pr-offer pr-wrap"
          aria-labelledby="pr-offer-title"
        >
          <div className="pr-offer-product">
            <img
              src={serum}
              width="1000"
              height="1500"
              loading="lazy"
              alt="Sérum Facial AREUM com aplicador conta-gotas, 30 ml"
            />
          </div>
          <div className="pr-buybox" aria-label="Comprar Sérum Facial AREUM">
            <h2 id="pr-offer-title" className="pr-product-name">
              Sérum Facial AREUM <span>• 30 ml</span>
            </h2>
            <p className="pr-price">R$ 79,90</p>
            <p className="pr-payment">ou 3x de R$ 26,63 sem juros</p>
            <PurchaseLink placement="final" />
            <p className="pr-assurance">
              <ShieldCheck size={20} aria-hidden="true" /> Frete calculado pelo
              CEP • Compra segura • Envio rastreado
            </p>
            <SupportLink placement="final" />
          </div>
        </section>
        <section
          className="pr-section pr-wrap pr-trust"
          aria-labelledby="pr-trust-title"
        >
          <p className="pr-eyebrow">DA COMPRA AO SEU PRIMEIRO CUIDADO</p>
          <h2 id="pr-trust-title">Pode contar com a AREUM.</h2>
          <div className="pr-trust-grid">
            <article>
              <ShieldCheck aria-hidden="true" />
              <h3>Pagamento seguro</h3>
              <p>Compra processada no checkout Yampi, com Pix e cartão.</p>
            </article>
            <article>
              <Truck aria-hidden="true" />
              <h3>Envio rastreado</h3>
              <p>Calcule no topo da página: valor e prazo pelo seu CEP.</p>
            </article>
            <article>
              <MessageCircle aria-hidden="true" />
              <h3>Atendimento no Brasil</h3>
              <p>
                Ajuda em português, pelo WhatsApp, para comprar com
                tranquilidade.
              </p>
            </article>
          </div>
        </section>
        <section
          className="pr-generations"
          aria-labelledby="pr-generations-title"
        >
          <figure className="pr-generations-photo">
            <img
              src="/pele-radiante/editorial-geracoes.webp"
              width="1500"
              height="1000"
              loading="lazy"
              alt="Três mulheres de diferentes gerações juntas"
            />
          </figure>
          <div className="pr-generations-copy">
            <Sun size={38} strokeWidth={1.2} aria-hidden="true" />
            <p className="pr-eyebrow">A BELEZA ACOMPANHA VOCÊ</p>
            <h2 id="pr-generations-title">
              Skincare não tem
              <br />
              uma idade certa.
            </h2>
            <p>
              Tem a pele que você tem hoje — e o cuidado que faz sentido para
              ela.
            </p>
            <p className="pr-signature">AREUM. Beleza em todas as fases.</p>
          </div>
        </section>
        <section
          id="pr-duvidas"
          className="pr-section pr-wrap pr-faq"
          aria-labelledby="pr-faq-title"
        >
          <div>
            <p className="pr-eyebrow">COMPRE COM TRANQUILIDADE</p>
            <h2 id="pr-faq-title">
              Vamos tirar
              <br />
              <em>suas dúvidas?</em>
            </h2>
            <SupportLink placement="faq" />
          </div>
          <div>
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <Plus size={24} aria-hidden="true" />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="pr-footer pr-wrap">
        <a className="pr-brand" href="/" aria-label="AREUM — página inicial">
          <img
            className="pr-logo"
            src="/pele-radiante/logo-areum-oficial.png"
            width="533"
            height="237"
            loading="lazy"
            alt="AREUM 아름"
          />
        </a>
        <p>Areum Cosmetics • CNPJ 50.548.562/0001-42</p>
        <a href="mailto:contato@areumco.com.br">contato@areumco.com.br</a>
        <div>
          <a href="/politica-de-privacidade">Privacidade</a>
          <a href="/termos-de-uso">Termos de uso</a>
          <a href="/">Conheça a AREUM</a>
        </div>
      </footer>
      <aside className="pr-mobile-bar" aria-label="Compra rápida">
        <strong>R$ 79,90</strong>
        <PurchaseLink placement="mobile_sticky" compact />
      </aside>
    </div>
  );
}
