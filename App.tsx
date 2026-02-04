import { supabase } from "./supabase";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  LayoutGrid as MenuIcon, 
  ClipboardList, 
  Scan, 
  Settings, 
  ShoppingBasket, 
  LogOut,
  Plus,
  Trash2,
  X,
  Coffee,
  Upload,
  Crown,
  Award,
  ShieldCheck,
  Film,
  Store,
  ImageIcon,
  Users as UsersIcon,
  Zap,
  CheckCircle2,
  Phone,
  MessageCircle,
  LayoutDashboard,
  CreditCard,
  Star,
  Languages,
  Clock,
  UtensilsCrossed,
  PackageCheck,
  BellRing,
  Wallet,
  TrendingUp,
  Receipt,
  Printer,
  Calendar,
  Send,
  MapPin,
  Timer,
  Keyboard,
  Search,
  ChefHat,
  Flame,
  Sparkles,
  MousePointer2,
  Megaphone,
  Video,
  Eye,
  Instagram,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Play,
  FileVideo,
  Link as LinkIcon,
  Globe,
  Navigation,
  Palette,
  Gift
} from 'lucide-react';
import jsQR from 'jsqr';
import { User as UserType, StoreInfo, Category, MenuItem, GalleryPost, Order, OrderStatus, WorkingDay, SliderItem } from './types';
import { INITIAL_STORE_INFO, INITIAL_MENU, INITIAL_SLIDER, INITIAL_USERS } from './constants';

// --- Translations ---
const translations = {
  ar: {
    shopName: "بسترو كوفي",
    tagline: "أصالة الضيافة القطرية",
    home: "الرئيسية",
    menu: "المنيو",
    gallery: "المعرض",
    store: "المتجر",
    orders: "طلباتي",
    scanner: "الماسح",
    admin: "الإدارة",
    login: "تسجيل دخول",
    newMember: "عضو جديد",
    phonePlaceholder: "رقم الجوال",
    namePlaceholder: "اسمك الكامل",
    confirmBtn: "تأكيد وانطلاق ✨",
    welcome: "أهلاً بك،",
    goldTier: "عضوية ذهبية",
    silverTier: "عضو مشارك",
    adminTier: "مديـر النـظام",
    cashierTier: "موظف الصندوق",
    preOrder: "اطلب مسبقاً (Pre-order)",
    preOrderSub: "قهوتك ستكون بانتظارك ساخنة",
    stampsTitle: "اجمع الطوابع (طابع لكل 20 ريال)",
    pointsTitle: "نقاط المكافأة",
    pointsSub: "1 ريال = 1 نقطة",
    loyaltyCard: "بطاقة الولاء",
    collectPointsHint: "اجمع نقاطك هنا",
    cartTitle: "سلة طلباتك",
    cartEmpty: "السلة فارغة حالياً",
    orderTotal: "إجمالي الطلب:",
    confirmOrder: "تأكيد الطلب",
    scanTitle: "نظام الولاء - مسح العميل",
    memberData: "بيانات العضو",
    billValue: "قيمة الفاتورة",
    billValueHint: "نقطة لكل ريال، وطابع لكل 20 ريال",
    updateBtn: "تحديث",
    cancelBtn: "إلغاء",
    dashboard: "الرئيسية",
    members: "الأعضاء",
    slider: "السلايدر",
    card: "تصميم البطاقة",
    vipBadge: "عضو VIP",
    free: "مجاناً",
    noOrders: "لا توجد طلبات سابقة",
    addCategory: "إضافة قسم جديد",
    addItem: "إضافة منتج",
    broadcast: "رسالة جماعية",
    copyNumbers: "نسخ الأرقام",
    sendWhatsapp: "إرسال واتساب",
    storeSettings: "إعدادات المتجر",
    uploadLogo: "تغيير الشعار",
    saveSuccess: "تم الحفظ بنجاح ✅",
    deleteConfirm: "هل أنت متأكد من الحذف؟",
    stats: "إحصائيات العمليات",
    totalCustomers: "إجمالي العملاء",
    totalItems: "المنتجات",
    totalStories: "الستوري",
    addFromDevice: "من الجهاز",
    addFromUrl: "رابط",
    urlPlaceholder: "ضع رابط الصورة هنا...",
    postBtn: "نشر الآن",
    orderTracking: "تتبع طلبك",
    orderPending: "بانتظار الموافقة",
    orderPreparing: "يتم التحضير الآن",
    orderReady: "طلبك جاهز للاستلام!",
    orderDelivered: "تم التسليم بنجاح",
    orderRejected: "نعتذر، تم رفض الطلب",
    newOrdersAlert: "تنبيه: يوجد طلبات جديدة!",
    acceptOrder: "قبول الطلب",
    rejectOrder: "رفض",
    readyOrder: "جاهز",
    completeOrder: "تم التسليم",
    totalSales: "إجمالي المبيعات",
    todaySales: "مبيعات اليوم",
    completedOrders: "الطلبات المكتملة",
    addPoints: "إضافة نقاط",
    amountSpent: "مبلغ الشراء",
    allOrders: "سجل الطلبات",
    quickActions: "اختصارات سريعة",
    salesReport: "تقرير المبيعات",
    printReport: "تصدير التقرير الاحترافي",
    selectMonth: "اختر الشهر",
    allTime: "كل الأوقات",
    filterDay: "يومي",
    filterMonth: "شهري",
    filterRange: "مخصص",
    from: "من",
    to: "إلى",
    orderDate: "التاريخ",
    orderAmount: "المبلغ",
    socialLinks: "روابط التواصل",
    workingHours: "ساعات العمل",
    gpsLink: "موقع قوقل ماب",
    instaLink: "رابط الإنستقرام",
    tiktokLink: "رابط التيك توك",
    open: "مفتوح",
    closed: "مغلق",
    accessDenied: "عذراً، لا تملك صلاحية الوصول لهذه الصفحة",
    selectPickupTime: "اختر وقت الاستلام",
    pickupASAP: "بأسرع وقت (15 دقيقة)",
    pickup30m: "بعد 30 دقيقة",
    pickup1h: "بعد ساعة",
    pickupCustom: "تحديد وقت مخصص",
    customerLocation: "موقع العميل",
    customerInfo: "معلومات العميل",
    viewOnMap: "عرض على الخريطة",
    manualEntry: "إدخل يدوي",
    searchByPhone: "بحث برقم الجوال",
    phoneNotFound: "هذا الرقم غير مسجل في النظام",
    searchCustomer: "بحث عن العميل",
    orderNoteLabel: "ملاحظات إضافية (اختياري)",
    orderNotePlaceholder: "مثلاً: بدون سكر، زيادة ثلج...",
    orderPhotoLabel: "إرفاق صورة (اختياري)",
    attachment: "مرفق",
    hours: "الساعة",
    minutes: "الدقيقة",
    minTimeError: "يجب أن يكون الوقت بعد 15 دقيقة على الأقل من الآن",
    maxTimeError: "عذراً، أقصى مدة للطلب المسبق هي 48 ساعة",
    reminderDue: "تذكير: بدء التحضير!",
    reminderDueSub: "موعد الاستلام اقترب (أقل من 90 دقيقة)",
    timeLeft: "الوقت المتبقي:",
    overdue: "متأخر!",
    image: "صورة",
    video: "فيديو",
    days: ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"],
    chefPending: "الشيف يراجع الوصفة..",
    chefPreparing: "تحضر بكل حب..",
    chefReady: "تفضل، طلبك جاهز!",
    adManagement: "إدارة الإعلان المنبثق",
    adActive: "تفعيل الإعلان",
    adType: "نوع الإعلان",
    adUrl: "رابط الإعلان (صورة/فيديو)",
    loginBgLabel: "خلفية صفحة الدخول",
    changeBg: "تغيير الخلفية",
    customizeCard: "تخصيص هوية البطاقة",
    backgroundColor: "لون الخلفية الأساسي",
    cardFrontLabel: "صورة خلفية وجه البطاقة (اختياري)",
    cardBackLabel: "صورة خلفية ظهر البطاقة (اختياري)",
    addPointsManual: "إضافة نقاط يدوياً",
    storeDetails: "بيانات المتجر الأساسية",
    socialControl: "روابط التواصل الاجتماعي",
    hoursControl: "إدارة ساعات العمل",
    isClosed: "مغلق اليوم؟",
    fromLabel: "من:",
    toLabel: "إلى:",
    cardHint: "اسحب لقلب البطاقة",
    chooseReward: "اختر هديتك المجانية 🎁",
    rewardNotice: "يمكنك اختيار صنف واحد بقيمة 15 ريال أو أقل",
    claimReward: "تأكيد واستلام الهدية",
    rewardRedeemed: "مبروك! تم استبدال مكافأتك بنجاح 🎊"
  },
  en: {
    shopName: "BISTRO COFFEE",
    tagline: "Authentic Qatari Hospitality",
    home: "Home",
    menu: "Menu",
    gallery: "Gallery",
    store: "Store",
    orders: "My Orders",
    scanner: "Scanner",
    admin: "Admin",
    login: "Login",
    newMember: "New Member",
    phonePlaceholder: "Phone Number",
    namePlaceholder: "Full Name",
    confirmBtn: "Confirm & Start ✨",
    welcome: "Welcome,",
    goldTier: "Gold Membership",
    silverTier: "Standard Member",
    adminTier: "System Admin",
    cashierTier: "Cashier Staff",
    preOrder: "Pre-order Now",
    preOrderSub: "Your coffee will be waiting for you hot",
    stampsTitle: "Stamps (1 stamp per 20 QAR)",
    pointsTitle: "Reward Points",
    pointsSub: "1 QAR = 1 PT",
    loyaltyCard: "Loyalty Card",
    collectPointsHint: "Collect points here",
    cartTitle: "Your Cart",
    cartEmpty: "Your cart is currently empty",
    orderTotal: "Order Total:",
    confirmOrder: "Confirm Order",
    scanTitle: "Loyalty - Scan Customer",
    memberData: "Member Data",
    billValue: "Bill Value",
    billValueHint: "1 PT per QAR, 1 Stamp per 20 QAR",
    updateBtn: "Update",
    cancelBtn: "Cancel",
    dashboard: "Dashboard",
    members: "Members",
    slider: "Slider",
    card: "Card Design",
    vipBadge: "VIP Member",
    free: "FREE",
    noOrders: "No previous orders",
    addCategory: "Add New Category",
    addItem: "Add Product",
    broadcast: "Broadcast",
    copyNumbers: "Copy Numbers",
    sendWhatsapp: "WhatsApp All",
    storeSettings: "Store Settings",
    uploadLogo: "Change Logo",
    saveSuccess: "Saved Successfully ✅",
    deleteConfirm: "Are you sure?",
    stats: "Operation Stats",
    totalCustomers: "Total Customers",
    totalItems: "Items",
    totalStories: "Stories",
    addFromDevice: "Device",
    addFromUrl: "URL",
    urlPlaceholder: "Paste URL...",
    postBtn: "Post Now",
    orderTracking: "Order Tracking",
    orderPending: "Pending",
    orderPreparing: "Preparing",
    orderReady: "Ready!",
    orderDelivered: "Delivered",
    orderRejected: "Rejected",
    newOrdersAlert: "New Orders!",
    acceptOrder: "Accept",
    rejectOrder: "Reject",
    readyOrder: "Ready",
    completeOrder: "Deliver",
    totalSales: "Total Sales",
    todaySales: "Today's Sales",
    completedOrders: "Completed",
    addPoints: "Add Points",
    amountSpent: "Amount Spent",
    allOrders: "Order History",
    quickActions: "Quick Actions",
    salesReport: "Sales Report",
    printReport: "Export Professional Report",
    selectMonth: "Select Month",
    allTime: "All Time",
    filterDay: "Daily",
    filterMonth: "Monthly",
    filterRange: "Custom Range",
    from: "From",
    to: "To",
    orderDate: "Date",
    orderAmount: "Amount",
    socialLinks: "Social Links",
    workingHours: "Working Hours",
    gpsLink: "Google Maps Link",
    instaLink: "Instagram Link",
    tiktokLink: "TikTok Link",
    open: "Open",
    closed: "Closed",
    accessDenied: "Sorry, you don't have permission to access this page",
    selectPickupTime: "Select Pickup Time",
    pickupASAP: "ASAP (15 mins)",
    pickup30m: "In 30 mins",
    pickup1h: "In 1 hour",
    pickupCustom: "Custom Time/Date",
    customerLocation: "Customer Location",
    customerInfo: "Customer Info",
    viewOnMap: "View on Map",
    manualEntry: "Manual Entry",
    searchByPhone: "Search by Phone",
    phoneNotFound: "This number is not registered",
    searchCustomer: "Search Customer",
    orderNoteLabel: "Extra Notes (Optional)",
    orderNotePlaceholder: "E.g. No sugar, extra ice...",
    orderPhotoLabel: "Attach Photo (Optional)",
    attachment: "Attachment",
    hours: "Hours",
    minutes: "Minutes",
    minTimeError: "Time must be at least 15 minutes from now",
    maxTimeError: "Maximum pre-order time is 48 hours",
    reminderDue: "Reminder: Start Prep!",
    reminderDueSub: "Pickup time approaching (< 90 mins)",
    timeLeft: "Time Left:",
    overdue: "Overdue!",
    image: "Image",
    video: "Video",
    days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    chefPending: "Chef checking the recipe..",
    chefPreparing: "Crafting your drink..",
    chefReady: "Voilà! Your order is ready!",
    adManagement: "Ad Popup Settings",
    adActive: "Enable Ad Popup",
    adType: "Ad Content Type",
    adUrl: "Ad URL (Image/Video)",
    loginBgLabel: "Login Background",
    changeBg: "Change Background",
    customizeCard: "Customize Loyalty Card",
    backgroundColor: "Background Color",
    cardFrontLabel: "Card Front Image (Optional)",
    cardBackLabel: "Card Back Image (Optional)",
    addPointsManual: "Add Points Manually",
    storeDetails: "Store Basic Details",
    socialControl: "Social Media Links",
    hoursControl: "Working Hours Control",
    isClosed: "Is Closed Today?",
    fromLabel: "From:",
    toLabel: "To:",
    cardHint: "Swipe to flip card",
    chooseReward: "Choose Your Free Reward 🎁",
    rewardNotice: "You can pick one item priced 15 QAR or less",
    claimReward: "Confirm & Claim",
    rewardRedeemed: "Congrats! Reward redeemed successfully 🎊"
  }
};

