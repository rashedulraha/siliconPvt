/**
 * Google Analytics 4 helper.
 * Works with or without gtag.js loaded — safe to call anytime.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const Analytics = {
  /**
   * Track a page view.
   */
  pageView(path: string, title?: string) {
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("config", getMeasurementId(), {
      page_path: path,
      page_title: title || document.title,
    });
  },

  /**
   * Track a custom event.
   */
  event(name: string, params: Record<string, any> = {}) {
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", name, params);
  },

  /**
   * Track property view.
   */
  propertyView(propertyId: string, propertyTitle: string, price: number) {
    this.event("view_item", {
      item_id: propertyId,
      item_name: propertyTitle,
      price,
      currency: "USD",
    });
  },

  /**
   * Track lead submission.
   */
  leadSubmit(source: string, propertyId?: string) {
    this.event("generate_lead", {
      source,
      property_id: propertyId,
    });
  },

  /**
   * Track favorite toggle.
   */
  favoriteToggle(propertyId: string, action: "add" | "remove") {
    this.event("favorite_property", {
      property_id: propertyId,
      action,
    });
  },

  /**
   * Track comparison add.
   */
  comparisonAdd(propertyId: string) {
    this.event("compare_property", { property_id: propertyId });
  },

  /**
   * Track EMI calculation.
   */
  emiCalculate(loanAmount: number, term: number) {
    this.event("calculate_emi", { loan_amount: loanAmount, term_years: term });
  },

  /**
   * Track WhatsApp click.
   */
  whatsappClick(source: string, propertyId?: string) {
    this.event("whatsapp_click", { source, property_id: propertyId });
  },
};

function getMeasurementId(): string {
  return (
    process.env.NEXT_PUBLIC_GA_ID ||
    (typeof window !== "undefined" && (window as any).__GA_ID__) ||
    ""
  );
}
