import { beforeEach, describe, expect, it, vi } from "vitest";
import { trackCheckoutClick, trackContact, trackLead, trackViewContent } from "./analytics";

describe("analytics da jornada Areum", () => {
  beforeEach(() => {
    window.fbq = vi.fn();
    window.gtag = vi.fn();
  });

  it("envia uma visualização de produto com os nomes corretos em cada plataforma", () => {
    trackViewContent();

    expect(window.fbq).toHaveBeenCalledWith(
      "track",
      "ViewContent",
      expect.objectContaining({ content_ids: ["serum-30ml"], value: 79.9, currency: "BRL" }),
    );
    expect(window.gtag).toHaveBeenCalledWith(
      "event",
      "view_item",
      expect.objectContaining({ items: [expect.objectContaining({ item_id: "serum-30ml" })] }),
    );
  });

  it("mede o clique de checkout sem duplicar o InitiateCheckout que pertence à Yampi", () => {
    trackCheckoutClick("hero_primary");

    expect(window.fbq).toHaveBeenCalledWith(
      "trackCustom",
      "CheckoutClick",
      expect.objectContaining({ placement: "hero_primary" }),
    );
    expect(window.gtag).toHaveBeenCalledWith(
      "event",
      "checkout_click",
      expect.objectContaining({ placement: "hero_primary" }),
    );
    expect(window.fbq).not.toHaveBeenCalledWith("track", "InitiateCheckout", expect.anything());
    expect(window.gtag).not.toHaveBeenCalledWith("event", "begin_checkout", expect.anything());
  });

  it("mede contato e lead como eventos distintos", () => {
    trackContact("whatsapp", "footer_support");
    trackLead();

    expect(window.fbq).toHaveBeenCalledWith(
      "track",
      "Contact",
      expect.objectContaining({ contact_method: "whatsapp", placement: "footer_support" }),
    );
    expect(window.fbq).toHaveBeenCalledWith("track", "Lead", expect.objectContaining({ lead_source: "popup_ebook" }));
    expect(window.gtag).toHaveBeenCalledWith(
      "event",
      "generate_lead",
      expect.objectContaining({ lead_source: "popup_ebook" }),
    );
  });
});