// --- Safe Storage Hook ---
function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);
  return [storedValue, setStoredValue];
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

const formatTimeRemaining = (targetTime: number, t: any) => {
  const now = Date.now();
  const diff = targetTime - now;
  if (diff <= 0) return { text: t.overdue, isUrgent: true };
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  const isUrgent = diff < (90 * 60 * 1000); 
  
  if (hours > 0) return { text: `${hours}h ${mins}m`, isUrgent };
  return { text: `${mins}m`, isUrgent };
};

const getTierInfo = (user: UserType, t: any) => {
  if (user.role === 'admin') return { label: t.adminTier, icon: <Crown className="w-4 h-4" />, color: "text-amber-400", glow: "glow-gold", badge: "bg-amber-500" };
  if (user.role === 'cashier') return { label: t.cashierTier, icon: <ShieldCheck className="w-4 h-4" />, color: "text-blue-400", glow: "glow-silver", badge: "bg-blue-600" };
  if (user.points >= 200) return { label: t.goldTier, icon: <Award className="w-4 h-4" />, color: "text-yellow-500", glow: "glow-gold", badge: "bg-yellow-400" };
  return { label: t.silverTier, icon: <Coffee className="w-3.5 h-3.5" />, color: "text-stone-300", glow: "", badge: "bg-stone-500" };
};

const VIPBadge = ({ t }: { t: any }) => (
  <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-600 to-yellow-400 text-white text-[8px] font-black px-2 py-0.5 rounded-full vip-badge-glow border border-white/20">
    <Star className="w-2 h-2 fill-current" />
    <span>VIP</span>
  </div>
);

