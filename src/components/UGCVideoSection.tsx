import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Play, Star } from "lucide-react";
import { Button } from "./ui/button";
import { goToCheckout, trackViewContent } from "@/lib/analytics";
import { goToCheckout } from "@/lib/analytics";

const checkoutUrl = "https://areum.pay.yampi.com.br/r/40KOQLA7XE";

type UGCVideo = {
  src: string;
  poster: string;
  name: string;
  caption: string;
  tag: string;
};

const videos: UGCVideo[] = [
  {
    src: "/videos/ugc-flavia.mp4",
    poster: "/videos/poster-flavia.jpg",
    name: "Flávia",
    caption: "O sérum que entrou pra ficar na minha rotina",
    tag: "Rotina real",
  },
  {
    src: "/videos/ugc-primeiro-uso.mp4",
    poster: "/videos/poster-primeiro-uso.jpg",
    name: "Primeiro uso",
    caption: "Amei a textura — leve e absorve rapidinho",
    tag: "Amei o 1º uso",
  },
  {
    src: "/videos/ugc-glow.mp4",
    poster: "/videos/poster-glow.jpg",
    name: "Teste do glow",
    caption: "O segredo da pele de protagonista de dorama?",
    tag: "Teste de textura",
  },
];

const UGCVideoCard = ({ video, index }: { video: UGCVideo; index: number }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.play().catch(() => {});
          } else {
            el.pause();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-xl border border-primary/15 bg-background shadow-card-soft"
    >
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-foreground/5">
        <video
          ref={videoRef}
          src={video.src}
          poster={video.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <span className="pointer-events-none absolute left-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[0.65rem] font-semibold text-primary shadow-card-soft backdrop-blur">
          <Play className="h-3 w-3 fill-primary" />
          {video.tag}
        </span>
      </div>
      <figcaption className="space-y-1.5 p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-gold text-gold" />
            ))}
          </div>
          <span className="inline-flex items-center gap-1 text-[0.65rem] text-muted-foreground">
            <BadgeCheck className="h-3.5 w-3.5 text-primary" />
            Uso real
          </span>
        </div>
        <p className="text-sm leading-6 text-foreground/90">“{video.caption}”</p>
        <p className="text-xs font-medium text-muted-foreground">{video.name} • Areum</p>
      </figcaption>
    </motion.figure>
  );
};

const UGCVideoSection = () => {
  useEffect(() => {
    trackViewContent();
  }, []);
  return (
    <section id="videos" className="relative overflow-hidden bg-card py-16 md:py-24">
      <div className="absolute left-[-8%] top-[10%] h-[280px] w-[280px] rounded-full bg-champagne/35 blur-3xl" />
      <div className="absolute bottom-[5%] right-[-6%] h-[320px] w-[320px] rounded-full bg-blush-deep/20 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
          <p className="mb-3 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary/85 md:mb-4 md:text-xs md:tracking-[0.28em]">
            Antes de comprar, olha isso 👇
          </p>
          <h2 className="font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
            Elas testaram o Sérum Areum ✨
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground md:mt-5 md:text-base md:leading-8">
            Rotina real, textura de verdade e o glow aparecendo. Os vídeos completos estão no nosso{" "}
            <a
              href="https://www.instagram.com/areumco"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
            >
              Instagram @areumco
            </a>{" "}
            💜
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
          {videos.map((video, index) => (
            <UGCVideoCard key={video.src} video={video} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-12"
        >
          <Button
            variant="hero"
            size="lg"
            className="w-full shimmer sm:w-auto md:size-xl"
            onClick={goToCheckout}
          >
            Quero o meu Sérum Areum
          </Button>
          <a
            href="https://www.instagram.com/areumco"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary/25 bg-background px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 sm:w-auto"
          >
            Ver vídeos completos no Instagram
          </a>
          <p className="text-xs text-muted-foreground">
            R$ 79,90 • 3x de R$ 26,63 sem juros • Frete promocional por tempo limitado
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default UGCVideoSection;
