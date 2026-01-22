import { motion } from "framer-motion";
import areumSerum from "@/assets/areum-serum.png";

const steps = [
  {
    number: "01",
    title: "Limpe a pele",
    description: "Lave o rosto com seu sabonete facial favorito e seque suavemente.",
  },
  {
    number: "02",
    title: "Aplique o sérum",
    description: "Com a pele ainda úmida, aplique 3-4 gotas do sérum no rosto e pescoço.",
  },
  {
    number: "03",
    title: "Massageie gentilmente",
    description: "Faça movimentos circulares e ascendentes até completa absorção.",
  },
  {
    number: "04",
    title: "Finalize",
    description: "Complete sua rotina com hidratante e protetor solar durante o dia.",
  },
];

const HowToUse = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-card relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blush/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Product */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 bg-gradient-to-br from-primary/10 to-champagne/30 rounded-full blur-2xl" />
            </div>
            <img
              src={areumSerum}
              alt="Areum Sérum"
              className="relative z-10 w-64 md:w-72 drop-shadow-2xl"
            />
          </motion.div>

          {/* Right - Steps */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
              Modo de Uso
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-12">
              Como usar para{" "}
              <span className="text-gradient-rose">resultados incríveis</span>
            </h2>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-6 group"
                >
                  <div className="flex-shrink-0">
                    <span className="font-heading text-4xl font-bold text-gradient-rose opacity-60 group-hover:opacity-100 transition-opacity">
                      {step.number}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HowToUse;
