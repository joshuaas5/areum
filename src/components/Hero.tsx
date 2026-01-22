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
              <img
                src="https://flagcdn.com/w40/kr.png"
                alt="Korea"
                className="w-5 h-4 object-cover rounded-sm"
              />
              <span className="text-sm font-medium text-secondary-foreground">
                Tecnologia coreana
              </span>
            </motion.div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-tight mb-6">
              A pele de{" "}
              <span className="text-gradient-rose italic">protagonista</span>
              <br />que você merece
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-4 max-w-xl mx-auto lg:mx-0">
              Resultados visíveis. Ácido Hialurônico e Colágeno Vegetal
              com tecnologia inteligente para máxima absorção.
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
                30ml
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

          {/* Right - Product image with hand-drawn style badges */}
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

            {/* Product image */}
            <motion.img
              src={areumSerum}
              alt="Areum Sérum Facial"
              className="relative z-10 w-64 md:w-80 lg:w-96 drop-shadow-2xl float-animation"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />

            {/* Hand-drawn style badges - Positioned OUTSIDE product area */}
            {/* Top Right - Above product */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -top-6 right-4 md:-top-10 md:right-8 lg:right-12 z-20"
            >
              <div className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-sm shadow-sketch border-2 border-primary/15 transition-transform duration-300">
                <span className="font-heading text-base md:text-lg font-medium text-foreground tracking-wide whitespace-nowrap">Sofisticação</span>
              </div>
            </motion.div>

            {/* Bottom Right - Below product */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="absolute -bottom-4 right-4 md:-bottom-8 md:right-8 lg:right-12 z-20"
            >
              <div className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-sm shadow-sketch border-2 border-primary/15 transition-transform duration-300">
                <span className="font-heading text-base md:text-lg font-medium text-foreground tracking-wide whitespace-nowrap">Glow imediato</span>
              </div>
            </motion.div>

            {/* Bottom Left - Below product */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="absolute -bottom-4 left-4 md:-bottom-8 md:left-8 lg:left-12 z-20"
            >
              <div className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-sm shadow-sketch border-2 border-primary/15 transition-transform duration-300">
                <span className="font-heading text-base md:text-lg font-medium text-foreground tracking-wide whitespace-nowrap">Nanotecnologia</span>
              </div>
            </motion.div>

            {/* Top Left - Above product */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="absolute -top-6 left-4 md:-top-10 md:left-8 lg:left-12 z-20"
            >
              <div className="bg-white/95 backdrop-blur-sm px-5 py-2.5 rounded-sm shadow-sketch border-2 border-primary/15 transition-transform duration-300">
                <span className="font-heading text-base md:text-lg font-medium text-foreground tracking-wide whitespace-nowrap">Pele de protagonista</span>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
