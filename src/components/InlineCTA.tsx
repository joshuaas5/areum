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
      className="my-10 flex flex-col items-center gap-4 rounded-lg border border-primary/15 bg-gradient-to-br from-blush/40 via-background to-champagne/40 p-5 md:my-12 md:flex-row md:gap-6 md:p-8 lg:p-10"
    >
      <picture>
        <source srcSet={areumSerumWebp} type="image/webp" />
        <img
          src={areumSerumPng}
          alt="Sérum Facial Areum 30ml"
          width={1000}
          height={1500}
          className="h-28 w-auto object-contain drop-shadow-xl md:h-40"
          loading="lazy"
        />
      </picture>
      <div className="flex-1 text-center md:text-left">
        <p className="mb-1.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary/85 md:mb-2 md:text-xs md:tracking-[0.28em]">
          Comece sua rotina Areum
        </p>
        <h3 className="font-heading text-xl font-semibold text-foreground md:text-2xl lg:text-3xl">
          Sérum facial com hidratação leve e glow de K-beauty
        </h3>
        <div className="mt-3 flex flex-col items-center gap-1.5 md:mt-4 md:items-start md:gap-2">
          <div className="flex items-end gap-3">
            <span className="pb-0.5 text-xs text-muted-foreground line-through md:pb-1 md:text-sm">R$ 99,90</span>
            <span className="font-heading text-2xl font-bold text-primary md:text-3xl">R$ 84,90</span>
          </div>
          <p className="text-[0.7rem] text-muted-foreground md:text-xs">ou 3x de R$ 28,30 sem juros • envio para todo Brasil</p>
        </div>
        <Button
          variant="hero"
          size="lg"
          className="mt-4 w-full shimmer md:mt-5 md:w-auto"
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
