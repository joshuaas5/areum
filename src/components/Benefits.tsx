import { motion } from "framer-motion";
import { Droplets, Sparkles, Shield, Leaf } from "lucide-react";

const benefits = [
  {
    icon: Droplets,
    title: "Hidratação Instantânea",
    description:
      "Sinta sua pele 96% mais hidratada em 8 semanas. Adeus pele seca e opaca. Bem-vinda à luminosidade que você vê nas coreanas.",
  },
  {
    icon: Sparkles,
    title: "Pele de Protagonista",
    description:
      "Aquele efeito de 'pele de vidro' dos K-Dramas. Brilho saudável, transparência e zero oleosidade.",
  },
  {
    icon: Shield,
    title: "Aparência Revitalizada",
    description:
      "Ajuda a melhorar a firmeza e vitalidade da pele. Rosto com aspecto mais descansado, liso e radiante.",
  },
  {
    icon: Leaf,
    title: "Livre de Culpa",
    description:
      "100% vegano, cruelty-free e dermatologicamente testado. Beleza consciente que respeita sua pele e o meio ambiente.",
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
          <span className="inline-flex items-center gap-2 text-primary text-sm font-medium tracking-wider uppercase mb-4">
            <img src="https://flagcdn.com/w40/kr.png" alt="Korea" className="w-5 h-4 object-cover rounded-sm" />
            Tecnologia Coreana
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Por que Escolher o Sérum{" "}
            <span className="text-gradient-rose">Areum</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Resultados visíveis que vão fazer você se olhar no espelho e pensar:
            "Finalmente encontrei O produto."
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
