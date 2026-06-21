"use client";

import { createContext, useContext } from "react";
import type { CMSState, CMSAction } from "@/types";

export const initialState: CMSState = {
  siteSettings: {
    siteName: "EstateHub",
    logo: "",
    contactEmail: "hello@estatehub.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Real Estate Ave, Suite 100, New York, NY 10001",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  menu: [
    { id: "1", label: "Home", href: "/", order: 1 },
    { id: "2", label: "Properties", href: "/properties", order: 2 },
    { id: "3", label: "About", href: "/about", order: 3 },
    { id: "4", label: "Blog", href: "/blog", order: 4 },
    { id: "5", label: "Careers", href: "/careers", order: 5 },
    { id: "6", label: "Contact", href: "/contact", order: 6 },
  ],
  properties: [],
  team: [],
  blog: [],
  pages: [],
  theme: {
    primaryColor: "hsl(221, 83%, 24%)",
    secondaryColor: "hsl(40, 96%, 53%)",
    fontFamily: "Inter",
    mode: "system",
  },
  media: [],
  leads: [],
  seo: {
    home: {
      title: "EstateHub - Find Your Dream Home",
      description: "Premium real estate listings for modern living.",
    },
    about: { title: "About Us - EstateHub", description: "" },
    properties: { title: "Properties - EstateHub", description: "" },
    blog: { title: "Blog - EstateHub", description: "" },
    contact: { title: "Contact Us - EstateHub", description: "" },
    careers: { title: "Careers - EstateHub", description: "" },
  },
};

interface CMSContextType {
  state: CMSState;
  dispatch: (action: CMSAction) => void;
}

export const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
("use client");

import { createContext, useContext } from "react";
import type { CMSState, CMSAction } from "@/types";

export const initialState: CMSState = {
  siteSettings: {
    siteName: "EstateHub",
    logo: "",
    contactEmail: "hello@estatehub.com",
    contactPhone: "+1 (555) 123-4567",
    address: "123 Real Estate Ave, Suite 100, New York, NY 10001",
    social: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
      linkedin: "https://linkedin.com",
    },
  },
  menu: [
    { id: "1", label: "Home", href: "/", order: 1 },
    { id: "2", label: "Properties", href: "/properties", order: 2 },
    { id: "3", label: "About", href: "/about", order: 3 },
    { id: "4", label: "Blog", href: "/blog", order: 4 },
    { id: "5", label: "Careers", href: "/careers", order: 5 },
    { id: "6", label: "Contact", href: "/contact", order: 6 },
  ],
  properties: [],
  team: [],
  blog: [],
  pages: [],
  theme: {
    primaryColor: "hsl(221, 83%, 24%)",
    secondaryColor: "hsl(40, 96%, 53%)",
    fontFamily: "Inter",
    mode: "system",
  },
  media: [],
  leads: [],
  seo: {
    home: {
      title: "EstateHub - Find Your Dream Home",
      description: "Premium real estate listings for modern living.",
    },
    about: { title: "About Us - EstateHub", description: "" },
    properties: { title: "Properties - EstateHub", description: "" },
    blog: { title: "Blog - EstateHub", description: "" },
    contact: { title: "Contact Us - EstateHub", description: "" },
    careers: { title: "Careers - EstateHub", description: "" },
  },
};

interface CMSContextType {
  state: CMSState;
  dispatch: (action: CMSAction) => void;
}

export const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
