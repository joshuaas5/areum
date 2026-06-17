import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import InlineCTA from "./InlineCTA";

type ArticleLayoutProps = {
  title: string;
  description: string;
  readTime: string;
  date: string;
  category: string;
  children: ReactNode;
};

const ArticleLayout = ({
  title,
  description,
  readTime,
  date,
  category,
  children,
}: ArticleLayoutProps) => {
  return (
    <>
      <Navbar variant="solid" />

      <article className="bg-background">
        <div className="container mx-auto max-w-3xl px-4 pb-16 pt-8 md:px-8 md:pb-20 md:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary md:mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para conteúdos
            </a>

            <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary/85 md:mb-3 md:text-xs md:tracking-[0.28em]">
              {category}
            </p>

            <h1 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
              {title}
            </h1>

            <p className="mt-4 text-base leading-7 text-muted-foreground md:mt-5 md:text-lg md:leading-8">{description}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-y border-primary/10 py-3 text-xs text-muted-foreground md:mt-6 md:gap-4 md:py-4 md:text-sm">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readTime} de leitura
              </span>
              <span className="h-1 w-1 rounded-full bg-primary/40" />
              <time dateTime={date}>
                {new Date(date).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 space-y-5 text-sm leading-7 text-foreground/85 md:mt-10 md:space-y-6 md:text-base md:leading-8 [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground md:[&_h2]:mb-4 md:[&_h2]:mt-12 md:[&_h2]:text-3xl [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground md:[&_h3]:mb-3 md:[&_h3]:mt-8 md:[&_h3]:text-2xl [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 md:[&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 md:[&_ol]:pl-6"
          >
            {children}
          </motion.div>

          <InlineCTA />
        </div>
      </article>

      <Footer />
    </>
  );
};

export default ArticleLayout;
