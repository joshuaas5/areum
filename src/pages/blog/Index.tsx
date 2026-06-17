import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InlineCTA from "@/components/InlineCTA";
import areumSerum from "@/assets/areum-serum.png";

const articles = [
  {
    slug: "serum-facial-para-que-serve",
    title: "Sérum facial: para que serve, benefícios e como escolher o seu",
    description:
      "Sérum facial é o passo da rotina de skincare que entrega ativos concentrados na pele. Entenda para que serve, quando usar e como escolher o sérum certo para o seu tipo de pele.",
    category: "Skincare",
    readTime: "6 min",
    date: "2026-06-10",
  },
  {
    slug: "skincare-coreano-passo-a-passo",
    title: "Skincare coreano: o passo a passo K-beauty adaptado para o Brasil",
    description:
      "O skincare coreano (K-beauty) ficou famoso pelo ritual em várias etapas. Veja como adaptar a rotina coreana ao clima brasileiro sem exageros e com poucos produtos.",
    category: "K-beauty",
    readTime: "7 min",
    date: "2026-06-12",
  },
  {
    slug: "acido-hialuronico-como-usar",
    title: "Ácido hialurônico no rosto: como usar e erros comuns",
    description:
      "O ácido hialurônico é um dos ativos mais populares da skincare. Aprenda como usar no rosto, em que ordem aplicar e os erros que anulam a hidratação.",
    category: "Ativos",
    readTime: "5 min",
    date: "2026-06-14",
  },
];

const Blog = () => {
  return (
    <>
      <Navbar variant="solid" />

      <section className="bg-gradient-to-b from-blush/30 to-background py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary/85 md:mb-4 md:text-xs md:tracking-[0.28em]">
              Guia Areum
            </p>
            <h1 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-6xl">
              Conteúdos sobre skincare, K-beauty e rotina real
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:mt-5 md:text-base md:leading-8">
              Textos curtos e diretos para você entender skincare, escolher melhor seus produtos e montar uma rotina que funciona no dia a dia.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-background py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {articles.map((article, index) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex flex-col overflow-hidden rounded-lg border border-primary/10 bg-card"
              >
                <a href={`/blog/${article.slug}`} className="block overflow-hidden bg-gradient-to-br from-blush/50 to-champagne/40">
                  <img
                    src={areumSerum}
                    alt={`Artigo: ${article.title}`}
                    className="mx-auto h-36 w-auto object-contain p-4 transition-transform duration-500 group-hover:scale-105 md:h-48 md:p-6"
                    loading="lazy"
                  />
                </a>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-[0.7rem] text-muted-foreground md:mb-3 md:gap-3 md:text-xs">
                    <span className="font-medium uppercase tracking-wider text-primary/85">
                      {article.category}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-primary/40" />
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTime}
                    </span>
                  </div>
                  <h2 className="mb-2 font-heading text-lg font-semibold leading-snug text-foreground md:mb-3 md:text-xl">
                    <a
                      href={`/blog/${article.slug}`}
                      className="transition-colors hover:text-primary"
                    >
                      {article.title}
                    </a>
                  </h2>
                  <p className="mb-4 flex-1 text-sm leading-6 text-muted-foreground md:mb-5 md:leading-7">
                    {article.description}
                  </p>
                  <a
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    Ler artigo
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <InlineCTA />
      <Footer />
    </>
  );
};

export default Blog;
