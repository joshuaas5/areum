import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Boxes,
  Camera,
  Check,
  Heart,
  Instagram,
  Megaphone,
  PackageCheck,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";
import areumLogo from "@/assets/areum-logo.png";
import serumImage from "@/assets/areum-serum.webp";
import ArmyFormEmbed from "@/components/ArmyFormEmbed";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackArmyCTA } from "@/lib/analytics";

const heroImage = "/army/army-ugc-real.webp";

const steps = [
  {
    number: "01",
    title: "Faça sua inscrição",
    text: "Conte um pouco sobre você e como pretende divulgar a AREUM.",
  },
  {
    number: "02",
    title: "Receba seu cupom",
    text: "Se for aprovada, você recebe um cupom exclusivo para compartilhar.",
  },
  {
    number: "03",
    title: "Indique e ganhe",
    text: "Cada unidade vendida em uma venda elegível pelo seu cupom gera comissão.",
  },
];

const growth = [
  {
    icon: TrendingUp,
    title: "Comissões progressivas",
    text: "Novas condições podem ser liberadas conforme seu desempenho.",
  },
  {
    icon: Sparkles,
    title: "Campanhas e benefícios",
    text: "Recompensas e oportunidades especiais nas ações da marca.",
  },
  {
    icon: Camera,
    title: "Visibilidade",
    text: "Seus conteúdos podem aparecer no perfil oficial da AREUM.",
  },
  {
    icon: Users,
    title: "Comunidade",
    text: "Faça parte oficialmente da AREUM ARMY e cresça com a marca.",
  },
];

const faqs = [
  {
    q: "Preciso pagar ou comprar estoque?",
    a: "Não. A inscrição é gratuita e você não precisa comprar estoque, cumprir pedido mínimo ou pagar taxa de adesão.",
  },
  {
    q: "Preciso ser influencer?",
    a: "Não. Você pode compartilhar a AREUM pelo Instagram, TikTok, WhatsApp e com sua rede de clientes ou amigos.",
  },
  {
    q: "Quanto recebo de comissão?",
    a: "A comissão inicial é de R$10 por unidade vendida em uma venda elegível realizada pelo seu cupom. As vendas precisam atender às regras do programa.",
  },
  {
    q: "Como funciona o desconto do meu cupom?",
    a: "Quem compra usando seu cupom recebe 5% de desconto. O mesmo cupom identifica as vendas elegíveis atribuídas a você.",
  },
  {
    q: "Quem recebe o pagamento e envia o produto?",
    a: "A própria AREUM. Você compartilha seu cupom e a marca cuida do pagamento, estoque, embalagem e envio.",
  },
  {
    q: "Minha inscrição é aprovada automaticamente?",
    a: "Não. As inscrições passam por análise e o cupom é disponibilizado após a aprovação.",
  },
  {
    q: "Quando recebo minha comissão?",
    a: "As regras e o calendário de pagamento são apresentados às integrantes aprovadas.",
  },
];

const CTA = ({ placement, compact = false }: { placement: string; compact?: boolean }) => (
  <a
    href="#inscricao"
    onClick={() => trackArmyCTA(placement)}
    className={compact ? "army-primary-cta army-primary-cta--compact" : "army-primary-cta"}
  >
    <span className="md:hidden">QUERO GANHAR RENDA EXTRA</span>
    <span className="hidden md:inline">QUERO COMEÇAR MINHA RENDA EXTRA</span>
    <ArrowRight className="h-5 w-5" />
  </a>
);

const StickyArmyCTA = () => {
  const [visible, setVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    const form = document.getElementById("inscricao");
    const observer = form
      ? new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting), { threshold: 0.08 })
      : null;
    if (form && observer) observer.observe(form);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!visible || formVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#8f453d]/15 bg-[#fffaf7]/95 p-3 shadow-[0_-8px_30px_rgba(62,28,25,.12)] backdrop-blur md:hidden">
      <a href="#inscricao" onClick={() => trackArmyCTA("sticky_mobile")} className="army-primary-cta army-primary-cta--compact w-full">
        QUERO MINHA RENDA EXTRA <ArrowRight className="h-5 w-5" />
      </a>
    </div>
  );
};

