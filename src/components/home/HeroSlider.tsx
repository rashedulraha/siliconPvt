"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

const heroSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80",
    tag: "RAJUK Approved",
    title: "Build Your Legacy",
    highlight: "on Verified Land",
    description:
      "Secure, fully-documented plots with transparent paperwork and exceptional growth potential.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80",
    tag: "Master Planned",
    title: "High-ROI Living",
    highlight: "Carefully Surveyed",
    description:
      "Infrastructure and plot layouts designed around real growth corridors.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80",
    tag: "100% Transparent",
    title: "Own Land You Can",
    highlight: "Actually Verify",
    description:
      "Clean deeds, flexible installments, and a team that walks the plot with you.",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === heroSlides.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you! We'll contact you soon.");
  };

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full">
            <Image
              src={heroSlides[currentSlide].image}
              alt="Premium Real Estate"
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, 
              var(--background) 0%, 
              var(--background) 40%, 
              transparent 75%
            )`,
          }}
        />
      </div>

      <Container className="relative z-10 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full py-16">
          {/* Left Content */}
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5">
            {/* Tag */}
            <div
              className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-foreground)",
                opacity: 0.85,
              }}>
              {heroSlides[currentSlide].tag}
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight"
              style={{ color: "var(--foreground)" }}>
              {heroSlides[currentSlide].title}
              <br />
              <span style={{ color: "var(--accent)" }}>
                {heroSlides[currentSlide].highlight}
              </span>
            </h1>

            {/* Description */}
            <p
              className="text-base max-w-md leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}>
              {heroSlides[currentSlide].description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap items-center gap-5 text-sm">
              <span
                className="flex items-center gap-2"
                style={{ color: "var(--muted-foreground)" }}>
                <CheckCircle
                  className="h-4 w-4"
                  style={{ color: "var(--accent)" }}
                />
                RAJUK Approved
              </span>
              <span
                className="flex items-center gap-2"
                style={{ color: "var(--muted-foreground)" }}>
                <CheckCircle
                  className="h-4 w-4"
                  style={{ color: "var(--accent)" }}
                />
                100% Legal
              </span>
              <span
                className="flex items-center gap-2"
                style={{ color: "var(--muted-foreground)" }}>
                <CheckCircle
                  className="h-4 w-4"
                  style={{ color: "var(--accent)" }}
                />
                No Hidden Cost
              </span>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { value: "25+", label: "Projects" },
                { value: "1500+", label: "Clients" },
                { value: "800+", label: "Acres" },
              ].map((stat, idx) => (
                <div key={idx}>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "var(--foreground)" }}>
                    {stat.value}
                  </div>
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "var(--muted-foreground)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                asChild
                className="px-6 h-11 rounded-lg text-sm font-medium transition-opacity hover:opacity-85"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-foreground)",
                }}>
                <Link href="/projects" className="flex items-center">
                  Explore Properties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="px-5 h-11 rounded-lg text-sm font-medium transition-colors hover:bg-muted/50"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}>
                <Link href="/contact" className="flex items-center">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact
                </Link>
              </Button>
            </div>

            {/* Dots */}
            <div className="flex gap-2 pt-4">
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className="transition-all duration-500 rounded-full h-1.5"
                  style={{
                    width: idx === currentSlide ? "24px" : "6px",
                    backgroundColor:
                      idx === currentSlide ? "var(--accent)" : "var(--border)",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            key={`form-${currentSlide}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-sm mx-auto lg:ml-auto">
            <div
              className="rounded-xl p-6"
              style={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
              }}>
              <div className="mb-5">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "var(--card-foreground)" }}>
                  Book a Visit
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--muted-foreground)" }}>
                  Free consultation
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm transition-colors focus:outline-none"
                  style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm transition-colors focus:outline-none"
                  style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg text-sm transition-colors focus:outline-none"
                  style={{
                    backgroundColor: "var(--background)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                />
                <Button
                  type="submit"
                  className="w-full h-10 rounded-lg text-sm font-medium transition-opacity hover:opacity-85"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-foreground)",
                  }}>
                  Send Request
                </Button>
              </form>

              <div className="mt-4 flex items-center justify-center gap-4 text-xs">
                <span style={{ color: "var(--muted-foreground)" }}>
                  🔒 Secure
                </span>
                <span
                  className="w-px h-3"
                  style={{ backgroundColor: "var(--border)" }}
                />
                <span style={{ color: "var(--muted-foreground)" }}>
                  🕐 24/7 Support
                </span>
                <span
                  className="w-px h-3"
                  style={{ backgroundColor: "var(--border)" }}
                />
                <span style={{ color: "var(--muted-foreground)" }}>
                  🆓 Free Visit
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
