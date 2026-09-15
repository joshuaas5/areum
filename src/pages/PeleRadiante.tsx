import { useEffect } from "react";
import {
  ArrowRight,
  Droplets,
  Sparkles,
  Heart,
  Feather,
  ShieldCheck,
  Truck,
  MessageCircle,
  Sun,
  Plus,
  Check,
  Star,
} from "lucide-react";
import serum from "@/assets/areum-serum.webp";
import { CHECKOUT_URL } from "@/lib/analytics-config";
import {
  trackCheckoutClick,
  trackContact,
  trackViewContent,
} from "@/lib/analytics";
import "./pele-radiante.css";
import "./pele-radiante-editorial.css";

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

function BuyBox({ placement }: { placement: string }) {
  return (
    <div className="pr-buybox" aria-label="Comprar Sérum Facial AREUM">
      <p className="pr-product-name">
        Sérum Facial AREUM <span>• 30 ml</span>
      </p>
      <p className="pr-price">R$79,90</p>
      <p className="pr-payment">ou 3x de R$26,63 sem juros</p>
      <p className="pr-payment">Pix e cartão de crédito</p>
      <PurchaseLink placement={placement} />
      <p className="pr-shipping">
        <Truck size={23} aria-hidden="true" />
        <span>
          Frete e prazo pelo seu CEP na próxima etapa, antes de pagar.
        </span>
      </p>
      <p className="pr-assurance">
        <ShieldCheck size={20} aria-hidden="true" /> Compra segura • Envio
        rastreado • Atendimento AREUM
      </p>
      <SupportLink placement={placement} />
    </div>
  );
}

