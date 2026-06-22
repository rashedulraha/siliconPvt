"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
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
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Container } from "@/components/layout/Container";
import { PropertyGrid } from "@/components/property/PropertyGrid";
import { BlogCard } from "@/components/blog/BlogCard";
import { PageSEO } from "@/components/seo/PageSEO";
import { useCMS } from "@/context/CMSContext";
import { useProperties } from "@/hooks/useProperties";
import { useBlog } from "@/hooks/useBlog";
import { useTeam } from "@/hooks/useTeam";
import { useState } from "react";

export default function HomePage() {
  const { state } = useCMS();
  const { getFeaturedProperties } = useProperties();
  const { getRecentPosts } = useBlog();
  const { team } = useTeam();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    project: "",
    message: "",
  });

  const featuredProperties = getFeaturedProperties(3);
  const recentPosts = getRecentPosts(3);

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
    // Handle form submission
    console.log(formData);
    alert("Thank you! We'll contact you soon.");
  };

  return (
    <>
      <PageSEO
        title={state.seo.home.title}
        description={state.seo.home.description}
      />

      {/* Top Bar */}
      <div className="bg-primary text-white py-2 text-sm hidden md:block">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a
                href="tel:+8801712345678"
                className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Phone className="h-3.5 w-3.5" />
                <span>+880 1712 345 678</span>
              </a>
              <a
                href="mailto:info@siliconrealestate.com"
                className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Mail className="h-3.5 w-3.5" />
                <span>info@siliconrealestate.com</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" />
                <span>
                  2/3 (2nd Floor), Block A, Iqbal Road, Mohammadpur, Dhaka-1207
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-secondary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
              <a href="#" className="hover:text-secondary transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>

        <Container className="relative z-10 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Your Trusted Partner in{" "}
                <span className="text-secondary">
                  Land Development & Plot Investment
                </span>
              </h1>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                We provide secure, profitable and legally verified land
                investment opportunities in prime locations across Bangladesh.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8">
                  <Link href="/projects">
                    View Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8">
                  <Link href="/contact">
                    <Phone className="mr-2 h-4 w-4" />
                    Contact Sales
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-lg shadow-2xl p-6 md:p-8">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-1">
                  GET IN TOUCH
                </p>
                <h2 className="font-display text-2xl font-bold text-primary">
                  Book Your <span className="text-secondary">Site Visit</span>
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
                <select
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                  value={formData.project}
                  onChange={(e) =>
                    setFormData({ ...formData, project: e.target.value })
                  }
                  required>
                  <option value="">Interested Project</option>
                  <option value="silicon-green-city">Silicon Green City</option>
                  <option value="silicon-village">Silicon Village</option>
                  <option value="silicon-smart-city">Silicon Smart City</option>
                </select>
                <Textarea
                  placeholder="Your Message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-primary font-semibold">
                  SUBMIT NOW
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-8 z-20">
        <Container>
          <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center">
                <stat.icon className="h-8 w-8 text-secondary mx-auto mb-2" />
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div>
              <p className="text-sm font-semibold text-secondary mb-2">
                ABOUT SILICON REAL ESTATE
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-6">
                Building Future-Ready Communities
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Silicon Real Estate (Pvt.) Ltd. is a trusted name in land
                development and real estate investment. We are committed to
                delivering premium plots with legal security, modern
                infrastructure and high investment returns.
              </p>
              <ul className="space-y-3 mb-8">
                {highlights.map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-white">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Right Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600"
                      alt="Office Building"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/10 p-6 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="h-12 w-12 text-secondary mx-auto mb-2" />
                      <p className="font-semibold text-primary">Our Vision</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        To become Bangladesh's most trusted real estate company
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-primary p-6 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Award className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-semibold">Our Mission</p>
                      <p className="text-xs opacity-90 mt-1">
                        To provide secure and profitable land investment
                        opportunities
                      </p>
                    </div>
                  </div>
                  <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
                      alt="Team Meeting"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="py-16 md:py-20 bg-muted/30">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-secondary mb-2">
                FEATURED PROJECTS
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
                Our Ongoing Projects
              </h2>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <PropertyGrid properties={featuredProperties} />
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <div>
              <p className="text-sm font-semibold text-secondary mb-2">
                WHY CHOOSE US
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                We Provide The Best For Your{" "}
                <span className="text-secondary">Investment</span>
              </h2>
              <p className="text-white/80 leading-relaxed">
                We prioritize legal security, prime locations and customer
                satisfaction to ensure the best return on your investment.
              </p>
              <Button
                asChild
                className="mt-6 bg-secondary hover:bg-secondary/90 text-primary">
                <Link href="/about">
                  Discover More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-lg p-6 text-primary">
                  <feature.icon className="h-10 w-10 text-secondary mb-3" />
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trust Bar */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {team.slice(0, 4).map((member) => (
                  <div
                    key={member.id}
                    className="h-12 w-12 rounded-full border-2 border-white overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                ))}
                <div className="h-12 w-12 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-primary font-semibold text-sm">
                  +
                </div>
              </div>
              <div>
                <p className="font-semibold">
                  Trusted by 1500+ Happy Customers
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-white/80">
                  Need Help? Call Our Expert
                </p>
                <a
                  href="tel:+8801712345678"
                  className="text-xl font-bold hover:text-secondary transition-colors">
                  +880 1712 345 678
                </a>
              </div>
              <Button className="bg-[#25D366] hover:bg-[#20BD5A] text-white">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Latest News & Blog */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <p className="text-sm font-semibold text-secondary mb-2">
                LATEST NEWS & BLOG
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary">
                Stay Updated With Real Estate{" "}
                <span className="text-secondary">Insights</span>
              </h2>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link href="/blog">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-white">
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Ready to Invest in Your Future?
              </h2>
              <p className="text-white/80 text-lg">
                Choose a secure investment. Choose Silicon Real Estate.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8">
                <Link href="/contact">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Site Visit
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8">
                <Link href="/contact">
                  <Phone className="mr-2 h-4 w-4" />
                  Talk to Sales
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
