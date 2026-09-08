import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Camera,
  Check,
  ChevronRight,
  Gift,
  Heart,
  Instagram,
  Package,
  Send,
  Sparkles,
  Tag,
  Ticket,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArmyFormEmbed from "@/components/ArmyFormEmbed";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Posters oficiais ficam em /public/videos (referenciados por URL absoluta).
const posterGlow = "/videos/poster-glow.jpg";
const posterAntesDepois = "/videos/poster-antes-depois.jpg";
const posterFlavia = "/videos/poster-flavia.jpg";

const sectionFade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55 },
};

const heroChips = [
  { icon: Package, label: "Sem estoque" },
  { icon: Ticket, label: "Sem investimento inicial" },
  { icon: Heart, label: "Você não precisa ser influencer" },
  { icon: Sparkles, label: "Todo o suporte da AREUM" },
];

const steps = [
  {
    number: "01",
    title: "Faça sua inscrição",
    text: "Conte um pouco sobre você, suas redes e como gostaria de divulgar a AREUM.",
  },
  {
    number: "02",
    title: "Seja selecionada",
    text: "Analisamos cada inscrição para construir uma comunidade de embaixadoras alinhadas com a marca.",
  },
  {
    number: "03",
    title: "Receba seu cupom exclusivo",
    text: "Depois de aprovada, você recebe seu próprio código para compartilhar com amigas, clientes e seguidores.",
  },
  {
    number: "04",
    title: "Indique e ganhe",
    text: "Quando uma venda elegível for realizada através do seu cupom, você recebe sua comissão.",
  },
];

const rewards = [
  { icon: BadgeCheck, value: "R$10", label: "de comissão inicial por unidade elegível vendida" },
  { icon: Tag, value: "5% OFF", label: "para quem comprar usando o seu cupom" },
  { icon: Ticket, value: "R$0", label: "para entrar na AREUM ARMY" },
];

const audience = [
  "gostam de skincare e beleza;",
  "usam Instagram, TikTok ou WhatsApp;",
  "gostam de indicar produtos para amigas;",
  "atendem clientes na área de beleza;",
  "querem começar a criar conteúdo;",
  "buscam uma forma de complementar sua renda;",
  "querem crescer junto com uma marca.",
];

const materials = [
  "Vídeos e fotos oficiais",
  "Ideias de Stories e Reels",
  "Sugestões de legendas e abordagens",
  "Informações sobre os produtos",
  "Campanhas e promoções da marca",
  "Orientações para criar conteúdo",
  "Comunidade exclusiva da AREUM ARMY",
];

const growth = [
  {
    icon: Trophy,
    title: "Metas de desempenho",
    text: "Acompanhe sua evolução e participe de campanhas e desafios da ARMY.",
  },
  {
    icon: TrendingUp,
    title: "Comissões progressivas",
    text: "Integrantes com melhor desempenho poderão acessar condições de comissão superiores.",
  },
  {
    icon: Camera,
    title: "Reconhecimento",
    text: "Os melhores conteúdos podem ser repostados e destacados no perfil oficial da AREUM.",
  },
  {
    icon: Gift,
    title: "Benefícios exclusivos",
    text: "Campanhas especiais, acesso antecipado a novidades, produtos e outras oportunidades podem ser liberados para integrantes ativas.",
  },
];

const community = [
  "cria conteúdo",
  "marca @areumco",
  "participa das campanhas",
  "compartilha a marca de forma verdadeira",
  "ajuda novas pessoas a conhecerem a AREUM",
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
    a: "Não. A inscrição e participação inicial na AREUM ARMY são gratuitas.",
  },
  {
    q: "Preciso comprar produtos para revender?",
    a: "Não. Você não trabalha com estoque.",
  },
  {
    q: "Preciso ter muitos seguidores?",
    a: "Não. Avaliamos o perfil como um todo, não apenas o número de seguidores.",
  },
  {
    q: "Preciso criar conteúdo?",
    a: "A ARMY é uma comunidade ativa. Esperamos que as integrantes participem da divulgação da marca, e fornecemos materiais para ajudar nesse processo.",
  },
  {
    q: "Posso divulgar pelo WhatsApp?",
    a: "Sim. Você pode indicar para amigas, clientes e pessoas da sua rede, além de utilizar Instagram e TikTok.",
  },
  {
    q: "Como sei quais vendas são minhas?",
    a: "Cada embaixadora recebe um cupom individual, utilizado para identificar suas vendas elegíveis.",
  },
  {
    q: "Quando recebo?",
    a: "As regras e calendário de pagamento são apresentados às integrantes aprovadas.",
  },
];

