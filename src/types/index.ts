export type ArtForm =
  | "Pattachitra"
  | "Madhubani"
  | "Warli"
  | "Gond"
  | "Kalamkari"
  | "Pichwai"
  | "Phad"
  | "Miniature"
  | "Tanjore"
  | "Cheriyal";

export type BasicFrame = "Black" | "Brown";
export type GlassOption = "None" | "Normal Glass" | "Flexi Glass";
export type ArtworkStatus = "Published" | "Draft" | "Hidden" | "Sold";

export interface Frame {
  id: string;
  name: BasicFrame;
  pricePerSqM: number;
  available: boolean;
  cornerImageUrl?: string;
}

export interface Glass {
  id: string;
  name: GlassOption;
  description: string;
  pricePerSqM: number;
  available: boolean;
}

export interface Painting {
  id: string;
  slug: string;
  title: string;
  price: number;
  description: string;
  story: string;
  origin: string;
  supplierSlug: string;
  artForm: ArtForm;
  theme: "Patra" | "Krishna" | "Ganesha" | "Buddha" | "Durga" | "Saraswati" | "Garuda" | "Rama" | "Vishnu" | "Lakshmi" | "Jagannath";
  tags?: string[];
  variantGroup?: string;
  variantLabel?: string;
  giftingCollection?: string | null;
  dimensions: string;
  frameAvailable: boolean;
  inStock: boolean;
  sold: boolean;
  featured: boolean;
  status: ArtworkStatus;
  palette: [string, string, string];
  coverImageUrl?: string;
  galleryImageUrls?: string[];
  imageRotation?: 0 | 90 | 180 | 270;
}

export interface Supplier {
  slug: string;
  name: string;
  location: string;
  artForm: ArtForm;
  history: string;
  artisanStory: string;
  comingSoon: boolean;
  palette: [string, string, string];
  coverImageUrl?: string;
  galleryImageUrls?: string[];
  imageRotation?: 0 | 90 | 180 | 270;
}

export interface CartItem {
  painting: Painting;
  frame: BasicFrame | "None";
  glass: GlassOption;
  glassCost: number;
  customFrame: boolean;
  quantity: number;
}

export interface AdminArtwork extends Painting {
  coverImageUrl?: string;
  galleryImageUrls: string[];
  publishStatus: ArtworkStatus;
}
