export interface SiteSettings {
  brand_name: string;
  tagline: string;
  instagram_handle: string;
  whatsapp_number: string;
  email: string;
  business_hours: string;
}

export const defaultSiteSettings: SiteSettings = {
  brand_name:       "kalā",
  tagline:          "Heritage, Framed for Today",
  instagram_handle: "@kala.art.in",
  whatsapp_number:  "919148835852",
  email:            "kalacontacts26@gmail.com",
  business_hours:   "Monday – Saturday, 10am – 7pm IST",
};
