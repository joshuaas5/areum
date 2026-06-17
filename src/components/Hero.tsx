import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, ShieldCheck, Sparkles, Star, Truck, X } from "lucide-react";
import areumLogo from "@/assets/areum-logo.png";
import areumSerumPng from "@/assets/areum-serum.png";
import areumSerumWebp from "@/assets/areum-serum.webp";
import { Button } from "./ui/button";

const checkoutUrl = "https://areum.pay.yampi.com.br/r/40KOQLA7XE";

const Hero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-12%] h-[300px] w-[300px] rounded-full bg-blush-deep/25 blur-3xl md:h-[420px] md:w-[420px]" />
        <div className="absolute bottom-[-15%] right-[-8%] h-[360px] w-[360px] rounded-full bg-champagne/45 blur-3xl md:h-[520px] md:w-[520px]" />
        <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35 blur-3xl md:h-[680px] md:w-[680px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-12 pt-4 md:px-8 md:pb-20 md:pt-6">
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex items-center justify-between"
        >
          <img src={areumLogo} alt="Areum" className="h-10 md:h-16" />
          <div className="flex items-center gap-4 md:gap-6">
            <a href="#beneficios" className="hidden text-sm text-foreground/65 transition-colors hover:text-primary md:block">
              Benefícios
            </a>
            <a href="#modo-de-uso" className="hidden text-sm text-foreground/65 transition-colors hover:text-primary md:block">
              Como usar
            </a>
            <a href="#faq" className="hidden text-sm text-foreground/65 transition-colors hover:text-primary md:block">
              Dúvidas
            </a>
            <Button
              variant="outline-rose"
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => {
                window.location.href = checkoutUrl;
              }}
            >
              Comprar
            </Button>
            <button
              className="rounded-md p-2 text-foreground sm:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </motion.nav>

        {menuOpen && (
          <div className="mt-2 rounded-lg border border-primary/10 bg-background/95 p-3 backdrop-blur sm:hidden">
            <a
              href="#beneficios"
              onClick={() => setMenuOpen(false)}
              className="block rounded-md px-3 py-3 text-sm text-foreground/80"
            >
              Benefícios
            </a>
            <a
              href="#modo-de-uso"
              onClick={() => setMenuOpen(false)}
              className="block rounded-md px-3 py-3 text-sm text-foreground/80"
            >
              Como usar
            </a>
            <a
              href="#depoimentos"
              onClick={() => setMenuOpen(false)}
              className="block rounded-md px-3 py-3 text-sm text-foreground/80"
            >
              Depoimentos
            </a>
            <a
              href="#faq"
              onClick={() => setMenuOpen(false)}
              className="block rounded-md px-3 py-3 text-sm text-foreground/80"
            >
              Dúvidas frequentes
            </a>
            <Button
              variant="hero"
              size="lg"
              className="mt-2 w-full"
              onClick={() => {
                window.location.href = checkoutUrl;
              }}
            >
              Comprar Sérum Areum
            </Button>
          </div>
        )}

        <div className="grid items-center gap-6 py-6 md:min-h-[calc(100vh-96px)] md:gap-10 md:py-10 lg:grid-cols-[0.96fr_1.04fr] lg:py-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-2 mx-auto max-w-2xl text-center md:order-1 lg:mx-0 lg:text-left"
          >
            <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary/85 md:mb-5 md:text-xs md:tracking-[0.28em]">
              K-beauty para o clima brasileiro
            </p>

            <h1 className="text-balance font-heading text-4xl font-semibold leading-[1] text-foreground md:text-5xl lg:text-7xl xl:text-[5.4rem] lg:leading-[0.94]">
              A pele de{" "}
              <span className="text-gradient-rose italic">protagonista</span>
              <br />
              que você merece
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:mt-7 md:text-base md:leading-8 lg:mx-0">
              Sérum facial com Hyalocollagreen 5%, ácido hialurônico e colágeno vegano para hidratação leve,
              viço imediato e sensação de pele mais firme.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground md:mt-6 md:gap-3 md:text-sm lg:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-gold text-gold md:h-4 md:w-4" />
                Dermatologicamente testado
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-primary/40 sm:block" />
              <span>30ml</span>
              <span className="hidden h-1 w-1 rounded-full bg-primary/40 sm:block" />
              <span>Cruelty-free</span>
            </div>

            <div className="mt-5 flex flex-col items-center gap-1 md:mt-8 md:gap-2 lg:items-start">
              <div className="flex items-end gap-3 md:gap-4">
                <span className="pb-1 text-sm text-muted-foreground line-through md:pb-2 md:text-lg">R$ 99,90</span>
                <span className="font-heading text-4xl font-bold text-primary md:text-5xl lg:text-6xl">R$ 84,90</span>
              </div>
              <p className="text-xs text-muted-foreground md:text-sm">
                ou 3x de R$ 28,30 sem juros • envio para todo Brasil
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center md:mt-8 md:gap-3 lg:justify-start">
              <Button
                variant="hero"
                size="lg"
                className="shimmer md:size-xl w-full sm:w-auto"
                onClick={() => {
                  window.location.href = checkoutUrl;
                }}
              >
                Garantir meu Sérum Areum
              </Button>
              <Button
                variant="glass"
                size="lg"
                className="w-full sm:w-auto md:size-xl"
                onClick={() => document.getElementById("beneficios")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver benefícios
              </Button>
            </div>

            <p className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[0.7rem] text-muted-foreground md:mt-6 md:gap-x-5 md:gap-y-2 md:text-xs lg:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary md:h-4 md:w-4" />
                Compra protegida Yampi
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-primary md:h-4 md:w-4" />
                Garantia de 7 dias
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 relative mx-auto flex min-h-[300px] w-full max-w-[340px] items-center justify-center md:order-2 md:min-h-[460px] md:max-w-[620px] lg:min-h-[680px]"
          >
            <div className="absolute inset-x-4 bottom-8 top-8 rounded-[999px] bg-gradient-to-b from-white/70 via-blush/45 to-champagne/45 blur-2xl md:inset-x-8 md:bottom-14 md:top-16" />
            <div className="absolute h-[240px] w-[240px] rounded-full border border-primary/10 bg-white/30 shadow-product md:h-[360px] md:w-[360px] md:shadow-none lg:h-[500px] lg:w-[500px] lg:shadow-product" />

            <picture>
              <source srcSet={areumSerumWebp} type="image/webp" />
              <motion.img
                src={areumSerumPng}
                alt="Sérum facial Areum 30ml"
                width={1000}
                height={1500}
                className="relative z-10 h-[280px] w-auto object-contain drop-shadow-2xl md:h-[430px] lg:h-[650px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                fetchPriority="high"
              />
            </picture>

            <div className="absolute left-0 top-8 z-20 hidden max-w-[190px] rounded-sm border border-primary/10 bg-white/90 px-5 py-4 text-left shadow-card-soft backdrop-blur md:block">
              <Sparkles className="mb-3 h-5 w-5 text-primary" />
              <p className="font-heading text-xl leading-tight text-foreground">Glow sem sensação pesada</p>
            </div>
            <div className="absolute bottom-12 right-0 z-20 hidden max-w-[205px] rounded-sm border border-primary/10 bg-white/90 px-5 py-4 text-left shadow-card-soft backdrop-blur md:block">
              <ShieldCheck className="mb-3 h-5 w-5 text-primary" />
              <p className="font-heading text-xl leading-tight text-foreground">Hidratação para uso diário</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