function SplashScreen({ t }: { t: any }) {
  return (
    <div className="fixed inset-0 z-[10000] bg-[#8A1538] flex flex-col items-center justify-center overflow-hidden text-right" dir="rtl">
      {/* Sadu Pattern Overlay */}
      <div className="absolute inset-0 bg-sadu opacity-10 pointer-events-none"></div>
      
      {/* Decorative Circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center animate-qatar-reveal">
        <div className="mb-10 relative inline-block">
          <div className="bg-white/10 p-8 rounded-[3rem] backdrop-blur-md border border-white/20 shadow-2xl">
            {/* Custom Dallah Icon Representation */}
            <div className="animate-pour inline-block text-yellow-500 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="2" x2="6" y2="4" />
                <line x1="10" y1="2" x2="10" y2="4" />
                <line x1="14" y1="2" x2="14" y2="4" />
              </svg>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-[#8A1538] p-3 rounded-full border border-white/20 shadow-xl">
             <Coffee className="w-8 h-8 text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-white tracking-widest mb-4 drop-shadow-lg uppercase">
          {t.shopName}
        </h1>
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="h-px w-10 bg-white/30"></div>
          <p className="text-white/80 font-bold text-sm tracking-[0.2em]">{t.tagline}</p>
          <div className="h-px w-10 bg-white/30"></div>
        </div>

        {/* Loading progress bar */}
        <div className="w-48 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-yellow-500 animate-[sadu-slide_6s_linear_forwards]" style={{ width: '100%' }}></div>
        </div>
        <p className="mt-4 text-white/40 text-[10px] font-black uppercase tracking-tighter">جاري التحضير...</p>
      </div>

      {/* Flag jagged edge effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-4 flex overflow-hidden opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex-1 h-full bg-white transform rotate-45 translate-y-2"></div>
        ))}
      </div>
    </div>
  );
}

function ChefAnimation({ status, t }: { status: OrderStatus, t: any }) {
  const getChefContent = () => {
    switch (status) {
      case 'pending': 
        return { 
          icon: <ChefHat className="w-12 h-12 text-amber-600" />, 
          sub: <div className="animate-bounce"><ClipboardList className="w-6 h-6 text-amber-400" /></div>, 
          msg: t.chefPending 
        };
      case 'preparing': 
        return { 
          icon: <ChefHat className="w-12 h-12 text-[#2D1B18] animate-pulse" />, 
          sub: <div className="flex gap-1"><Flame className="w-5 h-5 text-orange-500 animate-pulse" /><Coffee className="w-6 h-6 text-amber-800 animate-bounce" /></div>, 
          msg: t.chefPreparing 
        };
      case 'ready': 
        return { 
          icon: <ChefHat className="w-14 h-14 text-green-600" />, 
          sub: <div className="relative"><Coffee className="w-10 h-10 text-amber-900" /><Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400 animate-ping" /></div>, 
          msg: t.chefReady 
        };
      default: return null;
    }
  };
  const content = getChefContent();
  if (!content) return null;
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white/40 rounded-[2.5rem] border border-white/60 shadow-inner mb-6 animate-in zoom-in duration-500">
      <div className="relative mb-4">
        <div className="bg-white p-6 rounded-full shadow-2xl relative z-10 border border-amber-100">{content.icon}</div>
        <div className="absolute -bottom-2 -right-2 z-20 bg-white p-2 rounded-full shadow-lg border border-amber-50">{content.sub}</div>
      </div>
      <p className="text-[11px] font-black text-[#2D1B18] uppercase tracking-wider text-center">{content.msg}</p>
    </div>
  );
}

// --- View: Admin ---
function AdminView({ user, users, setUsers, info, setInfo, menu, setMenu, galleryPosts, setGalleryPosts, sliderImages, setSliderImages, orders, showToast, t, lang }: any) {
  const [active, setActive] = useState('dashboard');
  const [logoInputMode, setLogoInputMode] = useState<'file' | 'url'>('file');
  const [bgInputMode, setBgInputMode] = useState<'file' | 'url'>('file');
  const [sliderInputMode, setSliderInputMode] = useState<'file' | 'url'>('file');
  const [sliderType, setSliderType] = useState<'image' | 'video'>('image');
  const [sliderUrl, setSliderUrl] = useState('');
  const [tempCaption, setTempCaption] = useState('');
  const [inputMode, setInputMode] = useState<'file' | 'url'>('file');

  const [filterType, setFilterType] = useState<'day' | 'month' | 'range' | 'all'>('month');
  const [filterDate, setFilterDate] = useState(new Date().toISOString().slice(0, 10));
  const [filterMonth, setFilterMonth] = useState(new Date().toISOString().slice(0, 7));
  const [filterRange, setFilterRange] = useState({ 
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().slice(0, 10), 
    end: new Date().toISOString().slice(0, 10) 
  });

  const stats = useMemo(() => {
    const deliveredOrders = orders.filter((o:Order) => o.status === 'delivered');
    const filteredOrders = deliveredOrders.filter((o:Order) => {
      const orderDateStr = new Date(o.timestamp).toISOString().slice(0, 10);
      const orderMonthStr = new Date(o.timestamp).toISOString().slice(0, 7);
      if (filterType === 'all') return true;
      if (filterType === 'day') return orderDateStr === filterDate;
      if (filterType === 'month') return orderMonthStr === filterMonth;
      if (filterType === 'range') return orderDateStr >= filterRange.start && orderDateStr <= filterRange.end;
      return true;
    });
    const totalRev = filteredOrders.reduce((s:number, o:Order) => s + o.total, 0);
    const count = filteredOrders.length;
    return { totalRev, count, list: filteredOrders };
  }, [orders, filterType, filterDate, filterMonth, filterRange]);

  const quickActions = [
    { id: 'store', label: t.storeSettings, icon: <Store className="w-6 h-6" />, color: "bg-orange-500" },
    { id: 'card', label: t.card, icon: <Palette className="w-6 h-6" />, color: "bg-purple-500" },
    { id: 'gallery', label: t.gallery, icon: <Film className="w-6 h-6" />, color: "bg-pink-500" },
    { id: 'menu', label: t.menu, icon: <Plus className="w-6 h-6" />, color: "bg-amber-500" },
    { id: 'members', label: t.members, icon: <UsersIcon className="w-6 h-6" />, color: "bg-green-500" },
    { id: 'ad', label: lang === 'ar' ? 'إعلان' : 'Ad', icon: <Megaphone className="w-6 h-6" />, color: "bg-red-500" },
    { id: 'slider', label: t.slider, icon: <ImageIcon className="w-6 h-6" />, color: "bg-blue-500" },
  ];

  const handleManualPoints = (phone: string) => {
    const amountStr = window.prompt(t.amountSpent);
    const amount = parseFloat(amountStr || '0');
    if (isNaN(amount) || amount <= 0) return;
    setUsers(users.map((u:any) => {
      if (u.phone === phone) {
        const addedStamps = Math.floor(amount / 20);
        return { 
          ...u, 
          points: u.points + amount, 
          stamps: Math.min(u.stamps + addedStamps, 10) 
        };
      }
      return u;
    }));
    showToast(t.saveSuccess);
  };

  const handleBroadcast = () => {
    const phones = users.filter((u:any)=>u.role==='user').map((u:any)=>u.phone).join(', ');
    if (phones && window.confirm(`${t.broadcast}:\n${phones}\n\n${lang === 'ar' ? 'نسخ الأرقام للحافظة؟' : 'Copy to clipboard?'}`)) {
       navigator.clipboard.writeText(phones);
       showToast(lang === 'ar' ? "تم النسخ بنجاح" : "Copied successfully");
    }
  };

  const printReport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const filterLabel = filterType === 'day' ? filterDate : filterType === 'month' ? filterMonth : filterType === 'range' ? `${filterRange.start} - ${filterRange.end}` : t.allTime;
    printWindow.document.write(`
      <html dir="${lang === 'ar' ? 'rtl' : 'ltr'}">
        <head><title>${t.salesReport}</title><style>@import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;700;900&display=swap'); body { font-family: 'Tajawal', sans-serif; background: #fff; color: #1a1a1a; padding: 50px; } .report-container { max-width: 800px; margin: 0 auto; border: 1px solid #eee; padding: 40px; border-radius: 30px; box-shadow: 0 20px 60px rgba(0,0,0,0.08); position: relative; overflow: hidden; } .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #f5f5f5; padding-bottom: 30px; margin-bottom: 40px; } .cafe-logo { width: 100px; height: 100px; border-radius: 25px; object-fit: cover; } .cafe-name { font-size: 32px; font-weight: 900; color: #2D1B18; margin: 0; } .summary-card { background: #fdfaf3; padding: 30px 20px; border-radius: 25px; text-align: center; border: 1px solid #f1ece1; } table { width: 100%; border-collapse: separate; border-spacing: 0 12px; } th { padding: 18px; background: #fafafa; border-radius: 12px; } td { text-align: center; padding: 20px 18px; border-bottom: 1px solid #f5f5f5; }</style></head>
        <body><div class="report-container"><div class="header"><div><img src="${info.logo}" class="cafe-logo" /><h2 class="cafe-name">${info.name}</h2></div><div style="text-align: ${lang === 'ar' ? 'left' : 'right'}"><h1>${t.salesReport}</h1><p>${filterLabel}</p></div></div><div style="display: grid; grid-template-cols: repeat(2, 1fr); gap: 20px; margin-bottom: 40px;"><div class="summary-card"><span>${t.totalSales}</span><h2>${stats.totalRev} QAR</h2></div><div class="summary-card"><span>${t.completedOrders}</span><h2>${stats.count}</h2></div></div><table><thead><tr><th>REF ID</th><th>${lang === 'ar' ? 'العميل' : 'Customer'}</th><th>${t.orderAmount}</th><th>${t.orderDate}</th></tr></thead><tbody>${stats.list.map(o => `<tr><td>${o.id}</td><td>${o.customerName}</td><td>${o.total} QAR</td><td>${new Date(o.timestamp).toLocaleDateString()}</td></tr>`).join('')}</tbody></table></div><script>window.print();</script></body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleUpload = async (file: File, callback: (url: string) => void) => {
    const base64 = await fileToBase64(file);
    callback(base64);
    showToast(t.saveSuccess);
  };

  const updateWorkingDay = (index: number, field: keyof WorkingDay, value: any) => {
    const newHours = [...info.hours];
    newHours[index] = { ...newHours[index], [field]: value };
    setInfo({ ...info, hours: newHours });
  };

  return (
    <div className="pb-24 pt-6 px-4 animate-in fade-in">
      <div className="flex gap-2 overflow-x-auto pb-6 no-scrollbar sticky top-0 z-10 glass-container pt-2 px-1">
        {[
          { id: 'dashboard', label: t.dashboard, icon: <LayoutDashboard className="w-3 h-3" /> },
          { id: 'orders', label: t.allOrders, icon: <Receipt className="w-3 h-3" /> },
          { id: 'members', label: t.members, icon: <UsersIcon className="w-3 h-3" /> },
          { id: 'menu', label: t.menu, icon: <MenuIcon className="w-3 h-3" /> },
          { id: 'card', label: t.card, icon: <Palette className="w-3 h-3" /> },
          { id: 'store', label: t.store, icon: <Store className="w-3 h-3" /> },
          { id: 'ad', label: lang === 'ar' ? 'إعلان' : 'Ad', icon: <Megaphone className="w-3 h-3" /> },
          { id: 'slider', label: t.slider, icon: <ImageIcon className="w-3 h-3" /> },
          { id: 'gallery', label: t.gallery, icon: <Film className="w-3 h-3" /> },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)} className={`px-6 py-4 rounded-2xl text-[11px] font-black whitespace-nowrap transition-all flex items-center gap-2 ${active === tab.id ? 'bg-[#2D1B18] text-white shadow-xl scale-105' : 'bg-white/80 text-gray-500 border border-gray-100'}`}>
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {active === 'dashboard' && (
        <div className="space-y-6 pt-4 animate-in slide-in-from-bottom-2">
           <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-600 p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <Wallet className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10" />
                <p className="text-[10px] font-black opacity-70 mb-2 uppercase">{t.totalSales}</p>
                <p className="text-2xl font-black">{stats.totalRev} QAR</p>
              </div>
              <div className="bg-stone-900 p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <TrendingUp className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10" />
                <p className="text-[10px] font-black opacity-70 mb-2 uppercase">{t.completedOrders}</p>
                <p className="text-2xl font-black">{stats.count}</p>
              </div>
              <div className="col-span-2 bg-gradient-to-r from-green-600 to-emerald-800 p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
                <UsersIcon className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10" />
                <p className="text-[10px] font-black opacity-70 mb-2 uppercase">{t.totalCustomers}</p>
                <p className="text-2xl font-black">{users.length} {lang === 'ar' ? 'عملاء نشطين' : 'Active Customers'}</p>
              </div>
           </div>
           <div className="space-y-4">
              <h3 className="font-black text-sm text-[#2D1B18] px-2 flex items-center gap-2"><Zap className="w-4 h-4 text-yellow-500 fill-current" /> {t.quickActions}</h3>
              <div className="grid grid-cols-2 gap-4">
                 {quickActions.map((action) => (
                    <button key={action.id} onClick={() => setActive(action.id)} className="glass-container p-6 rounded-[2.5rem] border-2 border-white hover:shadow-lg transition-all active:scale-95 group">
                       <div className={`${action.color} p-4 rounded-2xl text-white shadow-lg mb-4 group-hover:scale-110 transition-transform mx-auto w-fit`}>{action.icon}</div>
                       <span className="font-black text-[10px] text-[#2D1B18] text-center block w-full">{action.label}</span>
                    </button>
                 ))}
              </div>
           </div>
           <div className="glass-container p-6 rounded-[2.5rem] border border-white shadow-sm space-y-6">
              <div className="flex bg-black/5 p-1 rounded-2xl">
                 {(['day', 'month', 'range', 'all'] as const).map(type => (
                   <button key={type} onClick={() => setFilterType(type)} className={`flex-1 py-2 rounded-xl text-[10px] font-black transition-all ${filterType === type ? 'bg-white shadow text-[#2D1B18]' : 'text-gray-400'}`}>
                     {t[`filter${type.charAt(0).toUpperCase() + type.slice(1)}`] || t.allTime}
                   </button>
                 ))}
              </div>
              <button onClick={printReport} className="w-full bg-green-600 text-white p-5 rounded-2xl font-black text-xs flex items-center justify-center gap-3 shadow-lg shadow-green-100 hover:bg-green-700 transition-all"><Printer className="w-5 h-5" /> {t.printReport}</button>
           </div>
        </div>
      )}

      {active === 'orders' && (
        <div className="space-y-4 pt-4 animate-in slide-in-from-bottom-2">
           <div className="glass-container p-6 rounded-3xl flex justify-between items-center shadow-md border border-white">
              <h3 className="font-black text-sm flex items-center gap-2"><Receipt className="w-4 h-4 text-amber-600" /> {t.allOrders}</h3>
              <span className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-[10px] font-black">{orders.length} طلب</span>
           </div>
           <div className="space-y-3">
              {orders.slice(0, 50).reverse().map((o:Order) => (
                <div key={o.id} className="glass-container p-5 rounded-[2rem] border border-white flex justify-between items-center text-xs shadow-sm">
                   <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-xl"><Coffee className="w-4 h-4 text-gray-400" /></div>
                      <div>
                        <p className="font-black text-[#2D1B18]">{o.id.slice(-6)}</p>
                        <p className="text-[9px] font-bold text-gray-400">{o.customerName}</p>
                      </div>
                   </div>
                   <div className="text-right">
                     <div className="font-black text-amber-700">{o.total} QAR</div>
                     <div className="text-[8px] font-black text-gray-300 uppercase">{o.status}</div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {active === 'members' && (
        <div className="space-y-4 pt-4 animate-in slide-in-from-bottom-2">
           <div className="glass-container p-6 rounded-[2rem] flex justify-between items-center shadow-md border border-white">
              <div>
                <h3 className="font-black text-sm">{t.members}</h3>
                <p className="text-[10px] text-gray-400 font-bold">{users.length} {lang === 'ar' ? 'عضو مسجل' : 'Registered Members'}</p>
              </div>
              <button onClick={handleBroadcast} className="bg-[#2D1B18] text-white p-3 rounded-xl flex items-center gap-2 text-[10px] font-black shadow-lg"><Send className="w-4 h-4" /> {t.broadcast}</button>
           </div>
           <div className="space-y-3">
              {users.map((m: any) => (
                <div key={m.phone} className="glass-container p-5 rounded-[2.2rem] border border-white flex justify-between items-center shadow-sm hover:shadow-md transition-all">
                   <div className="flex items-center gap-4">
                      <img src={m.img || `https://ui-avatars.com/api/?name=${m.name}&background=random`} className="w-12 h-12 rounded-full object-cover shadow-sm border-2 border-white" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-black text-[#2D1B18]">{m.name}</p>
                          {m.role === 'admin' && <Crown className="w-3 h-3 text-amber-500" />}
                          {m.role === 'cashier' && <ShieldCheck className="w-3 h-3 text-blue-500" />}
                        </div>
                        <p className="text-[10px] text-gray-400 font-bold">{m.phone}</p>
                        <div className="flex gap-2 mt-1">
                          <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{m.points} PT</span>
                          <span className="text-[9px] font-black text-stone-600 bg-stone-50 px-2 py-0.5 rounded-full">{m.stamps} ☕</span>
                        </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <button onClick={() => handleManualPoints(m.phone)} title={t.addPointsManual} className="p-3 bg-amber-500 text-white rounded-2xl font-black text-[9px] shadow-sm hover:bg-amber-600 transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setUsers(users.filter((u:any) => u.phone !== m.phone))} className="p-3 bg-red-50 text-red-500 rounded-2xl font-black transition-colors hover:bg-red-100">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {active === 'slider' && (
        <div className="glass-container p-8 rounded-[3rem] shadow-xl space-y-6 pt-10 border border-white animate-in slide-in-from-bottom-2">
           <h3 className="font-black text-base flex items-center gap-3"><ImageIcon className="text-blue-500" /> {t.slider}</h3>
           
           <div className="space-y-6 bg-white/40 p-6 rounded-[2.5rem] border border-white shadow-inner">
              <div className="flex bg-black/5 p-1 rounded-2xl shadow-inner">
                 <button onClick={() => setSliderType('image')} className={`flex-1 py-3 rounded-xl font-black text-[10px] transition-all flex items-center justify-center gap-2 ${sliderType === 'image' ? 'bg-white shadow text-[#2D1B18]' : 'text-gray-400'}`}><ImageIcon className="w-4 h-4"/> {t.image}</button>
                 <button onClick={() => setSliderType('video')} className={`flex-1 py-3 rounded-xl font-black text-[10px] transition-all flex items-center justify-center gap-2 ${sliderType === 'video' ? 'bg-white shadow text-[#2D1B18]' : 'text-gray-400'}`}><Video className="w-4 h-4"/> {t.video}</button>
              </div>

              <div className="flex bg-black/5 p-1 rounded-2xl shadow-inner">
                 <button onClick={() => setSliderInputMode('file')} className={`flex-1 py-3 rounded-xl font-black text-[10px] transition-all flex items-center justify-center gap-2 ${sliderInputMode === 'file' ? 'bg-white shadow text-[#2D1B18]' : 'text-gray-400'}`}><Upload className="w-4 h-4"/> {t.addFromDevice}</button>
                 <button onClick={() => setSliderInputMode('url')} className={`flex-1 py-3 rounded-xl font-black text-[10px] transition-all flex items-center justify-center gap-2 ${sliderInputMode === 'url' ? 'bg-white shadow text-[#2D1B18]' : 'text-gray-400'}`}><LinkIcon className="w-4 h-4"/> {t.addFromUrl}</button>
              </div>

              {sliderInputMode === 'file' ? (
                <div className="h-32 border-4 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center relative cursor-pointer group hover:border-blue-300 transition-colors">
                  <Upload className="text-gray-300 w-8 h-8 mb-2 group-hover:text-blue-500 transition-all" />
                  <input type="file" accept={sliderType === 'image' ? "image/*" : "video/*"} className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => e.target.files && handleUpload(e.target.files[0], url => setSliderImages([...sliderImages, { id: Date.now(), type: sliderType, url }]))} />
                  <span className="text-[10px] font-black text-gray-400">{lang === 'ar' ? 'اضغط لرفع ملف' : 'Click to upload'}</span>
                </div>
              ) : (
                <div className="space-y-4">
                  <input 
                    value={sliderUrl} 
                    onChange={e => setSliderUrl(e.target.value)} 
                    placeholder={t.urlPlaceholder} 
                    className="w-full p-4 bg-white rounded-2xl text-xs font-bold border-none shadow-inner text-[#2D1B18] outline-none" 
                  />
                  <button 
                    onClick={() => { if(sliderUrl) { setSliderImages([...sliderImages, { id: Date.now(), type: sliderType, url: sliderUrl }]); setSliderUrl(''); showToast(t.saveSuccess); }}} 
                    className="w-full bg-[#2D1B18] text-white p-4 rounded-2xl font-black text-[10px] shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> {lang === 'ar' ? 'إضافة للسلايدر' : 'Add to Slider'}
                  </button>
                </div>
              )}
           </div>

           <div className="grid grid-cols-2 gap-4">
              {sliderImages.map((item:SliderItem) => (
                <div key={item.id} className="relative aspect-video rounded-2xl overflow-hidden shadow-lg border-2 border-white group">
                   {item.type === 'image' ? (
                     <img src={item.url} className="w-full h-full object-cover" />
                   ) : (
                     <video src={item.url} className="w-full h-full object-cover" muted playsInline />
                   )}
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                     <button onClick={() => setSliderImages(sliderImages.filter((s:SliderItem) => s.id !== item.id))} className="bg-red-500 text-white p-2.5 rounded-xl shadow-md active:scale-90 transition-transform">
                       <Trash2 className="w-4 h-4" />
                     </button>
                     {item.type === 'video' && <Play className="w-5 h-5 text-white fill-current opacity-80" />}
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {active === 'store' && (
        <div className="space-y-8 pt-4 animate-in slide-in-from-bottom-2">
           <div className="glass-container p-8 rounded-[3rem] shadow-xl border border-white space-y-6">
              <h3 className="font-black text-base flex items-center gap-3 mb-2"><Store className="text-amber-600" /> {t.storeSettings}</h3>
              
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><ImageIcon className="w-3 h-3" /> Store Logo</p>
                 <div className="flex items-center gap-6">
                    <img src={info.logo} className="w-20 h-20 rounded-2xl object-cover shadow-md border border-white" />
                    <div className="flex-1 space-y-2">
                       <div className="flex bg-black/5 p-1 rounded-xl shadow-inner">
                         <button onClick={() => setLogoInputMode('file')} className={`flex-1 py-2 rounded-lg font-black text-[9px] transition-all ${logoInputMode === 'file' ? 'bg-white shadow text-[#2D1B18]' : 'text-gray-400'}`}>{t.addFromDevice}</button>
                         <button onClick={() => setLogoInputMode('url')} className={`flex-1 py-2 rounded-lg font-black text-[9px] transition-all ${logoInputMode === 'url' ? 'bg-white shadow text-[#2D1B18]' : 'text-gray-400'}`}>{t.addFromUrl}</button>
                       </div>
                       {logoInputMode === 'file' ? (
                          <label className="w-full p-2 bg-[#2D1B18] text-white rounded-xl font-black text-[9px] flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-transform">
                             <Upload className="w-3 h-3" /> {t.uploadLogo}
                             <input type="file" hidden onChange={e => e.target.files && handleUpload(e.target.files[0], url => setInfo({...info, logo: url}))} />
                          </label>
                       ) : (
                          <input value={info.logo} onChange={e => setInfo({...info, logo: e.target.value})} placeholder={t.urlPlaceholder} className="w-full p-2 bg-white rounded-xl text-[9px] font-bold border border-gray-100 text-[#2D1B18] shadow-inner outline-none" />
                       )}
                    </div>
                 </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100">
                 <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2"><ImageIcon className="w-3 h-3" /> {t.loginBgLabel}</h4>
                 <div className="flex items-center gap-6">
                    <div className="w-20 h-32 rounded-xl overflow-hidden shadow-md border-2 border-white relative">
                       <img src={info.loginBg} className="w-full h-full object-cover" />
                       <div className="absolute inset-0 bg-black/20 flex items-center justify-center"><Eye className="text-white w-4 h-4" /></div>
                    </div>
                    <div className="flex-1 space-y-2">
                       <div className="flex bg-black/5 p-1 rounded-xl shadow-inner">
                         <button onClick={() => setBgInputMode('file')} className={`flex-1 py-2 rounded-lg font-black text-[9px] transition-all ${bgInputMode === 'file' ? 'bg-white shadow text-[#2D1B18]' : 'text-gray-400'}`}>{t.addFromDevice}</button>
                         <button onClick={() => setBgInputMode('url')} className={`flex-1 py-2 rounded-lg font-black text-[9px] transition-all ${bgInputMode === 'url' ? 'bg-white shadow text-[#2D1B18]' : 'text-gray-400'}`}>{t.addFromUrl}</button>
                       </div>
                       {bgInputMode === 'file' ? (
                          <label className="w-full p-2 bg-amber-600 text-white rounded-xl font-black text-[9px] flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-transform">
                             <Upload className="w-3 h-3" /> {t.changeBg}
                             <input type="file" hidden onChange={e => e.target.files && handleUpload(e.target.files[0], url => setInfo({...info, loginBg: url}))} />
                          </label>
                       ) : (
                          <input value={info.loginBg} onChange={e => setInfo({...info, loginBg: e.target.value})} placeholder={t.urlPlaceholder} className="w-full p-2 bg-white rounded-xl text-[9px] font-bold border border-gray-100 text-[#2D1B18] shadow-inner outline-none" />
                       )}
                    </div>
                 </div>
              </div>
           </div>

           <div className="glass-container p-8 rounded-[3rem] shadow-xl border border-white space-y-6">
              <h3 className="font-black text-base flex items-center gap-3 text-blue-600"><Globe /> {t.storeDetails}</h3>
              <div className="grid gap-4">
                 <div className="space-y-1">
                   <p className="text-[9px] font-black text-gray-400 px-2 uppercase tracking-widest">Store Name</p>
                   <input value={info.name} onChange={e => setInfo({...info, name: e.target.value})} className="w-full p-4 bg-white rounded-2xl text-xs font-black shadow-inner border-none focus:ring-2 ring-blue-500 text-[#2D1B18]" />
                 </div>
                 <div className="space-y-1">
                   <p className="text-[9px] font-black text-gray-400 px-2 uppercase tracking-widest">Address Description</p>
                   <input value={info.address} onChange={e => setInfo({...info, address: e.target.value})} className="w-full p-4 bg-white rounded-2xl text-xs font-bold shadow-inner border-none focus:ring-2 ring-blue-500 text-[#2D1B18]" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-gray-400 px-2 uppercase tracking-widest">Phone</p>
                      <input value={info.phone} onChange={e => setInfo({...info, phone: e.target.value})} className="w-full p-4 bg-white rounded-2xl text-xs font-bold shadow-inner border-none focus:ring-2 ring-blue-500 text-[#2D1B18]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-gray-400 px-2 uppercase tracking-widest">WhatsApp</p>
                      <input value={info.whatsapp} onChange={e => setInfo({...info, whatsapp: e.target.value})} className="w-full p-4 bg-white rounded-2xl text-xs font-bold shadow-inner border-none focus:ring-2 ring-blue-500 text-[#2D1B18]" />
                    </div>
                 </div>
              </div>
           </div>

           <div className="glass-container p-8 rounded-[3rem] shadow-xl border border-white space-y-6">
              <h3 className="font-black text-base flex items-center gap-3 text-pink-600"><Zap className="fill-current" /> {t.socialControl}</h3>
              <div className="grid gap-4">
                 <div className="space-y-1">
                   <p className="text-[9px] font-black text-gray-400 px-2 uppercase tracking-widest flex items-center gap-2"><Instagram className="w-3 h-3" /> {t.instaLink}</p>
                   <input value={info.insta} onChange={e => setInfo({...info, insta: e.target.value})} placeholder="https://instagram.com/..." className="w-full p-4 bg-white rounded-2xl text-[10px] font-bold shadow-inner border-none focus:ring-2 ring-pink-500 text-[#2D1B18]" />
                 </div>
                 <div className="space-y-1">
                   <p className="text-[9px] font-black text-gray-400 px-2 uppercase tracking-widest flex items-center gap-2"><Video className="w-3 h-3" /> {t.tiktokLink}</p>
                   <input value={info.tiktok} onChange={e => setInfo({...info, tiktok: e.target.value})} placeholder="https://tiktok.com/@..." className="w-full p-4 bg-white rounded-2xl text-[10px] font-bold shadow-inner border-none focus:ring-2 ring-stone-500 text-[#2D1B18]" />
                 </div>
                 <div className="space-y-1">
                   <p className="text-[9px] font-black text-gray-400 px-2 uppercase tracking-widest flex items-center gap-2"><MapPin className="w-3 h-3" /> {t.gpsLink}</p>
                   <input value={info.gps} onChange={e => setInfo({...info, gps: e.target.value})} placeholder="https://maps.google.com/..." className="w-full p-4 bg-white rounded-2xl text-[10px] font-bold shadow-inner border-none focus:ring-2 ring-red-500 text-[#2D1B18]" />
                 </div>
              </div>
           </div>

           <div className="glass-container p-8 rounded-[3rem] shadow-xl border border-white space-y-6">
              <h3 className="font-black text-base flex items-center gap-3 text-emerald-600"><Clock /> {t.hoursControl}</h3>
              <div className="space-y-4">
                 {info.hours.map((wd: WorkingDay, idx: number) => (
                   <div key={idx} className="p-4 bg-white/60 rounded-3xl border border-white shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                         <span className="text-xs font-black text-[#2D1B18]">{wd.day}</span>
                         <label className="flex items-center gap-2 cursor-pointer">
                            <span className="text-[9px] font-black text-gray-400">{t.isClosed}</span>
                            <input 
                              type="checkbox" 
                              checked={wd.isClosed} 
                              onChange={e => updateWorkingDay(idx, 'isClosed', e.target.checked)}
                              className="w-4 h-4 accent-red-500" 
                            />
                         </label>
                      </div>
                      {!wd.isClosed && (
                        <div className="grid grid-cols-2 gap-3 animate-in fade-in zoom-in-95">
                           <div className="space-y-1">
                              <p className="text-[8px] font-black text-gray-400 px-1">{t.fromLabel}</p>
                              <input 
                                type="time" 
                                value={wd.from} 
                                onChange={e => updateWorkingDay(idx, 'from', e.target.value)}
                                className="w-full p-2 bg-white rounded-xl text-[10px] font-black border-none shadow-inner outline-none focus:ring-2 ring-emerald-500"
                              />
                           </div>
                           <div className="space-y-1">
                              <p className="text-[8px] font-black text-gray-400 px-1">{t.toLabel}</p>
                              <input 
                                type="time" 
                                value={wd.to} 
                                onChange={e => updateWorkingDay(idx, 'to', e.target.value)}
                                className="w-full p-2 bg-white rounded-xl text-[10px] font-black border-none shadow-inner outline-none focus:ring-2 ring-emerald-500"
                              />
                           </div>
                        </div>
                      )}
                   </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {active === 'menu' && (
        <div className="space-y-8 pt-4 animate-in slide-in-from-bottom-2">
          <button onClick={() => setMenu([...menu, { id: Date.now(), name: 'قسم جديد', items: [] }])} className="w-full bg-[#2D1B18] text-white p-6 rounded-[2.5rem] font-black text-sm flex items-center justify-center gap-3 shadow-xl hover:bg-black transition-all active:scale-95"><Plus /> {t.addCategory}</button>
          {menu.map((cat:any) => (
            <div key={cat.id} className="glass-container p-8 rounded-[3rem] border border-white/30 shadow-xl relative overflow-hidden">
               <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                 <input value={cat.name} onChange={e => setMenu(menu.map((c:any) => c.id === cat.id ? {...c, name: e.target.value} : c))} className="bg-transparent font-black text-xl border-none focus:ring-0 text-[#2D1B18] w-full outline-none" />
                 <button onClick={() => setMenu(menu.filter((c:any) => c.id !== cat.id))} className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors active:scale-90"><Trash2 className="w-6 h-6" /></button>
               </div>
               <div className="space-y-5">
                 {cat.items.map((item:any) => (
                   <div key={item.id} className="flex items-center gap-5 bg-white/60 p-5 rounded-[2rem] border border-white shadow-sm hover:shadow-md transition-all">
                     <div className="relative group/img w-16 h-16 flex-shrink-0">
                        <img src={item.img} className="w-full h-full rounded-2xl object-cover shadow-md" />
                        <label className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center rounded-2xl cursor-pointer transition-opacity"><Upload className="text-white w-4 h-4" /><input type="file" hidden onChange={e => e.target.files && handleUpload(e.target.files[0], url => setMenu(menu.map((c:any) => c.id === cat.id ? {...c, items: c.items.map((it:any) => it.id === item.id ? {...it, img: url} : it)} : c)))} /></label>
                     </div>
                     <div className="flex-1 space-y-1">
                        <input value={item.name} onChange={e => setMenu(menu.map((c:any) => c.id === cat.id ? {...c, items: c.items.map((it:any) => it.id === item.id ? {...it, name: e.target.value} : it)} : c))} className="w-full bg-transparent border-none text-xs font-black p-0 focus:ring-0 text-[#2D1B18] outline-none" />
                        <div className="flex items-center gap-1.5"><input type="number" value={item.price} onChange={e => setMenu(menu.map((c:any) => c.id === cat.id ? {...c, items: c.items.map((it:any) => it.id === item.id ? {...it, price: Number(e.target.value)} : it)} : c))} className="bg-transparent border-none text-[11px] font-bold p-0 focus:ring-0 text-amber-600 w-16 outline-none" /><span className="text-[10px] font-black opacity-40">QAR</span></div>
                     </div>
                     <button onClick={() => setMenu(menu.map((c:any) => c.id === cat.id ? {...c, items: c.items.filter((it:any) => it.id !== item.id)} : c))} className="text-red-300 hover:text-red-500 transition-colors active:scale-90"><Trash2 className="w-4 h-4" /></button>
                   </div>
                 ))}
                 <button onClick={() => setMenu(menu.map((c:any) => c.id === cat.id ? {...c, items: [...c.items, { id: Date.now(), name: 'منتج جديد', price: 0, img: info.logo }]} : c))} className="w-full border-2 border-dashed border-gray-200 p-5 rounded-[2rem] text-[10px] font-black text-gray-400 hover:border-amber-400 hover:text-amber-500 transition-all">+ {t.addItem}</button>
               </div>
            </div>
          ))}
        </div>
      )}

      {active === 'ad' && (
        <div className="space-y-8 pt-4 animate-in slide-in-from-bottom-2">
           <div className="glass-container p-8 rounded-[3rem] shadow-xl border border-white space-y-6">
              <h3 className="font-black text-base flex items-center gap-3 mb-2 text-red-600"><Megaphone /> {t.adManagement}</h3>
              <div className="flex items-center justify-between bg-white/60 p-5 rounded-3xl border border-white shadow-sm">
                 <span className="text-xs font-black text-[#2D1B18]">{t.adActive}</span>
                 <button 
                   onClick={() => setInfo({...info, adConfig: {...info.adConfig, active: !info.adConfig.active}})}
                   className={`w-14 h-8 rounded-full transition-all flex items-center px-1 ${info.adConfig.active ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'}`}
                 >
                   <div className="w-6 h-6 bg-white rounded-full shadow-md"></div>
                 </button>
              </div>

              <div className="flex bg-black/5 p-1 rounded-2xl shadow-inner">
                 <button onClick={() => setInfo({...info, adConfig: {...info.adConfig, type: 'image'}})} className={`flex-1 py-3 rounded-xl font-black text-[10px] transition-all flex items-center justify-center gap-2 ${info.adConfig.type === 'image' ? 'bg-white shadow text-[#2D1B18]' : 'text-gray-400'}`}><ImageIcon className="w-4 h-4"/> {t.image}</button>
                 <button onClick={() => setInfo({...info, adConfig: {...info.adConfig, type: 'video'}})} className={`flex-1 py-3 rounded-xl font-black text-[10px] transition-all flex items-center justify-center gap-2 ${info.adConfig.type === 'video' ? 'bg-white shadow text-[#2D1B18]' : 'text-gray-400'}`}><Video className="w-4 h-4"/> {t.video}</button>
              </div>

              <div className="space-y-4">
                 <p className="text-[9px] font-black text-gray-400 px-2 uppercase tracking-widest">{t.adUrl}</p>
                 <input 
                    value={info.adConfig.url} 
                    onChange={e => setInfo({...info, adConfig: {...info.adConfig, url: e.target.value}})} 
                    placeholder={t.urlPlaceholder} 
                    className="w-full p-5 bg-white rounded-2xl text-xs font-bold border-none shadow-inner text-[#2D1B18] outline-none" 
                 />
                 <div className="relative group aspect-[9/16] max-w-[200px] mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-gray-50 flex items-center justify-center">
                    {info.adConfig.type === 'image' ? (
                       <img src={info.adConfig.url} className="w-full h-full object-cover" />
                    ) : (
                       <video src={info.adConfig.url} autoPlay muted loop className="w-full h-full object-cover" />
                    )}
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-all">
                       <Upload className="w-8 h-8 mb-2" />
                       <span className="text-[10px] font-black">{t.addFromDevice}</span>
                       <input type="file" hidden onChange={e => e.target.files && handleUpload(e.target.files[0], url => setInfo({...info, adConfig: {...info.adConfig, url: url}}))} />
                    </label>
                 </div>
              </div>
           </div>
        </div>
      )}

      {active === 'card' && (
        <div className="glass-container p-8 rounded-[3rem] shadow-xl space-y-8 pt-10 border border-white animate-in slide-in-from-bottom-2">
           <h3 className="font-black text-base flex items-center gap-3 mb-2 text-purple-600"><Palette /> {t.customizeCard}</h3>
           <div className="flex items-center justify-between bg-white/60 p-6 rounded-[2.5rem] border-2 border-white shadow-sm">
             <span className="text-xs font-black text-[#2D1B18]">{t.backgroundColor}</span>
             <input type="color" value={info.cardBg} onChange={e => setInfo({...info, cardBg: e.target.value})} className="w-12 h-12 rounded-xl cursor-pointer border-2 border-white shadow-md bg-transparent" />
           </div>

           <div className="grid gap-6">
              <div className="space-y-3">
                 <p className="text-[10px] font-black text-gray-400 px-2 uppercase tracking-widest flex items-center gap-2"><ImageIcon className="w-3 h-3" /> {t.cardFrontLabel}</p>
                 <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-gray-100 border-2 border-white shadow-lg group">
                    {info.cardFrontImg ? <img src={info.cardFrontImg} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300 font-black text-[10px]">لم يتم رفع صورة للوجه</div>}
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-all">
                       <Upload className="w-8 h-8 mb-2" />
                       <span className="text-[10px] font-black">{t.addFromDevice}</span>
                       <input type="file" hidden onChange={e => e.target.files && handleUpload(e.target.files[0], url => setInfo({...info, cardFrontImg: url}))} />
                    </label>
                    {info.cardFrontImg && <button onClick={() => setInfo({...info, cardFrontImg: ''})} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-xl shadow-md"><Trash2 className="w-4 h-4" /></button>}
                 </div>
              </div>

              <div className="space-y-3">
                 <p className="text-[10px] font-black text-gray-400 px-2 uppercase tracking-widest flex items-center gap-2"><ImageIcon className="w-3 h-3" /> {t.cardBackLabel}</p>
                 <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-gray-100 border-2 border-white shadow-lg group">
                    {info.cardBackImg ? <img src={info.cardBackImg} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300 font-black text-[10px]">لم يتم رفع صورة للظهر</div>}
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white cursor-pointer transition-all">
                       <Upload className="w-8 h-8 mb-2" />
                       <span className="text-[10px] font-black">{t.addFromDevice}</span>
                       <input type="file" hidden onChange={e => e.target.files && handleUpload(e.target.files[0], url => setInfo({...info, cardBackImg: url}))} />
                    </label>
                    {info.cardBackImg && <button onClick={() => setInfo({...info, cardBackImg: ''})} className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-xl shadow-md"><Trash2 className="w-4 h-4" /></button>}
                 </div>
              </div>
           </div>
        </div>
      )}

      {active === 'gallery' && (
        <div className="glass-container p-8 rounded-[3rem] shadow-xl space-y-6 pt-10 border border-white animate-in slide-in-from-bottom-2">
           <h3 className="font-black text-base flex items-center gap-3 text-pink-500"><Film /> {t.gallery}</h3>
           <textarea value={tempCaption} onChange={e => setTempCaption(e.target.value)} placeholder="اكتب وصفاً للستوري..." className="w-full p-5 bg-white rounded-3xl text-xs font-black border-none shadow-inner h-24 text-[#2D1B18] outline-none" />
           <div className="flex gap-2">
             <button onClick={() => setInputMode('file')} className={`flex-1 py-3 rounded-xl font-black text-[10px] transition-all flex items-center justify-center gap-2 ${inputMode === 'file' ? 'bg-[#2D1B18] text-white shadow-md' : 'bg-white shadow text-gray-400'}`}><Upload className="w-3.5 h-3.5"/> {t.addFromDevice}</button>
             <button onClick={() => setInputMode('url')} className={`flex-1 py-3 rounded-xl font-black text-[10px] transition-all flex items-center justify-center gap-2 ${inputMode === 'url' ? 'bg-[#2D1B18] text-white shadow-md' : 'bg-white shadow text-gray-400'}`}><LinkIcon className="w-3.5 h-3.5"/> {t.addFromUrl}</button>
           </div>
           {inputMode === 'file' ? (
              <div className="h-44 border-4 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center relative cursor-pointer hover:border-pink-300 transition-colors group">
                 {sliderUrl ? <img src={sliderUrl} className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem]" /> : <Upload className="text-gray-300 w-10 h-10 mb-2 group-hover:text-pink-500 transition-all" />}
                 <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => e.target.files && handleUpload(e.target.files[0], url => setSliderUrl(url))} />
                 {!sliderUrl && <span className="text-[10px] font-black text-gray-400">Click to upload story</span>}
              </div>
           ) : (
              <input value={sliderUrl} onChange={e => setSliderUrl(e.target.value)} placeholder={t.urlPlaceholder} className="w-full p-5 bg-white rounded-3xl text-xs font-bold border-none shadow-inner text-[#2D1B18] outline-none" />
           )}
           <button onClick={() => { if(sliderUrl) { setGalleryPosts([{id: Date.now(), url: sliderUrl, caption: tempCaption, likes: 0, likedBy: [], timestamp: Date.now(), type: 'image'}, ...galleryPosts]); setSliderUrl(''); setTempCaption(''); showToast(t.saveSuccess); setActive('dashboard'); } }} className="w-full bg-[#2D1B18] text-white p-6 rounded-[2rem] font-black shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-3">
             <Send className="w-5 h-5" /> {t.postBtn}
           </button>
           
           <div className="grid grid-cols-3 gap-3 pt-4">
              {galleryPosts.map((post:GalleryPost) => (
                <div key={post.id} className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group">
                  <img src={post.url} className="w-full h-full object-cover" />
                  <button onClick={() => setGalleryPosts(galleryPosts.filter(p => p.id !== post.id))} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"><Trash2 className="w-3 h-3" /></button>
                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
}

// --- View: Orders ---
function OrdersView({ user, orders, updateOrderStatus, t, lang }: any) {
  const [currentTime, setCurrentTime] = useState(Date.now());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 60000); 
    return () => clearInterval(timer);
  }, []);

  const userOrders = user.role === 'user' 
    ? orders.filter((o: Order) => o.customerPhone === user.phone)
    : orders;

  const sortedOrders = [...userOrders].sort((a, b) => b.timestamp - a.timestamp);

  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return { label: t.orderPending, color: 'text-amber-500', bg: 'bg-amber-50', icon: <Clock className="w-4 h-4" /> };
      case 'preparing': return { label: t.orderPreparing, color: 'text-blue-500', bg: 'bg-blue-50', icon: <UtensilsCrossed className="w-4 h-4" /> };
      case 'ready': return { label: t.orderReady, color: 'text-green-600', bg: 'bg-green-50', icon: <PackageCheck className="w-4 h-4" /> };
      case 'delivered': return { label: t.orderDelivered, color: 'text-gray-500', bg: 'bg-gray-50', icon: <CheckCircle2 className="w-4 h-4" /> };
      case 'rejected': return { label: t.orderRejected, color: 'text-red-500', bg: 'bg-red-50', icon: <X className="w-4 h-4" /> };
      default: return { label: status, color: 'text-gray-500', bg: 'bg-gray-50', icon: <Clock className="w-4 h-4" /> };
    }
  };

  return (
    <div className="pb-24 pt-6 px-4 animate-in fade-in duration-700 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-[#2D1B18] p-3 rounded-2xl shadow-lg"><ClipboardList className="w-6 h-6 text-yellow-500" /></div>
        <h2 className="text-2xl font-black text-[#2D1B18] tracking-tight">{t.orders}</h2>
      </div>

      {sortedOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-40">
           <ShoppingBasket className="w-20 h-20 mb-4" />
           <p className="font-black text-sm">{t.noOrders}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedOrders.map((order: Order) => {
            const statusInfo = getStatusInfo(order.status);
            const timeInfo = order.pickupTimestamp ? formatTimeRemaining(order.pickupTimestamp, t) : null;
            const isStaff = user.role === 'admin' || user.role === 'cashier';
            const showReminder = isStaff && timeInfo?.isUrgent && order.status !== 'delivered' && order.status !== 'rejected';

            return (
              <div key={order.id} className={`glass-container rounded-[2.5rem] p-6 border-2 shadow-sm overflow-hidden relative animate-in slide-in-from-bottom-4 transition-all duration-500 ${showReminder ? 'border-red-500/50 bg-red-50/10' : 'border-white'}`}>
                
                {showReminder && (
                  <div className="absolute top-0 left-0 right-0 bg-red-600 text-white py-2 px-6 flex items-center justify-between animate-pulse z-20">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-tight">{t.reminderDue}</span>
                    </div>
                    <span className="text-[9px] font-bold">{t.reminderDueSub}</span>
                  </div>
                )}

                <div className={`flex justify-between items-start mb-6 ${showReminder ? 'mt-6' : ''}`}>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">REF: {order.id.slice(-6)}</span>
                      <div className={`px-3 py-1 rounded-full text-[9px] font-black flex items-center gap-1.5 ${statusInfo.bg} ${statusInfo.color} border border-current opacity-80`}>
                        {statusInfo.icon} {statusInfo.label}
                      </div>
                    </div>
                    <p className="text-[11px] font-black text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(order.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-[#2D1B18]">{order.total} QAR</p>
                    <div className="flex flex-col items-end">
                      <p className="text-[10px] font-black text-amber-600 flex items-center gap-1"><Timer className="w-3 h-3" /> {order.pickupTime}</p>
                      {timeInfo && order.status !== 'delivered' && (
                        <p className={`text-[10px] font-black mt-1 flex items-center gap-1 ${timeInfo.isUrgent ? 'text-red-600 animate-pulse' : 'text-stone-400'}`}>
                          <Clock className="w-3 h-3" /> {t.timeLeft} {timeInfo.text}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* شخصية الشيف تظهر للكل بناءً على حالة الطلب */}
                {(order.status === 'pending' || order.status === 'preparing' || order.status === 'ready') && (
                  <ChefAnimation status={order.status} t={t} />
                )}

                <div className="space-y-3 mb-6">
                  {order.items.map((item: MenuItem, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 bg-white/40 p-2 rounded-2xl">
                      <img src={item.img} className="w-10 h-10 rounded-xl object-cover shadow-sm border border-white/50" />
                      <span className="text-[11px] font-black text-[#2D1B18]">{item.name}</span>
                      <span className="mr-auto text-[10px] font-bold text-gray-400">{item.price} QAR</span>
                    </div>
                  ))}
                  {order.customerNote && (
                    <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100/50">
                      <p className="text-[9px] font-black text-amber-700 uppercase mb-1">{t.orderNoteLabel}</p>
                      <p className="text-[10px] font-bold text-stone-600 leading-relaxed">{order.customerNote}</p>
                    </div>
                  )}
                </div>

                {isStaff && (
                  <div className="pt-6 border-t border-gray-100 grid grid-cols-2 gap-3">
                    {order.status === 'pending' && (
                      <>
                        <button onClick={() => updateOrderStatus(order.id, 'rejected')} className="bg-red-50 text-red-600 py-3 rounded-2xl font-black text-[10px] hover:bg-red-100 transition-colors active:scale-95">{t.rejectOrder}</button>
                        <button onClick={() => updateOrderStatus(order.id, 'preparing')} className="bg-[#2D1B18] text-white py-3 rounded-2xl font-black text-[10px] shadow-lg hover:bg-black transition-colors active:scale-95">{t.acceptOrder}</button>
                      </>
                    )}
                    {order.status === 'preparing' && (
                      <button onClick={() => updateOrderStatus(order.id, 'ready')} className="col-span-2 bg-blue-600 text-white py-4 rounded-2xl font-black text-xs shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 active:scale-95">
                        <BellRing className="w-4 h-4" /> {t.readyOrder}
                      </button>
                    )}
                    {order.status === 'ready' && (
                      <button onClick={() => updateOrderStatus(order.id, 'delivered')} className="col-span-2 bg-green-600 text-white py-4 rounded-2xl font-black text-xs shadow-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 active:scale-95">
                        <CheckCircle2 className="w-4 h-4" /> {t.completeOrder}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// --- Main App Component ---
export default function App() {
  useEffect(() => {
  async function testSupabase() {
    const { data, error } = await supabase
      .from("customers")
      .select("*");

    console.log("DATA:", data);
    console.log("ERROR:", error);
  }

  testSupabase();
}, []);
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useLocalStorage<UserType | null>('bc_user_v6', null);
  const [users, setUsers] = useLocalStorage<UserType[]>('bc_users_v6', INITIAL_USERS);
  const [storeInfo, setStoreInfo] = useLocalStorage<StoreInfo>('bc_store_info_v6', INITIAL_STORE_INFO);
  const [menu, setMenu] = useLocalStorage<Category[]>('bc_menu_v6', INITIAL_MENU);
  const [galleryPosts, setGalleryPosts] = useLocalStorage<GalleryPost[]>('bc_gallery_v6', []);
  const [sliderImages, setSliderImages] = useLocalStorage<SliderItem[]>('bc_slider_v6', INITIAL_SLIDER);
  const [orders, setOrders] = useLocalStorage<Order[]>('bc_orders_v6', []);
  const [lang, setLang] = useLocalStorage<'ar' | 'en'>('bc_lang_v6', 'ar');
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [isCustomTimeMode, setIsCustomTimeMode] = useState(false);
  const [customDateTime, setCustomDateTime] = useState('');
  const [showAd, setShowAd] = useState(false);
  const [orderNote, setOrderNote] = useState('');
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const reminderAudioRef = useRef<HTMLAudioElement | null>(null);
  const t = translations[lang];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (user && storeInfo.adConfig?.active) {
      const hasSeenAd = sessionStorage.getItem('hasSeenAd');
      if (!hasSeenAd) {
        setShowAd(true);
        sessionStorage.setItem('hasSeenAd', 'true');
      }
    }
  }, [user, storeInfo.adConfig?.active]);

  useEffect(() => {
    const hasPendingOrders = orders.some(o => o.status === 'pending');
    const isStaff = user && (user.role === 'admin' || user.role === 'cashier');
    
    if (isStaff && hasPendingOrders) {
      if (!audioRef.current) {
        audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/1071/1071-preview.mp3");
        audioRef.current.loop = true;
      }
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const hasUrgentOrders = orders.some(o => {
      if (!o.pickupTimestamp) return false;
      const diff = o.pickupTimestamp - Date.now();
      return diff > 0 && diff < (90 * 60 * 1000) && o.status !== 'delivered' && o.status !== 'rejected';
    });

    if (isStaff && hasUrgentOrders) {
      if (!reminderAudioRef.current) {
        reminderAudioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3");
        reminderAudioRef.current.loop = false;
      }
      const lastReminder = sessionStorage.getItem('lastUrgentAlert');
      const now = Date.now();
      if (!lastReminder || now - parseInt(lastReminder) > 600000) {
        reminderAudioRef.current.play().catch(e => console.log(e));
        sessionStorage.setItem('lastUrgentAlert', now.toString());
      }
    }

  }, [orders, user]);

  const showToast = (msg: string) => { setToastMsg(msg); setTimeout(() => setToastMsg(''), 3000); };

  const validateAndSubmitOrder = (selectedTimeLabel: string, timeValueInMs?: number) => {
    const now = Date.now();
    const finalPickupTimestamp = timeValueInMs || (now + (15 * 60 * 1000));

    if (timeValueInMs) {
      const minTime = now + (15 * 60 * 1000);
      const maxTime = now + (48 * 60 * 60 * 1000);
      if (timeValueInMs < minTime) return showToast(t.minTimeError);
      if (timeValueInMs > maxTime) return showToast(t.maxTimeError);
    }

    const order: Order = { 
      id: `ORD-${Date.now().toString().slice(-6)}`, 
      customerPhone: user!.phone, 
      customerName: user!.name, 
      items: [...cart], 
      total: cart.reduce((s, i) => s + i.price, 0), 
      status: 'pending', 
      timestamp: Date.now(), 
      pickupTime: selectedTimeLabel, 
      pickupTimestamp: finalPickupTimestamp,
      customerNote: orderNote 
    };

    setOrders([...orders, order]);
    
    setUsers(users.map(u => {
      if (u.phone === user!.phone) {
        const addedStamps = Math.floor(order.total / 20);
        return { 
          ...u, 
          points: u.points + order.total, 
          stamps: Math.min(u.stamps + addedStamps, 10) 
        };
      }
      return u;
    }));

    setCart([]); 
    setIsPickupModalOpen(false); 
    setIsCustomTimeMode(false);
    setOrderNote(''); 
    showToast(t.saveSuccess); 
    window.location.hash = '#/orders';
  };

  const redeemReward = (rewardItem: MenuItem) => {
    const now = Date.now();
    const order: Order = {
      id: `REWARD-${now.toString().slice(-6)}`,
      customerPhone: user!.phone,
      customerName: user!.name,
      items: [rewardItem],
      total: 0,
      status: 'pending',
      timestamp: now,
      pickupTime: t.pickupASAP,
      pickupTimestamp: now + (15 * 60 * 1000),
      customerNote: "🎁 FREE LOYALTY REWARD"
    };

    setOrders([...orders, order]);
    
    // تصفير النقاط والطوابع بمجرد استبدال المكافأة
    const updatedUser = { ...user!, stamps: 0, points: 0 };
    setUser(updatedUser);
    setUsers(users.map(u => u.phone === user!.phone ? updatedUser : u));

    setIsRewardModalOpen(false);
    showToast(t.rewardRedeemed);
    window.location.hash = '#/orders';
  };

  const handleLogin = (name: string, phone: string, isNew: boolean) => {
    if (!phone) return showToast(lang === 'ar' ? "أدخل رقم الجوال" : "Enter Phone Number");
    let loggedUser: UserType | null = null;
    
    if (phone === '1991') { 
      loggedUser = { name: lang === 'ar' ? "مدير النظام" : "Admin", phone, role: 'admin', stamps: 0, points: 0, img: storeInfo.logo };
    } else if (phone === '2025') { 
      loggedUser = { name: lang === 'ar' ? "الكاشير" : "Cashier", phone, role: 'cashier', stamps: 0, points: 0, img: storeInfo.logo };
    } else if (phone === '333') {
      loggedUser = { 
        name: lang === 'ar' ? "عميل تجريبي" : "Demo Customer", phone, role: 'user', stamps: 0, points: 0, 
        img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&h=100&fit=crop" 
      };
      if (!users.find(u => u.phone === '333')) setUsers(prev => [...prev, loggedUser!]);
    } else {
      const exist = users.find(u => u.phone === phone);
      if (isNew) {
        if (exist) return showToast(lang === 'ar' ? "الرقم مسجل بالفعل" : "Phone already exists");
        loggedUser = { 
          name: name || (lang === 'ar' ? 'عميل جديد' : 'New Member'), 
          phone, stamps: 0, points: 5, role: 'user', 
          img: `https://ui-avatars.com/api/?name=${name || 'User'}&background=random&color=fff` 
        };
        setUsers([...users, loggedUser]);
        showToast(lang === 'ar' ? "حصلت على 5 نقاط مكافأة ترحيبية! 🎁" : "You got 5 welcome points! 🎁");
      } else {
        if (!exist) return showToast(lang === 'ar' ? "الرقم غير مسجل" : "Phone not found");
        loggedUser = exist;
      }
    }
    if (loggedUser) { setUser(loggedUser); sessionStorage.removeItem('hasSeenAd'); window.location.hash = '#/home'; }
  };

  const handleLogout = () => { setUser(null); sessionStorage.removeItem('hasSeenAd'); window.location.hash = '#/login'; };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(lang === 'ar' ? "تم تحديث حالة الطلب" : "Order status updated");
  };

  if (showSplash) {
    return <SplashScreen t={t} />;
  }

  // تصفية المنتجات التي سعرها 15 ريال أو أقل
  const rewardItems = menu.flatMap(cat => cat.items).filter(item => item.price <= 15);

  return (
    <Router>
      <div className={`min-h-screen pb-24 select-none bg-[#fdfaf3] ${lang === 'en' ? 'font-sans' : ''}`}>
        {toastMsg && <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] bg-[#2D1B18] text-white px-8 py-3 rounded-full shadow-2xl text-xs font-black border border-white/10 animate-in slide-in-from-top-4">{toastMsg}</div>}
        
        {showAd && storeInfo.adConfig?.active && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-8 animate-in fade-in duration-500">
             <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowAd(false)}></div>
             <div className="relative w-full max-w-[320px] aspect-[3/4] bg-white rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden border-2 border-white/40 animate-in zoom-in-95">
                <button onClick={() => setShowAd(false)} className="absolute top-4 right-4 z-[1010] bg-black/40 text-white p-2.5 rounded-full hover:bg-black/60 transition-colors shadow-lg active:scale-90"><X className="w-4 h-4" /></button>
                {storeInfo.adConfig.type === 'image' ? <img src={storeInfo.adConfig.url} className="w-full h-full object-cover" /> : <video src={storeInfo.adConfig.url} autoPlay muted loop playsInline className="w-full h-full object-cover" />}
             </div>
          </div>
        )}

        <header className="sticky top-0 z-50 glass-container shadow-sm py-4 px-4 border-b border-white/20">
          <div className="container max-w-lg mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = user ? '#/home' : '#/login'}>
              <div className="bg-[#2D1B18] p-1.5 rounded-lg shadow-lg"><Coffee className="w-4 h-4 text-yellow-500" /></div>
              <h1 className="text-xl font-black text-[#2D1B18] tracking-tighter uppercase">{t.shopName.split(' ')[0]}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')} className="p-2 bg-gray-100 rounded-full text-xs font-black text-[#2D1B18] flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform">
                <Languages className="w-4 h-4" /><span>{lang === 'ar' ? 'EN' : 'AR'}</span>
              </button>
              {user && (
                <>
                  <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-black/5 rounded-full transition-colors active:scale-95">
                    <ShoppingBasket className="w-6 h-6 text-[#2D1B18]" />
                    {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-5 h-5 flex items-center justify-center rounded-full font-black border-2 border-white">{cart.length}</span>}
                  </button>
                  <button onClick={handleLogout} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors active:scale-95"><LogOut className="w-5 h-5" /></button>
                </>
              )}
            </div>
          </div>
        </header>

        <main className={`container max-w-lg mx-auto ${!user ? 'h-screen flex flex-col justify-center' : 'min-h-[80vh]'}`}>
          <Routes>
            <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />
            <Route path="/login" element={<LoginView user={user} onLogin={handleLogin} loginBg={storeInfo.loginBg} t={t} />} />
            <Route path="/home" element={user ? <HomeView user={user} users={users} setUsers={setUsers} sliderImages={sliderImages} storeInfo={storeInfo} galleryPosts={galleryPosts} onOpenReward={() => setIsRewardModalOpen(true)} t={t} lang={lang} /> : <Navigate to="/login" />} />
            <Route path="/menu" element={user ? <MenuView menu={menu} onAddToCart={(it:any) => {setCart([...cart, it]); showToast(lang === 'ar' ? "تمت الإضافة للسلة" : "Added to Cart");}} t={t} /> : <Navigate to="/login" />} />
            <Route path="/gallery" element={user ? <GalleryView posts={galleryPosts} storeInfo={storeInfo} t={t} lang={lang} /> : <Navigate to="/login" />} />
            <Route path="/about" element={user ? <AboutSection info={storeInfo} t={t} lang={lang} /> : <Navigate to="/login" />} />
            <Route path="/orders" element={user ? <OrdersView user={user} orders={orders} updateOrderStatus={updateOrderStatus} t={t} lang={lang} /> : <Navigate to="/login" />} />
            <Route path="/scanner" element={user && user.role !== 'user' ? <ScannerView users={users} setUsers={setUsers} showToast={showToast} t={t} lang={lang} /> : <Navigate to="/login" />} />
            <Route path="/admin" element={user && user.role === 'admin' ? <AdminView user={user} users={users} setUsers={setUsers} info={storeInfo} setInfo={setStoreInfo} menu={menu} setMenu={setMenu} galleryPosts={galleryPosts} setGalleryPosts={setGalleryPosts} sliderImages={sliderImages} setSliderImages={setSliderImages} orders={orders} showToast={showToast} t={t} lang={lang} /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
          </Routes>
        </main>

        {user && <nav className="fixed bottom-0 left-0 right-0 glass-container border-t py-4 px-1 flex justify-around z-50 shadow-2xl rounded-t-[2.5rem] border-white/20">
            {[{ icon: <HomeIcon />, label: t.home, path: "/home" }, { icon: <MenuIcon />, label: t.menu, path: "/menu" }, { icon: <Film />, label: t.gallery, path: "/gallery" }, { icon: <Store />, label: t.store, path: "/about" }, { icon: <ClipboardList />, label: t.orders, path: "/orders" }].map((item, i) => (
              <button key={i} onClick={() => window.location.hash = '#' + item.path} className={`flex flex-col items-center gap-1 transition-all active:scale-125 ${window.location.hash.includes(item.path) ? 'text-[#2D1B18] scale-110' : 'text-gray-400'}`}>{React.cloneElement(item.icon as React.ReactElement<any>, { className: "w-5 h-5" })}<span className="text-[8px] font-black">{item.label}</span></button>
            ))}
            {user.role !== 'user' && <><button onClick={() => window.location.hash = '#/scanner'} className={`flex flex-col items-center gap-1 transition-all active:scale-125 ${window.location.hash.includes('/scanner') ? 'text-[#2D1B18] scale-110' : 'text-gray-400'}`}><Scan className="w-5 h-5" /><span className="text-[8px] font-black">{t.scanner}</span></button>
            {user.role === 'admin' && <button onClick={() => window.location.hash = '#/admin'} className={`flex flex-col items-center gap-1 transition-all active:scale-125 ${window.location.hash.includes('/admin') ? 'text-[#2D1B18] scale-110' : 'text-gray-400'}`}><Settings className="w-5 h-5" /><span className="text-[8px] font-black">{t.admin}</span></button>}</>}
        </nav>}
        
        {isCartOpen && (
          <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-300">
            <div className="w-full max-w-lg bg-white rounded-t-[3rem] p-8 shadow-2xl animate-in slide-in-from-bottom-10 border-t border-white/50">
              <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-black text-[#2D1B18]">{t.cartTitle}</h3><button onClick={() => setIsCartOpen(false)} className="p-2 bg-gray-100 rounded-full active:scale-90 transition-transform"><X className="w-6 h-6" /></button></div>
              {cart.length === 0 ? <div className="py-12 text-center opacity-40 flex flex-col items-center gap-4"><ShoppingBasket className="w-16 h-16" /><p className="font-black text-sm">{t.cartEmpty}</p></div> : <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto no-scrollbar">{cart.map((item, i) => (<div key={i} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100"><img src={item.img} className="w-12 h-12 rounded-xl object-cover shadow-sm" /><div className="flex-1"><p className="text-xs font-black text-[#2D1B18]">{item.name}</p><p className="text-[10px] font-bold text-amber-600">{item.price} QAR</p></div><button onClick={() => setCart(cart.filter((_, idx) => idx !== i))} className="text-red-400 p-2 active:scale-90 transition-transform"><Trash2 className="w-5 h-5" /></button></div>))}</div>}
              {cart.length > 0 && <div className="space-y-4"><div className="flex justify-between items-center px-2"><span className="text-sm font-black text-gray-500">{t.orderTotal}</span><span className="text-2xl font-black text-[#2D1B18]">{cart.reduce((s, i) => s + i.price, 0)} QAR</span></div><button onClick={() => { setIsCartOpen(false); setIsPickupModalOpen(true); }} className="w-full bg-[#2D1B18] text-white py-5 rounded-[2rem] font-black shadow-xl hover:bg-black transition-all flex items-center justify-center gap-3 active:scale-95"><CheckCircle2 className="w-5 h-5" /> {t.confirmOrder}</button></div>}
            </div>
          </div>
        )}

        {isPickupModalOpen && (
          <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in">
            <div className="w-full max-w-sm glass-container p-8 rounded-[3.5rem] shadow-2xl border-2 border-white animate-in zoom-in-95">
               <div className="flex items-center justify-between mb-8">
                 {isCustomTimeMode && <button onClick={() => setIsCustomTimeMode(false)} className="p-2 bg-gray-100 rounded-full"><ChevronRight className="w-4 h-4" /></button>}
                 <h3 className="flex-1 text-lg font-black text-[#2D1B18] text-center uppercase tracking-tighter">{t.selectPickupTime}</h3>
               </div>

               {!isCustomTimeMode ? (
                 <div className="space-y-3 mb-6">
                    {[{ id: 'asap', label: t.pickupASAP, time: '15 mins' }, { id: '30m', label: t.pickup30m, time: '30 mins' }, { id: '1h', label: t.pickup1h, time: '1 hour' }].map(opt => (
                      <button key={opt.id} onClick={() => validateAndSubmitOrder(opt.label)} className="w-full p-5 bg-white rounded-[1.8rem] text-xs font-black text-[#2D1B18] border border-gray-100 shadow-sm hover:shadow-md hover:bg-amber-50 transition-all flex justify-between items-center group active:scale-95"><span>{opt.label}</span><Clock className="w-4 h-4 text-amber-500 group-hover:animate-spin" /></button>
                    ))}
                    <button onClick={() => setIsCustomTimeMode(true)} className="w-full p-5 bg-stone-100 rounded-[1.8rem] text-xs font-black text-stone-600 border border-stone-200 shadow-sm transition-all flex justify-between items-center active:scale-95"><span>{t.pickupCustom}</span><Calendar className="w-4 h-4" /></button>
                 </div>
               ) : (
                 <div className="space-y-6 mb-6 animate-in slide-in-from-left-4">
                    <div className="bg-white/50 p-4 rounded-3xl border border-white">
                      <p className="text-[10px] font-black text-gray-400 mb-2 px-2">{lang === 'ar' ? 'اختر اليوم والوقت' : 'Choose date & time'}</p>
                      <input 
                        type="datetime-local" 
                        value={customDateTime} 
                        onChange={e => setCustomDateTime(e.target.value)}
                        className="w-full bg-white p-4 rounded-2xl text-xs font-black text-[#2D1B18] border-none shadow-inner focus:ring-2 ring-amber-500 outline-none"
                      />
                    </div>
                    <button 
                      onClick={() => {
                        if(!customDateTime) return showToast(lang === 'ar' ? "يرجى اختيار الوقت" : "Please select time");
                        const selectedDate = new Date(customDateTime).getTime();
                        validateAndSubmitOrder(new Date(customDateTime).toLocaleString(), selectedDate);
                      }} 
                      className="w-full bg-amber-600 text-white p-5 rounded-[1.8rem] font-black text-xs shadow-xl active:scale-95 transition-all"
                    >
                      {t.confirmOrder}
                    </button>
                 </div>
               )}

               {!isCustomTimeMode && (
                 <>
                  <textarea value={orderNote} onChange={e => setOrderNote(e.target.value)} placeholder={t.orderNotePlaceholder} className="w-full p-5 bg-gray-50 rounded-[1.8rem] text-xs font-bold border-none focus:ring-2 ring-amber-500 shadow-inner min-h-[100px] mb-6 text-[#2D1B18] outline-none" />
                  <button onClick={() => setIsPickupModalOpen(false)} className="w-full p-4 bg-gray-100 rounded-[1.5rem] font-black text-[11px] text-gray-500 active:scale-95 transition-all">{t.cancelBtn}</button>
                 </>
               )}
            </div>
          </div>
        )}

        {/* مودال اختيار المكافأة المجانية */}
        {isRewardModalOpen && (
          <div className="fixed inset-0 z-[1000] bg-black/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in">
             <div className="w-full max-w-sm glass-container p-8 rounded-[3.5rem] shadow-2xl border-4 border-yellow-400/50 animate-in zoom-in-95 text-center">
                <div className="mb-6">
                   <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto flex items-center justify-center shadow-lg mb-4 animate-bounce">
                      <Gift className="w-8 h-8 text-[#2D1B18]" />
                   </div>
                   <h3 className="text-xl font-black text-[#2D1B18]">{t.chooseReward}</h3>
                   <p className="text-[10px] font-bold text-gray-500 mt-1">{t.rewardNotice}</p>
                </div>

                <div className="grid grid-cols-2 gap-3 max-h-[350px] overflow-y-auto no-scrollbar mb-8 px-1">
                   {rewardItems.map((item) => (
                      <button 
                         key={item.id} 
                         onClick={() => redeemReward(item)}
                         className="flex flex-col items-center bg-white border border-gray-100 p-3 rounded-2xl shadow-sm hover:border-yellow-400 transition-all active:scale-95"
                      >
                         <img src={item.img} className="w-16 h-16 rounded-xl object-cover shadow-sm mb-2" />
                         <span className="text-[10px] font-black text-[#2D1B18] line-clamp-1">{item.name}</span>
                         <span className="text-[9px] font-bold text-amber-600">{item.price} QAR</span>
                      </button>
                   ))}
                </div>

                <button 
                   onClick={() => setIsRewardModalOpen(false)} 
                   className="w-full p-4 bg-gray-100 rounded-2xl font-black text-[11px] text-gray-500 active:scale-95 transition-all"
                >
                   {t.cancelBtn}
                </button>
             </div>
          </div>
        )}
      </div>
    </Router>
  );
}

// --- Login View ---
function LoginView({ onLogin, user, loginBg, t }: any) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isNew, setIsNew] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { if (user) navigate('/home'); }, [user, navigate]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center p-6 animate-in fade-in duration-1000">
      <div className="absolute inset-0 z-0">
         <img src={loginBg} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="w-full max-w-sm glass-container p-10 rounded-[3.5rem] shadow-2xl text-center border border-white/30 relative z-10 animate-in slide-in-from-bottom-10">
        <div className="w-20 h-20 bg-[#2D1B18] rounded-[2.2rem] mx-auto mb-8 flex items-center justify-center shadow-2xl rotate-3 border-2 border-white/20"><Coffee className="w-10 h-10 text-yellow-500" /></div>
        <h2 className="text-xl font-black mb-8 text-[#2D1B18] tracking-tight">{t.shopName}</h2>
        <div className="flex bg-black/5 p-1 rounded-2xl mb-8 shadow-inner border border-white/10">
          <button onClick={() => setIsNew(false)} className={`flex-1 py-3 rounded-xl font-black text-[10px] transition-all ${!isNew ? 'bg-white shadow-md text-[#2D1B18]' : 'text-gray-400'}`}>{t.login}</button>
          <button onClick={() => setIsNew(true)} className={`flex-1 py-3 rounded-xl font-black text-[10px] transition-all ${isNew ? 'bg-white shadow-md text-[#2D1B18]' : 'text-gray-400'}`}>{t.newMember}</button>
        </div>
        <div className="space-y-4">
          <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder={t.phonePlaceholder} className="w-full p-5 bg-white/80 rounded-[1.5rem] text-center text-sm font-black border-none focus:ring-2 ring-yellow-500 shadow-inner text-[#2D1B18] placeholder-gray-400 outline-none" />
          {isNew && <input value={name} onChange={e=>setName(e.target.value)} placeholder={t.namePlaceholder} className="w-full p-5 bg-white/80 rounded-[1.5rem] text-center text-sm font-black border-none focus:ring-2 ring-yellow-500 shadow-inner text-[#2D1B18] placeholder-gray-400 outline-none animate-in slide-in-from-top-2" />}
          <button onClick={() => onLogin(name, phone, isNew)} className="w-full bg-[#2D1B18] text-white py-5 rounded-[1.8rem] font-black shadow-xl active:scale-95 transition-all text-xs mt-4 uppercase tracking-tighter border-t border-white/10">{t.confirmBtn}</button>
        </div>
      </div>
    </div>
  );
}

// --- Home View ---
function HomeView({ user, users, setUsers, sliderImages, storeInfo, galleryPosts, onOpenReward, t, lang }: any) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [slide, setSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const tier = useMemo(() => getTierInfo(user, t), [user, t]);

  useEffect(() => {
    if (sliderImages.length > 1) {
      const interval = setInterval(() => setSlide(s => (s + 1) % sliderImages.length), 6000);
      return () => clearInterval(interval);
    }
  }, [sliderImages]);

  const nextSlide = () => setSlide(s => (s + 1) % sliderImages.length);
  const prevSlide = () => setSlide(s => (s - 1 + sliderImages.length) % sliderImages.length);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    setTouchStart(null);
  };

  const updateProfile = async (e: any) => {
    if (e.target.files?.[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setUsers(users.map((u:any) => u.phone === user.phone ? {...u, img: base64} : u));
    }
  };

  return (
    <div className="pb-24 pt-4 px-4 animate-in fade-in duration-700">
      <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar mb-4 pt-2">
        <div className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group" onClick={() => window.location.hash = '#/gallery'}>
           <div className="w-16 h-16 rounded-full story-ring p-[2.5px] shadow-lg group-hover:scale-110 transition-transform"><div className="w-full h-full rounded-full border-2 border-[#fdfaf3] overflow-hidden bg-white flex items-center justify-center"><img src={storeInfo.logo} className="w-full h-full object-cover" /></div></div>
           <span className="text-[10px] font-black text-[#2D1B18]">{t.gallery}</span>
        </div>
        {galleryPosts.map((post: any) => (
          <div key={post.id} className="flex-shrink-0 flex flex-col items-center gap-2 cursor-pointer group" onClick={() => window.location.hash = '#/gallery'}>
            <div className="w-16 h-16 rounded-full story-ring cursor-pointer active:scale-90 transition-transform shadow-md"><div className="w-full h-full rounded-full border-2 border-[#fdfaf3] overflow-hidden bg-gray-100"><img src={post.url} className="w-full h-full object-cover" /></div></div>
            <span className="text-[10px] font-black text-gray-400 truncate max-w-[64px]">Bistro</span>
          </div>
        ))}
      </div>

      <div 
        className="relative h-52 w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-10 group border-2 border-white"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {sliderImages.map((item:SliderItem, i:number) => (
          <div 
            key={item.id} 
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform ${
              slide === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
          >
            {item.type === 'image' ? (
              <img src={item.url} className={`w-full h-full object-cover ${slide === i ? 'ken-burns-active' : ''}`} />
            ) : (
              <video src={item.url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
            )}
          </div>
        ))}
        
        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronLeft className="w-4 h-4" /></button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><ChevronRight className="w-4 h-4" /></button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {sliderImages.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-500 ${slide === i ? 'w-6 bg-white shadow-lg' : 'w-1.5 bg-white/40'}`}></div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent p-10 flex flex-col justify-end pointer-events-none text-right" dir="rtl">
          <div className="flex items-center gap-2 mb-1 justify-end"><h2 className={`text-white text-2xl font-black transition-all ${tier.glow}`}>{t.welcome} {user.name} 👋</h2>{user.points >= 200 && <VIPBadge t={t} />}</div>
          <div className="flex items-center gap-2 justify-end"><span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${tier.badge} text-white shadow-lg flex items-center gap-2 border border-white/20`}>{tier.icon} {tier.label}</span></div>
        </div>
      </div>

      <div className="max-w-sm mx-auto perspective-1000 cursor-pointer mb-12 hover:scale-[1.02] transition-transform duration-300" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`relative google-wallet-card transition-all duration-700 preserve-3d shadow-2xl rounded-[2.5rem] ${isFlipped ? 'rotate-y-180' : ''}`}>
          <div style={{ backgroundColor: storeInfo.cardBg, backgroundImage: storeInfo.cardFrontImg ? `url(${storeInfo.cardFrontImg})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }} className="absolute inset-0 backface-hidden rounded-[2.5rem] p-10 text-white flex flex-col justify-between border border-white/10 overflow-hidden shadow-inner">
             <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 backdrop-blur-md z-40 flex items-center justify-center gap-2 overflow-hidden shadow-inner border-t border-white/20">
                <MousePointer2 className="w-4 h-4 animate-bounce text-[#2D1B18]" />
                <span className="text-[11px] font-black uppercase tracking-tighter text-[#2D1B18]">{t.cardHint}</span>
             </div>
             <div className="flex justify-between items-start z-10">
               <div className="flex items-center gap-5">
                  <div className="relative group p-0.5 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 shadow-xl">
                    <img src={user.img} className="w-16 h-16 rounded-full border-2 border-white/50 object-cover" />
                    <label className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"><Upload className="w-5 h-5 text-white" /><input type="file" hidden onChange={updateProfile} /></label>
                  </div>
                  <div className="text-right" dir="rtl"><div className="flex items-center gap-2 justify-end"><h3 className="text-base font-black tracking-tighter uppercase">{t.shopName}</h3>{user.points >= 200 && <VIPBadge t={t} />}</div><p className={`text-[11px] font-black uppercase tracking-widest ${tier.color} ${tier.glow}`}>{tier.label}</p></div>
               </div>
               <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-md"><img src={storeInfo.logo} className="w-10 h-10 rounded-xl" /></div>
             </div>
             <div className="flex justify-between items-end z-10 pb-8">
               <div className={lang === 'ar' ? 'text-right' : 'text-left'}><p className="text-[9px] font-black opacity-40 mb-1 tracking-widest uppercase">Member Name</p><p className={`text-base font-black uppercase ${tier.glow}`}>{user.name}</p></div>
               <div className="bg-white p-1.5 rounded-2xl shadow-2xl transform rotate-3 border-2 border-black/5"><img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${user.phone}`} className="w-14 h-14" /></div>
             </div>
          </div>
          <div style={{ backgroundColor: storeInfo.cardBg, backgroundImage: storeInfo.cardBackImg ? `url(${storeInfo.cardBackImg})` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }} className="absolute inset-0 backface-hidden rotate-y-180 rounded-[2.5rem] p-6 text-white flex flex-col border-4 border-yellow-500/20 shadow-2xl overflow-hidden">
             <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-[2.5rem]"></div>
             <div className="z-10 text-center flex-1 flex flex-col justify-center">
               <h4 className="text-[10px] font-black opacity-70 uppercase tracking-[0.15em] mb-4">{t.stampsTitle}</h4>
               <div className="grid grid-cols-5 gap-3 px-4">
                 {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i} 
                      onClick={(e) => { 
                        if (i === 9 && user.stamps >= 10) { 
                          e.stopPropagation(); 
                          onOpenReward(); 
                        } 
                      }}
                      className={`aspect-square rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                        i === 9 && user.stamps >= 10 ? 'animate-free-glow border-yellow-400 bg-amber-500/40 cursor-pointer scale-125' : 
                        i < user.stamps ? 'bg-yellow-400 border-white text-black shadow-lg scale-110' : 'bg-white/5 border-white/20 text-white/10'
                      }`}
                    >
                      <Coffee className="w-4 h-4" fill={i < user.stamps ? "currentColor" : "none"} />
                    </div>
                 ))}
               </div>
             </div>
             <div className="z-10 bg-[#1A100E] p-4 rounded-[1.8rem] border-2 border-yellow-500/30 mt-2 mb-2 relative overflow-hidden shadow-inner">
                <div className="flex justify-between items-center mb-2 px-1"><div className="flex items-center gap-2"><span className="text-[9px] font-black opacity-60 uppercase tracking-tighter">{t.pointsTitle}</span>{user.points >= 200 && <VIPBadge t={t} />}</div><span className="text-[10px] font-black text-yellow-400">{user.points} / 200 PT</span></div>
                <div className="h-4 w-full bg-black/50 rounded-full overflow-hidden border border-yellow-500/10"><div className={`h-full bg-yellow-400 transition-all duration-700 ease-out ${lang === 'ar' ? 'mr-auto' : 'ml-auto'}`} style={{ width: `${Math.min(100, (user.points/200)*100)}%` }}></div></div>
             </div>
          </div>
        </div>
      </div>
      <button onClick={() => window.location.hash = '#/menu'} className="w-full bg-[#2D1B18] text-white p-8 rounded-[3rem] flex items-center justify-between shadow-2xl active:scale-95 transition-all hover:bg-black border-t border-white/10"><div className={lang === 'ar' ? 'text-right z-10' : 'text-left z-10'} dir="rtl"><h3 className="text-xl font-black mb-1">{t.preOrder}</h3><p className="text-xs text-white/40 font-bold">{t.preOrderSub}</p></div><div className="bg-yellow-500/10 p-4 rounded-3xl z-10 border border-yellow-500/20 shadow-xl"><ShoppingBasket className="w-10 h-10 text-yellow-500" /></div></button>
    </div>
  );
}

