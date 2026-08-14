export type Category = 'All' | 'Editorial' | 'Nature & Sunset' | 'Urban & Fashion' | 'Coastal & Resort';
export type Language = 'es-AR' | 'en';

export interface LocalizedText {
  'es-AR': string;
  'en': string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: LocalizedText;
  caption?: LocalizedText;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface StorySection {
  text: LocalizedText;
  image?: GalleryImage;
  pullQuote?: {
    text: LocalizedText;
    author?: string;
  };
}

export interface Album {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  category: Category;
  date: LocalizedText;
  location: LocalizedText;
  photographer: string;
  stylist: string;
  readTime: LocalizedText;
  coverImage: string;
  shortExcerpt: LocalizedText;
  fullStory: {
    intro: LocalizedText;
    sections: StorySection[];
    behindTheScenesNote?: LocalizedText;
  };
  mainPicture: GalleryImage;
  allImages: GalleryImage[];
  tags: string[];
  featured?: boolean;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  companyOrAgency: string;
  collaborationType: string;
  projectDate?: string;
  budgetRange: string;
  message: string;
}

export type ThemeMode = 'dark' | 'light';
export type PageRoute = 'home' | 'gallery' | 'contact' | 'album-detail';
