import { motion } from "framer-motion";
import areumSerumPng from "@/assets/areum-serum.png";
import areumSerumWebp from "@/assets/areum-serum.webp";

const steps = [
  {
    number: "01",
    title: "Use com a pele limpa",
    description: "Lave o rosto e deixe a pele levemente úmida antes da aplicação.",
  },
  {
    number: "02",
    title: "Aplique 3 a 4 gotas",
    description: "Espalhe no rosto e pescoço com movimentos suaves, sem esfregar.",
  },
  {
    number: "03",
    title: "Finalize do seu jeito",
    description: "De dia, use protetor solar. Se sua pele for seca, finalize com seu hidratante habitual.",
  },
];

const HowToUse = () => {
  return (
    <section id="modo-de-uso" className="relative overflow-hidden bg-gradient-to-b from-background to-card py-24 md:py-28">
      <div className="container relative z-10 mx-auto px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative mx-auto flex min-h-[420px] w-full max-w-[480px] items-center justify-center"
          >
            <div className="absolute h-[360px] w-[360px] rounded-full bg-blush/35 blur-2xl" />
            <picture>
              <source srcSet={areumSerumWebp} type="image/webp" />
              <img
                src={areumSerumPng}
                alt="Sérum Areum 30ml"
                width={1000}
                height={1500}
                loading="lazy"
                className="relative z-10 h-[430px] w-auto object-contain drop-shadow-2xl md:h-[520px]"
              />
            </picture>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-primary/85">Modo de uso</p>
            <h2 className="text-balance font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              O detalhe que muda tudo: aplique na pele levemente úmida
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
              O Areum foi pensado para ser simples. Um único sérum, poucos passos e uma aplicação correta para aproveitar melhor a hidratação.
            </p>

            <div className="mt-10 space-y-7">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-5 border-t border-primary/15 pt-6">
                  <span className="font-heading text-3xl font-semibold text-primary/70">{step.number}</span>
                  <div>
                    <h3 className="font-heading text-2xl font-semibold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
