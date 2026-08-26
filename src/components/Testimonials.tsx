import { motion } from "framer-motion";
import { BadgeCheck, Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "M*****a",
    date: "Ago 2026",
    rating: 5,
    text: "Amei o produto! Chegou super bem embalado e dentro do prazo. O sérum tem uma textura ótima, é fácil de aplicar e deixa a pele bem macia e hidratada, sem ficar com aquela sensação pesada ou pegajosa, além de ter um cheiro maravilhoso. Já estou usando e gostei bastante do resultado. Produto de ótima qualidade e com um preço que vale a pena. Com certeza compraria novamente.",
  },
  {
    name: "P*****o",
    date: "Ago 2026",
    rating: 5,
    text: "Produto muito bom, já dá pra sentir o resultado em pouco tempo de uso. Me surpreendeu positivamente após alguns dias de uso. Embalagem bem protegida e chegou rápido. Recomendo a compra.",
  },
];

const Testimonials = () => {
  return (
    <section id="depoimentos" className="relative overflow-hidden bg-card py-16 md:py-28">
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
          <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary/85 md:mb-4 md:text-xs md:tracking-[0.28em]">Experiências reais</p>
          <h2 className="font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
            O que já falaram sobre o Sérum Areum
          </h2>
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-primary/15 bg-background/70 px-4 py-2 text-xs text-muted-foreground md:mt-5 md:text-sm">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold md:h-4 md:w-4" />
              ))}
            </div>
            <span className="font-medium text-foreground">5,0</span>
            <span className="hidden sm:inline">• avaliações reais de clientes</span>
            <span className="sm:hidden">• clientes</span>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="relative border border-primary/10 bg-background/70 p-5 shadow-card-soft md:p-7"
            >
              <Quote className="absolute right-5 top-5 h-7 w-7 text-primary/20 md:right-6 md:top-6 md:h-8 md:w-8" />
              <div className="mb-4 flex gap-1 md:mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold md:h-4 md:w-4" />
                ))}
              </div>
              <p className="mb-5 text-sm leading-6 text-foreground md:mb-7 md:leading-7">"{testimonial.text}"</p>
              <div className="flex items-center justify-between gap-2 border-t border-primary/10 pt-3 md:gap-3 md:pt-4">
                <div>
                  <p className="font-heading text-base font-semibold text-foreground md:text-lg">{testimonial.name}</p>
                  <p className="text-[0.7rem] text-muted-foreground md:text-xs">{testimonial.date}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-[0.7rem] font-medium text-primary md:text-xs">
                  <BadgeCheck className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Compra verificada</span>
                  <span className="sm:hidden">Verificada</span>
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
