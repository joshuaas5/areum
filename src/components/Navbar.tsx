import { useState } from "react";
import { Menu, X } from "lucide-react";
import areumLogo from "@/assets/areum-logo.png";
import { Button } from "./ui/button";

const checkoutUrl = "https://areum.pay.yampi.com.br/r/40KOQLA7XE";

type NavbarProps = {
  variant?: "transparent" | "solid";
};

const navLinks = [
  { label: "Benefícios", href: "/#beneficios" },
  { label: "Como usar", href: "/#modo-de-uso" },
  { label: "Conteúdos", href: "/blog" },
  { label: "Dúvidas", href: "/#faq" },
];

const Navbar = ({ variant = "solid" }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={
        variant === "transparent"
          ? "absolute inset-x-0 top-0 z-40"
          : "sticky top-0 z-40 border-b border-primary/10 bg-background/85 backdrop-blur"
      }
    >
      <nav className="container mx-auto flex items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <a href="/" className="flex items-center" aria-label="Areum — Página inicial">
          <img src={areumLogo} alt="Areum" className="h-9 md:h-12" />
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-foreground/65 transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
          <Button
            variant="outline-rose"
            size="sm"
            onClick={() => {
              window.location.href = checkoutUrl;
            }}
          >
            Comprar
          </Button>
        </div>

        <button
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-primary/10 bg-background md:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-5 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-sm text-foreground/80 transition-colors hover:bg-secondary/50"
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="hero"
              size="lg"
              className="mt-2"
              onClick={() => {
                window.location.href = checkoutUrl;
              }}
            >
              Comprar Sérum Areum
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
