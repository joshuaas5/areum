import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import areumLogo from "@/assets/areum-logo.png";
import areumSerumPng from "@/assets/areum-serum.png";
import areumSerumWebp from "@/assets/areum-serum.webp";
import { Button } from "./ui/button";

const checkoutUrl = "https://areum.pay.yampi.com.br/r/40KOQLA7XE";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-12%] h-[420px] w-[420px] rounded-full bg-blush-deep/25 blur-3xl" />
        <div className="absolute bottom-[-15%] right-[-8%] h-[520px] w-[520px] rounded-full bg-champagne/45 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-5 pb-16 pt-6 md:px-8 md:pb-20">
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="flex items-center justify-between"
        >
          <img src={areumLogo} alt="Areum" className="h-12 md:h-16" />
          <div className="flex items-center gap-6">
            <a href="#beneficios" className="hidden text-sm text-foreground/65 transition-colors hover:text-primary md:block">
              Benefícios
            </a>
            <a href="#modo-de-uso" className="hidden text-sm text-foreground/65 transition-colors hover:text-primary md:block">
              Como usar
            </a>
            <Button
              variant="outline-rose"
              size="sm"
              onClick={() => {
                window.location.href = checkoutUrl;
              }}
            >
              Comprar
            </Button>
          </div>
        </motion.nav>

        <div className="grid min-h-[calc(100vh-96px)] items-center gap-10 py-10 lg:grid-cols-[0.96fr_1.04fr] lg:py-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 mx-auto max-w-2xl text-center lg:mx-0 lg:text-left"
          >
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-primary/85">
              K-beauty para o clima brasileiro
            </p>

            <h1 className="text-balance font-heading text-5xl font-semibold leading-[0.94] text-foreground md:text-6xl lg:text-7xl xl:text-[5.4rem]">
              A pele de{" "}
              <span className="text-gradient-rose italic">protagonista</span>
              <br />
              que você merece
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-muted-foreground md:text-lg lg:mx-0">
              Sérum facial com Hyalocollagreen 5%, ácido hialurônico e colágeno vegano para hidratação leve,
              viço imediato e sensação de pele mais firme.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-muted-foreground lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <Star className="h-4 w-4 fill-gold text-gold" />
                Dermatologicamente testado
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-primary/40 sm:block" />
              <span>30ml</span>
              <span className="hidden h-1 w-1 rounded-full bg-primary/40 sm:block" />
              <span>Cruelty-free</span>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2 lg:items-start">
              <div className="flex items-end gap-4">
                <span className="pb-2 text-lg text-muted-foreground line-through">R$ 99,90</span>
                <span className="font-heading text-5xl font-bold text-primary md:text-6xl">R$ 84,90</span>
              </div>
              <p className="text-sm text-muted-foreground">
                ou 3x de R$ 28,30 sem juros • envio para todo Brasil
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button
                variant="hero"
                size="xl"
                className="shimmer"
                onClick={() => {
                  window.location.href = checkoutUrl;
                }}
              >
                Garantir meu Sérum Areum
              </Button>
              <Button
                variant="glass"
                size="xl"
                onClick={() => document.getElementById("beneficios")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver benefícios
              </Button>
            </div>

            <p className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground lg:justify-start">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Compra protegida pela Yampi
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-primary" />
                Garantia de 7 dias após receber
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 relative mx-auto flex min-h-[460px] w-full max-w-[620px] items-center justify-center lg:min-h-[680px]"
          >
            <div className="absolute inset-x-8 bottom-14 top-16 rounded-[999px] bg-gradient-to-b from-white/70 via-blush/45 to-champagne/45 blur-2xl" />
            <div className="absolute h-[360px] w-[360px] rounded-full border border-primary/10 bg-white/30 shadow-product md:h-[500px] md:w-[500px]" />

            <picture>
              <source srcSet={areumSerumWebp} type="image/webp" />
              <motion.img
                src={areumSerumPng}
                alt="Sérum facial Areum 30ml"
                width={1000}
                height={1500}
                className="relative z-10 h-[430px] w-auto object-contain drop-shadow-2xl md:h-[560px] lg:h-[650px]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                fetchPriority="high"
              />
            </picture>

            <div className="absolute left-0 top-12 z-20 hidden max-w-[190px] rounded-sm border border-primary/10 bg-white/90 px-5 py-4 text-left shadow-card-soft backdrop-blur md:block">
              <Sparkles className="mb-3 h-5 w-5 text-primary" />
              <p className="font-heading text-xl leading-tight text-foreground">Glow sem sensação pesada</p>
            </div>
            <div className="absolute bottom-16 right-0 z-20 hidden max-w-[205px] rounded-sm border border-primary/10 bg-white/90 px-5 py-4 text-left shadow-card-soft backdrop-blur md:block">
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
