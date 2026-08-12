import { useState, useEffect } from "react";
import { toast } from "sonner";

export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge?: string;
  link?: string;
  active: boolean;
  order: number;
}

export function useSlides() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSlides = async () => {
    try {
      setLoading(true);
      setError(null);
      // Ensure we hit the backend URL correctly. It usually runs on port 5000 in this project, 
      // but we should use the base API URL if configured. 
      // Assuming a standard fetch to the backend.
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
      const response = await fetch(`${baseUrl}/slides`);
      if (!response.ok) {
        throw new Error("Failed to fetch slides");
      }
      const json = await response.json();
      if (json.success && json.data) {
        setSlides(json.data);
      } else {
        throw new Error(json.message || "Failed to fetch slides");
      }
    } catch (err: any) {
      console.error("Error fetching slides:", err);
      setError(err.message);
      // Fallback to dummy data if backend fails
      setSlides([
        { id: "fallback-1", title: "Premium Real Estate Plot 1", subtitle: "Experience luxury living", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=800&fit=crop&q=80", badge: "FEATURED", active: true, order: 1 },
        { id: "fallback-2", title: "Premium Real Estate Plot 2", subtitle: "Experience luxury living", image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=800&fit=crop&q=80", badge: "PREMIUM", active: true, order: 2 },
        { id: "fallback-3", title: "Premium Real Estate Plot 3", subtitle: "Experience luxury living", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=800&fit=crop&q=80", badge: "FEATURED", active: true, order: 3 },
        { id: "fallback-4", title: "Premium Real Estate Plot 4", subtitle: "Experience luxury living", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=800&fit=crop&q=80", badge: "PREMIUM", active: true, order: 4 },
        { id: "fallback-5", title: "Premium Real Estate Plot 5", subtitle: "Experience luxury living", image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&h=800&fit=crop&q=80", badge: "FEATURED", active: true, order: 5 },
        { id: "fallback-6", title: "Premium Real Estate Plot 6", subtitle: "Experience luxury living", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=800&fit=crop&q=80", badge: "PREMIUM", active: true, order: 6 },
        { id: "fallback-7", title: "Premium Real Estate Plot 7", subtitle: "Experience luxury living", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&h=800&fit=crop&q=80", badge: "FEATURED", active: true, order: 7 },
        { id: "fallback-8", title: "Premium Real Estate Plot 8", subtitle: "Experience luxury living", image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&h=800&fit=crop&q=80", badge: "PREMIUM", active: true, order: 8 },
      ]);
      toast.error("Failed to load hero slides from database.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  return { slides, loading, error, refetch: fetchSlides };
}
