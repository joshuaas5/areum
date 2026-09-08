import { useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Heart } from "lucide-react";
import { ARMY_FORM_URL } from "@/lib/army-config";
import { trackArmyFormView } from "@/lib/analytics";

const ArmyFormEmbed = ({ id = "inscricao" }: { id?: string }) => {
  useEffect(() => {
    trackArmyFormView();
  }, []);

  if (!ARMY_FORM_URL) {
    return (
      <div id={id} className="mx-auto max-w-xl border border-dashed border-primary/30 bg-background/60 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          Formulário indisponível no momento. Fale com a gente no Instagram{" "}
          <a href="https://instagram.com/AreumCo" className="font-medium text-primary underline-offset-4 hover:underline">
            @areumco
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55 }}
      id={id}
      className="scroll-mt-24"
    >
      <div className="mx-auto mb-6 max-w-xl text-center">
        <p className="mb-2 flex items-center justify-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary/85 md:text-xs">
          <Heart className="h-3.5 w-3.5 fill-current" />
          Formulário de inscrição
        </p>
        <h3 className="font-heading text-2xl font-semibold leading-tight text-foreground md:text-3xl">
          Quero fazer parte da AREUM ARMY
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Leva menos de 2 minutos. Resposta em até alguns dias úteis.
        </p>
      </div>

      <div className="mx-auto max-w-2xl overflow-hidden border border-primary/15 bg-background shadow-card-soft">
        <iframe
          src={ARMY_FORM_URL}
          width="100%"
          height="1400"
          style={{ border: 0 }}
          title="Formulário de inscrição AREUM ARMY"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <p className="mx-auto mt-4 max-w-xl text-center text-xs leading-5 text-muted-foreground">
        O formulário não carregou?{" "}
        <a
          href={ARMY_FORM_URL.replace("embedded=true", "embedded=false")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium text-primary underline-offset-4 hover:underline"
        >
          Abrir em nova aba
          <ExternalLink className="h-3 w-3" />
        </a>
      </p>
    </motion.div>
  );
};

export default ArmyFormEmbed;
