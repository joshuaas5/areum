/**
 * Analytics central da Areum (Meta Pixel + GA4)
 * IDs configurados em /src/lib/analytics-config.ts
 */

import { PIXEL_ID, GA4_ID, CHECKOUT_URL } from "./analytics-config";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const track = (event: string, data?: Record<string, unknown>) => {
  try {
    if (PIXEL_ID) window.fbq?.("track", event, data ?? {});
  } catch {
    /* noop */
  }
  try {
    if (GA4_ID) window.gtag?.("event", event, data ?? {});
  } catch {
    /* noop */
  }
};

export const goToCheckout = () => {
  track("InitiateCheckout", { value: 79.9, currency: "BRL" });
  window.location.href = CHECKOUT_URL;
};

export const trackViewContent = () => {
  track("ViewContent", {
    content_name: "Sérum Areum 30ml",
    content_ids: ["serum-30ml"],
    content_type: "product",
    value: 79.9,
    currency: "BRL",
  });
};

export const trackWhatsApp = () => {
  track("Contact", { content_name: "Sérum Areum 30ml" });
};

/** Carrega os scripts do Meta Pixel e GA4 dinamicamente (só se os IDs existirem) */
export const initAnalytics = () => {
  if (PIXEL_ID && typeof window !== "undefined" && !window.fbq) {
    try {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(s);

      // Fila padrão do Meta: guarda os eventos até o script real carregar
      const fbq = ((...args: unknown[]) => {
        (fbq as unknown as { queue: unknown[][] }).queue.push(args);
      }) as unknown as ((...args: unknown[]) => void) & { queue: unknown[][] };
      fbq.queue = [];
      window.fbq = fbq;
      window.fbq("init", PIXEL_ID);
      window.fbq("track", "PageView");
    } catch {
      /* noop */
    }
  }

  if (GA4_ID && typeof window !== "undefined" && !window.gtag) {
    try {
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args);
      };
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA4_ID);
    } catch {
      /* noop */
    }
  }
};
