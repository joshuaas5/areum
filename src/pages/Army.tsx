import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  Gift,
  Heart,
  Instagram,
  Send,
  Sparkles,
  Star,
  Tag,
  Ticket,
  TrendingUp,
  Trophy,
  Users,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArmyFormEmbed from "@/components/ArmyFormEmbed";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

// Prints reais das embaixadoras (recortes dos vídeos UGC) — /public/army
const imgGlowHero = "/army/glow-hero.jpg";
const imgGlowTextura = "/army/textura-mao.jpg";
const imgGlowFrasco = "/army/glow-frasco.jpg";
const imgFlaviaHero = "/army/flavia-hero.jpg";
const imgFlaviaAbriu = "/army/flavia-abriu.jpg";
const imgFlaviaUsando = "/army/flavia-usando.jpg";
const imgJaponesaUsando = "/army/japonesa-usando.jpg";
const imgJaponesaResultado = "/army/japonesa-resultado.jpg";

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

const trustStrip = [
  "Sem estoque",
  "Sem taxa de adesão",
  "Sem investimento inicial",
  "Cupom exclusivo",
  "Você não precisa ser influencer",
];

const requirements = [
  {
    title: "Gostar da AREUM de verdade",
    text: "Você não precisa ser influencer. Precisa gostar da marca e querer fazer parte do crescimento dela.",
  },
  {
    title: "Estar presente nas redes",
    text: "Instagram, TikTok ou WhatsApp. O canal importa menos do que a vontade de compartilhar.",
  },
  {
    title: "Indicar de forma natural",
    text: "Se você já mostra um skincare para uma amiga, já tem o perfil que procuramos.",
  },
];

const rewards = [
  {
    icon: BadgeCheck,
    value: "R$10",
    label: "de comissão por unidade vendida com o seu cupom",
  },
  {
    icon: Tag,
    value: "5% OFF",
    label: "para suas amigas, clientes e seguidores na primeira compra",
  },
  {
    icon: Ticket,
    value: "R$0",
    label: "para entrar. Sem taxa, sem estoque, sem pedido mínimo",
  },
];

const steps = [
  {
    number: "01",
    title: "Faça sua inscrição",
    text: "Conte um pouco sobre você e suas redes. Leva menos de 2 minutos.",
  },
  {
    number: "02",
    title: "Seja aprovada",
    text: "Analisamos cada inscrição para montar uma comunidade alinhada com a marca.",
  },
  {
    number: "03",
    title: "Receba seu cupom",
    text: "Código exclusivo + material pronto: fotos, vídeos, ideias de Stories e legendas.",
  },
  {
    number: "04",
    title: "Indique e ganhe",
    text: "Venda elegível pelo seu cupom = comissão paga pela AREUM. A operação é toda nossa.",
  },
];

const materials = [
  "Vídeos e fotos oficiais da marca",
  "Ideias de Stories e Reels prontas",
  "Sugestões de legendas e abordagens",
  "Informações completas sobre os produtos",
  "Campanhas e promoções exclusivas",
  "Comunidade privada da AREUM ARMY",
];

const growth = [
  {
    icon: Trophy,
    title: "Metas e desafios",
    text: "Participe de campanhas internas e acompanhe sua evolução.",
  },
  {
    icon: TrendingUp,
    title: "Comissões progressivas",
    text: "Quem vende mais desbloqueia condições de comissão superiores.",
  },
  {
    icon: Camera,
    title: "Reconhecimento",
    text: "Melhores conteúdos repostados no perfil oficial @areumco.",
  },
  {
    icon: Gift,
    title: "Benefícios exclusivos",
    text: "Acesso antecipado a novidades, produtos e oportunidades.",
  },
];

const noStock = [
  "comprar caixas de produto",
  "guardar estoque",
  "cobrar cliente",
  "embalar pedidos",
  "fazer envios",
];

