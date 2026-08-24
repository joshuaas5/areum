/**
 * Analytics central da Areum (Meta Pixel + GA4)
 * IDs configurados em /src/lib/analytics-config.ts
 */

import { PIXEL_ID, GA4_ID, CHECKOUT_URL } from "./analytics-config";

declare global {
  interface Window {
    fbq?: MetaPixelFunction;
    _fbq?: MetaPixelFunction;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type MetaPixelFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  loaded?: boolean;
  push?: MetaPixelFunction;
  queue?: unknown[][];
  version?: string;
};

const product = {
  item_id: "serum-30ml",
  item_name: "Sérum Areum 30ml",
  item_brand: "Areum",
  item_category: "Skincare",
  price: 79.9,
  quantity: 1,
};

const metaProduct = {
  content_name: product.item_name,
  content_ids: [product.item_id],
  content_type: "product",
  value: product.price,
  currency: "BRL",
};

const trackMeta = (event: string, data?: Record<string, unknown>, custom = false) => {
  try {
    if (PIXEL_ID) window.fbq?.(custom ? "trackCustom" : "track", event, data ?? {});
  } catch {
    /* noop */
  }
};

const trackGA4 = (event: string, data?: Record<string, unknown>) => {
  try {
    if (GA4_ID) window.gtag?.("event", event, data ?? {});
  } catch {
    /* noop */
  }
};

export const trackCheckoutClick = (placement = "unknown") => {
  // A Yampi dispara InitiateCheckout/begin_checkout ao abrir o checkout.
  // Aqui medimos apenas o clique para não duplicar o início do checkout.
  trackMeta("CheckoutClick", { ...metaProduct, placement }, true);
  trackGA4("checkout_click", {
    currency: "BRL",
    value: product.price,
    placement,
    items: [product],
  });
};

export const goToCheckout = (placement = "checkout_cta") => {
  trackCheckoutClick(placement);
  window.location.href = CHECKOUT_URL;
};

export const trackViewContent = () => {
  trackMeta("ViewContent", metaProduct);
  trackGA4("view_item", {
    currency: "BRL",
    value: product.price,
    items: [product],
  });
};

export const trackContact = (method: "email" | "whatsapp", placement: string) => {
  const data = { content_name: product.item_name, contact_method: method, placement };
  trackMeta("Contact", data);
  trackGA4("contact", data);
};

export const trackOutboundClick = (destination: string, placement: string) => {
  const data = { destination, placement };
  trackMeta("OutboundClick", data, true);
  trackGA4("outbound_click", data);
};

export const trackLeadFormView = () => {
  const data = { content_name: "Guia Glass Skin", lead_source: "popup_ebook" };
  trackMeta("LeadFormView", data, true);
  trackGA4("view_promotion", {
    promotion_id: "ebook-glass-skin",
    promotion_name: "Guia Glass Skin",
  });
};

export const trackLead = () => {
  const data = { content_name: "Guia Glass Skin", lead_source: "popup_ebook" };
  trackMeta("Lead", data);
  trackGA4("generate_lead", data);
};

/** Carrega os scripts do Meta Pixel e GA4 dinamicamente (só se os IDs existirem) */
export const initAnalytics = () => {
  if (PIXEL_ID && typeof window !== "undefined" && !window.fbq) {
    try {
      const fbq = ((...args: unknown[]) => {
        if (fbq.callMethod) fbq.callMethod(...args);
        else fbq.queue?.push(args);
      }) as MetaPixelFunction;
      fbq.push = fbq;
      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
      window.fbq = fbq;
      window._fbq = fbq;

      const s = document.createElement("script");
      s.async = true;
      s.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(s);

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

