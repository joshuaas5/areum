import { motion } from "framer-motion";
import areumSerumPng from "@/assets/areum-serum.png";
import areumSerumWebp from "@/assets/areum-serum.webp";
import { Button } from "./ui/button";

const checkoutUrl = "https://areum.pay.yampi.com.br/r/40KOQLA7XE";

const InlineCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="my-12 flex flex-col items-center gap-6 rounded-lg border border-primary/15 bg-gradient-to-br from-blush/40 via-background to-champagne/40 p-8 md:flex-row md:p-10"
    >
      <picture>
        <source srcSet={areumSerumWebp} type="image/webp" />
        <img
          src={areumSerumPng}
          alt="Sérum Facial Areum 30ml"
          width={1000}
          height={1500}
          className="h-40 w-auto object-contain drop-shadow-xl"
          loading="lazy"
        />
      </picture>
      <div className="flex-1 text-center md:text-left">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.28em] text-primary/85">
          Comece sua rotina Areum
        </p>
        <h3 className="font-heading text-2xl font-semibold text-foreground md:text-3xl">
          Sérum facial com hidratação leve e glow de K-beauty
        </h3>
        <div className="mt-4 flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-end gap-3">
            <span className="pb-1 text-sm text-muted-foreground line-through">R$ 99,90</span>
            <span className="font-heading text-3xl font-bold text-primary">R$ 84,90</span>
          </div>
          <p className="text-xs text-muted-foreground">ou 3x de R$ 28,30 sem juros • envio para todo Brasil</p>
        </div>
        <Button
          variant="hero"
          size="lg"
          className="mt-5 shimmer"
          onClick={() => {
            window.location.href = checkoutUrl;
          }}
        >
          Garantir meu Sérum Areum
        </Button>
      </div>
    </motion.div>
  );
};

export default InlineCTA;