const faqs = [
  {
    q: "Preciso pagar para entrar?",
    a: "Não. A inscrição e a participação inicial na AREUM ARMY são gratuitas.",
  },
  {
    q: "Preciso comprar produtos para revender?",
    a: "Não. Você não trabalha com estoque — a venda e o envio são feitos diretamente pela AREUM.",
  },
  {
    q: "Preciso ter muitos seguidores?",
    a: "Não. Avaliamos o perfil como um todo, não apenas o número de seguidores.",
  },
  {
    q: "Preciso criar conteúdo?",
    a: "A ARMY é uma comunidade ativa. Esperamos participação na divulgação — e fornecemos material pronto para ajudar.",
  },
  {
    q: "Posso divulgar pelo WhatsApp?",
    a: "Sim. Você pode indicar para amigas, clientes e pessoas da sua rede, além de usar Instagram e TikTok.",
  },
  {
    q: "Como sei quais vendas são minhas?",
    a: "Cada embaixadora recebe um cupom individual, usado para identificar suas vendas elegíveis.",
  },
  {
    q: "Quando recebo?",
    a: "As regras e o calendário de pagamento são apresentados às integrantes aprovadas.",
  },
];

const StickyArmyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/15 bg-background/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="font-heading text-lg font-bold leading-none text-primary">
            ARMY AREUM
          </span>
          <span className="text-[0.7rem] text-muted-foreground">
            R$0 para entrar • ganhe R$10/venda
          </span>
        </div>
        <Button variant="hero" size="lg" className="flex-1 max-w-[55%] shimmer" asChild>
          <a href="#inscricao">Quero fazer parte</a>
        </Button>
      </div>
    </div>
  );
};

