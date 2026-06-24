"use client";

import { useState, useEffect } from "react";
import { Cookie, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { storage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/utils/constants";

type ConsentChoice = "accept" | "reject" | null;

export function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = storage.get<ConsentChoice>(
      STORAGE_KEYS.ANALYTICS_CONSENT,
      null,
    );
    if (consent === null) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (choice: "accept" | "reject") => {
    storage.set(STORAGE_KEYS.ANALYTICS_CONSENT, choice);
    setShow(false);
    // Reload to apply analytics choice
    if (choice === "accept" && typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 rounded-xl border bg-card shadow-2xl p-5"
          role="dialog"
          aria-label="Cookie consent">
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Cookie className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold mb-1">We use cookies</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We use cookies to enhance your browsing experience and analyze
                site traffic.
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleChoice("accept")}>
                  <Check className="h-3.5 w-3.5 mr-1" /> Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleChoice("reject")}>
                  Reject
                </Button>
              </div>
            </div>
            <button
              onClick={() => setShow(false)}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
