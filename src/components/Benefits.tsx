import { motion } from "framer-motion";
import { Droplets, Leaf, Shield, Sparkles } from "lucide-react";

const benefits = [
  {
    icon: Sparkles,
    title: "Viço de glass skin",
    description:
      "Ajuda a devolver luminosidade para a pele opaca, com acabamento leve e aparência descansada.",
  },
  {
    icon: Droplets,
    title: "Hidratação inteligente",
    description:
      "O ácido hialurônico atrai água para a superfície da pele, favorecendo toque macio e efeito plump visual.",
  },
  {
    icon: Shield,
    title: "Sensação de firmeza",
    description:
      "O colágeno vegano forma um filme delicado que melhora a sensação de elasticidade e conforto.",
  },
  {
    icon: Leaf,
    title: "Leve para o dia a dia",
    description:
      "Textura aquosa, rápida absorção e acabamento sem pegajosidade para encaixar na sua rotina real.",
  },
];

const Benefits = () => {
  return (
    <section id="beneficios" className="relative overflow-hidden bg-card py-16 md:py-28">
      <div className="absolute right-[-12%] top-[-20%] h-[360px] w-[360px] rounded-full bg-blush/35 blur-3xl md:h-[520px] md:w-[520px]" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
          <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary/85 md:mb-4 md:text-xs md:tracking-[0.28em]">
            O efeito Areum
          </p>
          <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
            Skincare coreano, simples de usar e pensado para pele com glow
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:mt-5 md:text-base md:leading-8">
            Um sérum único para hidratar, iluminar e deixar a pele com aparência mais lisa, sem prometer milagre e sem pesar.
          </p>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group border-t border-primary/15 bg-background/55 p-5 transition-colors hover:bg-background/85 md:p-6"
            >
              <benefit.icon className="mb-5 h-5 w-5 text-primary md:mb-8 md:h-6 md:w-6" />
              <h3 className="mb-2 font-heading text-xl font-semibold text-foreground md:mb-3 md:text-2xl">{benefit.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground md:leading-7">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
