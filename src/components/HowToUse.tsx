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
    <section id="modo-de-uso" className="relative overflow-hidden bg-gradient-to-b from-background to-card py-16 md:py-28">
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="grid items-center gap-8 md:gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="relative mx-auto flex min-h-[280px] w-full max-w-[320px] items-center justify-center md:min-h-[420px] md:max-w-[480px]"
          >
            <div className="absolute h-[240px] w-[240px] rounded-full bg-blush/35 blur-2xl md:h-[360px] md:w-[360px]" />
            <picture>
              <source srcSet={areumSerumWebp} type="image/webp" />
              <img
                src={areumSerumPng}
                alt="Sérum Areum 30ml"
                width={1000}
                height={1500}
                loading="lazy"
                className="relative z-10 h-[280px] w-auto object-contain drop-shadow-2xl md:h-[430px] lg:h-[520px]"
              />
            </picture>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary/85 md:mb-4 md:text-xs md:tracking-[0.28em]">Modo de uso</p>
            <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
              O detalhe que muda tudo: aplique na pele levemente úmida
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:mt-5 md:text-base md:leading-8">
              O Areum foi pensado para ser simples. Um único sérum, poucos passos e uma aplicação correta para aproveitar melhor a hidratação.
            </p>

            <div className="mt-8 space-y-5 md:mt-10 md:space-y-7">
              {steps.map((step) => (
                <div key={step.number} className="flex gap-4 border-t border-primary/15 pt-5 md:gap-5 md:pt-6">
                  <span className="font-heading text-2xl font-semibold text-primary/70 md:text-3xl">{step.number}</span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground md:text-2xl">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground md:mt-2 md:leading-7">{step.description}</p>
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
