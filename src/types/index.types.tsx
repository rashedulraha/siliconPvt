/* ============================================================
 *  ESTATEHUB — TYPE DEFINITIONS
 * ============================================================ */

export interface MenuItem {
  id: string;
  label: string;
  href: string;
  order: number;
  children?: MenuItem[];
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  location: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // sqft
  type: "sale" | "rent";
  category: "apartment" | "house" | "villa" | "condo" | "land" | "commercial";
  images: string[];
  features: string[];
  agentId: string;
  status: "available" | "sold" | "rented" | "pending";
  yearBuilt?: number;
  garage?: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  email?: string;
  phone?: string;
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  authorId: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
}

export interface PageSection {
  id: string;
  type:
    | "hero"
    | "features"
    | "testimonials"
    | "cta"
    | "stats"
    | "content"
    | "gallery";
  data: Record<string, any>;
  order: number;
}

export interface PageContent {
  id: string;
  slug: string;
  title: string;
  sections: PageSection[];
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  mode: "light" | "dark" | "system";
}

export interface MediaItem {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  status: "new" | "contacted" | "qualified" | "closed";
  createdAt: string;
}

export interface SiteSettings {
  siteName: string;
  logo: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface SEOConfig {
  home: SEOData;
  about: SEOData;
  properties: SEOData;
  blog: SEOData;
  contact: SEOData;
  careers: SEOData;
}

export interface CMSState {
  siteSettings: SiteSettings;
  menu: MenuItem[];
  properties: Property[];
  team: TeamMember[];
  blog: BlogPost[];
  pages: PageContent[];
  theme: ThemeConfig;
  media: MediaItem[];
  leads: Lead[];
  seo: SEOConfig;
}

export type CMSAction =
  | { type: "SET_STATE"; payload: CMSState }
  | { type: "UPDATE_SITE_SETTINGS"; payload: Partial<SiteSettings> }
  | { type: "ADD_MENU_ITEM"; payload: MenuItem }
  | { type: "UPDATE_MENU_ITEM"; payload: MenuItem }
  | { type: "DELETE_MENU_ITEM"; payload: string }
  | { type: "REORDER_MENU"; payload: MenuItem[] }
  | { type: "ADD_PROPERTY"; payload: Property }
  | { type: "UPDATE_PROPERTY"; payload: Property }
  | { type: "DELETE_PROPERTY"; payload: string }
  | { type: "ADD_TEAM_MEMBER"; payload: TeamMember }
  | { type: "UPDATE_TEAM_MEMBER"; payload: TeamMember }
  | { type: "DELETE_TEAM_MEMBER"; payload: string }
  | { type: "ADD_BLOG_POST"; payload: BlogPost }
  | { type: "UPDATE_BLOG_POST"; payload: BlogPost }
  | { type: "DELETE_BLOG_POST"; payload: string }
  | { type: "ADD_LEAD"; payload: Lead }
  | { type: "UPDATE_LEAD"; payload: Partial<Lead> & { id: string } }
  | { type: "DELETE_LEAD"; payload: string }
  | { type: "ADD_MEDIA"; payload: MediaItem }
  | { type: "DELETE_MEDIA"; payload: string }
  | { type: "UPDATE_THEME"; payload: Partial<ThemeConfig> }
  | { type: "UPDATE_SEO"; payload: { page: keyof SEOConfig; data: SEOData } }
  | { type: "UPDATE_PAGE"; payload: PageContent }
  | { type: "RESET_STATE" };
