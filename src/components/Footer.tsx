import { Instagram, Mail } from "lucide-react";
import areumLogo from "@/assets/areum-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <img 
            src={areumLogo} 
            alt="Areum" 
            className="h-16 mb-6 brightness-0 invert opacity-90" 
          />

          <p className="text-primary-foreground/70 max-w-md mb-8">
            Descubra a beleza natural da sua pele com a ciência 
            coreana mais avançada.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6 mb-8">
            <a
              href="https://instagram.com/AreumCo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>@AreumCo</span>
            </a>
            <a
              href="mailto:areumcosm@gmail.com"
              className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>areumcosm@gmail.com</span>
            </a>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm text-primary-foreground/70">
              🧪 Dermatologicamente Testado
            </span>
            <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm text-primary-foreground/70">
              🌱 100% Vegano
            </span>
            <span className="px-4 py-2 bg-primary-foreground/10 rounded-full text-sm text-primary-foreground/70">
              🐰 Cruelty-Free
            </span>
          </div>

          {/* Copyright */}
          <div className="border-t border-primary-foreground/10 pt-8 w-full">
            <p className="text-sm text-primary-foreground/50">
              © 2026 Areum Cosmetics. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
