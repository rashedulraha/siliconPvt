"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Calendar, Clock, User, Mail, Phone, 
  ChevronRight, ChevronLeft, Check, Compass, HelpCircle, Loader2 
} from "lucide-react";
import { useCMS } from "@/context/CMSContext";
import { useLeads } from "@/hooks/useLeads";
import { Label } from "@/components/ui/label";
import { PREMIUM_EASE } from "@/components/ui/FramerWrappers";

const TIME_SLOTS = [
  "10:00 AM",
  "11:30 AM",
  "02:00 PM",
  "04:00 PM"
];

export function SiteVisitBookingForm() {
  const { state } = useCMS();
  const { addLead } = useLeads();

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for back
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const slideVariants = {
    initial: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 30 : -30,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: {
        x: { ease: PREMIUM_EASE, duration: 0.5 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -30 : 30,
      transition: {
        x: { ease: PREMIUM_EASE, duration: 0.4 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  // Generate next 7 days for booking options
  const bookingDays = useMemo(() => {
    const days = [];
    const locale = "en-US";
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        fullDate: date.toISOString().split("T")[0],
        dayName: date.toLocaleDateString(locale, { weekday: "short" }),
        dayNum: date.getDate(),
        monthName: date.toLocaleDateString(locale, { month: "short" })
      });
    }
    return days;
  }, []);

  // Filter residential/commercial plots for site visit options
  const availableProperties = useMemo(() => {
    return state.properties.slice(0, 4);
  }, [state.properties]);

  const handleNext = () => {
    const currentErrors: Record<string, string> = {};
    
    if (step === 1 && !selectedPropertyId) {
      currentErrors.property = "Please select a property or project to visit";
    }
    if (step === 2) {
      if (!selectedDate) currentErrors.date = "Please select a date for the visit";
      if (!selectedTime) currentErrors.time = "Please select a time slot";
    }

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setErrors({});
    setDirection(1);
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setErrors({});
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentErrors: Record<string, string> = {};

    if (!clientName) currentErrors.name = "Full name is required";
    if (!clientEmail) currentErrors.email = "Email address is required";
    else if (!/\S+@\S+\.\S+/.test(clientEmail)) currentErrors.email = "Enter a valid email";
    if (!clientPhone) currentErrors.phone = "Phone number is required";

    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate luxury API submit
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const selectedProp = state.properties.find(p => p.id === selectedPropertyId);
    
    addLead({
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      message: `[Site Visit Booking Request] Scheduled Date: ${selectedDate} at ${selectedTime}. Special Request: ${specialRequest || "None"}. Property: ${selectedProp?.title || "N/A"}`,
      propertyId: selectedPropertyId || undefined,
    });

    setDirection(1);
    setIsSubmitting(false);
    setStep(4); // Success state
  };

  const selectedProperty = state.properties.find(p => p.id === selectedPropertyId);

  return (
    <div className="w-full bg-white dark:bg-[#111E35] rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 shadow-xl overflow-hidden text-neutral-800 dark:text-neutral-200">
      
      {/* Header and Step Indicators */}
      <div className="p-6 border-b border-neutral-100 dark:border-neutral-900/60 flex items-center justify-between">
        <div>
          <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest block mb-0.5">VIP Experience</span>
          <h3 className="text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-100">Site Visit Booking</h3>
        </div>
        {step < 4 && (
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  step === s 
                    ? "bg-accent w-4" 
                    : step > s 
                      ? "bg-emerald-500" 
                      : "bg-neutral-200 dark:bg-neutral-800"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait" custom={direction}>
          
          {/* STEP 1: Project Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4"
            >
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Select Project or Property</h4>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-light">Choose the destination for your exclusive physical tour.</p>
              </div>

              {errors.property && (
                <div className="p-3 text-[10px] text-destructive bg-destructive/5 border border-destructive/10 rounded-xl">
                  {errors.property}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableProperties.map((prop) => (
                  <div
                    key={prop.id}
                    onClick={() => {
                      setSelectedPropertyId(prop.id);
                      setErrors({});
                    }}
                    className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer text-left flex flex-col justify-between ${
                      selectedPropertyId === prop.id
                        ? "border-accent bg-accent/5 shadow-xs"
                        : "border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/20 hover:border-accent/40 dark:hover:border-accent/40"
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400">
                          {prop.category}
                        </span>
                        {selectedPropertyId === prop.id && (
                          <div className="w-4.5 h-4.5 rounded-full bg-accent flex items-center justify-center text-white">
                            <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                          </div>
                        )}
                      </div>
                      <h5 className="text-xs font-bold text-neutral-800 dark:text-neutral-100 truncate">{prop.title}</h5>
                      <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-light truncate flex items-center gap-1">
                        <Compass className="w-3 h-3 text-accent" />
                        {prop.location}
                      </p>
                    </div>
                    <div className="font-mono text-xs font-semibold text-accent mt-3">
                      ৳{prop.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl text-xs font-medium bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:opacity-90 transition-all cursor-pointer active:scale-98"
                >
                  Schedule Date &amp; Time
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Date & Time Picker */}
          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-5"
            >
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Choose Schedule</h4>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-light">Select a date and time slot for your guided micro-bus trip.</p>
              </div>

              {errors.date || errors.time ? (
                <div className="p-3 text-[10px] text-destructive bg-destructive/5 border border-destructive/10 rounded-xl">
                  {errors.date || errors.time}
                </div>
              ) : null}

              {/* Horizontal Date Picker */}
              <div className="space-y-2">
                <Label className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">Available Dates</Label>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {bookingDays.map((day) => (
                    <button
                      key={day.fullDate}
                      onClick={() => {
                        setSelectedDate(day.fullDate);
                        setErrors({});
                      }}
                      className={`flex-shrink-0 w-14 py-3 rounded-xl border flex flex-col items-center justify-center transition-all duration-200 cursor-pointer ${
                        selectedDate === day.fullDate
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300"
                      }`}
                    >
                      <span className="text-[8px] uppercase tracking-wide text-neutral-400 mb-0.5">{day.dayName}</span>
                      <span className="text-sm font-mono font-bold leading-none">{day.dayNum}</span>
                      <span className="text-[9px] mt-0.5 opacity-80">{day.monthName}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div className="space-y-2">
                <Label className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">Preferred Time Slot</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {TIME_SLOTS.map((time) => (
                    <button
                      key={time}
                      onClick={() => {
                        setSelectedTime(time);
                        setErrors({});
                      }}
                      className={`py-2 px-3 rounded-xl border text-xs font-mono font-medium transition-all duration-200 cursor-pointer ${
                        selectedTime === time
                          ? "border-accent bg-accent/5 text-accent"
                          : "border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={handleBack}
                  className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl text-xs font-medium bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:opacity-90 transition-all cursor-pointer active:scale-98"
                >
                  Enter Details
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Client Info */}
          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="space-y-4"
            >
              <div className="space-y-1">
                <h4 className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Client Information</h4>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-light">Please verify details to finalize your booking invitation.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="visitor-name" className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">Full Name</Label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-accent">
                        <User className="w-3.5 h-3.5 stroke-[1.5]" />
                      </div>
                      <input
                        id="visitor-name"
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full h-10 pl-9 pr-3 rounded-xl bg-white dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-800 text-xs focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent/10 transition-all"
                      />
                    </div>
                    {errors.name && <p className="text-[9px] text-destructive mt-0.5">{errors.name}</p>}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="visitor-email" className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">Email Address</Label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-accent">
                        <Mail className="w-3.5 h-3.5 stroke-[1.5]" />
                      </div>
                      <input
                        id="visitor-email"
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="john@domain.com"
                        className="w-full h-10 pl-9 pr-3 rounded-xl bg-white dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-800 text-xs focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent/10 transition-all"
                      />
                    </div>
                    {errors.email && <p className="text-[9px] text-destructive mt-0.5">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label htmlFor="visitor-phone" className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">Phone Number</Label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-accent">
                        <Phone className="w-3.5 h-3.5 stroke-[1.5]" />
                      </div>
                      <input
                        id="visitor-phone"
                        type="tel"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="+880 17"
                        className="w-full h-10 pl-9 pr-3 rounded-xl bg-white dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-800 text-xs focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent/10 transition-all"
                      />
                    </div>
                    {errors.phone && <p className="text-[9px] text-destructive mt-0.5">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="visitor-request" className="text-[9px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block">Special Notes (Optional)</Label>
                    <input
                      id="visitor-request"
                      type="text"
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="e.g. Uttara pickup requested"
                      className="w-full h-10 px-3 rounded-xl bg-white dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-800 text-xs focus:outline-hidden focus:border-accent focus:ring-1 focus:ring-accent/10 transition-all"
                    />
                  </div>
                </div>

                {/* Direct Booking summary preview */}
                <div className="p-3 bg-neutral-50 dark:bg-neutral-950/40 rounded-xl border border-neutral-100 dark:border-neutral-900/60 space-y-1 text-[10px] text-neutral-500 dark:text-neutral-400">
                  <p>Destination: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedProperty?.title}</span></p>
                  <p>Schedule: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedDate} at {selectedTime}</span></p>
                </div>

                <div className="pt-2 flex justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center justify-center gap-1.5 h-9 px-4 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-1.5 h-9 px-5 rounded-xl text-xs font-medium bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 hover:brightness-110 transition-all cursor-pointer active:scale-98 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      <>
                        Confirm Secure Booking
                        <Check className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* STEP 4: Success Message */}
          {step === 4 && (
            <motion.div
              key="success"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center py-8 space-y-5"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <Check className="w-6 h-6 text-emerald-500 stroke-[2.5]" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-semibold text-neutral-800 dark:text-neutral-100">Booking Confirmed!</h4>
                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 max-w-[280px] mx-auto font-light leading-relaxed">
                  Your VIP site visit ticket has been generated. Md. Aminul Islam will call you shortly to coordinate your micro-bus logistics.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setDirection(-1);
                    setStep(1);
                    setSelectedPropertyId("");
                    setSelectedDate("");
                    setSelectedTime("");
                    setClientName("");
                    setClientEmail("");
                    setClientPhone("");
                    setSpecialRequest("");
                  }}
                  className="inline-flex items-center justify-center h-9 px-4 rounded-xl text-xs font-medium border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all cursor-pointer"
                >
                  Schedule Another Visit
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