const benefits = [
  {
    icon: Droplets,
    title: "Hidratação",
    text: "Cuidado diário que ajuda a manter a pele hidratada e confortável.",
  },
  {
    icon: Sparkles,
    title: "Luminosidade",
    text: "Valorize a aparência luminosa e natural da sua pele.",
  },
  {
    icon: Feather,
    title: "Maciez",
    text: "Um toque de cuidado para uma pele mais macia e suave.",
  },
  {
    icon: Heart,
    title: "Aparência das linhas finas",
    text: "Hidratação que ajuda a suavizar a aparência de linhas finas.",
  },
];
const faqs = [
  [
    "O que vem no frasco?",
    "Um Sérum Facial AREUM de 30 ml, com Ácido Hialurônico & Colágeno Vegano e aplicador conta-gotas.",
  ],
  [
    "Como devo usar?",
    "Aplique 3 a 4 gotas na pele limpa e levemente úmida, de manhã e à noite. Espalhe suavemente no rosto e pescoço. Durante o dia, finalize com protetor solar. Siga também as orientações do rótulo.",
  ],
  [
    "Como consulto o frete e o prazo?",
    "Toque no botão de compra e informe seu CEP no checkout. As opções de entrega, os valores e o prazo estimado aparecem antes da confirmação do pagamento.",
  ],
  [
    "Quais são as formas de pagamento?",
    "Você pode pagar com Pix ou cartão de crédito. O parcelamento divulgado é de 3x de R$26,63 sem juros. Confira as condições e o valor total na etapa de pagamento.",
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
        "Pele mais hidratada, macia e luminosa com Sérum Facial AREUM 30 ml. Uma rotina simples, inspirada no skincare coreano. R$79,90.",
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
        "Hidratação, maciez e luminosidade. AREUM. Beleza em todas as fases.",
      ],
      [
        'meta[name="twitter:title"]',
        "content",
        "Pele mais radiante | Sérum Facial AREUM 30 ml",
      ],
      [
        'meta[name="twitter:description"]',
        "content",
        "Hidratação, maciez e luminosidade. AREUM. Beleza em todas as fases.",
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
            <a className="pr-rating" href="#pr-experiencias">
              <span aria-label="5 estrelas">★★★★★</span> 2 avaliações publicadas{" "}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
            <p className="pr-eyebrow">
              SÉRUM FACIAL • ÁCIDO HIALURÔNICO + COLÁGENO VEGANO
            </p>
            <h1 id="pr-title">
              Pele mais hidratada,
              <br /> macia e <em>luminosa.</em>
            </h1>
            <p className="pr-lead">
              Uma rotina simples para cuidar da aparência da sua pele todos os
              dias.
            </p>
            <p>
              Ácido Hialurônico &amp; Colágeno Vegano para hidratação e cuidado
              diário, ajudando a suavizar a aparência de linhas finas.
            </p>
            <p className="pr-origin">
              <span aria-hidden="true">✦</span> Inspirado no skincare coreano.
            </p>
          </div>
          <figure className="pr-product-stage">
            <img
              className="pr-model"
              src="/pele-radiante/editorial-madura.webp"
              width="1100"
              height="1375"
              fetchPriority="high"
              alt="Imagem editorial criada com IA: mulher madura de cabelos prateados, sorrindo e tocando suavemente a pele"
            />
            <span className="pr-photo-tag">BELEZA EM TODAS AS FASES</span>
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
            <span className="pr-editorial-label">
              Imagem editorial criada com IA.
            </span>
          </figure>
          <div className="pr-hero-buy">
            <BuyBox placement="hero" />
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
                O cuidado ganha vida
                <br />
                <em>na pele de quem usa.</em>
              </h2>
            </div>
            <p>
              Veja o sérum em uso e leia o que clientes já compartilharam sobre
              a AREUM.
            </p>
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
                Ler as 2 avaliações completas{" "}
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
          <p className="pr-eyebrow">O ESSENCIAL, TODOS OS DIAS</p>
          <h2 id="pr-benefits-title">
            Mais cuidado.
            <br />
            <em>Mais conforto na sua pele.</em>
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
                SUA PELE MUDA.
                <br />
                SEU CUIDADO NÃO PRECISA SER <em>COMPLICADO.</em>
              </h2>
              <p className="pr-lead">
                3 a 4 gotas. Manhã e noite. Todos os dias.
              </p>
              <p>
                Um passo simples para fazer parte da rotina que você já tem.
              </p>
              <a className="pr-text-link" href="#pr-comprar">
                Quero esse cuidado <ArrowRight size={22} aria-hidden="true" />
              </a>
            </div>
            <ol className="pr-steps">
              <li>
                <span>01</span>
                <div>
                  <h3>Prepare a pele</h3>
                  <p>Limpe o rosto e deixe a pele levemente úmida.</p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h3>Aplique 3 a 4 gotas</h3>
                  <p>Espalhe no rosto e pescoço com movimentos suaves.</p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h3>Continue seu cuidado</h3>
                  <p>
                    Finalize com seu hidratante habitual, se necessário. De dia,
                    use protetor solar.
                  </p>
                </div>
              </li>
            </ol>
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
              <p>Frete e prazo para seu endereço informados antes de pagar.</p>
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
          id="pr-comprar"
          className="pr-offer pr-wrap"
          aria-labelledby="pr-offer-title"
        >
          <div className="pr-offer-product">
            <p className="pr-eyebrow">SEU PRÓXIMO MOMENTO DE CUIDADO</p>
            <h2 id="pr-offer-title">
              Pequenas gotas.
              <br />
              <em>Beleza no dia a dia.</em>
            </h2>
            <img
              src={serum}
              width="1000"
              height="1500"
              loading="lazy"
              alt="Sérum Facial AREUM com aplicador conta-gotas, 30 ml"
            />
          </div>
          <BuyBox placement="final" />
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
              alt="Imagem editorial criada com IA: três mulheres de diferentes gerações juntas"
            />
            <figcaption>Imagem editorial criada com IA.</figcaption>
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
        <div>
          <span>Sérum AREUM • 30 ml</span>
          <strong>R$79,90</strong>
        </div>
        <PurchaseLink placement="mobile_sticky" compact />
      </aside>
    </div>
  );
}
