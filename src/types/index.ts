export type Language = 'ar' | 'en';

export type UnitStatus = 'available' | 'reserved' | 'sold';

export type Building = 'A' | 'B' | 'C' | 'D' | 'E';

export interface Unit {
  id: string;
  building: Building;
  floor: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  status: UnitStatus;
  features: string[];
}

export interface LeadFormData {
  name: string;
  phone: string;
  selectedUnit: string;
  message?: string;
  timestamp: string;
}

export interface Stats {
  available: number;
  reserved: number;
  sold: number;
  avgPrice: number;
  total: number;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  altAr: string;
  category: string;
}

export interface Translation {
  [key: string]: string | Translation;
}
