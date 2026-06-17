import { motion } from "framer-motion";
import { BadgeCheck, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Cristiane",
    date: "Nov 2025",
    rating: 5,
    text: "Sinceramente, me surpreendeu. Minha pele estava bem apagada e agora sinto ela com um viço bonito, aquele brilho saudável que a gente vê nos doramas.",
  },
  {
    name: "Ema Ramos",
    date: "Nov 2025",
    rating: 5,
    text: "Gostei bastante da textura. Absorbe rápido e não fica pegajoso. Tenho sentido meu rosto mais firme e hidratado desde que comecei a usar.",
  },
  {
    name: "Maria Gabriela",
    date: "Dez 2025",
    rating: 5,
    text: "Valeu o investimento. Sinto um efeito lifting leve e muita gente tem comentado que minha pele está bonita. Recomendo.",
  },
];

const Testimonials = () => {
  return (
    <section id="depoimentos" className="relative overflow-hidden bg-card py-24 md:py-28">
      <div className="container relative z-10 mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-primary/85">Experiências reais</p>
          <h2 className="font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
            O que já falaram sobre o Sérum Areum
          </h2>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-background/70 px-4 py-2 text-sm text-muted-foreground">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="font-medium text-foreground">5,0</span>
            <span>• baseado em avaliações de compradoras</span>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative border border-primary/10 bg-background/70 p-7 shadow-card-soft"
            >
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/20" />
              <div className="mb-5 flex gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="mb-7 text-sm leading-7 text-foreground">"{testimonial.text}"</p>
              <div className="flex items-center justify-between gap-3 border-t border-primary/10 pt-4">
                <div>
                  <p className="font-heading text-lg font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.date}</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                  <BadgeCheck className="h-4 w-4" />
                  Compra verificada
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
