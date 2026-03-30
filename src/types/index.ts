export interface Listing {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  phone: string | null;
  website: string | null;
  description: string | null;
  hours: Record<string, string> | null;
  photos: string[];
  featured: boolean;
  claimed: boolean;
  created_at: string;
  updated_at: string;
  categories?: Category[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string | null;
  listing_count?: number;
}

export interface SearchParams {
  q?: string;
  city?: string;
  state?: string;
  zip?: string;
  category?: string;
}
