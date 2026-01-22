import { motion } from "framer-motion";
import { Droplets, Sparkles, Shield, Leaf } from "lucide-react";

const benefits = [
  {
    icon: Droplets,
    title: "Hidratação Estrutural",
    description:
      "Ácido Hialurônico de baixo peso molecular que penetra profundamente nas camadas da pele, proporcionando hidratação de dentro para fora.",
  },
  {
    icon: Sparkles,
    title: "Efeito Glass Skin",
    description:
      "Tecnologia que promove luminosidade natural e aspecto translúcido, revelando uma pele radiante e saudável.",
  },
  {
    icon: Shield,
    title: "Firmeza & Elasticidade",
    description:
      "Colágeno Vegano de alta absorção que estimula a produção natural de colágeno, combatendo sinais de envelhecimento.",
  },
  {
    icon: Leaf,
    title: "100% Vegano",
    description:
      "Fórmula clean beauty, livre de ingredientes de origem animal, cruelty-free e sustentável.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const Benefits = () => {
  return (
    <section id="beneficios" className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blush/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-champagne/40 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
            Tecnologia Avançada
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Por que escolher o{" "}
            <span className="text-gradient-rose">Hyalocolagreen</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Desenvolvido com nanotecnologia de ponta para resultados visíveis 
            desde a primeira aplicação.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-card-soft border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blush/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors duration-300">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>

                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
