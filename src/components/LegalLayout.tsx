import { ReactNode, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type LegalLayoutProps = {
  title: string;
  description: string;
  updatedAt: string;
  children: ReactNode;
};

const LegalLayout = ({ title, description, updatedAt, children }: LegalLayoutProps) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | Areum`;
    window.scrollTo(0, 0);

    return () => {
      document.title = previousTitle;
    };
  }, [title]);

  return (
    <>
      <Navbar variant="solid" />
      <main className="bg-background">
        <div className="container mx-auto max-w-3xl px-4 pb-16 pt-8 md:px-8 md:pb-20 md:pt-12">
          <a
            href="/"
            className="mb-7 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para a Areum
          </a>

          <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-primary/85">
            Informações legais
          </p>
          <h1 className="font-heading text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">{description}</p>
          <p className="mt-4 border-y border-primary/10 py-3 text-xs text-muted-foreground md:text-sm">
            Última atualização: {updatedAt}
          </p>

          <div className="mt-8 space-y-5 text-sm leading-7 text-foreground/85 md:mt-10 md:text-base md:leading-8 [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:mb-3 [&_h2]:mt-9 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-foreground md:[&_h2]:mt-11 md:[&_h2]:text-3xl [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LegalLayout;
