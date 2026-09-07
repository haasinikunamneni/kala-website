export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      suppliers: {
        Row: {
          id: string;
          slug: string;
          name: string;
          location: string;
          art_form: string;
          history: string;
          artisan_story: string;
          coming_soon: boolean;
          palette: string[];
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["suppliers"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["suppliers"]["Insert"]>;
      };

      artworks: {
        Row: {
          id: string;
          slug: string;
          title: string;
          price: number;
          description: string;
          story: string;
          origin: string;
          supplier_slug: string;
          art_form: string;
          dimensions: string;
          frame_available: boolean;
          in_stock: boolean;
          sold: boolean;
          featured: boolean;
          status: "Draft" | "Published" | "Hidden" | "Sold";
          palette: string[];
          cover_image_url: string | null;
          gallery_image_urls: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["artworks"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["artworks"]["Insert"]>;
      };

      frames: {
        Row: {
          id: string;
          name: string;
          price_per_sqm: number;
          available: boolean;
          corner_image_url: string | null;
          unit: "sqm" | "sqft";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["frames"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["frames"]["Insert"]>;
      };

      glass_options: {
        Row: {
          id: string;
          name: string;
          description: string;
          price_per_sqm: number;
          available: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["glass_options"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["glass_options"]["Insert"]>;
      };

      custom_frame_images: {
        Row: {
          id: string;
          url: string;
          label: string | null;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["custom_frame_images"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["custom_frame_images"]["Insert"]>;
      };

      orders: {
        Row: {
          id: string;
          customer_name: string;
          customer_email: string | null;
          customer_phone: string | null;
          artwork_id: string;
          artwork_title: string;
          frame: string;
          glass: string;
          custom_frame: boolean;
          price: number;
          status: "Pending" | "Confirmed" | "Sold" | "Delivered";
          channel: "WhatsApp" | "Instagram" | "Email";
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };

      custom_orders: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          dimensions: string | null;
          budget: string | null;
          frame_preference: string | null;
          message: string;
          reference_image_url: string | null;
          status: "New" | "In Review" | "In Progress" | "Completed" | "Declined";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["custom_orders"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["custom_orders"]["Insert"]>;
      };

      gifting_requests: {
        Row: {
          id: string;
          company: string;
          event_type: string;
          quantity: number;
          budget: string | null;
          required_by: string | null;
          requirements: string | null;
          status: "New" | "Quoted" | "Confirmed" | "Delivered" | "Closed";
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["gifting_requests"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["gifting_requests"]["Insert"]>;
      };

      messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          message: string;
          read: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["messages"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
      };

      settings: {
        Row: {
          id: string;
          key: string;
          value: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["settings"]["Row"], "id" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["settings"]["Insert"]>;
      };
    };
  };
}
