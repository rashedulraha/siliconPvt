"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
  Calendar,
  Users,
  Building2,
  TrendingUp,
  Shield,
  Award,
  CreditCard,
  UserCheck,
  MessageCircle,
  Play,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Sparkles,
  ChevronRight,
  Home,
  Briefcase,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/layout/Container";
import { PageSEO } from "@/components/seo/PageSEO";
import { useCMS } from "@/context/CMSContext";
import { useProperties } from "@/hooks/useProperties";
import { useBlog } from "@/hooks/useBlog";
import { useTeam } from "@/hooks/useTeam";
import { useState } from "react";

export default function HomePage() {
  const { state } = useCMS();
  const { properties } = useProperties();
  const { posts } = useBlog();
  const { team } = useTeam();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    message: "",
  });

  const featuredProperties = properties.slice(0, 3);
  const recentPosts = posts.slice(0, 3);

  const stats = [
    { icon: Calendar, value: "10+", label: "Years of Excellence" },
    { icon: Users, value: "1500+", label: "Happy Clients" },
    { icon: Building2, value: "25+", label: "Projects Completed" },
    { icon: TrendingUp, value: "800+", label: "Acres Developed" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Legal Security",
      description:
        "All projects are legally verified & approved by relevant authorities.",
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description:
        "Strategically located in high growth areas with great future potential.",
    },
    {
      icon: CreditCard,
      title: "Easy Payments",
      description:
        "Flexible installment facilities to make your investment easier.",
    },
    {
      icon: UserCheck,
      title: "Expert Team",
      description:
        "Experienced professionals always ready to support you at every step.",
    },
  ];

  const highlights = [
    "RAJUK & Govt. Approved Projects",
    "100% Legal & Transparent",
    "Easy Installment Facilities",
    "Prime Locations with High ROI",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you! We'll contact you soon.");
  };

  return (
    <>
      <PageSEO
        title={state.seo.home.title}
        description={state.seo.home.description}
      />

      {/* Hero Section - Using Custom Utilities */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
            alt="Premium Real Estate"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
          {/* Decorative Orbs */}
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-60 -left-60 w-[800px] h-[800px] bg-primary-foreground/5 rounded-full blur-3xl" />
        </div>

        <Container className="relative z-10 py-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8">
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                <Sparkles className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium text-white/90">
                  #1 Trusted Real Estate Developer in Bangladesh
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4">
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                  <span className="text-white">Build Your</span>
                  <br />
                  <span className="text-gradient">Dream</span>
                  <span className="text-white"> with</span>
                  <br />
                  <span className="text-white">Premium Land</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed font-light">
                  Discover secure, RAJUK-approved land investments with
                  transparent documentation and exceptional growth potential.
                </p>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2">
                {highlights.slice(0, 3).map((item, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 border border-white/10">
                    {item}
                  </span>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  className="group bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 rounded-full text-base font-semibold shadow-premium-xl hover:shadow-2xl transition-all duration-300">
                  <Link href="/projects">
                    Explore Properties
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="text-white hover:text-white hover:bg-white/10 px-6 py-6 rounded-full text-base">
                  <Link href="/contact">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Sales
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/5 px-4 py-6 rounded-full text-base">
                  <Link href="#">
                    <Play className="mr-2 h-4 w-4" />
                    Watch Story
                  </Link>
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold text-white">10+</div>
                  <div className="text-sm text-white/60 mt-0.5">Years</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">1500+</div>
                  <div className="text-sm text-white/60 mt-0.5">Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">25+</div>
                  <div className="text-sm text-white/60 mt-0.5">Projects</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Glass Card (Using custom glass utility) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative">
              <div className="glass rounded-3xl p-8 shadow-premium-xl border border-white/10">
                {/* Card Header */}
                <div className="mb-8 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
                    <Star className="h-3.5 w-3.5 text-secondary" />
                    <span className="text-xs font-medium text-secondary">
                      Premium Service
                    </span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground">
                    Book Your Site Visit
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get a free consultation from our experts
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-3">
                    <Input
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="h-12 bg-background/50 border-border text-foreground placeholder:text-muted-foreground rounded-xl focus:ring-2 focus:ring-secondary/50"
                    />
                    <Input
                      placeholder="Phone Number"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                      className="h-12 bg-background/50 border-border text-foreground placeholder:text-muted-foreground rounded-xl focus:ring-2 focus:ring-secondary/50"
                    />
                    <Input
                      placeholder="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="h-12 bg-background/50 border-border text-foreground placeholder:text-muted-foreground rounded-xl focus:ring-2 focus:ring-secondary/50"
                    />
                    <select
                      className="w-full h-12 px-4 rounded-xl border border-border bg-background/50 text-foreground text-sm focus:ring-2 focus:ring-secondary/50"
                      value={formData.project}
                      onChange={(e) =>
                        setFormData({ ...formData, project: e.target.value })
                      }
                      required>
                      <option value="">Select a Project</option>
                      <option value="silicon-green-city">
                        Silicon Green City
                      </option>
                      <option value="silicon-village">Silicon Village</option>
                      <option value="silicon-smart-city">
                        Silicon Smart City
                      </option>
                    </select>
                    <Textarea
                      placeholder="Your Message (Optional)"
                      rows={2}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="resize-none bg-background/50 border-border text-foreground placeholder:text-muted-foreground rounded-xl focus:ring-2 focus:ring-secondary/50 min-h-[80px]"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-12 rounded-xl font-semibold text-base shadow-premium-lg hover:shadow-premium-xl transition-all duration-300">
                    Submit Request
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                {/* Trust Badge */}
                <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-secondary" />
                    100% Secure
                  </span>
                  <span className="w-px h-4 bg-border" />
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-secondary" />
                    Free Consultation
                  </span>
                </div>
              </div>

              {/* Floating WhatsApp Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -bottom-4 -right-4">
                <a
                  href="https://wa.me/8801712345678"
                  className="flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-2xl shadow-premium-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Chat on WhatsApp</span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Bar - Using Custom Utilities */}
      <section className="relative -mt-12 z-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-card/80 backdrop-blur-xl rounded-2xl p-6 text-center border border-border/50 shadow-premium-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <stat.icon className="h-8 w-8 text-secondary mx-auto mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-24">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
                <Building2 className="h-3.5 w-3.5 text-secondary" />
                <span className="text-xs font-medium text-secondary">
                  About Us
                </span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Building <span className="text-gradient">Future-Ready</span>{" "}
                Communities
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                Silicon Real Estate (Pvt.) Ltd. is a trusted name in land
                development and real estate investment. We are committed to
                delivering premium plots with legal security, modern
                infrastructure and high investment returns.
              </p>
              <div className="space-y-3 mb-8">
                {highlights.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
              <Button
                asChild
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-full shadow-premium-lg hover:shadow-premium-xl transition-all duration-300">
                <Link href="/about">
                  Learn More About Us
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-premium-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600"
                      alt="Modern Architecture"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-2xl bg-secondary/10 p-6 flex items-center justify-center border border-secondary/20 shadow-premium">
                    <div className="text-center">
                      <Award className="h-10 w-10 text-secondary mx-auto mb-2" />
                      <p className="font-semibold text-foreground">
                        Our Mission
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 max-w-[120px] mx-auto">
                        Provide secure & profitable investments
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-square rounded-2xl bg-primary/5 p-6 flex items-center justify-center border border-primary/10 shadow-premium">
                    <div className="text-center">
                      <Play className="h-10 w-10 text-primary mx-auto mb-2" />
                      <p className="font-semibold text-foreground">
                        Our Vision
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 max-w-[120px] mx-auto">
                        Bangladesh's most trusted real estate company
                      </p>
                    </div>
                  </div>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-premium-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
                      alt="Team"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-muted/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
                <Briefcase className="h-3.5 w-3.5 text-secondary" />
                <span className="text-xs font-medium text-secondary">
                  Projects
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Our <span className="text-gradient">Featured</span> Projects
              </h2>
            </div>
            <Button asChild variant="ghost" className="mt-4 md:mt-0 group">
              <Link href="/projects" className="flex items-center gap-2">
                View All Projects
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property, i) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}>
                <Link
                  href={`/properties/${property.slug}`}
                  className="group block">
                  <div className="bg-card rounded-2xl overflow-hidden shadow-premium-lg hover:shadow-premium-xl transition-all duration-500 border border-border/50 group-hover:border-secondary/30">
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={
                          property.images[0] ||
                          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"
                        }
                        alt={property.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">
                          {property.status === "available"
                            ? "Ongoing"
                            : "Upcoming"}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-1 text-foreground group-hover:text-secondary transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {property.location}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {property.bedrooms} Katha
                        </span>
                        <span className="font-semibold text-secondary">
                          ৳{property.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
              <Star className="h-3.5 w-3.5 text-secondary" />
              <span className="text-xs font-medium text-secondary">
                Why Choose Us
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
              Premium <span className="text-gradient">Investment</span> Features
            </h2>
            <p className="text-muted-foreground text-lg mt-4">
              We prioritize legal security, prime locations and customer
              satisfaction to ensure the best return on your investment.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-secondary/30 shadow-premium-lg hover:shadow-premium-xl transition-all duration-300 hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Blog Section */}
      <section className="py-24 bg-muted/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 mb-4">
                <Sparkles className="h-3.5 w-3.5 text-secondary" />
                <span className="text-xs font-medium text-secondary">Blog</span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                Latest <span className="text-gradient">Insights</span> & News
              </h2>
            </div>
            <Button asChild variant="ghost" className="mt-4 md:mt-0 group">
              <Link href="/blog" className="flex items-center gap-2">
                View All Articles
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="bg-card rounded-2xl overflow-hidden shadow-premium-lg hover:shadow-premium-xl transition-all duration-500 border border-border/50">
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-semibold px-3 py-2 rounded-lg text-center">
                        <div className="text-lg font-bold">
                          {new Date(post.publishedAt).getDate()}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider">
                          {new Date(post.publishedAt).toLocaleString(
                            "default",
                            { month: "short" },
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-secondary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <span className="text-sm font-semibold text-secondary flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-gradient-premium rounded-3xl p-12 md:p-16 overflow-hidden shadow-premium-xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Invest in Your Future?
                </h2>
                <p className="text-white/80 text-lg">
                  Choose a secure investment. Choose Silicon Real Estate.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-6 rounded-full text-base font-semibold shadow-premium-xl hover:shadow-2xl transition-all duration-300">
                  <Link href="/contact">
                    <Calendar className="h-4 w-4" />
                    Book Site Visit
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-6 rounded-full text-base">
                  <Link href="/contact">
                    <Phone className="h-4 w-4" />
                    Talk to Sales
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
