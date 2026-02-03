
export type UserRole = 'admin' | 'cashier' | 'user';
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'rejected';

export interface User {
  phone: string;
  name: string;
  email?: string;
  stamps: number;
  points: number;
  role: UserRole;
  img: string;
}

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  img: string;
}

export interface Category {
  id: number;
  name: string;
  items: MenuItem[];
}

export interface SliderItem {
  id: number;
  url: string;
  type: 'image' | 'video';
}

export interface Order {
  id: string;
  customerPhone: string;
  customerName: string;
  customerTier?: string;
  customerPoints?: number;
  items: MenuItem[];
  total: number;
  status: OrderStatus;
  timestamp: number;
  pickupTime: string; 
  pickupTimestamp?: number;
  customerNote?: string;
  customerAttachment?: string;
  customerLocation?: {
    latitude: number;
    longitude: number;
  };
}

export interface GalleryPost {
  id: number;
  type: 'image' | 'video';
  url: string;
  caption: string;
  likes: number;
  likedBy: string[];
  timestamp: number;
}

export interface WorkingDay {
  day: string;
  from: string;
  to: string;
  isClosed: boolean;
}

export interface AdConfig {
  active: boolean;
  type: 'image' | 'video';
  url: string;
}

export interface StoreInfo {
  name: string;
  logo: string;
  loginBg: string; 
  phone?: string;    
  whatsapp?: string; 
  cardBg: string; 
  cardFrontImg?: string; 
  cardBackImg?: string;  
  address: string;
  hours: WorkingDay[];
  gps: string;
  insta: string;
  tiktok: string;
  newOrderSound?: string;
  orderReadySound?: string;
  adConfig: AdConfig;
}
