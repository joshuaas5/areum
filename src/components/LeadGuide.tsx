import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Loader2, Mail, Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

const LeadGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    if (localStorage.getItem("areum_guide_closed")) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 9000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("areum_guide_closed", new Date().toDateString());
  };

  const handleDownloadEbook = () => {
    const link = document.createElement("a");
    link.href = "/AREUM - EBOOK.pdf";
    link.download = "AREUM - EBOOK.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download iniciado",
      description: "Seu guia Glass Skin está sendo baixado.",
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (supabase) {
        await supabase.from("leads").insert([
          {
            name: formData.name,
            email: formData.email,
            whatsapp: formData.whatsapp,
            source: "guia_glass_skin",
          },
        ]);
      }
    } catch (error) {
      console.error("Lead capture error:", error);
    }

    setLoading(false);
    localStorage.setItem("areum_guide_closed", new Date().toDateString());
    handleDownloadEbook();
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-foreground/45 backdrop-blur-sm"
          onClick={handleClose}
        />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          className="relative z-50 max-h-[90vh] w-full max-w-[460px] overflow-y-auto border border-primary/15 bg-background shadow-2xl"
        >
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/75 p-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>

          <div className="bg-gradient-to-br from-blush/55 via-background to-champagne/45 px-5 pb-6 pt-8 text-center md:px-7 md:pb-7 md:pt-10">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-card-soft md:mb-5 md:h-14 md:w-14">
              <Sparkles className="h-5 w-5 md:h-6 md:w-6" />
            </div>
            <h3 className="font-heading text-2xl font-semibold leading-tight text-foreground md:text-3xl">
              Guia Glass Skin gratuito
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground md:mt-3 md:leading-7">
              Baixe o manual da Areum com modo de uso, aplicação correta e cuidados para uma pele mais luminosa.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-3 p-5 md:space-y-4 md:p-7">
            <Input
              placeholder="Seu nome"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Seu melhor e-mail"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <Input
              type="tel"
              placeholder="WhatsApp"
              required
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            />

            <Button type="submit" variant="hero" size="lg" className="w-full md:size-xl" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              Baixar guia agora
            </Button>
            <p className="flex items-center justify-center gap-2 text-center text-[0.7rem] text-muted-foreground md:text-xs">
              <Mail className="h-3.5 w-3.5" />
              Conteúdo gratuito para cuidar melhor da sua pele.
            </p>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LeadGuide;
