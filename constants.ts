
import { StoreInfo, Category, User, SliderItem } from './types';

export const INITIAL_STORE_INFO: StoreInfo = {
  name: "بسترو كوفي",
  logo: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=200&h=200&fit=crop",
  loginBg: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&h=2000&fit=crop",
  phone: "+97431604084",
  whatsapp: "+97431604084",
  cardBg: "#2D1B18",
  cardFrontImg: "", 
  cardBackImg: "", 
  address: "الدوحة، قطر - فريج بن عمران",
  hours: [
    { day: "السبت", from: "06:00", to: "23:00", isClosed: false },
    { day: "الأحد", from: "06:00", to: "23:00", isClosed: false },
    { day: "الاثنين", from: "06:00", to: "23:00", isClosed: false },
    { day: "الثلاثاء", from: "06:00", to: "23:00", isClosed: false },
    { day: "الأربعاء", from: "06:00", to: "23:00", isClosed: false },
    { day: "الخميس", from: "06:00", to: "00:00", isClosed: false },
    { day: "الجمعة", from: "14:00", to: "00:00", isClosed: false },
  ],
  gps: "https://maps.google.com/?q=Villagio+Mall+Doha",
  insta: "https://www.instagram.com/",
  tiktok: "https://www.tiktok.com/",
  newOrderSound: "https://assets.mixkit.co/active_storage/sfx/1071/1071-preview.mp3",
  orderReadySound: "https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3",
  adConfig: {
    active: true,
    type: 'image',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&h=1200&fit=crop'
  }
};

export const INITIAL_MENU: Category[] = [
  { 
    id: 1, 
    name: "مشروبات ساخنة", 
    items: [
      {id: 101, name: "قهوة عربية فاخرة", price: 15, img: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=300&h=300&fit=crop"},
      {id: 102, name: "كابتشينو إيطالي", price: 22, img: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=300&h=300&fit=crop"},
      {id: 103, name: "فلات وايت", price: 20, img: "https://images.unsplash.com/photo-1512568448817-bb9a912957fc?q=80&w=300&h=300&fit=crop"}
    ] 
  },
  { 
    id: 2, 
    name: "مشروبات باردة", 
    items: [
      {id: 301, name: "آيس سبانش لاتيه", price: 25, img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?q=80&w=300&h=300&fit=crop"},
      {id: 302, name: "موهيتو فراولة منعش", price: 18, img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=300&h=300&fit=crop"}
    ] 
  }
];

export const INITIAL_SLIDER: SliderItem[] = [
  { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&h=500&fit=crop' },
  { id: 2, type: 'image', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&h=500&fit=crop' },
  { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&h=500&fit=crop' }
];

export const INITIAL_USERS: User[] = [
  {
    phone: '333',
    name: 'عميل تجريبي',
    role: 'user',
    stamps: 0, // تصفير الطوابع
    points: 0, // تصفير النقاط
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&h=100&fit=crop"
  }
];