const Army = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "AREUM ARMY | Renda extra indicando skincare";
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content");
    meta?.setAttribute(
      "content",
      "Inscreva-se gratuitamente na AREUM ARMY. Ganhe comissão por vendas elegíveis com seu cupom, sem estoque e sem precisar ser influencer.",
    );
    window.scrollTo(0, 0);
    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== null) meta.setAttribute("content", previousDescription);
    };
  }, []);

  return (
    <main className="army-page overflow-hidden bg-[#fffaf7] text-[#302523]">
      <StickyArmyCTA />

      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-4 py-4 md:px-8 md:py-7">
          <a href="/" aria-label="AREUM - página inicial" className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f453d]">
            <img src={areumLogo} alt="AREUM" className="h-auto w-[150px] md:h-12 md:w-auto" />
          </a>
          <nav aria-label="Navegação da AREUM ARMY" className="flex items-center gap-6">
            <a href="#como-funciona" className="hidden text-sm font-medium text-[#5f4b46] hover:text-[#8f453d] md:inline">Como funciona</a>
            <a
              href="#inscricao"
              onClick={() => trackArmyCTA("header")}
              className="army-header-cta"
            >
              <span className="md:hidden">INSCREVA-SE</span>
              <span className="hidden md:inline">QUERO COMEÇAR MINHA RENDA EXTRA</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      </header>

      <section className="army-hero relative min-h-[760px] pt-24 md:min-h-[820px] md:pt-32">
        <div className="army-hero-orb army-hero-orb--one" aria-hidden="true" />
        <div className="army-hero-orb army-hero-orb--two" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-7 px-4 pb-12 md:grid-cols-[1.04fr_.96fr] md:gap-10 md:px-8 md:pb-20">
          <div className="relative z-10 pt-3 md:pt-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#b77468]/30 bg-white/70 px-3 py-2 text-[0.61rem] font-semibold uppercase tracking-[0.14em] text-[#8f453d] backdrop-blur md:px-4 md:text-[0.68rem] md:tracking-[0.2em]">
              <Heart className="h-3.5 w-3.5 fill-current" /> AREUM ARMY · Programa de embaixadoras
            </p>
            <h1 className="mt-5 font-heading text-[4.4rem] font-semibold uppercase leading-[0.77] tracking-[-0.055em] text-[#302523] sm:text-7xl md:mt-6 md:text-[5.75rem] md:leading-[0.87] lg:text-[7rem]">
              Renda<br />
              <span className="army-outline-word">extra</span>
            </h1>
            <p className="mt-5 max-w-xl font-heading text-[1.62rem] font-medium leading-[1.04] text-[#503a36] md:mt-6 md:text-[2.65rem] md:leading-[1.03]">
              com as suas indicações de skincare.
            </p>
            <p className="mt-6 hidden max-w-xl text-base leading-7 text-[#6b5752] md:block md:text-lg md:leading-8">
              Represente a AREUM e ganhe <strong className="font-semibold text-[#302523]">R$10 de comissão inicial por unidade vendida</strong> em vendas elegíveis pelo seu cupom.
            </p>
            <div className="mt-7 hidden flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-[#59423e] md:flex">
              {["Sem estoque", "Sem taxa", "Não precisa ser influencer"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#a75b50]" />{item}</span>
              ))}
            </div>
            <div className="mt-6 md:mt-8"><CTA placement="hero" /></div>
            <p className="mt-4 hidden max-w-lg text-xs leading-5 text-[#806c67] md:block">
              Inscrição gratuita e sujeita à aprovação. Ganhos dependem das vendas realizadas e não são garantidos.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] md:mt-8">
            <div className="army-hero-photo-frame">
              <img src={heroImage} alt="Criadora mostrando o sérum facial AREUM" className="h-full w-full object-cover object-[center_32%] md:object-center" fetchPriority="high" />
            </div>
            <div className="absolute -bottom-4 left-3 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-[0_16px_40px_rgba(67,32,28,.2)] backdrop-blur md:-left-10 md:bottom-9">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f2d9da] text-[#8f453d]"><WalletCards className="h-5 w-5" /></div>
              <div><strong className="block text-lg leading-none">R$10</strong><span className="text-xs text-[#6b5752]">por unidade elegível</span></div>
            </div>
            <img src={serumImage} alt="Sérum facial AREUM" className="absolute -right-12 bottom-0 hidden h-64 w-auto drop-shadow-[0_18px_22px_rgba(75,41,45,.25)] md:block" />
          </div>
          <div className="relative z-10 mt-1 rounded-2xl border border-[#b77468]/20 bg-white/70 px-4 py-4 backdrop-blur md:hidden">
            <p className="text-[0.93rem] leading-6 text-[#5f4b46]">
              Ganhe <strong className="font-semibold text-[#302523]">R$10 de comissão inicial por unidade vendida</strong> em vendas elegíveis pelo seu cupom.
            </p>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-[#59423e]">
              {["Sem estoque", "Sem taxa", "Não precisa ser influencer"].map((item) => (
                <span key={item} className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-[#a75b50]" />{item}</span>
              ))}
            </div>
            <p className="mt-3 text-[0.66rem] leading-4 text-[#806c67]">
              Inscrição gratuita e sujeita à aprovação. Ganhos dependem das vendas realizadas e não são garantidos.
            </p>
          </div>
        </div>
        <a href="#oferta" aria-label="Ver detalhes da oportunidade" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a5d57] md:flex">
          Entenda a oportunidade <ArrowDown className="h-4 w-4" />
        </a>
      </section>

      <section id="oferta" className="border-y border-[#d9bdb7] bg-[#8f453d] text-white">
        <div className="mx-auto grid max-w-[1240px] divide-y divide-white/20 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-8">
          {[
            ["R$10", "de comissão inicial por unidade elegível"],
            ["5% OFF", "para quem compra usando seu cupom"],
            ["R$0", "para entrar na AREUM ARMY"],
          ].map(([value, label]) => (
            <div key={value} className="flex items-center gap-4 py-6 sm:block sm:px-7 sm:text-center md:py-8">
              <strong className="min-w-24 font-heading text-4xl font-semibold sm:block sm:text-5xl">{value}</strong>
              <span className="mt-1 text-sm leading-5 text-white/78 sm:block">{label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="como-funciona" className="scroll-mt-24 bg-[#fffaf7] py-20 md:py-28">
        <div className="mx-auto max-w-[1160px] px-5 md:px-8">
          <div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:gap-16">
            <div>
              <p className="army-kicker">É simples</p>
              <h2 className="army-section-title">Você indica.<br /><em>A AREUM faz o resto.</em></h2>
              <p className="mt-5 max-w-md text-base leading-7 text-[#6b5752]">
                A compra acontece diretamente com a AREUM. Você compartilha; a gente cuida da operação.
              </p>
              <div className="relative mt-10 hidden h-72 overflow-hidden rounded-[2rem] bg-[#f3dedf] md:block">
                <img src={serumImage} alt="Sérum AREUM" className="absolute bottom-[-30px] left-1/2 h-[330px] -translate-x-1/2 drop-shadow-[0_24px_30px_rgba(67,32,28,.2)]" loading="lazy" />
                <span className="absolute left-5 top-5 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8f453d]">Skincare inspirado na beleza coreana</span>
              </div>
            </div>
            <div className="space-y-0 border-t border-[#decac4]">
              {steps.map((step) => (
                <div key={step.number} className="grid grid-cols-[64px_1fr] gap-4 border-b border-[#decac4] py-7 md:grid-cols-[86px_1fr] md:py-9">
                  <span className="font-heading text-3xl italic text-[#b87568] md:text-4xl">{step.number}</span>
                  <div><h3 className="font-heading text-2xl font-semibold text-[#302523] md:text-3xl">{step.title}</h3><p className="mt-2 text-sm leading-6 text-[#6b5752] md:text-base md:leading-7">{step.text}</p></div>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3 pt-7 sm:grid-cols-4">
                {[
                  [PackageCheck, "Pagamento"], [Boxes, "Estoque"], [BadgeCheck, "Embalagem"], [Send, "Envio"],
                ].map(([Icon, label]) => {
                  const ItemIcon = Icon as typeof PackageCheck;
                  return <div key={label as string} className="rounded-2xl bg-[#f7e9e8] p-4 text-center"><ItemIcon className="mx-auto h-5 w-5 text-[#8f453d]" /><span className="mt-2 block text-xs font-semibold text-[#5f4742]">{label as string}</span></div>;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f2dfdf] py-20 md:py-28">
        <div className="absolute right-[-8rem] top-[-8rem] h-80 w-80 rounded-full border border-[#b87568]/30" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1160px] gap-12 px-5 md:grid-cols-2 md:px-8">
          <div>
            <p className="army-kicker">Pode ser para você</p>
            <h2 className="army-section-title">Não precisa ter milhares de seguidores.</h2>
            <p className="mt-5 text-base leading-7 text-[#644d48] md:text-lg md:leading-8">
              Instagram, TikTok, WhatsApp, clientes ou amigos: existem diferentes formas de compartilhar a AREUM com a sua rede.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Instagram", "TikTok", "WhatsApp", "Clientes", "Amigos"].map((item) => <span key={item} className="rounded-full border border-[#b87568]/35 bg-white/55 px-4 py-2 text-sm font-medium text-[#60433d]">{item}</span>)}
            </div>
          </div>
          <div className="rounded-[2rem] bg-[#4b292d] p-7 text-white shadow-[0_24px_70px_rgba(75,41,45,.18)] md:p-10">
            <Megaphone className="h-8 w-8 text-[#efb4a7]" />
            <h3 className="mt-7 font-heading text-3xl font-semibold leading-tight md:text-4xl">Você não precisa começar sabendo tudo.</h3>
            <p className="mt-4 text-base leading-7 text-white/75">A AREUM oferece materiais para ajudar você a divulgar com mais confiança.</p>
            <ul className="mt-7 space-y-3 text-sm leading-6 text-white/90">
              {["Fotos e vídeos oficiais", "Ideias de conteúdo", "Informações dos produtos", "Campanhas e materiais de divulgação"].map((item) => <li key={item} className="flex items-center gap-3"><Check className="h-4 w-4 shrink-0 text-[#efb4a7]" />{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf7] py-20 md:py-28">
        <div className="mx-auto max-w-[1160px] px-5 md:px-8">
          <div className="max-w-3xl">
            <p className="army-kicker">Cresça com a AREUM</p>
            <h2 className="army-section-title">Suas vendas podem abrir novas oportunidades.</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-[#decac4] bg-[#decac4] sm:grid-cols-2">
            {growth.map((item) => (
              <article key={item.title} className="bg-[#fffaf7] p-7 md:p-9">
                <item.icon className="h-7 w-7 text-[#a75b50]" />
                <h3 className="mt-5 font-heading text-2xl font-semibold text-[#302523] md:text-3xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#6b5752] md:text-base md:leading-7">{item.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-5 text-xs leading-5 text-[#806c67]">Benefícios e comissões podem variar conforme campanhas e desempenho.</p>
          <div className="mt-9"><CTA placement="growth" /></div>
        </div>
      </section>

      <section className="border-y border-[#decac4] bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-[1050px] gap-10 px-5 md:grid-cols-[.65fr_1.35fr] md:px-8">
          <div><p className="army-kicker">Dúvidas rápidas</p><h2 className="army-section-title">Tudo o que você precisa saber.</h2></div>
          <Accordion type="single" collapsible className="border-t border-[#decac4]">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`faq-${index}`} className="border-[#decac4]">
                <AccordionTrigger className="py-5 text-left text-base font-semibold text-[#3c2d2a] hover:text-[#8f453d] hover:no-underline md:text-lg">{faq.q}</AccordionTrigger>
                <AccordionContent className="pb-5 pr-6 text-sm leading-7 text-[#6b5752] md:text-base">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#4b292d] py-20 md:py-28">
        <div className="absolute -left-24 bottom-[-8rem] h-80 w-80 rounded-full bg-[#8f453d]/45 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1160px] items-start gap-12 px-5 md:grid-cols-[.78fr_1.22fr] md:px-8">
          <div className="pt-3 text-white md:sticky md:top-28">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#efb4a7]">Sua próxima indicação pode valer comissão</p>
            <h2 className="mt-4 font-heading text-5xl font-semibold uppercase leading-[.92] tracking-[-0.03em] md:text-7xl">Comece sua<br /><em className="font-normal text-[#efb4a7]">renda extra.</em></h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/72 md:text-lg">Faça sua inscrição e dê o primeiro passo para ganhar comissão pelas suas indicações.</p>
            <p className="mt-8 font-heading text-2xl italic text-white">Represente. Compartilhe. Ganhe.</p>
          </div>
          <ArmyFormEmbed />
        </div>
      </section>

      <footer className="bg-[#302023] px-5 py-12 text-white md:px-8">
        <div className="mx-auto flex max-w-[1160px] flex-col items-center justify-between gap-7 text-center md:flex-row md:text-left">
          <div><img src={areumLogo} alt="AREUM" className="mx-auto h-12 brightness-0 invert opacity-90 md:mx-0" /><p className="mt-3 text-sm text-white/55">Beleza inspirada na K-beauty, feita para a rotina real.</p></div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-white/65">
            <a href="https://instagram.com/AreumCo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white"><Instagram className="h-4 w-4" />@areumco</a>
            <a href="mailto:contato@areumco.com.br" className="hover:text-white">contato@areumco.com.br</a>
            <a href="/politica-de-privacidade" className="hover:text-white">Privacidade</a>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-[1160px] border-t border-white/10 pt-6 text-center text-xs text-white/40 md:text-left">© 2026 Areum Cosmetics. CNPJ 50.548.562/0001-42.</p>
      </footer>
    </main>
  );
};

export default Army;
