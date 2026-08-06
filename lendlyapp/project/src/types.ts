export type ListingType = 'borrow' | 'rent';

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  listing_type: ListingType;
  image_url: string;
  price: number;
  borrow_duration: string | null;
  owner_name: string;
  house_number: string;
  street: string;
  city: string;
  latitude: number;
  longitude: number;
  house_image_url: string;
  available: boolean;
  created_at: string;
}

export type ItemDraft = Omit<Item, 'id' | 'created_at' | 'available'>;