const Army = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "AREUM ARMY | Programa de Embaixadoras | Areum";

    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content");
    meta?.setAttribute(
      "content",
      "Represente a AREUM, crie conteúdo e ganhe comissão pelas suas indicações. Sem estoque, sem taxa de adesão e sem investimento inicial. Inscrição gratuita e sujeita à aprovação.",
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

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto grid items-center gap-10 px-4 py-14 md:grid-cols-[1.05fr_0.95fr] md:px-8 md:py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="mb-3 flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-primary/85 md:text-xs">
              <Heart className="h-3.5 w-3.5 fill-current" />
              AREUM ARMY
            </p>
            <h1 className="text-balance font-heading text-4xl font-semibold leading-[1.08] text-foreground md:text-5xl lg:text-6xl">
              Transforme sua paixão por skincare em{" "}
              <span className="text-gradient-rose">renda extra.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground md:mt-6 md:text-base md:leading-8">
              Faça parte da AREUM ARMY. Represente a AREUM, crie conteúdo, compartilhe com pessoas
              que confiam em você e <strong className="font-semibold text-foreground">ganhe comissão</strong>{" "}
              pelas suas indicações.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              Sem estoque. Sem taxa de adesão. Sem investimento inicial.
              <br />
              Você não precisa ser uma grande influenciadora.
            </p>

            <div className="mt-7 grid max-w-lg grid-cols-2 gap-x-4 gap-y-3 md:mt-8">
              {heroChips.map((chip) => (
                <div key={chip.label} className="flex items-center gap-2 text-xs text-foreground/75 md:text-sm">
                  <chip.icon className="h-4 w-4 shrink-0 text-primary" />
                  <span>{chip.label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 md:mt-9">
              <Button variant="hero" size="xl" className="uppercase tracking-[0.12em]" asChild>
                <a href="#inscricao">
                  Quero fazer parte
                  <ChevronRight className="h-5 w-5" />
                </a>
              </Button>
              <p className="mt-4 max-w-md text-xs leading-5 text-muted-foreground">
                Inscrição gratuita e sujeita à aprovação. Seus ganhos dependem das vendas
                realizadas e não são garantidos.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="absolute -inset-6 rounded-full bg-blush/40 blur-3xl" aria-hidden />
            <img
              src={posterGlow}
              alt="Integrante da AREUM ARMY com pele iluminada usando o sérum AREUM"
              className="relative aspect-[4/5] w-full rounded-2xl object-cover shadow-product"
              loading="eager"
            />
            <p className="absolute -bottom-4 right-2 rotate-[-3deg] font-heading text-xl italic text-primary/90 md:text-2xl">
              Juntas por uma beleza mais real ♡
            </p>
          </motion.div>
        </div>
      </section>

      {/* Você já indica produtos */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...sectionFade} className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
              Você já indica produtos.
              <br />
              <span className="text-primary">Agora pode ganhar com isso.</span>
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
              Sabe aquele skincare que você mostra para uma amiga? A dica que manda no WhatsApp?
              O produto que aparece no seu Story ou na conversa com uma cliente?
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
              Na AREUM ARMY, suas indicações podem se transformar em uma nova fonte de renda.
              Você representa a marca — <strong className="font-semibold text-foreground">a AREUM cuida do restante.</strong>{" "}
              Pagamento, estoque, embalagem e envio ficam por nossa conta.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Como funciona */}
      <section id="como-funciona" className="scroll-mt-24 bg-secondary/40 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...sectionFade} className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
            <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-primary/85 md:text-xs">
              Como funciona?
            </p>
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
              É simples assim.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              Você indica. A AREUM vende, envia e cuida da operação.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="border border-primary/10 bg-background p-6 shadow-card-soft"
              >
                <p className="font-heading text-4xl font-semibold text-primary/25">{step.number}</p>
                <h3 className="mt-3 font-heading text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Começar custa R$0 */}
      <section id="beneficios" className="scroll-mt-24 bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...sectionFade} className="mx-auto max-w-5xl border border-primary/10 bg-gradient-to-br from-background via-blush/20 to-champagne/30 p-6 shadow-card-soft md:p-12">
            <div className="text-center">
              <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
                Começar custa <span className="text-primary">R$0.</span>
              </h2>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3 md:mt-10">
              {rewards.map((reward) => (
                <div key={reward.value} className="border border-primary/10 bg-background/80 p-6 text-center">
                  <reward.icon className="mx-auto mb-3 h-6 w-6 text-primary" />
                  <p className="font-heading text-4xl font-bold text-primary md:text-5xl">{reward.value}</p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground md:text-sm">{reward.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Sem estoque. Sem pedido mínimo. Sem taxa para participar.
            </p>
            <div className="mt-7 text-center">
              <Button variant="hero" size="xl" className="uppercase tracking-[0.12em]" asChild>
                <a href="#inscricao">
                  Quero me inscrever
                  <ChevronRight className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Não precisa ser influencer */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="container mx-auto grid max-w-5xl items-center gap-10 px-4 md:grid-cols-[0.9fr_1.1fr] md:px-8">
          <motion.div {...sectionFade} className="relative">
            <img
              src={posterFlavia}
              alt="Embaixadora AREUM apresentando o sérum em vídeo"
              className="aspect-[4/5] w-full max-w-sm rotate-[-2deg] rounded-2xl object-cover shadow-product"
              loading="lazy"
            />
          </motion.div>
          <motion.div {...sectionFade}>
            <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-primary/85 md:text-xs">
              Não precisa ser influencer.
            </p>
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              A ARMY também é para você.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
              A AREUM ARMY não foi criada apenas para quem já tem milhares de seguidores. Ela também
              é para mulheres que:
            </p>
            <ul className="mt-5 space-y-2.5">
              {audience.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-foreground/80 md:text-base">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
              O que importa é ter vontade de participar e representar a AREUM de verdade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* A gente te ajuda a começar */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...sectionFade} className="mx-auto max-w-3xl text-center">
            <p className="mb-3 flex items-center justify-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-primary/85 md:text-xs">
              <Users className="h-3.5 w-3.5" />
              A gente te ajuda a começar.
            </p>
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Você não entra na ARMY e recebe apenas um cupom.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
              As integrantes têm acesso a materiais pensados para facilitar sua divulgação:
            </p>
          </motion.div>

          <motion.div {...sectionFade} className="mx-auto mt-9 grid max-w-3xl gap-2.5 sm:grid-cols-2">
            {materials.map((material) => (
              <div key={material} className="flex items-center gap-3 border border-primary/10 bg-secondary/40 px-4 py-3 text-sm text-foreground/85">
                <Check className="h-4 w-4 shrink-0 text-primary" />
                <span>{material}</span>
              </div>
            ))}
          </motion.div>

          <p className="mx-auto mt-7 max-w-2xl text-center text-sm leading-6 text-muted-foreground">
            Assim, mesmo quem está começando tem material para dar os primeiros passos.
          </p>
        </div>
      </section>

      {/* Cresça dentro da ARMY */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...sectionFade} className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Cresça dentro da AREUM ARMY.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              Sua participação não precisa parar na primeira venda. Quem cresce com a AREUM pode
              desbloquear novas oportunidades dentro da comunidade.
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
            {growth.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="flex gap-4 border border-primary/10 bg-background p-6 shadow-card-soft"
              >
                <item.icon className="h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground md:text-xl">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mx-auto mt-7 max-w-2xl text-center text-xs leading-5 text-muted-foreground">
            Quanto mais você participa, cria e vende, mais possibilidades podem surgir. Metas,
            benefícios e valores podem variar de acordo com cada campanha.
          </p>
        </div>
      </section>

      {/* Comunidade */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto grid max-w-5xl items-center gap-10 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-8">
          <motion.div {...sectionFade}>
            <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-primary/85 md:text-xs">
              Não é só sobre vender.
            </p>
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              É sobre fazer parte.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
              Queremos construir uma comunidade de mulheres que fazem a AREUM chegar a novos
              lugares. Por isso, além das vendas, valorizamos quem:
            </p>
            <ul className="mt-5 space-y-2.5">
              {community.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-foreground/80 md:text-base">
                  <Heart className="mt-0.5 h-4 w-4 shrink-0 fill-primary/20 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
              Os conteúdos que mais combinarem com a marca poderão aparecer nos nossos Stories,
              Destaques e perfil oficial.
            </p>
          </motion.div>

          <motion.div {...sectionFade} className="relative">
            <img
              src={posterAntesDepois}
              alt="Conteúdo de antes e depois criado pela comunidade AREUM"
              className="aspect-[4/5] w-full max-w-sm rotate-[2deg] rounded-2xl object-cover shadow-product justify-self-center"
              loading="lazy"
            />
          </motion.div>
        </div>

        {/* Bio */}
        <div className="container mx-auto mt-14 px-4 md:mt-16 md:px-8">
          <motion.div
            {...sectionFade}
            className="mx-auto max-w-3xl border border-primary/15 bg-gradient-to-br from-blush/30 to-champagne/30 p-6 text-center md:p-10"
          >
            <Instagram className="mx-auto mb-4 h-7 w-7 text-primary" />
            <h3 className="font-heading text-2xl font-semibold leading-tight text-foreground md:text-3xl">
              Sua bio também mostra que você faz parte.
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
              Enquanto estiver ativa na AREUM ARMY, pedimos que mantenha a identificação da marca
              no perfil. Por exemplo:
            </p>
            <p className="mx-auto mt-5 inline-block rounded-full border border-primary/20 bg-background px-6 py-3 text-sm font-medium text-foreground md:text-base">
              Embaixadora AREUM 💗 @areumco
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              É uma forma simples de mostrar que você faz parte oficialmente da nossa comunidade.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sem estoque */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...sectionFade} className="mx-auto max-w-3xl border-l-4 border-primary bg-background p-7 shadow-card-soft md:p-10">
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Você não precisa comprar estoque.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              A AREUM cuida da operação. Você não precisa:
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {noStock.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground/80">
                  <Send className="h-3.5 w-3.5 shrink-0 rotate-45 text-muted-foreground/50" aria-hidden />
                  <span className="line-through decoration-primary/50">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
              A compra é realizada diretamente com a AREUM. Você concentra sua energia em{" "}
              <strong className="font-semibold text-foreground">divulgar e indicar.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quanto posso ganhar */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...sectionFade} className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-primary/85 md:text-xs">
              E quanto eu posso ganhar?
            </p>
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Isso depende do seu desempenho.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
              A comissão inicial é de <strong className="font-semibold text-primary">R$10 por unidade
              elegível</strong> vendida através do seu cupom, e integrantes com maior desempenho
              poderão desbloquear novas condições dentro da ARMY.
            </p>
            <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
              Não existe renda fixa ou garantida. Mas existe algo simples: quanto mais vendas
              elegíveis você gera, maior pode ser a sua oportunidade dentro da AREUM ARMY.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 bg-secondary/40 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...sectionFade} className="mx-auto mb-9 max-w-3xl text-center md:mb-12">
            <h2 className="font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl">
              Perguntas rápidas
            </h2>
          </motion.div>

          <motion.div {...sectionFade} className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`item-${index}`}
                  className="border border-primary/10 bg-background px-5"
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

      {/* Encerramento + formulário */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-blush/25 to-champagne/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div {...sectionFade} className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
              Talvez a próxima história da AREUM seja a sua.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground md:text-base">
              Você não precisa ter milhares de seguidores. Não precisa comprar estoque. Não precisa
              começar sabendo tudo. Precisa apenas querer fazer parte.
            </p>
            <p className="mt-5 font-heading text-2xl font-semibold text-primary md:text-3xl">
              Entre para a AREUM ARMY.
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground md:text-sm">
              Represente. Crie. Compartilhe. Ganhe.
            </p>
          </motion.div>

          <ArmyFormEmbed />

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-muted-foreground">
            Sem taxa de adesão • Sem estoque • Sem investimento inicial
            <br />
            Inscrições sujeitas à aprovação. Comissões são pagas sobre vendas elegíveis conforme as
            regras do programa. Não existe garantia de renda.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Army;
