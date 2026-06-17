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
    <section id="beneficios" className="relative overflow-hidden bg-card py-24 md:py-28">
      <div className="absolute right-[-12%] top-[-20%] h-[520px] w-[520px] rounded-full bg-blush/35 blur-3xl" />

      <div className="container relative z-10 mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-primary/85">
            O efeito Areum
          </p>
          <h2 className="text-balance font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            Skincare coreano, simples de usar e pensado para pele com glow
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
            Um sérum único para hidratar, iluminar e deixar a pele com aparência mais lisa, sem prometer milagre e sem pesar.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group border-t border-primary/15 bg-background/55 p-6 transition-colors hover:bg-background/85"
            >
              <benefit.icon className="mb-8 h-6 w-6 text-primary" />
              <h3 className="mb-3 font-heading text-2xl font-semibold text-foreground">{benefit.title}</h3>
              <p className="text-sm leading-7 text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
