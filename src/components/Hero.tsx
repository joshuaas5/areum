import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import areumLogo from "@/assets/areum-logo.png";
import areumSerum from "@/assets/areum-serum.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blush-deep/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-champagne/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-gold-light/10 rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/30 rounded-full"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="container relative z-10 mx-auto px-4 pt-8 pb-20">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center py-4"
        >
          <img src={areumLogo} alt="Areum" className="h-12 md:h-16" />
          <div className="flex items-center gap-4">
            <a href="#beneficios" className="text-foreground/70 hover:text-primary transition-colors hidden md:block">
              Benefícios
            </a>
            <a href="#depoimentos" className="text-foreground/70 hover:text-primary transition-colors hidden md:block">
              Depoimentos
            </a>
            <Button
              variant="outline-rose"
              size="sm"
              onClick={() => window.location.href = "https://areum.pay.yampi.com.br/checkout?skipToCheckout=1&tokenReference=40KOQLA7X"}
            >
              Comprar
            </Button>
          </div>
        </motion.nav>

        {/* Hero content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] py-12">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6"
            >
              {/* Korean Flag - using image URL */}
              <img
                src="https://flagcdn.com/w40/kr.png"
                alt="Korea"
                className="w-5 h-4 object-cover rounded-sm"
              />
              <span className="text-sm font-medium text-secondary-foreground">
                Tecnologia Coreana
              </span>
            </motion.div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-tight mb-6">
              A pele de{" "}
              <span className="text-gradient-rose italic">protagonista</span>
              <br />que você merece
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-xl mx-auto lg:mx-0">
              Resultados visíveis em 7 dias. Ácido Hialurônico e Colágeno Vegetal
              com nanotecnologia para penetração 10x mais profunda.
            </p>

            <p className="text-sm text-muted-foreground mb-8 flex items-center justify-center lg:justify-start gap-2">
              <Star className="w-4 h-4 text-gold fill-gold" />
              Dermatologicamente Testado • Vegano • Cruelty-Free
            </p>

            {/* Pricing */}
            <div className="mb-8">
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <span className="text-muted-foreground line-through text-lg">
                  R$ 79,90
                </span>
                <span className="font-heading text-4xl md:text-5xl font-bold text-primary">
                  R$ 59,90
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                30ml • Rende até 60 aplicações
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="hero"
                size="xl"
                className="shimmer"
                onClick={() => window.location.href = "https://areum.pay.yampi.com.br/checkout?skipToCheckout=1&tokenReference=40KOQLA7X"}
              >
                Quero minha Glass Skin
              </Button>
              <Button
                variant="glass"
                size="xl"
                onClick={() => document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Ver benefícios
              </Button>
            </div>
          </motion.div>

          {/* Right - Product image with callouts */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative flex justify-center order-1 lg:order-2"
          >
            {/* Glow effect behind product */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 md:w-96 md:h-96 bg-gradient-to-br from-blush-deep/40 to-champagne/40 rounded-full blur-3xl pulse-glow" />
            </div>

            {/* Product container with callouts - Desktop only */}
            <div className="relative hidden md:block">
              {/* Product image */}
              <motion.img
                src={areumSerum}
                alt="Areum Sérum Facial"
                className="relative z-10 w-72 lg:w-96 drop-shadow-2xl float-animation"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />

              {/* Callout 1 - Top Right - Hydration */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute top-8 -right-2 lg:-right-16"
              >
                <div className="flex items-start gap-1">
                  <svg width="40" height="30" viewBox="0 0 40 30" fill="none" className="text-primary mt-3 -mr-2">
                    <path d="M38 15 C30 15, 20 15, 5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 10 L5 15 L12 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-primary/20 max-w-[160px]">
                    <p className="text-sm font-bold text-foreground">+96% Hidratação</p>
                    <p className="text-[11px] text-muted-foreground">Comprovado clinicamente</p>
                  </div>
                </div>
              </motion.div>

              {/* Callout 2 - Middle Right - Nano */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="absolute top-1/2 -translate-y-1/2 -right-2 lg:-right-20"
              >
                <div className="flex items-center gap-1">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-primary -mr-2">
                    <path d="M38 10 C30 10, 20 10, 5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 5 L5 10 L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-primary/20 max-w-[160px]">
                    <p className="text-sm font-bold text-foreground">Nanotecnologia</p>
                    <p className="text-[11px] text-muted-foreground">Absorção potencializada</p>
                  </div>
                </div>
              </motion.div>

              {/* Callout 3 - Bottom Left - Collagen */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="absolute bottom-32 lg:bottom-40 -left-2 lg:-left-20"
              >
                <div className="flex items-center gap-1 flex-row-reverse">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="text-primary -ml-2 rotate-180">
                    <path d="M38 10 C30 10, 20 10, 5 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 5 L5 10 L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-primary/20 max-w-[160px]">
                    <p className="text-sm font-bold text-foreground">-35% Linhas Finas</p>
                    <p className="text-[11px] text-muted-foreground">Resultados em 28 dias</p>
                  </div>
                </div>
              </motion.div>

              {/* Callout 4 - Bottom Left Lower - Vegan */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="absolute bottom-12 lg:bottom-16 -left-2 lg:-left-16"
              >
                <div className="flex items-end gap-1 flex-row-reverse">
                  <svg width="40" height="30" viewBox="0 0 40 30" fill="none" className="text-primary -ml-2">
                    <path d="M38 15 C30 15, 20 20, 5 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M10 18 L5 25 L14 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-primary/20 max-w-[160px]">
                    <p className="text-sm font-bold text-foreground">100% Vegano</p>
                    <p className="text-[11px] text-muted-foreground">Cruelty-Free certificado</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Mobile - Product only, no callouts */}
            <motion.img
              src={areumSerum}
              alt="Areum Sérum Facial"
              className="relative z-10 w-64 drop-shadow-2xl float-animation md:hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />

            {/* Mobile - Simple badges below product */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
              <span className="bg-white/90 px-3 py-1.5 rounded-full text-xs font-medium shadow-md">+96% Hidratação</span>
              <span className="bg-white/90 px-3 py-1.5 rounded-full text-xs font-medium shadow-md">Vegano</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
