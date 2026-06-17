import { Instagram, Mail } from "lucide-react";
import areumLogo from "@/assets/areum-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground pb-24 pt-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <img
            src={areumLogo}
            alt="Areum"
            className="h-12 mb-5 brightness-0 invert opacity-90 md:h-16 md:mb-6"
          />

          <p className="text-primary-foreground/70 max-w-md mb-7 text-sm leading-6 md:mb-8 md:text-base">
            Beleza inspirada no skincare coreano, feita para a sua rotina real.
          </p>

          {/* Social Links */}
          <div className="flex flex-col items-center gap-3 mb-7 sm:flex-row sm:gap-6 md:mb-8">
            <a
              href="https://instagram.com/AreumCo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <Instagram className="w-5 h-5 shrink-0" />
              <span>@AreumCo</span>
            </a>
            <a
              href="mailto:areumcosm@gmail.com"
              className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors break-all"
            >
              <Mail className="w-5 h-5 shrink-0" />
              <span>areumcosm@gmail.com</span>
            </a>
          </div>

          {/* Badges */}
          <div className="flex flex-col items-center gap-3 mb-8 sm:flex-row sm:gap-4 md:mb-10">
            <span className="px-3 py-1.5 bg-primary-foreground/10 rounded-full text-xs text-primary-foreground/70 inline-flex items-center gap-2 md:text-sm">
              <img src="https://flagcdn.com/w40/kr.png" alt="Korea" className="w-4 h-3 object-cover rounded-sm" />
              Inspirado no skincare coreano
            </span>
            <span className="px-3 py-1.5 bg-primary-foreground/10 rounded-full text-xs text-primary-foreground/70 inline-flex items-center gap-2 md:text-sm">
              <span>🧪</span>
              <span>Dermatologicamente Testado</span>
            </span>
          </div>

          {/* Copyright */}
          <div className="border-t border-primary-foreground/10 pt-6 w-full md:pt-8">
            <p className="text-xs text-primary-foreground/50 md:text-sm">
              © 2026 Areum Cosmetics. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