const Army = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "AREUM ARMY | Programa de Embaixadoras | Areum";

    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content");
    meta?.setAttribute(
      "content",
      "Ganhe divulgando o skincare que você já ama. Sem estoque, sem taxa de adesão e sem investimento inicial. Inscrição gratuita e sujeita à aprovação.",
    );
    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== undefined) meta.setAttribute("content", previousDescription);
    };
  }, []);

  return (
    <main className="overflow-hidden">
      <Navbar variant="solid" />
      <StickyArmyCTA />

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush/70 via-blush/30 to-background">
        <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-accent/40 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-champagne/60 blur-3xl" aria-hidden />
        <div className="container relative mx-auto grid items-center gap-10 px-4 pb-16 pt-12 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:pb-24 md:pt-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/70 px-4 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-primary backdrop-blur md:text-xs">
              <Heart className="h-3.5 w-3.5 fill-current" />
              Programa de Embaixadoras AREUM
            </p>
            <h1 className="text-balance font-heading text-[2.1rem] font-semibold leading-[1.06] text-foreground md:text-6xl lg:text-7xl">
              Ganhe divulgando o{" "}
              <span className="italic text-primary">skincare</span> que você já ama.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground md:mt-6 md:text-base md:leading-8">
              Transforme suas indicações em uma nova fonte de renda. Crie conteúdo, compartilhe
              com quem confia em você e{" "}
              <strong className="font-semibold text-foreground">seja remunerada</strong> pelas
              vendas geradas através do seu cupom.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button variant="hero" size="xl" className="w-full whitespace-normal text-center uppercase tracking-[0.1em] sm:w-auto" asChild>
                <a href="#inscricao">
                  Quero fazer parte da ARMY
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/60 transition-colors hover:text-primary"
              >
                Ver como funciona
                <ArrowDown className="h-4 w-4" />
              </a>
            </div>

            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Inscrição gratuita e sujeita à aprovação. Ganhos dependem das vendas realizadas e
              não são garantidos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="relative mx-auto w-full max-w-sm md:max-w-md"
          >
            <div className="absolute -inset-6 rounded-full bg-accent/30 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] border-4 border-background shadow-product">
              <img
                src={imgGlowHero}
                alt="Embaixadora AREUM com pele iluminada segurando o sérum"
                className="aspect-[9/13] w-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 via-foreground/25 to-transparent p-5 pt-14">
                <p className="font-heading text-lg italic leading-snug text-white md:text-xl">
                  “Já uso. Já indiquei. Agora posso ser remunerada por isso.”
                </p>
              </div>
            </div>

            <div className="absolute -left-6 top-8 hidden w-28 overflow-hidden rounded-2xl border-4 border-background shadow-card-soft lg:block xl:w-32">
              <img src={imgGlowTextura} alt="Textura do sérum AREUM na mão" className="aspect-[4/5] w-full object-cover" loading="lazy" />
            </div>
            <div className="absolute -right-5 bottom-24 hidden w-24 overflow-hidden rounded-2xl border-4 border-background shadow-card-soft lg:block xl:w-28">
              <img src={imgGlowFrasco} alt="Frasco do sérum AREUM" className="aspect-[4/5] w-full object-cover" loading="lazy" />
            </div>
          </motion.div>
        </div>

        {/* Trust strip */}
        <div className="relative border-y border-primary/10 bg-background/70 backdrop-blur">
          <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2 px-4 py-3.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-foreground/60 md:text-xs">
            {trustStrip.map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOCÊ JÁ INDICA ─── */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...fade} className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Já indica produtos?
              <br />
              <span className="text-primary">Agora você pode ser remunerada por isso.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
              Sabe aquele skincare que você mostra para uma amiga? A dica que manda no WhatsApp?
              Na AREUM ARMY, suas indicações viram comissão — e a AREUM cuida de pagamento,
              estoque, embalagem e envio.
            </p>
          </motion.div>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-4">
            {[
              { src: imgFlaviaAbriu, alt: "Embaixadora abrindo o sérum AREUM" },
              { src: imgJaponesaUsando, alt: "Cliente aplicando o sérum AREUM no rosto" },
              { src: imgFlaviaUsando, alt: "Embaixadora aplicando o sérum na mão" },
              { src: imgJaponesaResultado, alt: "Resultado na pele após uso do sérum AREUM" },
            ].map((item, index) => (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="overflow-hidden rounded-2xl border-2 border-background shadow-card-soft"
              >
                <img src={item.src} alt={item.alt} className="aspect-[9/16] w-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARA QUEM É ─── */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto grid max-w-5xl items-center gap-10 px-4 md:grid-cols-[0.85fr_1.15fr] md:px-8">
          <motion.div {...fade} className="relative mx-auto w-full max-w-xs md:max-w-sm">
            <div className="overflow-hidden rounded-[2rem] border-4 border-background shadow-product">
              <img
                src={imgFlaviaHero}
                alt="Embaixadora AREUM apresentando o sérum para a câmera"
                className="aspect-[9/16] w-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="absolute -bottom-5 -right-2 rotate-[-3deg] rounded-full bg-background px-4 py-2 text-xs font-medium text-primary shadow-card-soft md:text-sm">
              não precisa ser influencer ♡
            </p>
          </motion.div>

          <motion.div {...fade}>
            <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary/85 md:text-xs">
              Para quem é a ARMY
            </p>
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Você já tem o perfil. Falta só o cupom.
            </h2>
            <div className="mt-7 space-y-5">
              {requirements.map((item, index) => (
                <div key={item.title} className="flex gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-base font-bold text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── O QUE VOCÊ GANHA ─── */}
      <section id="beneficios" className="scroll-mt-24 bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...fade} className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary/85 md:text-xs">
              O que você ganha
            </p>
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Começar custa <span className="text-primary">R$0.</span>
            </h2>
          </motion.div>

          <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3 md:mt-14">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.value}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-3xl border border-primary/15 bg-gradient-to-b from-blush/30 to-background p-7 text-center shadow-card-soft"
              >
                <reward.icon className="mx-auto mb-3 h-6 w-6 text-primary" />
                <p className="font-heading text-4xl font-bold text-primary md:text-5xl">{reward.value}</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground md:text-sm">{reward.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button variant="hero" size="xl" className="uppercase tracking-[0.1em]" asChild>
              <a href="#inscricao">
                Quero me inscrever
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ─── COMO FUNCIONA ─── */}
      <section id="como-funciona" className="scroll-mt-24 bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...fade} className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
            <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary/85 md:text-xs">
              Como funciona
            </p>
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Você indica. A AREUM cuida do resto.
            </h2>
          </motion.div>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-3xl border border-primary/10 bg-background p-6 shadow-card-soft"
              >
                <p className="font-heading text-4xl font-bold text-primary/25">{step.number}</p>
                <h3 className="mt-3 font-heading text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} className="mx-auto mt-10 max-w-3xl rounded-3xl border border-primary/15 bg-background p-6 md:p-8">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <div className="flex -space-x-3">
                <img src={imgGlowFrasco} alt="" className="h-14 w-14 rounded-full border-2 border-background object-cover" loading="lazy" />
                <img src={imgJaponesaUsando} alt="" className="h-14 w-14 rounded-full border-2 border-background object-cover" loading="lazy" />
                <img src={imgFlaviaUsando} alt="" className="h-14 w-14 rounded-full border-2 border-background object-cover" loading="lazy" />
              </div>
              <p className="flex-1 text-center text-sm leading-6 text-muted-foreground md:text-left md:text-base">
                <strong className="font-semibold text-foreground">Sem estoque, sem burocracia.</strong>{" "}
                A compra é feita direto com a AREUM pelo link do seu cupom. Você concentra sua
                energia em divulgar e indicar.
              </p>
              <Send className="hidden h-6 w-6 shrink-0 rotate-45 text-primary md:block" aria-hidden />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── MATERIAL + CRESCIMENTO ─── */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto grid max-w-5xl gap-12 px-4 md:grid-cols-2 md:px-8">
          <motion.div {...fade}>
            <p className="mb-3 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary/85 md:text-xs">
              <Users className="h-3.5 w-3.5" />
              A gente te ajuda a começar
            </p>
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Você não recebe apenas um cupom.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              Toda integrante tem acesso a materiais prontos para divulgar — mesmo quem nunca
              criou conteúdo.
            </p>
            <ul className="mt-6 space-y-2.5">
              {materials.map((material) => (
                <li key={material} className="flex items-start gap-2.5 text-sm leading-6 text-foreground/85 md:text-base">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{material}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fade}>
            <p className="mb-3 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary/85 md:text-xs">
              <Sparkles className="h-3.5 w-3.5" />
              Crescimento
            </p>
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Cresça dentro da ARMY.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              Sua participação não para na primeira venda. Quem cresce com a AREUM desbloqueia
              novas oportunidades.
            </p>
            <div className="mt-6 space-y-4">
              {growth.map((item) => (
                <div key={item.title} className="flex gap-4 rounded-2xl border border-primary/10 bg-secondary/40 p-5">
                  <item.icon className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Metas, benefícios e valores podem variar conforme cada campanha.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── COMUNIDADE + BIO ─── */}
      <section className="bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            {...fade}
            className="mx-auto max-w-3xl rounded-[2rem] border border-primary/15 bg-gradient-to-br from-blush/40 to-champagne/40 p-7 text-center md:p-12"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-background shadow-card-soft">
              <Instagram className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Não é só sobre vender. É sobre fazer parte.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              Valorizamos quem cria conteúdo, marca <strong className="text-foreground">@areumco</strong>,
              participa das campanhas e compartilha a marca de forma verdadeira. Os melhores
              conteúdos aparecem nos nossos Stories, Destaques e perfil oficial.
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              Enquanto estiver ativa na ARMY, sua bio identifica a marca:
            </p>
            <p className="mx-auto mt-3 inline-block rounded-full border border-primary/20 bg-background px-6 py-3 text-sm font-medium text-foreground md:text-base">
              Embaixadora AREUM 💗 @areumco
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── NÃO PRECISA ─── */}
      <section className="bg-background py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...fade} className="mx-auto max-w-3xl rounded-3xl border border-primary/15 bg-secondary/30 p-7 md:p-10">
            <h2 className="text-balance font-heading text-2xl font-semibold leading-tight text-foreground md:text-3xl">
              Você não precisa de nada disso:
            </h2>
            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {noStock.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/70">
                  <X className="h-4 w-4 shrink-0 text-primary/60" />
                  <span className="line-through decoration-primary/40">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="scroll-mt-24 bg-secondary/50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...fade} className="mx-auto mb-9 max-w-3xl text-center md:mb-12">
            <h2 className="font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Perguntas rápidas
            </h2>
          </motion.div>

          <motion.div {...fade} className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${index}`}
                  className="rounded-xl border border-primary/10 bg-background px-5"
                >
                  <AccordionTrigger className="text-left text-sm font-medium text-foreground hover:no-underline md:text-base">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-7 text-muted-foreground">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

      {/* ─── INSCRIÇÃO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-blush/40 to-champagne/40 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...fade} className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <div className="mb-4 flex items-center justify-center gap-1 text-primary">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              Talvez a próxima história da AREUM seja a sua.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
              Não precisa ter milhares de seguidores. Não precisa comprar estoque. Precisa apenas
              querer fazer parte.
            </p>
            <p className="mt-6 font-heading text-2xl font-semibold text-primary md:text-3xl">
              Represente. Crie. Compartilhe. Ganhe.
            </p>
          </motion.div>

          <ArmyFormEmbed />

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-muted-foreground">
            Sem taxa de adesão • Sem estoque • Sem investimento inicial
            <br />
            Inscrições sujeitas à aprovação. Comissões são pagas sobre vendas elegíveis conforme
            as regras do programa. Não existe garantia de renda.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Army;
