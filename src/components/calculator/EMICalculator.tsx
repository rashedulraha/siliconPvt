"use client";

import { useState, useMemo, useEffect } from "react";
import { Calculator, Percent, Calendar, ShieldCheck, ArrowRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateEMI } from "@/lib/emi";
import { formatCurrency } from "@/lib/utils";

const PRICE_PRESETS = [
  { label: "Premium Plot (3 Katha)", value: 3600000 },
  { label: "Executive Plot (5 Katha)", value: 6000000 },
  { label: "VIP Waterfront (10 Katha)", value: 12000000 },
];

const TERM_PRESETS = [12, 24, 36, 48];

export function EMICalculator({ initialPrice }: { initialPrice?: number }) {
  const [price, setPrice] = useState(initialPrice || 6000000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [interestRate, setInterestRate] = useState(0); // Standard in land is often interest-free for shorter terms
  const [months, setMonths] = useState(36);

  useEffect(() => {
    if (initialPrice) setPrice(initialPrice);
  }, [initialPrice]);

  // Convert months to years for the underlying calculation helper
  const termYears = useMemo(() => months / 12, [months]);

  const result = useMemo(() => {
    return calculateEMI({
      propertyPrice: price,
      downPaymentPercent: downPaymentPercent,
      interestRate: interestRate,
      loanTermYears: termYears,
    });
  }, [price, downPaymentPercent, interestRate, termYears]);

  const interestPercent = useMemo(() => {
    if (result.totalPayment <= 0) return 0;
    return (result.totalInterest / result.totalPayment) * 100;
  }, [result]);

  const principalPercent = useMemo(() => 100 - interestPercent, [interestPercent]);

  return (
    <Card className="border-neutral-200/60 dark:border-neutral-800/60 shadow-xl rounded-2xl bg-card overflow-hidden">
      <CardHeader className="pb-5 border-b border-neutral-100 dark:border-neutral-900/60">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">
              Installment Planner
            </CardTitle>
            <CardDescription className="text-xs text-neutral-400 dark:text-neutral-500 font-light mt-0.5">
              Customize purchase plans for premium residential plots.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* Preset Selectors */}
        <div className="space-y-2">
          <Label className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            Property Preset Valuation
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PRICE_PRESETS.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setPrice(preset.value)}
                className={`py-2 px-3 text-left rounded-xl border text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                  price === preset.value
                    ? "border-accent bg-accent/5 text-accent dark:border-accent"
                    : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                <span className="block text-[9px] opacity-60 mb-0.5">{preset.label}</span>
                <span className="font-mono text-xs font-semibold">৳{preset.value.toLocaleString()}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Price Slider */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs">
            <Label className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
              Land Valuation (Custom)
            </Label>
            <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100 text-sm">
              ৳{price.toLocaleString()}
            </span>
          </div>
          <Slider
            value={[price]}
            onValueChange={([v]) => setPrice(v)}
            min={1000000}
            max={30000000}
            step={200000}
            className="py-2"
          />
          <div className="flex justify-between text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
            <span>৳10 Lakh</span>
            <span>৳3 Crore</span>
          </div>
        </div>

        {/* Down Payment Selection */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs">
            <Label className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
              Booking Money / Down Payment
            </Label>
            <span className="font-mono text-neutral-600 dark:text-neutral-300">
              {downPaymentPercent}% (৳{result.downPayment.toLocaleString()})
            </span>
          </div>
          <div className="flex gap-2 mb-2">
            {[10, 20, 30, 40, 50].map((pct) => (
              <button
                key={pct}
                onClick={() => setDownPaymentPercent(pct)}
                className={`flex-1 py-1 rounded-lg border text-[11px] font-mono transition-all cursor-pointer ${
                  downPaymentPercent === pct
                    ? "border-accent bg-accent/5 text-accent font-semibold"
                    : "border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-neutral-300"
                }`}
              >
                {pct}%
              </button>
            ))}
          </div>
          <Slider
            value={[downPaymentPercent]}
            onValueChange={([v]) => setDownPaymentPercent(v)}
            min={10}
            max={80}
            step={5}
            className="py-1"
          />
        </div>

        {/* Term Slider & Presets */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs">
            <Label className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
              Installment Term (Months)
            </Label>
            <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">
              {months} Months
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {TERM_PRESETS.map((m) => (
              <button
                key={m}
                onClick={() => setMonths(m)}
                className={`py-2 rounded-xl border text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                  months === m
                    ? "border-accent bg-accent/5 text-accent dark:border-accent"
                    : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-700"
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs">
            <Label className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
              Annual Interest Rate
            </Label>
            <span className="font-mono font-semibold text-neutral-900 dark:text-neutral-100">
              {interestRate}% {interestRate === 0 && <span className="text-emerald-500 text-[9px] font-semibold tracking-wider ml-1 uppercase">(Interest Free Plan)</span>}
            </span>
          </div>
          <div className="flex gap-2">
            {[0, 5, 7.5, 9.5].map((rate) => (
              <button
                key={rate}
                onClick={() => setInterestRate(rate)}
                className={`flex-1 py-1 rounded-lg border text-[11px] font-mono transition-all cursor-pointer ${
                  interestRate === rate
                    ? "border-accent bg-accent/5 text-accent font-semibold"
                    : "border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 hover:border-neutral-300"
                }`}
              >
                {rate}%
              </button>
            ))}
          </div>
        </div>

        {/* Calculations / Output Panel (Stripe-like dark panel with VIP gold metrics) */}
        <div className="relative overflow-hidden rounded-2xl bg-neutral-900 dark:bg-[#070D1E] text-white p-5 border border-neutral-800 dark:border-neutral-800/40 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/5 via-transparent to-neutral-950/20 pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="text-center py-2 border-b border-neutral-800 dark:border-neutral-800/60">
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-0.5">Estimated Installment</p>
              <AnimatePresence mode="wait">
                <motion.p 
                  key={result.emi}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="text-3xl font-light font-mono text-amber-400"
                >
                  ৳{Math.round(result.emi).toLocaleString()}
                  <span className="text-[11px] text-neutral-400 font-sans tracking-normal font-light ml-1">/ month</span>
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-[11px] font-light">
              <div className="flex justify-between border-b border-neutral-800/40 pb-1.5">
                <span className="text-neutral-400">Total Purchase:</span>
                <span className="font-mono font-medium text-neutral-200">৳{price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800/40 pb-1.5">
                <span className="text-neutral-400">Installment Debt:</span>
                <span className="font-mono font-medium text-neutral-200">৳{result.loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800/40 pb-1.5">
                <span className="text-neutral-400">Booking / DP Paid:</span>
                <span className="font-mono font-medium text-neutral-200">৳{result.downPayment.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-800/40 pb-1.5">
                <span className="text-neutral-400">Total Interest Cost:</span>
                <span className={`font-mono font-medium ${result.totalInterest > 0 ? "text-amber-400" : "text-emerald-500 font-semibold"}`}>
                  {result.totalInterest > 0 ? `৳${Math.round(result.totalInterest).toLocaleString()}` : "৳0 (Free)"}
                </span>
              </div>
              <div className="flex justify-between col-span-2 pt-1">
                <span className="text-neutral-400">Total Outflow Value:</span>
                <span className="font-mono font-semibold text-white text-xs">৳{Math.round(result.totalPayment + result.downPayment).toLocaleString()}</span>
              </div>
            </div>

            {/* Visual Breakdown Bar Chart */}
            <div className="pt-2 border-t border-neutral-800 dark:border-neutral-800/60 space-y-1.5">
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>Principal Equity</span>
                <span>Interest Load</span>
              </div>
              
              {/* Animated Progress Bar */}
              <div className="flex h-2.5 rounded-full overflow-hidden bg-neutral-800">
                <motion.div
                  className="bg-amber-500 transition-all"
                  style={{ width: `${principalPercent}%` }}
                  animate={{ width: `${principalPercent}%` }}
                  transition={{ duration: 0.4 }}
                />
                <motion.div
                  className="bg-amber-900/60 transition-all"
                  style={{ width: `${interestPercent}%` }}
                  animate={{ width: `${interestPercent}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>

              <div className="flex justify-between text-[9px] text-neutral-400/80 font-mono">
                <span>{principalPercent.toFixed(1)}% (৳{result.loanAmount.toLocaleString()})</span>
                <span>{interestPercent.toFixed(1)}% (৳{Math.round(result.totalInterest).toLocaleString()})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security / Regulation Note */}
        <div className="flex items-start gap-2 text-[10px] text-neutral-400 dark:text-neutral-500 bg-muted/40 p-3 rounded-xl border border-neutral-100 dark:border-neutral-900/40">
          <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
          <span className="leading-normal">
            Calculations are estimations. Installment schedules align with RAJUK guidelines and deeds registered with the Ministry of Land. Zero hidden fees guaranteed.
          </span>
        </div>

      </CardContent>
    </Card>
  );
}

