export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful?: number;
  verified?: boolean;
  location?: string;
  purchaseDate?: string;
  images?: string[]; // Array of review/unboxing images
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  condition: string;
  category: string;
  brand: string;
  payeeEmail: string;
  currency: string;
  checkoutLink: string;
  reviews?: Review[];
  meta?: {
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
  };
}