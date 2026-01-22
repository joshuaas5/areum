import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carolina S.",
    location: "São Paulo, SP",
    rating: 5,
    text: "Minha pele nunca esteve tão hidratada! O efeito glass skin é real, uso há 3 semanas e já recebi muitos elogios.",
    avatar: "CS",
  },
  {
    name: "Fernanda M.",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    text: "Textura leve e absorção rápida. Perfeito para usar antes da maquiagem. Minha pele fica luminosa o dia todo!",
    avatar: "FM",
  },
  {
    name: "Juliana R.",
    location: "Curitiba, PR",
    rating: 5,
    text: "Finalmente um sérum vegano que realmente funciona! Senti diferença na firmeza da minha pele em poucas semanas.",
    avatar: "JR",
  },
];

const Testimonials = () => {
  return (
    <section id="depoimentos" className="py-24 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-blush/20 to-transparent blur-3xl opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary text-sm font-medium tracking-wider uppercase mb-4">
            Depoimentos Reais
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            O que nossas clientes{" "}
            <span className="text-gradient-rose">estão dizendo</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-card-soft border border-border/50 hover:border-primary/20 transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-blush-deep/30" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>

              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-rose-gold-light flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
