import { motion } from "framer-motion";
import { Check, Shield, Truck } from "lucide-react";
import areumSerumPng from "@/assets/areum-serum.png";
import areumSerumWebp from "@/assets/areum-serum.webp";
import { Button } from "./ui/button";

const checkoutUrl = "https://areum.pay.yampi.com.br/r/40KOQLA7XE";

const features = [
  { icon: Truck, text: "Envio para todo Brasil" },
  { icon: Shield, text: "Compra segura" },
  { icon: Check, text: "30ml" },
];

const CTA = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-blush/20 to-champagne/30 py-16 md:py-28">
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto grid max-w-6xl items-center gap-6 border border-primary/10 bg-background/80 p-5 shadow-product backdrop-blur md:grid-cols-[0.9fr_1.1fr] md:gap-10 md:p-12"
        >
          <div className="relative flex min-h-[240px] items-center justify-center md:min-h-[360px]">
            <div className="absolute h-[220px] w-[220px] rounded-full bg-blush/40 blur-2xl md:h-[320px] md:w-[320px]" />
            <picture>
              <source srcSet={areumSerumWebp} type="image/webp" />
              <img src={areumSerumPng} alt="Sérum Areum" width={1000} height={1500} loading="lazy" className="relative z-10 h-[260px] w-auto object-contain drop-shadow-2xl md:h-[390px]" />
            </picture>
          </div>

          <div className="text-center md:text-left">
            <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary/85 md:mb-4 md:text-xs md:tracking-[0.28em]">Promoção de lançamento</p>
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
              Sua pele com glow começa com um sérum simples de usar
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:mt-5 md:text-base md:leading-8">
              Areum combina hidratação, textura leve e acabamento luminoso para entrar na sua rotina sem complicar.
            </p>

            <div className="my-6 flex flex-col items-center gap-1.5 md:my-8 md:items-start md:gap-2">
              <div className="flex items-end gap-3 md:gap-4">
                <span className="pb-1 text-base text-muted-foreground line-through md:pb-2 md:text-lg">R$ 99,90</span>
                <span className="font-heading text-4xl font-bold text-primary md:text-5xl lg:text-6xl">R$ 84,90</span>
              </div>
              <p className="text-xs text-muted-foreground md:text-sm">
                ou 3x de R$ 28,30 sem juros • envio para todo Brasil
              </p>
            </div>

            <div className="mb-6 grid gap-2 sm:grid-cols-3 md:mb-8 md:gap-3">
              {features.map((feature) => (
                <div key={feature.text} className="flex items-center justify-center gap-2 border border-primary/10 bg-white/60 px-3 py-2.5 text-xs text-muted-foreground md:justify-start md:px-3 md:py-3 md:text-sm">
                  <feature.icon className="h-4 w-4 shrink-0 text-primary" />
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full shimmer md:size-xl md:w-auto"
              onClick={() => {
                window.location.href = checkoutUrl;
              }}
            >
              Garantir meu Sérum Areum
            </Button>
            <p className="mt-4 flex items-center justify-center gap-2 text-[0.7rem] text-muted-foreground md:mt-5 md:justify-start md:text-xs">
              <Shield className="h-3.5 w-3.5 shrink-0 text-primary md:h-4 md:w-4" />
              Compra protegida • Garantia 7 dias • Pagamento seguro Yampi
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
