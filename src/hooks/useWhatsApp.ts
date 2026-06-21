"use client";

import { useCallback } from "react";
import { Analytics } from "@/lib/analytics";
import type { Property } from "@/types";

const DEFAULT_NUMBER = "+15551234567";

export function useWhatsApp() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_NUMBER;

  /**
   * Format phone number for wa.me (remove non-digits).
   */
  const formatNumber = (num: string) =>
    num.replace(/[^\d+]/g, "").replace("+", "");

  /**
   * Open WhatsApp with a pre-filled message.
   */
  const openWhatsApp = useCallback(
    (message: string, source: string = "general", propertyId?: string) => {
      const url = `https://wa.me/${formatNumber(phoneNumber)}?text=${encodeURIComponent(message)}`;
      Analytics.whatsappClick(source, propertyId);
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [phoneNumber],
  );

  /**
   * Open WhatsApp with a property inquiry message.
   */
  const inquireAboutProperty = useCallback(
    (property: Property) => {
      const message = `Hi! I'm interested in the property "${property.title}" listed at ${property.location} for $${property.price.toLocaleString()}. Could you share more details?`;
      openWhatsApp(message, "property_inquiry", property.id);
    },
    [openWhatsApp],
  );

  /**
   * Open WhatsApp with a general inquiry.
   */
  const generalInquiry = useCallback(
    (name?: string) => {
      const message = name
        ? `Hi! My name is ${name}. I'd like to inquire about your real estate services.`
        : `Hi! I'd like to inquire about your real estate services.`;
      openWhatsApp(message, "general_inquiry");
    },
    [openWhatsApp],
  );

  return {
    phoneNumber,
    openWhatsApp,
    inquireAboutProperty,
    generalInquiry,
  };
}
