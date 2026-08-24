import { Instagram, Mail, MessageCircle } from "lucide-react";
import areumLogo from "@/assets/areum-logo.png";
import { trackContact, trackOutboundClick } from "@/lib/analytics";

const WHATSAPP_NUMBER = "5547989258264";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Oi! Quero saber mais sobre o Sérum Areum ✨")}`;
const parceriasUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Oi! Quero falar sobre parceria com a Areum 💜")}`;

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
              onClick={() => trackOutboundClick("instagram", "footer")}
              className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <Instagram className="w-5 h-5 shrink-0" />
              <span>@AreumCo</span>
            </a>
            <a
              href="mailto:contato@areumco.com.br"
              onClick={() => trackContact("email", "footer")}
              className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors break-all"
            >
              <Mail className="w-5 h-5 shrink-0" />
              <span>contato@areumco.com.br</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("whatsapp", "footer_support")}
              className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span>WhatsApp: (47) 98925-8264</span>
            </a>
            <a
              href={parceriasUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContact("whatsapp", "footer_partnerships")}
              className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              <span>🤝</span>
              <span>Parcerias e influenciadores</span>
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
            <span className="px-3 py-1.5 bg-primary-foreground/10 rounded-full text-xs text-primary-foreground/70 inline-flex items-center gap-2 md:text-sm">
              <span>📋</span>
              <span>Produto com Registro ANVISA</span>
            </span>
          </div>

          {/* Copyright */}
          <div className="border-t border-primary-foreground/10 pt-6 w-full md:pt-8">
            <nav aria-label="Informações legais" className="mb-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs md:text-sm">
              <a
                href="/politica-de-privacidade"
                className="text-primary-foreground/60 transition-colors hover:text-primary-foreground"
              >
                Política de Privacidade
              </a>
              <a
                href="/termos-de-uso"
                className="text-primary-foreground/60 transition-colors hover:text-primary-foreground"
              >
                Termos de Uso e Compra
              </a>
            </nav>
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

