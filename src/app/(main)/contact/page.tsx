"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  ChevronLeft,
  Compass,
  MessageSquare,
  Calendar,
  User,
  CheckCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  Globe,
} from "lucide-react";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { PageSEO } from "@/components/seo/PageSEO";
import { useCMS } from "@/context/CMSContext";
import { cn } from "@/lib/utils";

// Custom SVG Icons for Social Media to ensure consistent luxury styling without external dependencies
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

// Framer Motion Slider Variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

export default function ContactPage() {
  const { state } = useCMS();
  const { siteSettings } = state;
  const [activeFormTab, setActiveFormTab] = useState<"visit" | "general">(
    "visit",
  );

  // ── Multi-Step Form State ──────────────────────────────────────────
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0); // 1 = forward, -1 = back
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  // Client input fields
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationId, setConfirmationId] = useState("");

  // ── General Inquiry Form State ─────────────────────────────────────
  const [generalName, setGeneralName] = useState("");
  const [generalEmail, setGeneralEmail] = useState("");
  const [generalSubject, setGeneralSubject] = useState("");
  const [generalMessage, setGeneralMessage] = useState("");
  const [generalErrors, setGeneralErrors] = useState<Record<string, string>>(
    {},
  );
  const [isGeneralSubmitting, setIsGeneralSubmitting] = useState(false);
  const [isGeneralSuccess, setIsGeneralSuccess] = useState(false);

  // Auto-fill first property if loaded
  const projects = useMemo(() => {
    return state.properties && state.properties.length > 0
      ? state.properties.slice(0, 3)
      : [
          {
            id: "prop-001",
            title: "Silicon Orchard",
            location: "Mohammadpur, Dhaka",
            category: "land",
            description:
              "Premium ready-to-build residential plots in Mohammadpur.",
          },
          {
            id: "prop-002",
            title: "Silicon Commercial Square",
            location: "Uttara, Dhaka",
            category: "commercial",
            description: "Prime commercial plot with high ROI potential.",
          },
          {
            id: "prop-003",
            title: "Silicon Royal Heights",
            location: "Mirpur DOHS, Dhaka",
            category: "apartment",
            description: "Spacious and luxurious ready-to-move apartment.",
          },
        ];
  }, [state.properties]);

  useEffect(() => {
    if (projects.length > 0 && !selectedPropertyId) {
      setSelectedPropertyId(projects[0].id);
    }
  }, [projects, selectedPropertyId]);

  // Generate next 5 working days (skipping Friday & Saturday based on businessHours)
  const nextWorkingDays = useMemo(() => {
    const days = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let current = new Date();
    // Add a day to start from tomorrow
    while (days.length < 5) {
      current.setDate(current.getDate() + 1);
      const dayOfWeek = current.getDay(); // 0 = Sun, 1 = Mon, ... 5 = Fri, 6 = Sat
      if (dayOfWeek !== 5 && dayOfWeek !== 6) {
        days.push({
          dateString: current.toISOString().split("T")[0],
          dayName: dayNames[dayOfWeek],
          dayNum: current.getDate(),
          month: monthNames[current.getMonth()],
          fullLabel: `${dayNames[dayOfWeek]}, ${current.getDate()} ${monthNames[current.getMonth()]}`,
        });
      }
    }
    return days;
  }, []);

  // Pre-select first working date
  useEffect(() => {
    if (nextWorkingDays.length > 0 && !selectedDate) {
      setSelectedDate(nextWorkingDays[0].dateString);
    }
  }, [nextWorkingDays, selectedDate]);

  // Available Time Slots matching 9:00 AM - 6:00 PM business hours
  const timeSlots = [
    "09:30 AM - 11:30 AM",
    "11:30 AM - 01:30 PM",
    "02:00 PM - 04:00 PM",
    "04:00 PM - 06:00 PM",
  ];

  useEffect(() => {
    if (!selectedTimeSlot) {
      setSelectedTimeSlot(timeSlots[0]);
    }
  }, [selectedTimeSlot]);

  // Selected project details
  const selectedProject = useMemo(() => {
    return projects.find((p) => p.id === selectedPropertyId) || projects[0];
  }, [projects, selectedPropertyId]);

  // Formatted date label
  const formattedDate = useMemo(() => {
    if (!selectedDate) return "";
    const matched = nextWorkingDays.find((d) => d.dateString === selectedDate);
    if (matched) return matched.fullLabel;

    const d = new Date(selectedDate);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]}`;
  }, [selectedDate, nextWorkingDays]);

  // Multi-step navigation
  const nextStep = () => {
    setErrors({});
    if (step === 1) {
      if (!selectedPropertyId) {
        setErrors({ property: "Please select a location/project." });
        return;
      }
      setDirection(1);
      setStep(2);
    } else if (step === 2) {
      if (!selectedDate) {
        setErrors({ date: "Please select a preferred date." });
        return;
      }
      if (!selectedTimeSlot) {
        setErrors({ time: "Please select a preferred time slot." });
        return;
      }
      setDirection(1);
      setStep(3);
    }
  };

  const prevStep = () => {
    setErrors({});
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  // Submit site booking
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!clientName.trim()) newErrors.name = "Full Name is required";
    if (!clientEmail.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(clientEmail)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!clientPhone.trim()) {
      newErrors.phone = "Phone Number is required";
    } else if (
      !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(clientPhone)
    ) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate luxury API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setConfirmationId(`SR-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1800);
  };

  const resetBookingForm = () => {
    setStep(1);
    setDirection(0);
    setSelectedPropertyId(projects[0]?.id || "");
    setSelectedDate(nextWorkingDays[0]?.dateString || "");
    setSelectedTimeSlot(timeSlots[0]);
    setClientName("");
    setClientEmail("");
    setClientPhone("");
    setIsSuccess(false);
  };

  // Submit general inquiry
  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!generalName.trim()) newErrors.name = "Full Name is required";
    if (!generalEmail.trim()) {
      newErrors.email = "Email Address is required";
    } else if (!/\S+@\S+\.\S+/.test(generalEmail)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!generalSubject.trim()) newErrors.subject = "Subject is required";
    if (!generalMessage.trim()) newErrors.message = "Message text is required";

    if (Object.keys(newErrors).length > 0) {
      setGeneralErrors(newErrors);
      return;
    }

    setIsGeneralSubmitting(true);
    setGeneralErrors({});

    // Simulate luxury API call
    setTimeout(() => {
      setIsGeneralSubmitting(false);
      setIsGeneralSuccess(true);
    }, 1800);
  };

  const resetGeneralForm = () => {
    setGeneralName("");
    setGeneralEmail("");
    setGeneralSubject("");
    setGeneralMessage("");
    setIsGeneralSuccess(false);
  };

  return (
    <>
      <PageSEO
        title={state.seo.contact.title || "Contact Us - Silicon Real Estate"}
        description={
          state.seo.contact.description ||
          "Get in touch with our luxury real estate specialists for site visits and inquiries."
        }
      />

      {/* ── Luxury Hero Header ──────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 bg-dark-hero overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-accent/6 blur-[120px] pointer-events-none" />
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <SectionContainer className="relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span className="text-[10px] font-semibold tracking-wider text-accent uppercase">
                EXPERIENCE CENTRE
              </span>
            </div>

            <h1 className="font-semibold text-white text-display-lg leading-[1.08] mb-5 tracking-tight">
              Connect With <span className="text-gold">Silicon</span>
            </h1>

            <p className="text-white/60 text-lg font-light max-w-xl leading-relaxed">
              Schedule an exclusive private viewing of our premier properties or
              start a conversation with our dedicated investment advisors.
            </p>
          </motion.div>
        </SectionContainer>
      </section>

      {/* ── Content Grid Section ───────────────────────────────────── */}
      <section className="section-y bg-[#F4F7FB] dark:bg-[#0A1628] relative">
        <div className="absolute inset-0 bg-dot-pattern opacity-60 pointer-events-none" />

        <SectionContainer className="relative">
          <div className="grid lg:grid-cols-[40%_1fr] gap-10 xl:gap-16 items-start">
            {/* ── LEFT COLUMN: Company Coordinates ────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="space-y-6">
              <div className="bg-card/70 dark:bg-[#111E35]/60 backdrop-blur-md rounded-3xl border border-border/40 dark:border-neutral-800/40 p-8 shadow-soft">
                <h2 className="text-sm font-semibold tracking-wider text-accent uppercase mb-8">
                  HEADQUARTERS
                </h2>

                <div className="space-y-8">
                  {/* Address Block */}
                  <div className="group flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/5 dark:bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-all duration-300">
                      <MapPin className="h-4.5 w-4.5 text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase mb-1">
                        VISIT US
                      </p>
                      <p className="font-medium text-foreground text-sm leading-relaxed">
                        {siteSettings.address ||
                          "2/3 (2nd Floor), Block A, Iqbal Road, Mohammadpur, Dhaka-1207"}
                      </p>
                    </div>
                  </div>

                  {/* Telephone / Phone Block */}
                  <div className="group flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/5 dark:bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-all duration-300">
                      <Phone className="h-4.5 w-4.5 text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase mb-1">
                        CALL US
                      </p>
                      <div className="space-y-1">
                        <a
                          href={`tel:${siteSettings.contactPhone || "+8801712345678"}`}
                          className="block font-medium text-foreground text-sm hover:text-accent transition-colors">
                          {siteSettings.contactPhone || "+880 1712 345 678"}{" "}
                          (Hotline)
                        </a>
                        <a
                          href="tel:+88028123456"
                          className="block font-medium text-foreground text-sm hover:text-accent transition-colors">
                          +880 2-8123456 (Corporate Office)
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Email Block */}
                  <div className="group flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/5 dark:bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-all duration-300">
                      <Mail className="h-4.5 w-4.5 text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase mb-1">
                        EMAIL US
                      </p>
                      <a
                        href={`mailto:${siteSettings.contactEmail || "info@siliconrealestate.com"}`}
                        className="font-medium text-foreground text-sm hover:text-accent transition-colors break-all">
                        {siteSettings.contactEmail ||
                          "info@siliconrealestate.com"}
                      </a>
                    </div>
                  </div>

                  {/* Hours Block */}
                  <div className="group flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/5 dark:bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-all duration-300">
                      <Clock className="h-4.5 w-4.5 text-accent" />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase mb-1">
                        BUSINESS HOURS
                      </p>
                      <p className="font-medium text-foreground text-sm leading-relaxed">
                        {siteSettings.businessHours ||
                          "Sun – Thu: 9:00 AM – 6:00 PM"}
                      </p>
                      <p className="text-xs text-muted-foreground font-light mt-0.5">
                        Friday & Saturday Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media icons grid */}
                <div className="border-t border-border/40 dark:border-neutral-800/40 mt-8 pt-8">
                  <p className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase mb-4">
                    CONNECT ONLINE
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      {
                        icon: FacebookIcon,
                        href:
                          siteSettings.social?.facebook ||
                          "https://facebook.com",
                        name: "Facebook",
                      },
                      {
                        icon: TwitterIcon,
                        href:
                          siteSettings.social?.twitter || "https://twitter.com",
                        name: "X",
                      },
                      {
                        icon: InstagramIcon,
                        href:
                          siteSettings.social?.instagram ||
                          "https://instagram.com",
                        name: "Instagram",
                      },
                      {
                        icon: LinkedinIcon,
                        href:
                          siteSettings.social?.linkedin ||
                          "https://linkedin.com",
                        name: "LinkedIn",
                      },
                      {
                        icon: YoutubeIcon,
                        href:
                          siteSettings.social?.youtube || "https://youtube.com",
                        name: "YouTube",
                      },
                    ].map((soc, idx) => (
                      <a
                        key={idx}
                        href={soc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-xl bg-muted dark:bg-[#1A2F52]/40 flex items-center justify-center border border-border/40 dark:border-neutral-800/40 text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/5 dark:hover:bg-accent/10 transition-all duration-300"
                        title={soc.name}>
                        <soc.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT COLUMN: Interactive Form Panel ────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="space-y-6">
              <div className="bg-card dark:bg-[#111E35] rounded-3xl border border-border/40 dark:border-neutral-800/40 p-6 md:p-8 shadow-soft">
                {/* Asymmetric Luxury Tab Switcher */}
                <div className="flex p-1 rounded-2xl bg-neutral-100/80 dark:bg-neutral-900/50 border border-border/40 dark:border-neutral-800/40 mb-8 max-w-md">
                  <button
                    onClick={() => {
                      setActiveFormTab("visit");
                      resetGeneralForm();
                    }}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer",
                      activeFormTab === "visit"
                        ? "bg-white dark:bg-[#1A2F52] text-accent border border-neutral-200/40 dark:border-neutral-800/30 shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}>
                    <Compass className="w-3.5 h-3.5" />
                    Book Site Visit
                  </button>
                  <button
                    onClick={() => {
                      setActiveFormTab("general");
                      resetBookingForm();
                    }}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer",
                      activeFormTab === "general"
                        ? "bg-white dark:bg-[#1A2F52] text-accent border border-neutral-200/40 dark:border-neutral-800/30 shadow-sm"
                        : "text-muted-foreground hover:text-foreground",
                    )}>
                    <MessageSquare className="w-3.5 h-3.5" />
                    General Inquiry
                  </button>
                </div>

                {/* ── TAB 1: SITE VISIT BOOKING WIZARD ──────────────── */}
                {activeFormTab === "visit" && (
                  <div>
                    {!isSuccess ? (
                      <div>
                        {/* Step Indicator Header */}
                        <div className="flex items-center justify-between mb-8">
                          <div>
                            <span className="text-[10px] font-semibold text-accent tracking-wider uppercase block mb-1">
                              STEP {step} OF 3
                            </span>
                            <h3 className="font-semibold text-lg text-foreground">
                              {step === 1 && "Select Location"}
                              {step === 2 && "Choose Date & Time"}
                              {step === 3 && "Confirm Coordinates"}
                            </h3>
                          </div>
                          {/* Progress Dots */}
                          <div className="flex items-center gap-1.5">
                            {[1, 2, 3].map((s) => (
                              <div
                                key={s}
                                className={cn(
                                  "h-1.5 rounded-full transition-all duration-300",
                                  s === step
                                    ? "w-6 bg-accent"
                                    : s < step
                                      ? "w-2 bg-accent/40"
                                      : "w-2 bg-border dark:bg-neutral-800",
                                )}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Slider Content Wrapper */}
                        <div className="overflow-hidden min-h-[380px] relative">
                          <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                              key={step}
                              custom={direction}
                              variants={slideVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              className="w-full">
                              {/* ── STEP 1: Property Location Selection ── */}
                              {step === 1 && (
                                <div className="space-y-4">
                                  <p className="text-xs text-muted-foreground font-light mb-2">
                                    Please select which luxury development or
                                    plot boundary you would like to inspect.
                                  </p>
                                  <div className="grid gap-3.5">
                                    {projects.map((proj) => (
                                      <button
                                        key={proj.id}
                                        type="button"
                                        onClick={() =>
                                          setSelectedPropertyId(proj.id)
                                        }
                                        className={cn(
                                          "w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start justify-between group cursor-pointer",
                                          selectedPropertyId === proj.id
                                            ? "border-accent bg-accent/5 dark:bg-accent/10 shadow-[0_0_15px_rgba(201,145,26,0.1)]"
                                            : "border-border/60 hover:border-accent/40 bg-card hover:bg-neutral-50/50 dark:hover:bg-[#1A2F52]/20 hover:scale-[1.01]",
                                        )}>
                                        <div className="space-y-1 pr-4">
                                          <div className="flex items-center gap-2">
                                            <span
                                              className={cn(
                                                "text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border",
                                                selectedPropertyId === proj.id
                                                  ? "bg-accent/10 text-accent border-accent/20"
                                                  : "bg-muted dark:bg-[#1A2F52]/40 text-muted-foreground border-border/40",
                                              )}>
                                              {proj.category || "Plot"}
                                            </span>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                              <MapPin className="w-3 h-3 flex-shrink-0" />
                                              {proj.location}
                                            </span>
                                          </div>
                                          <h4 className="font-semibold text-sm text-foreground group-hover:text-accent transition-colors">
                                            {proj.title}
                                          </h4>
                                          <p className="text-xs text-muted-foreground/80 font-light leading-relaxed line-clamp-1">
                                            {proj.description}
                                          </p>
                                        </div>
                                        <div
                                          className={cn(
                                            "w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 flex-shrink-0 mt-1",
                                            selectedPropertyId === proj.id
                                              ? "border-accent bg-accent text-accent-foreground"
                                              : "border-border dark:border-neutral-700",
                                          )}>
                                          {selectedPropertyId === proj.id && (
                                            <CheckCircle className="w-3.5 h-3.5" />
                                          )}
                                        </div>
                                      </button>
                                    ))}
                                  </div>
                                  {errors.property && (
                                    <p className="text-xs text-destructive mt-1 font-medium">
                                      {errors.property}
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* ── STEP 2: Date & Time Picker ── */}
                              {step === 2 && (
                                <div className="space-y-6">
                                  {/* Quick Date Pills */}
                                  <div>
                                    <label className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase block mb-3">
                                      SELECT DATE
                                    </label>
                                    <div className="grid grid-cols-5 gap-2">
                                      {nextWorkingDays.map((wd) => (
                                        <button
                                          key={wd.dateString}
                                          type="button"
                                          onClick={() =>
                                            setSelectedDate(wd.dateString)
                                          }
                                          className={cn(
                                            "flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all duration-300 cursor-pointer",
                                            selectedDate === wd.dateString
                                              ? "border-accent bg-accent text-accent-foreground"
                                              : "border-border/60 hover:border-accent/40 bg-card hover:bg-neutral-50/50 dark:hover:bg-[#1A2F52]/20",
                                          )}>
                                          <span
                                            className={cn(
                                              "text-[10px] uppercase font-medium",
                                              selectedDate === wd.dateString
                                                ? "text-accent-foreground/80"
                                                : "text-muted-foreground",
                                            )}>
                                            {wd.dayName}
                                          </span>
                                          <span className="text-base font-bold my-0.5">
                                            {wd.dayNum}
                                          </span>
                                          <span
                                            className={cn(
                                              "text-[9px] uppercase font-light",
                                              selectedDate === wd.dateString
                                                ? "text-accent-foreground/80"
                                                : "text-muted-foreground",
                                            )}>
                                            {wd.month}
                                          </span>
                                        </button>
                                      ))}
                                    </div>

                                    {/* Custom Calendar Fallback */}
                                    <div className="mt-4 flex items-center justify-end">
                                      <div className="relative">
                                        <input
                                          type="date"
                                          value={selectedDate}
                                          onChange={(e) =>
                                            setSelectedDate(e.target.value)
                                          }
                                          min={
                                            new Date()
                                              .toISOString()
                                              .split("T")[0]
                                          }
                                          className="text-xs bg-muted dark:bg-[#1A2F52]/40 border border-border/40 dark:border-neutral-800/40 rounded-xl px-4 py-2 hover:border-accent transition-all outline-none text-foreground"
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Time Slots */}
                                  <div>
                                    <label className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase block mb-3">
                                      SELECT PREFERRED TIME (9:00 AM – 6:00 PM)
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                      {timeSlots.map((slot) => (
                                        <button
                                          key={slot}
                                          type="button"
                                          onClick={() =>
                                            setSelectedTimeSlot(slot)
                                          }
                                          className={cn(
                                            "py-3 px-4 rounded-xl border text-center text-xs font-medium transition-all duration-300 cursor-pointer",
                                            selectedTimeSlot === slot
                                              ? "border-accent bg-accent/10 text-accent font-semibold shadow-xs"
                                              : "border-border/60 hover:border-accent/40 bg-card hover:bg-neutral-50/50 dark:hover:bg-[#1A2F52]/20",
                                          )}>
                                          {slot}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* ── STEP 3: Client Details Form ── */}
                              {step === 3 && (
                                <form
                                  onSubmit={handleBookingSubmit}
                                  className="space-y-6">
                                  <p className="text-xs text-muted-foreground font-light mb-4">
                                    Reviewing viewing of{" "}
                                    <strong className="font-semibold text-foreground">
                                      {selectedProject?.title}
                                    </strong>{" "}
                                    on{" "}
                                    <strong className="font-semibold text-foreground">
                                      {formattedDate}
                                    </strong>{" "}
                                    at{" "}
                                    <strong className="font-semibold text-foreground">
                                      {selectedTimeSlot}
                                    </strong>
                                    .
                                  </p>

                                  {/* Full Name */}
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">
                                      Full Name
                                    </label>
                                    <div className="relative border-b border-border/60 focus-within:border-accent transition-all duration-300">
                                      <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={clientName}
                                        onChange={(e) =>
                                          setClientName(e.target.value)
                                        }
                                        className="w-full bg-transparent py-2.5 px-1 text-sm outline-none text-foreground placeholder:text-muted-foreground/40 font-light"
                                      />
                                    </div>
                                    {errors.name && (
                                      <p className="text-xs text-destructive mt-1">
                                        {errors.name}
                                      </p>
                                    )}
                                  </div>

                                  {/* Email Address */}
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">
                                      Email Address
                                    </label>
                                    <div className="relative border-b border-border/60 focus-within:border-accent transition-all duration-300">
                                      <input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={clientEmail}
                                        onChange={(e) =>
                                          setClientEmail(e.target.value)
                                        }
                                        className="w-full bg-transparent py-2.5 px-1 text-sm outline-none text-foreground placeholder:text-muted-foreground/40 font-light"
                                      />
                                    </div>
                                    {errors.email && (
                                      <p className="text-xs text-destructive mt-1">
                                        {errors.email}
                                      </p>
                                    )}
                                  </div>

                                  {/* Phone Number */}
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">
                                      Phone Number
                                    </label>
                                    <div className="relative border-b border-border/60 focus-within:border-accent transition-all duration-300">
                                      <input
                                        type="tel"
                                        placeholder="+880 1700 000 000"
                                        value={clientPhone}
                                        onChange={(e) =>
                                          setClientPhone(e.target.value)
                                        }
                                        className="w-full bg-transparent py-2.5 px-1 text-sm outline-none text-foreground placeholder:text-muted-foreground/40 font-light"
                                      />
                                    </div>
                                    {errors.phone && (
                                      <p className="text-xs text-destructive mt-1">
                                        {errors.phone}
                                      </p>
                                    )}
                                  </div>
                                </form>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>

                        {/* Navigation Footer */}
                        <div className="flex items-center justify-between border-t border-border/40 dark:border-neutral-800/40 mt-8 pt-6">
                          <button
                            type="button"
                            onClick={prevStep}
                            disabled={step === 1}
                            className={cn(
                              "flex items-center gap-2 text-xs font-semibold py-2 px-3 rounded-lg border transition-all duration-300",
                              step === 1
                                ? "border-transparent text-muted-foreground/30 pointer-events-none"
                                : "border-border/60 hover:border-accent/40 bg-card hover:bg-neutral-50/50 dark:hover:bg-[#1A2F52]/20 text-muted-foreground hover:text-foreground cursor-pointer",
                            )}>
                            <ChevronLeft className="w-4 h-4" />
                            Back
                          </button>

                          {step < 3 ? (
                            <button
                              type="button"
                              onClick={nextStep}
                              className="btn-primary py-2 h-10 px-5 text-xs tracking-wider uppercase font-semibold cursor-pointer">
                              Continue
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={handleBookingSubmit}
                              disabled={isSubmitting}
                              className="gold-shimmer text-accent-foreground font-semibold px-6 py-2.5 h-10 rounded-xl hover:shadow-gold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300">
                              {isSubmitting ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin text-accent-foreground" />
                                  Booking...
                                </>
                              ) : (
                                <>
                                  Schedule Site Visit
                                  <ArrowRight className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* ── Success Screen ── */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass dark:glass rounded-2xl p-6 text-center space-y-6">
                        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto text-accent">
                          <CheckCircle className="w-8 h-8 animate-bounce" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg text-foreground">
                            Site Visit Scheduled
                          </h3>
                          <p className="text-xs text-muted-foreground font-light max-w-sm mx-auto">
                            Your reservation is confirmed. One of our Senior
                            Relationship Managers will meet you at the location.
                          </p>
                        </div>

                        <div className="bg-muted dark:bg-[#1A2F52]/40 rounded-xl p-4 text-left border border-border/40 dark:border-neutral-800/40 text-xs space-y-2 max-w-md mx-auto">
                          <div className="flex justify-between border-b border-border/40 pb-2">
                            <span className="text-muted-foreground">
                              Confirmation ID
                            </span>
                            <span className="font-semibold text-accent">
                              {confirmationId}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Development
                            </span>
                            <span className="font-medium text-foreground">
                              {selectedProject?.title}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date</span>
                            <span className="font-medium text-foreground">
                              {formattedDate}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Time Slot
                            </span>
                            <span className="font-medium text-foreground">
                              {selectedTimeSlot}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={resetBookingForm}
                          className="w-full btn-primary h-11 text-xs tracking-wider uppercase font-semibold cursor-pointer">
                          Reset & Book Another Visit
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* ── TAB 2: GENERAL INQUIRY FORM ───────────────────── */}
                {activeFormTab === "general" && (
                  <div>
                    {!isGeneralSuccess ? (
                      <form
                        onSubmit={handleGeneralSubmit}
                        className="space-y-6">
                        <div className="mb-2">
                          <h3 className="font-semibold text-lg text-foreground">
                            Send a Message
                          </h3>
                          <p className="text-xs text-muted-foreground font-light mt-0.5">
                            Fill out the details below and we will get back to
                            you within 24 hours.
                          </p>
                        </div>

                        {/* Full Name */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">
                            Full Name
                          </label>
                          <div className="relative border-b border-border/60 focus-within:border-accent transition-all duration-300">
                            <input
                              type="text"
                              placeholder="John Doe"
                              value={generalName}
                              onChange={(e) => setGeneralName(e.target.value)}
                              className="w-full bg-transparent py-2.5 px-1 text-sm outline-none text-foreground placeholder:text-muted-foreground/40 font-light"
                            />
                          </div>
                          {generalErrors.name && (
                            <p className="text-xs text-destructive mt-1">
                              {generalErrors.name}
                            </p>
                          )}
                        </div>

                        {/* Email Address */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">
                            Email Address
                          </label>
                          <div className="relative border-b border-border/60 focus-within:border-accent transition-all duration-300">
                            <input
                              type="email"
                              placeholder="john@example.com"
                              value={generalEmail}
                              onChange={(e) => setGeneralEmail(e.target.value)}
                              className="w-full bg-transparent py-2.5 px-1 text-sm outline-none text-foreground placeholder:text-muted-foreground/40 font-light"
                            />
                          </div>
                          {generalErrors.email && (
                            <p className="text-xs text-destructive mt-1">
                              {generalErrors.email}
                            </p>
                          )}
                        </div>

                        {/* Subject */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">
                            Subject
                          </label>
                          <div className="relative border-b border-border/60 focus-within:border-accent transition-all duration-300">
                            <input
                              type="text"
                              placeholder="Investment Query, Feedback, etc."
                              value={generalSubject}
                              onChange={(e) =>
                                setGeneralSubject(e.target.value)
                              }
                              className="w-full bg-transparent py-2.5 px-1 text-sm outline-none text-foreground placeholder:text-muted-foreground/40 font-light"
                            />
                          </div>
                          {generalErrors.subject && (
                            <p className="text-xs text-destructive mt-1">
                              {generalErrors.subject}
                            </p>
                          )}
                        </div>

                        {/* Message */}
                        <div className="space-y-1">
                          <label className="text-[10px] font-semibold text-muted-foreground tracking-wider uppercase">
                            Message
                          </label>
                          <div className="relative border-b border-border/60 focus-within:border-accent transition-all duration-300">
                            <textarea
                              rows={4}
                              placeholder="Write your message here..."
                              value={generalMessage}
                              onChange={(e) =>
                                setGeneralMessage(e.target.value)
                              }
                              className="w-full bg-transparent py-2.5 px-1 text-sm outline-none text-foreground placeholder:text-muted-foreground/40 font-light resize-none"
                            />
                          </div>
                          {generalErrors.message && (
                            <p className="text-xs text-destructive mt-1">
                              {generalErrors.message}
                            </p>
                          )}
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isGeneralSubmitting}
                          className="w-full gold-shimmer text-accent-foreground font-semibold px-6 py-3.5 rounded-xl hover:shadow-gold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300">
                          {isGeneralSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-accent-foreground" />
                              Sending Message...
                            </>
                          ) : (
                            <>
                              Send Message
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </form>
                    ) : (
                      /* ── Success Screen ── */
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass dark:glass rounded-2xl p-6 text-center space-y-6">
                        <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto text-accent">
                          <CheckCircle className="w-8 h-8 animate-bounce" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="font-semibold text-lg text-foreground">
                            Message Sent
                          </h3>
                          <p className="text-xs text-muted-foreground font-light max-w-sm mx-auto">
                            Thank you for reaching out. We have received your
                            inquiry and our support team will reply within 24
                            hours.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={resetGeneralForm}
                          className="w-full btn-primary h-11 text-xs tracking-wider uppercase font-semibold cursor-pointer">
                          Send Another Message
                        </button>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </SectionContainer>
      </section>

      {/* ── FULL-WIDTH INTERACTIVE MAP SECTION ──────────────────────── */}
      <section className="bg-[#F4F7FB] dark:bg-[#0A1628] pb-16">
        <SectionContainer>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full rounded-[2rem] overflow-hidden border border-border/40 dark:border-neutral-800/40 shadow-soft-lg group relative">
            {/* Elegant luxury overlay on hover */}
            <div className="absolute inset-0 border-[8px] border-card/30 pointer-events-none rounded-[2rem] z-10 transition-all duration-500 group-hover:border-accent/15" />

            <div className="w-full h-[480px] bg-muted relative">
              <iframe
                title="Google Maps Location - Silicon Real Estate"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902442430148!2d90.36015507629532!3d23.750858078672027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf4e59000001%3A0x6b77df76f164cc83!2sIqbal%20Rd%2C%20Dhaka%201207!5e0!3m2!1sen!2sbd!4v1719273600000!5m2!1sen!2sbd"
                className="w-full h-full border-0 opacity-90 hover:opacity-100 transition-all duration-700"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Float Card Info */}
            <div className="absolute bottom-6 left-6 right-6 md:left-8 md:right-auto bg-card/90 dark:bg-[#111E35]/95 backdrop-blur-md border border-border/40 dark:border-neutral-800/40 rounded-2xl p-5 shadow-soft max-w-sm z-20">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                <span className="text-[10px] font-bold tracking-wider text-accent uppercase">
                  HEADQUARTERS
                </span>
              </div>
              <h4 className="font-semibold text-sm text-foreground mb-1">
                {siteSettings.siteName || "Silicon Real Estate (Pvt.) Ltd."}
              </h4>
              <p className="text-xs text-muted-foreground font-light leading-relaxed mb-3">
                {siteSettings.address ||
                  "2/3 (2nd Floor), Block A, Iqbal Road, Mohammadpur, Dhaka-1207"}
              </p>
              <a
                href="https://maps.google.com/?q=Iqbal+Road,+Mohammadpur,+Dhaka"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-accent font-semibold hover:underline">
                <Globe className="w-3.5 h-3.5" />
                Get Driving Directions
              </a>
            </div>
          </motion.div>
        </SectionContainer>
      </section>
    </>
  );
}
