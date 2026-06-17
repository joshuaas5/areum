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
        <div className="container mx-auto max-w-3xl px-5 pb-20 pt-12 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para conteúdos
            </a>

            <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-primary/85">
              {category}
            </p>

            <h1 className="text-balance font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl">
              {title}
            </h1>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">{description}</p>

            <div className="mt-6 flex items-center gap-4 border-y border-primary/10 py-4 text-sm text-muted-foreground">
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
            className="mt-10 space-y-6 text-base leading-8 text-foreground/85 [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:font-heading [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:font-heading [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:text-foreground [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6"
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
