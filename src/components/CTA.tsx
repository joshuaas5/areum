import { motion } from "framer-motion";
import { Check, Shield, Truck } from "lucide-react";
import areumSerum from "@/assets/areum-serum.png";
import { Button } from "./ui/button";

const checkoutUrl = "https://areum.pay.yampi.com.br/r/40KOQLA7XE";

const features = [
  { icon: Truck, text: "Envio para todo Brasil" },
  { icon: Shield, text: "Compra segura" },
  { icon: Check, text: "30ml" },
];

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-blush/20 to-champagne/30 py-24 md:py-28">
      <div className="container relative z-10 mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto grid max-w-6xl items-center gap-10 border border-primary/10 bg-background/80 p-8 shadow-product backdrop-blur md:grid-cols-[0.9fr_1.1fr] md:p-12"
        >
          <div className="relative flex min-h-[360px] items-center justify-center">
            <div className="absolute h-[320px] w-[320px] rounded-full bg-blush/40 blur-2xl" />
            <img src={areumSerum} alt="Sérum Areum" className="relative z-10 h-[390px] w-auto object-contain drop-shadow-2xl" />
          </div>

          <div className="text-center md:text-left">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-primary/85">Promoção de lançamento</p>
            <h2 className="text-balance font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              Sua pele com glow começa com um sérum simples de usar
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
              Areum combina hidratação, textura leve e acabamento luminoso para entrar na sua rotina sem complicar.
            </p>

            <div className="my-8 flex flex-col items-center gap-2 md:items-start">
              <div className="flex items-end gap-4">
                <span className="pb-2 text-lg text-muted-foreground line-through">R$ 99,90</span>
                <span className="font-heading text-5xl font-bold text-primary md:text-6xl">R$ 84,90</span>
              </div>
              <p className="text-sm text-muted-foreground">Preço promocional por tempo limitado</p>
            </div>

            <div className="mb-8 grid gap-3 sm:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.text} className="flex items-center justify-center gap-2 border border-primary/10 bg-white/60 px-3 py-3 text-sm text-muted-foreground md:justify-start">
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <Button
              variant="hero"
              size="xl"
              className="w-full shimmer sm:w-auto"
              onClick={() => {
                window.location.href = checkoutUrl;
              }}
            >
              Garantir meu Sérum Areum
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
