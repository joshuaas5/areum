import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";

const checkoutUrl = "https://areum.pay.yampi.com.br/r/40KOQLA7XE";

const MobileStickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Aparece depois de rolar 600px (saiu do hero)
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/15 bg-background/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="font-heading text-xl font-bold text-primary leading-none">R$ 84,90</span>
          <span className="text-[0.7rem] text-muted-foreground">3x de R$ 28,30 sem juros</span>
        </div>
        <Button
          variant="hero"
          size="lg"
          className="flex-1 max-w-[60%] shimmer"
          onClick={() => {
            window.location.href = checkoutUrl;
          }}
        >
          <ShoppingBag className="h-4 w-4" />
          Comprar agora
        </Button>
      </div>
    </div>
  );
};

export default MobileStickyCTA;
