import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Check, Shield, Truck, Clock } from "lucide-react";
import areumSerum from "@/assets/areum-serum.png";

const features = [
  { icon: Truck, text: "Frete Grátis para todo Brasil" },
  { icon: Shield, text: "Garantia de 30 dias" },
  { icon: Clock, text: "Entrega em até 7 dias úteis" },
];

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-background via-blush/20 to-champagne/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blush-deep/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-background/90 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl border border-border/50"
          >
            <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left - Product */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative w-full flex justify-center items-center order-1 md:order-1"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-blush-deep/30 to-champagne/30 rounded-full blur-2xl" />
                </div>
                <img
                  src={areumSerum}
                  alt="Areum Sérum"
                  className="relative z-10 w-48 md:w-56 drop-shadow-2xl mx-auto"
                />
              </motion.div>

              {/* Right - CTA */}
              <div className="w-full flex flex-col items-center md:items-start text-center md:text-left order-2 md:order-2">
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                  🔥 Últimas unidades com desconto
                </span>

                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4 w-full">
                  Sua jornada para a{" "}
                  <span className="text-gradient-rose">Glass Skin</span>
                  <br />começa aqui
                </h2>

                <p className="text-muted-foreground mb-6 max-w-sm md:max-w-none mx-auto md:mx-0">
                  Junte-se às mulheres que já transformaram sua pele com o Sérum Areum.
                  Está na hora de você descobrir o segredo coreano.
                </p>

                {/* Pricing */}
                <div className="bg-secondary/50 rounded-xl p-6 mb-6 w-full max-w-sm md:max-w-none mx-auto">
                  <div className="flex items-baseline gap-3 mb-2 justify-center md:justify-start">
                    <span className="text-muted-foreground line-through text-lg">
                      R$ 79,90
                    </span>
                    <span className="font-heading text-4xl font-bold text-primary">
                      R$ 59,90
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ou 3x de R$ 19,97 sem juros
                  </p>
                </div>

                <div className="w-full max-w-sm md:max-w-none mx-auto">
                  <Button
                    variant="hero"
                    size="xl"
                    className="w-full shimmer"
                    onClick={() => window.location.href = "https://areum.pay.yampi.com.br/checkout?skipToCheckout=1&tokenReference=40KOQLA7X"}
                  >
                    Garantir Meu Sérum Agora
                  </Button>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-2 w-full">
                  <Check className="w-4 h-4 text-primary" />
                  Compra 100% segura • Entrega garantida
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