function MenuView({ menu, onAddToCart, t }: any) {
  const [active, setActive] = useState(menu[0]?.id || 0);
  const items = menu.find((c:any) => c.id === active)?.items || [];
  return (
    <div className="pb-24 pt-6 px-4 animate-in fade-in duration-700 max-w-lg mx-auto">
      <div className="flex gap-4 overflow-x-auto pb-10 no-scrollbar px-2">
        {menu.map((cat:any) => (
          <button key={cat.id} onClick={() => setActive(cat.id)} className={`px-8 py-4 rounded-2xl font-black text-xs whitespace-nowrap transition-all duration-300 shadow-sm ${active === cat.id ? 'bg-[#2D1B18] text-white shadow-xl scale-110 -translate-y-1' : 'glass-container text-gray-500 hover:bg-gray-50'}`}>{cat.name}</button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-5">
        {items.map((item:any) => (
          <div key={item.id} className="glass-container rounded-[2.5rem] p-2.5 overflow-hidden border border-white hover:shadow-2xl transition-all duration-300 group">
            <div className="relative aspect-square rounded-[2.2rem] overflow-hidden mb-4 shadow-md border border-white">
              <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <button onClick={() => onAddToCart(item)} className="absolute bottom-3 left-3 bg-white/95 p-4 rounded-2xl shadow-xl active:scale-90 transition-transform hover:bg-[#2D1B18] hover:text-white"><Plus className="w-6 h-6" /></button>
            </div>
            <div className="px-3 pb-3 text-center"><h4 className="text-[12px] font-black text-[#2D1B18] truncate mb-1.5 px-1">{item.name}</h4><div className="flex items-center justify-center gap-1.5 bg-amber-50 py-1.5 rounded-full border border-amber-100/50"><span className="text-[11px] font-black text-amber-700 uppercase">{item.price} QAR</span></div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryView({ posts, storeInfo, t, lang }: any) {
  const [activeStory, setActiveStory] = useState<any>(null);
  return (
    <div className="pb-24 pt-6 px-4 animate-in fade-in duration-700 max-w-lg mx-auto">
      <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar mb-8 border-b border-gray-100">
        <div className="flex-shrink-0 flex flex-col items-center gap-2">
           <div className="w-16 h-16 rounded-full p-0.5 bg-gray-200 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center grayscale opacity-50"><Coffee className="w-8 h-8 text-gray-400" /></div>
           <span className="text-[9px] font-black text-gray-400">Story</span>
        </div>
        {posts.map((post:any) => (
          <div key={post.id} className="flex-shrink-0 flex flex-col items-center gap-2" onClick={() => setActiveStory(post)}>
            <div className="w-16 h-16 rounded-full story-ring cursor-pointer active:scale-90 transition-transform shadow-md"><div className="w-full h-full rounded-full border-2 border-[#fdfaf3] overflow-hidden bg-gray-100"><img src={post.url} className="w-full h-full object-cover" /></div></div>
            <span className="text-[9px] font-black text-[#2D1B18] truncate max-w-[64px]">Bistro</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {posts.map((post:any) => (
          <div key={post.id} className="relative aspect-[3/4] bg-white rounded-3xl overflow-hidden shadow-md group border border-gray-100 cursor-pointer hover:shadow-xl transition-all" onClick={() => setActiveStory(post)}>
             <img src={post.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end"><p className="text-white text-[10px] font-black line-clamp-2 leading-relaxed">{post.caption}</p></div>
          </div>
        ))}
      </div>
      {activeStory && (
        <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center animate-in zoom-in duration-300 px-6">
           <button onClick={() => setActiveStory(null)} className="absolute top-10 right-10 text-white p-3 z-50 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X className="w-8 h-8" /></button>
           <div className="relative w-full max-w-md aspect-[9/16] bg-black overflow-hidden shadow-2xl rounded-[3rem] border border-white/10">
              <img src={activeStory.url} className="w-full h-full object-contain" />
              <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black via-black/40 to-transparent text-right" dir="rtl">
                 <div className="flex items-center gap-4 mb-4 justify-end"><span className="text-white font-black text-lg">{t.shopName}</span><img src={storeInfo.logo} className="w-12 h-12 rounded-full border-2 border-yellow-500 shadow-xl" /></div>
                 <p className="text-white/90 text-sm font-bold leading-relaxed">{activeStory.caption}</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

function ScannerView({ users, setUsers, showToast, t, lang }: any) {
  const [scannedPhone, setScannedPhone] = useState<string | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState<string>('');
  const [isScanning, setIsScanning] = useState(true);
  const [manualPhone, setManualPhone] = useState('');
  const [isManualMode, setIsManualMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const foundUser = useMemo(() => users.find((u: any) => u.phone === scannedPhone), [users, scannedPhone]);
  useEffect(() => { if (isScanning && !isManualMode) startCamera(); else stopCamera(); return () => stopCamera(); }, [isScanning, isManualMode]);
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) { videoRef.current.srcObject = stream; streamRef.current = stream; requestAnimationFrame(tick); }
    } catch (err) { showToast("تعذر الوصول للكاميرا"); }
  };
  const stopCamera = () => { if (streamRef.current) { streamRef.current.getTracks().forEach(track => track.stop()); streamRef.current = null; } };
  const tick = () => {
    if (videoRef.current && canvasRef.current && isScanning && !isManualMode) {
      if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        const canvas = canvasRef.current; const video = videoRef.current; canvas.width = video.videoWidth; canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) { ctx.drawImage(video, 0, 0, canvas.width, canvas.height); const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height); const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: 'dontInvert' }); if (code) { setScannedPhone(code.data); setIsScanning(false); } }
      }
      requestAnimationFrame(tick);
    }
  };
  const handleManualSearch = () => {
    const exist = users.find((u: any) => u.phone === manualPhone);
    if (exist) { setScannedPhone(manualPhone); setIsScanning(false); setIsManualMode(false); } else { showToast(t.phoneNotFound); }
  };
  const handleUpdate = () => {
    const amount = parseFloat(purchaseAmount);
    if (!foundUser) return showToast("لم يتم العثور على العضو");
    if (isNaN(amount) || amount <= 0) return showToast("أدخل مبلغاً صحيحاً");
    setUsers(users.map((u: any) => { 
      if (u.phone === scannedPhone) { 
        // 1 ريال = نقطة
        let newPoints = u.points + amount; 
        // 20 ريال = طابع
        const addedStamps = Math.floor(amount / 20);
        let newStamps = Math.min(u.stamps + addedStamps, 10); 
        return { ...u, points: newPoints, stamps: newStamps }; 
      } 
      return u; 
    }));
    showToast(lang === 'ar' ? `تمت إضافة ${amount} نقطة ✅` : `Added ${amount} points ✅`);
    resetScanner();
  };
  const resetScanner = () => { setScannedPhone(null); setPurchaseAmount(''); setIsScanning(true); setIsManualMode(false); setManualPhone(''); };
  return (
    <div className="p-8 pb-24 animate-in fade-in duration-500 max-w-lg mx-auto">
      {isScanning ? (
        <div className="flex flex-col items-center gap-8">
           <h2 className="text-xl font-black text-[#2D1B18]">{t.scanTitle}</h2>
           {!isManualMode ? (
             <div className="relative w-full aspect-square max-w-sm glass-container rounded-[4rem] border-4 border-dashed border-amber-500/30 overflow-hidden shadow-2xl bg-black group active:scale-95 transition-all">
                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" /><canvas ref={canvasRef} hidden />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-yellow-400 rounded-3xl animate-pulse"></div>
                <button onClick={() => setIsManualMode(true)} className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white text-[#2D1B18] px-6 py-3 rounded-2xl font-black text-[10px] flex items-center gap-2 shadow-xl backdrop-blur-md active:scale-90 transition-all"><Keyboard className="w-4 h-4" /> {t.manualEntry}</button>
             </div>
           ) : (
             <div className="w-full glass-container p-10 rounded-[3rem] shadow-2xl border-2 border-white animate-in zoom-in-95">
                <input type="tel" value={manualPhone} onChange={e => setManualPhone(e.target.value)} placeholder={t.phonePlaceholder} className="w-full p-5 bg-white rounded-2xl text-center text-sm font-black border-none focus:ring-2 ring-amber-500 shadow-inner mb-6 text-[#2D1B18] outline-none" />
                <div className="grid grid-cols-2 gap-4"><button onClick={() => setIsManualMode(false)} className="p-4 bg-gray-50 rounded-2xl font-black text-[11px] text-gray-500 hover:bg-gray-100 transition-colors active:scale-95">{t.cancelBtn}</button><button onClick={handleManualSearch} className="p-4 bg-[#2D1B18] text-white rounded-2xl font-black text-[11px] shadow-lg hover:bg-black transition-all active:scale-95">{t.searchCustomer}</button></div>
             </div>
           )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-10 animate-in zoom-in-95">
           {foundUser && (
             <div className="w-full glass-container p-10 rounded-[4rem] shadow-2xl text-center border-2 border-white relative overflow-hidden">
                <div className="mb-6 flex flex-col items-center"><img src={foundUser.img} className="w-24 h-24 rounded-full border-4 border-yellow-500/20 mb-4 object-cover shadow-lg" /><h3 className="text-lg font-black text-[#2D1B18]">{foundUser.name}</h3><p className="text-[10px] font-bold text-gray-400 mt-1">{foundUser.phone}</p></div>
                <div className="space-y-4 mb-8"><input type="number" value={purchaseAmount} onChange={e => setPurchaseAmount(e.target.value)} placeholder="0.00" className="w-full p-6 bg-gray-50 rounded-[2.5rem] text-center text-3xl font-black border-none shadow-inner text-[#2D1B18] outline-none" /></div>
                <div className="grid grid-cols-2 gap-4"><button onClick={resetScanner} className="p-5 bg-gray-100 rounded-[2rem] font-black text-sm active:scale-95 transition-all">{t.cancelBtn}</button><button onClick={handleUpdate} className="p-5 bg-[#2D1B18] text-white rounded-[2rem] font-black text-sm shadow-xl hover:bg-black active:scale-95 transition-all">{t.updateBtn}</button></div>
             </div>
           )}
        </div>
      )}
    </div>
  );
}

function AboutSection({ info, t, lang }: any) {
  return (
    <div className="p-4 pb-24 animate-in fade-in duration-700 max-w-lg mx-auto">
       <div className="glass-container rounded-[3rem] p-8 shadow-2xl border-2 border-white relative overflow-hidden text-center mb-6">
          <img src={info.logo} className="w-28 h-28 rounded-3xl mx-auto shadow-xl border-4 border-white mb-6 object-cover" />
          <h2 className="text-2xl font-black text-[#2D1B18] mb-1 uppercase tracking-tighter">{t.shopName}</h2>
          <p className="text-[11px] text-gray-500 font-bold mb-8 italic">{info.address}</p>
          
          <div className="space-y-4">
             <div className="grid grid-cols-2 gap-3">
               <a href={`tel:${info.phone}`} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm hover:scale-105 active:scale-95 transition-all border border-green-50">
                 <Phone className="w-5 h-5 text-green-600" />
                 <span className="text-[9px] font-black">{lang === 'ar' ? 'اتصال' : 'Call'}</span>
               </a>
               <a href={`https://wa.me/${info.whatsapp?.replace(/[^0-9]/g, '')}`} className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm hover:scale-105 active:scale-95 transition-all border border-green-50">
                 <MessageCircle className="w-5 h-5 text-green-500" />
                 <span className="text-[9px] font-black">واتساب</span>
               </a>
             </div>
             
             <div className="grid grid-cols-3 gap-3">
               <a href={info.insta} target="_blank" className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl shadow-sm active:scale-95 transition-all">
                 <Instagram className="w-4 h-4 text-pink-600" />
                 <span className="text-[8px] font-black uppercase">Insta</span>
               </a>
               <a href={info.tiktok} target="_blank" className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl shadow-sm active:scale-95 transition-all">
                 <Video className="w-4 h-4 text-stone-800" />
                 <span className="text-[8px] font-black uppercase">TikTok</span>
               </a>
               <a href={info.gps} target="_blank" className="flex flex-col items-center gap-1.5 p-3 bg-white rounded-xl shadow-sm active:scale-95 transition-all border border-red-50">
                 <MapPin className="w-4 h-4 text-red-600" />
                 <span className="text-[8px] font-black uppercase">Maps</span>
               </a>
             </div>
          </div>
       </div>

       {/* قسم ساعات العمل */}
       <div className="glass-container rounded-[2.5rem] p-6 shadow-xl border border-white">
          <h3 className="font-black text-sm text-[#2D1B18] mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            {t.workingHours}
          </h3>
          <div className="space-y-2">
             {info.hours.map((wd: WorkingDay, idx: number) => (
               <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs font-black text-stone-600">{wd.day}</span>
                  {wd.isClosed ? (
                    <span className="text-[10px] font-black text-red-500 bg-red-50 px-3 py-1 rounded-full">{t.closed}</span>
                  ) : (
                    <div className="flex items-center gap-2 text-[10px] font-bold text-[#2D1B18]">
                       <span className="bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">{wd.from}</span>
                       <span className="text-gray-300">|</span>
                       <span className="bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">{wd.to}</span>
                    </div>
                  )}
               </div>
             ))}
          </div>
       </div>
    </div>
  );
}
