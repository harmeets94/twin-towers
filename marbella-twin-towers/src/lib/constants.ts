// Contact Information
export const PHONE_PRIMARY = "+91-99885-11177";
export const PHONE_SECONDARY = "+91-82890-11177";
export const PHONE_PRIMARY_CLEAN = "+919988511177";
export const RERA_NUMBER = "PBRERA-SAS80-PR0616";

// WhatsApp
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I would like to know more about the Marbella Twin Towers New Chandigarh project. Please call me."
);
export const WHATSAPP_LINK = `https://api.whatsapp.com/send?phone=${PHONE_PRIMARY_CLEAN}&text=${WHATSAPP_MESSAGE}`;

// Project Details
export const PROJECT_ADDRESS = "Madhya Marg, Sector 2, New Chandigarh, Mullanpur";
export const PROJECT_NAME = "Marbella Twin Towers";

// Maps
export const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4226.4427810782745!2d76.75204397620175!3d30.786664783023003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzDCsDQ3JzEzLjkiTiA3NsKwNDUnMTUuOSJF!5e1!3m2!1sen!2sin!4v1740482515096!5m2!1sen!2sin";

// Video
export const YOUTUBE_VIDEO_ID = "4BHqr_Y4jxg";

// Navigation
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Floor Plan", href: "#floorplan" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;

// Hero Slides
export const HERO_SLIDES = [
  { src: "/images/1.svg", alt: "Marbella Twin Towers Exterior View" },
  { src: "/images/1.svg", alt: "Marbella Twin Towers Lobby" },
  { src: "/images/1.svg", alt: "Marbella Twin Towers Amenities" },
  { src: "/images/1.svg", alt: "Marbella Twin Towers Living Room" },
  { src: "/images/1.svg", alt: "Marbella Twin Towers Bedroom" },
  { src: "/images/1.svg", alt: "Marbella Twin Towers Kitchen" },
  { src: "/images/1.svg", alt: "Marbella Twin Towers Balcony View" },
  { src: "/images/1.svg", alt: "Marbella Twin Towers Pool" },
];

// Gallery Images
export const GALLERY_IMAGES = [
  { src: "/images/g1.svg", alt: "Marbella Twin Towers Gallery 1" },
  { src: "/images/g1.svg", alt: "Marbella Twin Towers Gallery 2" },
  { src: "/images/g1.svg", alt: "Marbella Twin Towers Gallery 3" },
  { src: "/images/g1.svg", alt: "Marbella Twin Towers Gallery 4" },
  { src: "/images/g1.svg", alt: "Marbella Twin Towers Gallery 5" },
  { src: "/images/g1.svg", alt: "Marbella Twin Towers Gallery 6" },
  { src: "/images/g1.svg", alt: "Marbella Twin Towers Gallery 7" },
  { src: "/images/g1.svg", alt: "Marbella Twin Towers Gallery 8" },
  { src: "/images/g1.svg", alt: "Marbella Twin Towers Gallery 9" },
  { src: "/images/g1.svg", alt: "Marbella Twin Towers Gallery 10" },
];

// Floor Plans
export const FLOOR_PLANS = [
  { src: "/images/f1.svg", alt: "Floor Plan Type A" },
  { src: "/images/f1.svg", alt: "Floor Plan Type B" },
  { src: "/images/f1.svg", alt: "Floor Plan Type C" },
  { src: "/images/f1.svg", alt: "Floor Plan Type D" },
  { src: "/images/f1.svg", alt: "Floor Plan Type E" },
];

// Statistics
export const STATS = [
  { value: 4.36, label: "Acres Total Area", suffix: "" },
  { value: 33, label: "Floors Tallest Tower", suffix: "" },
  { value: 50000, label: "Sq. Ft. Clubhouse", suffix: "" },
  { value: 264, label: "Super Luxury Residences", suffix: "" },
];

// Features/USPs
export const FEATURES = [
  "Pollution free environment",
  "24*7 power backup & water supply",
  "Club House (Swimming Pool, Gym)",
  "Gated and secured society with CCTV",
  "Kids play area",
];

// Service Ticker Items
export const SERVICE_ITEMS = [
  { icon: "leaf", text: "Pollution free environment" },
  { icon: "zap", text: "24*7 power backup & water supply" },
  { icon: "building", text: "Club House (Swimming Pool, Gym)" },
  { icon: "shield", text: "Gated and secured society with CCTV" },
];
