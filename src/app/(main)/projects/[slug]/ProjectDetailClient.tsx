"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ArrowLeft, MapPin, CalendarCheck, Ruler, Building2, ShieldCheck, 
  Sparkles, MessageSquare, Phone, Mail, ChevronRight, Calculator
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { useCMS } from "@/context/CMSContext";
import { formatCurrency, formatCompactCurrency } from "@/lib/utils";
import type { Property } from "@/types";

interface ProjectDetailClientProps {
  slug: string;
}

const STATUS_STYLES: Record<string, string> = {
  available: "border-[#D4A030]/30 text-[#D4A030] bg-[#D4A030]/5",
  pending: "border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-500/5",
  sold: "border-zinc-300 dark:border-white/10 text-zinc-500 bg-zinc-100 dark:bg-white/5",
  rented: "border-blue-500/30 text-blue-600 dark:text-blue-400 bg-blue-500/5",
};

const STATUS_LABELS: Record<string, string> = {
  available: "Ongoing Project",
  pending: "Upcoming Project",
  sold: "Completed Project",
  rented: "Rented",
};

export function ProjectDetailClient({ slug }: ProjectDetailClientProps) {
  const { state } = useCMS();
  const project = state.properties.find((p) => p.slug === slug);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // EMI Calculator state
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [interestRate, setInterestRate] = useState(9);
  const [loanTermYears, setLoanTermYears] = useState(15);

  // Form enquiry state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate EMI
  const emiDetails = useMemo(() => {
    if (!project) return null;
    const price = project.price;
    const downPayment = (price * downPaymentPercent) / 100;
    const loanAmount = price - downPayment;
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = loanTermYears * 12;
    
    let emi = 0;
    if (monthlyRate > 0) {
      emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
            (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      emi = loanAmount / totalMonths;
    }

    return {
      downPayment,
      loanAmount,
      emi,
      totalPayment: emi * totalMonths + downPayment,
    };
  }, [project, downPaymentPercent, interestRate, loanTermYears]);

  // Find related projects (exclude current, same category or location)
  const relatedProjects = useMemo(() => {
    if (!project) return [];
    return state.properties
      .filter((p) => p.id !== project.id && (p.category === project.category || p.location.includes(project.location.split(",")[0])))
      .slice(0, 3);
  }, [project, state.properties]);

  // Find dynamic assigned agent
  const agent = useMemo(() => {
    if (!project) return null;
    return state.team.find((t) => t.id === project.agentId) || state.team[0];
  }, [project, state.team]);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }, 1200);
  };

  if (!project) {
    return (
      <SectionContainer className="py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="font-heading text-3xl font-bold text-zinc-950 dark:text-white mb-4">
          Project Not Found
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md font-light">
          The project you are looking for does not exist, has been archived, or has a different URL path.
        </p>
        <Button asChild className="rounded-full bg-[#0D1B3E] dark:bg-white text-white dark:text-[#0D1B3E] hover:bg-[#0D1B3E]/90 dark:hover:bg-white/90">
          <Link href="/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
      </SectionContainer>
    );
  }

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#0D1B3E] min-h-screen pb-24 transition-colors duration-300">
      
      {/* ── Breadcrumbs & Back Button ───────────────── */}
      <div className="pt-32 border-b border-zinc-200/50 dark:border-white/10 bg-zinc-50/20 dark:bg-[#0D1B3E]/40">
        <SectionContainer className="py-4 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-[#D4A030] dark:hover:text-[#D4A030] transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Projects
          </Link>

          <nav className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-zinc-800 dark:text-white font-medium truncate max-w-[200px]">{project.title}</span>
          </nav>
        </SectionContainer>
      </div>

      <SectionContainer className="py-10">
        {/* ── Grid Layout (Main Content vs Sidebar) ── */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          
          {/* ── Main content ────────────────────────── */}
          <div className="space-y-10">
            
            {/* Page Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2.5 items-center">
                <span className={`inline-flex items-center px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${STATUS_STYLES[project.status] || ""}`}>
                  {STATUS_LABELS[project.status] || project.status}
                </span>
                <span className="inline-flex items-center px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-zinc-200/50 dark:border-white/10 bg-zinc-50/50 dark:bg-white/5 text-zinc-800 dark:text-white">
                  {project.category}
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-2">
                  <h1 className="font-heading font-light text-3xl sm:text-4xl lg:text-5xl text-zinc-950 dark:text-white leading-tight tracking-tight">
                    {project.title}
                  </h1>
                  <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                    <MapPin className="h-4 w-4 text-[#D4A030] shrink-0" />
                    <span className="text-sm font-light">{project.location}</span>
                  </div>
                </div>
                
                <div className="md:text-right bg-zinc-50 dark:bg-[#0D1B3E]/40 border border-zinc-200/50 dark:border-white/10 rounded-2xl p-4 min-w-[200px] flex-shrink-0">
                  <span className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold block mb-1">Starting Price</span>
                  <span className="font-heading font-bold text-2xl sm:text-3xl text-[#D4A030] block leading-none">
                    {formatCurrency(project.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* Gallery Section */}
            {project.images.length > 0 && (
              <div className="space-y-3">
                {/* Main Big Image */}
                <div className="relative aspect-[16/9] w-full rounded-[28px] overflow-hidden border border-zinc-200/50 dark:border-white/5 bg-zinc-100 dark:bg-white/5 shadow-sm">
                  <Image
                    src={project.images[activeImageIndex]}
                    alt={`${project.title} — Main view`}
                    fill
                    className="object-cover transition-all duration-500"
                    sizes="(min-width: 1024px) 66vw, 100vw"
                    priority
                  />
                </div>

                {/* Thumbnails Row */}
                {project.images.length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
                    {project.images.map((src, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative h-20 aspect-[4/3] rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                          activeImageIndex === idx ? "border-[#D4A030] scale-[0.98]" : "border-transparent hover:border-zinc-200 dark:hover:border-white/10"
                        }`}
                      >
                        <Image
                          src={src}
                          alt={`${project.title} thumbnail ${idx + 1}`}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-[24px] border border-zinc-200/50 dark:border-white/10 bg-white/60 dark:bg-[#0D1B3E]/30 backdrop-blur-md">
              <div className="space-y-1">
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">Total Area</span>
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-[#D4A030]" />
                  <span className="text-sm font-semibold text-zinc-850 dark:text-white">{project.area.toLocaleString()} sqft</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">Property Type</span>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[#D4A030]" />
                  <span className="text-sm font-semibold text-zinc-850 dark:text-white capitalize">{project.category}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">Approval</span>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#D4A030]" />
                  <span className="text-sm font-semibold text-zinc-850 dark:text-white">RAJUK Approved</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">Listing Status</span>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-semibold text-zinc-850 dark:text-white capitalize">{project.status}</span>
                </div>
              </div>
            </div>

            {/* Description Section */}
            {project.description && (
              <div className="space-y-4">
                <h2 className="font-heading font-semibold text-xl text-zinc-950 dark:text-white flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#D4A030]" /> About This Project
                </h2>
                <div className="p-6 sm:p-8 rounded-[28px] border border-zinc-200/50 dark:border-white/10 bg-white/60 dark:bg-[#0D1B3E]/30 backdrop-blur-md">
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm font-light whitespace-pre-line">
                    {project.description}
                  </p>
                </div>
              </div>
            )}

            {/* Features Section */}
            {project.features.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-heading font-semibold text-xl text-zinc-950 dark:text-white flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#D4A030]" /> Project Amenities & Features
                </h2>
                <div className="p-6 sm:p-8 rounded-[28px] border border-zinc-200/50 dark:border-white/10 bg-white/60 dark:bg-[#0D1B3E]/30 backdrop-blur-md">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-[#D4A030]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[#D4A030] text-[10px] font-black">✓</span>
                        </div>
                        <span className="text-sm text-zinc-700 dark:text-zinc-300 font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar (Widgets) ──────────────────── */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            
            {/* Widget: Action Booking */}
            <div className="bg-white/60 dark:bg-[#0D1B3E]/30 backdrop-blur-md border border-zinc-200/50 dark:border-white/10 rounded-[28px] p-6 shadow-sm space-y-4">
              <h3 className="font-heading font-semibold text-lg text-zinc-950 dark:text-white flex items-center gap-2">
                <CalendarCheck className="h-5 w-5 text-[#D4A030]" /> Schedule Site Visit
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-light">
                Experience our layout plan first-hand. Our advisors are available all week to show you the plots and ready blocks.
              </p>
              <Button asChild className="w-full h-11 rounded-xl font-semibold shadow-sm bg-[#0D1B3E] dark:bg-white hover:bg-[#0D1B3E]/90 dark:hover:bg-white/90 text-white dark:text-[#0D1B3E]">
                <Link href="/contact">
                  Book a Site Visit
                </Link>
              </Button>
            </div>

            {/* Widget: EMI Calculator */}
            {emiDetails && (
              <div className="bg-white/60 dark:bg-[#0D1B3E]/30 backdrop-blur-md border border-zinc-200/50 dark:border-white/10 rounded-[28px] p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-[#D4A030]" />
                  <h3 className="font-heading font-semibold text-lg text-zinc-950 dark:text-white">EMI Estimator</h3>
                </div>

                <div className="space-y-4">
                  {/* Down Payment Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-light">
                      <span className="text-zinc-500 dark:text-zinc-400">Down Payment</span>
                      <span className="font-medium text-zinc-800 dark:text-white">{downPaymentPercent}% ({formatCompactCurrency(emiDetails.downPayment)})</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      step="5"
                      value={downPaymentPercent}
                      onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                      className="w-full h-1 bg-zinc-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4A030]"
                    />
                  </div>

                  {/* Interest Rate Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-light">
                      <span className="text-zinc-500 dark:text-zinc-400">Interest Rate (p.a.)</span>
                      <span className="font-medium text-zinc-800 dark:text-white">{interestRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="15"
                      step="0.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-1 bg-zinc-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4A030]"
                    />
                  </div>

                  {/* Loan Term Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-light">
                      <span className="text-zinc-500 dark:text-zinc-400">Loan Period</span>
                      <span className="font-medium text-zinc-800 dark:text-white">{loanTermYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="25"
                      step="5"
                      value={loanTermYears}
                      onChange={(e) => setLoanTermYears(Number(e.target.value))}
                      className="w-full h-1 bg-zinc-200 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4A030]"
                    />
                  </div>
                </div>

                <div className="h-px bg-zinc-200/50 dark:bg-white/10" />

                <div className="bg-[#0D1B3E]/5 dark:bg-white/5 rounded-2xl p-4 border border-zinc-200/60 dark:border-white/10 text-center space-y-1">
                  <span className="text-[9px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-bold">Estimated Monthly EMI</span>
                  <span className="text-2xl font-heading font-bold text-[#D4A030] block leading-none">
                    {formatCurrency(emiDetails.emi)}
                  </span>
                </div>
              </div>
            )}

            {/* Widget: Assigned Agent */}
            {agent && (
              <div className="bg-white/60 dark:bg-[#0D1B3E]/30 backdrop-blur-md border border-zinc-200/50 dark:border-white/10 rounded-[28px] p-6 shadow-sm space-y-4">
                <h3 className="font-heading font-semibold text-lg text-zinc-950 dark:text-white">Project Advisor</h3>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-zinc-100 dark:bg-white/5 border border-zinc-200/50 dark:border-white/10">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-zinc-900 dark:text-white leading-tight">{agent.name}</h4>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 font-light">{agent.role}</p>
                  </div>
                </div>
                <div className="space-y-2 pt-1">
                  {agent.phone && (
                    <a href={`tel:${agent.phone}`} className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 hover:text-[#D4A030] dark:hover:text-[#D4A030] transition-colors py-2 px-3 rounded-xl bg-zinc-50/50 dark:bg-white/5 border border-zinc-200/40 dark:border-white/10 font-light">
                      <Phone className="h-3.5 w-3.5 text-[#D4A030]" /> {agent.phone}
                    </a>
                  )}
                  {agent.email && (
                    <a href={`mailto:${agent.email}`} className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300 hover:text-[#D4A030] dark:hover:text-[#D4A030] transition-colors py-2 px-3 rounded-xl bg-zinc-50/50 dark:bg-white/5 border border-zinc-200/40 dark:border-white/10 font-light truncate">
                      <Mail className="h-3.5 w-3.5 text-[#D4A030]" /> {agent.email}
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Widget: Quick Enquiry Form */}
            <div className="bg-white/60 dark:bg-[#0D1B3E]/30 backdrop-blur-md border border-zinc-200/50 dark:border-white/10 rounded-[28px] p-6 shadow-sm">
              <h3 className="font-heading font-semibold text-lg text-zinc-950 dark:text-white flex items-center gap-2 mb-2">
                <MessageSquare className="h-5 w-5 text-[#D4A030]" /> Send Enquiry
              </h3>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4 leading-relaxed font-light">
                Interested in this project? Submit your contact info below.
              </p>
              
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2"
                  >
                    <span className="text-xl">🎉</span>
                    <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400">Enquiry Received!</h4>
                    <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 leading-relaxed font-light">
                      Our real estate expert will contact you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleEnquirySubmit}
                    className="space-y-3"
                  >
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-10 px-4 rounded-xl border border-zinc-200/60 dark:border-white/10 bg-zinc-50/40 dark:bg-[#0D1B3E]/40 text-xs focus:bg-white dark:focus:bg-[#0D1B3E] focus:border-[#D4A030]/50 focus:ring-2 focus:ring-[#D4A030]/10 transition-all duration-300 text-zinc-800 dark:text-white"
                    />
                    <input
                      type="email"
                      placeholder="Your Email Address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-10 px-4 rounded-xl border border-zinc-200/60 dark:border-white/10 bg-zinc-50/40 dark:bg-[#0D1B3E]/40 text-xs focus:bg-white dark:focus:bg-[#0D1B3E] focus:border-[#D4A030]/50 focus:ring-2 focus:ring-[#D4A030]/10 transition-all duration-300 text-zinc-800 dark:text-white"
                    />
                    <input
                      type="tel"
                      placeholder="Your Phone Number"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-10 px-4 rounded-xl border border-zinc-200/60 dark:border-white/10 bg-zinc-50/40 dark:bg-[#0D1B3E]/40 text-xs focus:bg-white dark:focus:bg-[#0D1B3E] focus:border-[#D4A030]/50 focus:ring-2 focus:ring-[#D4A030]/10 transition-all duration-300 text-zinc-800 dark:text-white"
                    />
                    <textarea
                      placeholder={`I'm interested in ${project.title}. Please provide more details.`}
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 rounded-xl border border-zinc-200/60 dark:border-white/10 bg-zinc-50/40 dark:bg-[#0D1B3E]/40 text-xs focus:bg-white dark:focus:bg-[#0D1B3E] focus:border-[#D4A030]/50 focus:ring-2 focus:ring-[#D4A030]/10 transition-all duration-300 text-zinc-800 dark:text-white resize-none"
                    />
                    <Button type="submit" disabled={isSubmitting} className="w-full h-10 rounded-xl font-semibold bg-[#0D1B3E] dark:bg-white text-white dark:text-[#0D1B3E] hover:bg-[#0D1B3E]/90 dark:hover:bg-white/90">
                      {isSubmitting ? "Sending..." : "Submit Enquiry"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </aside>
        </div>

        {/* ── Related Projects Section ────────────── */}
        {relatedProjects.length > 0 && (
          <div className="pt-20 border-t border-zinc-200/50 dark:border-white/10 mt-16 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-light text-2xl sm:text-3xl text-zinc-950 dark:text-white">
                Similar Projects You May Like
              </h2>
              <Link href="/projects" className="text-xs font-semibold text-[#D4A030] hover:text-[#D4A030]/90 transition-colors flex items-center gap-1">
                View All <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((property) => (
                <div key={property.id} className="group flex flex-col h-full rounded-[28px] border border-zinc-200/50 dark:border-white/5 bg-white/60 dark:bg-[#0D1B3E]/30 backdrop-blur-md overflow-hidden hover:border-[#D4A030]/40 hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-[16/10] w-full bg-zinc-100 dark:bg-white/5 overflow-hidden">
                    {property.images.length > 0 && (
                      <Image
                        src={property.images[0]}
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      />
                    )}
                    <span className="absolute top-4 right-4 text-[10px] font-bold px-3 py-1 bg-white/90 dark:bg-[#0D1B3E]/90 text-zinc-800 dark:text-white rounded-full border border-zinc-200/40 dark:border-white/10 shadow-xs">
                      {property.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow gap-5">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-base text-zinc-950 dark:text-white group-hover:text-[#D4A030] transition-colors truncate">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                        <MapPin className="h-3.5 w-3.5 text-[#D4A030] shrink-0" />
                        <span className="font-light truncate">{property.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-white/5">
                      <span className="font-heading font-bold text-sm text-[#D4A030]">
                        {formatCompactCurrency(property.price)}
                      </span>
                      <Link href={`/projects/${property.slug}`} className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-[#D4A030] dark:hover:text-[#D4A030] transition-colors">
                        Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
