// Import your local images
import marriageFrame from "../assets/Marriage_memo.png";
import petFrame from "../assets/frame_1.png";
import babyFrame from "../assets/baby_memories.png";
import resinClock from "../assets/clock_2.png";
import heartCoasters from "../assets/heart_calender.png";
import customGift from "../assets/custom_gift.png";
import miniAlbums from "../assets/mini_albums.png";
//import keychainImage from "../assets/keychain_1.png"; // If you have this, or use a placeholder

export const CONFIG = {
  SELLER_WHATSAPP_NUMBER: "918122853272",
  INSTAGRAM_USERNAME: "_sky_choices_",
  BRAND_NAME: "Sky Choices",
  TAGLINE: "Resin crafts destination"
};

export const CATEGORIES = ["All", "Frames", "Clocks", "Keychains", "Coasters", "Jewelry"];

export const INPUT_CLASS = "w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-sky-200 bg-white/90 text-sky-900 placeholder-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all duration-200 text-sm sm:text-base";

export const SAMPLE_PRODUCTS = [
  { 
    id: "f1", 
    title: "Marriage Memory Frame", 
    category: "Frames", 
    price: 1299, 
    originalPrice: 1499,
    description: "Elegant resin frame perfect for wedding memories.", 
    image: marriageFrame
  },
  { 
    id: "f2", 
    title: "Pet Memory Frame", 
    category: "Frames", 
    price: 899, 
    originalPrice: 1099,
    description: "Cherish your pet memories in this beautiful frame.", 
    image: petFrame
  },
  { 
    id: "f3", 
    title: "Baby Memories Frame", 
    category: "Frames", 
    price: 999, 
    description: "Preserve precious baby moments in resin.", 
    image: babyFrame
  },
  { 
    id: "c1", 
    title: "Geode Resin Desk Clock", 
    category: "Clocks", 
    price: 1599, 
    originalPrice: 1899,
    description: "Beautiful geode-inspired resin clock with golden numbers.", 
    image: resinClock
  },
//   { 
//     id: "k1", 
//     title: "Ocean Drop Keychain", 
//     category: "Keychains", 
//     price: 299, 
//     originalPrice: 399,
//     description: "Beautiful ocean-inspired resin keychain with shimmer.", 
//     image: keychainImage || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop"
//   },
  { 
    id: "cs1", 
    title: "Heart Calendar Coasters", 
    category: "Coasters", 
    price: 699, 
    description: "Set of beautiful heart-shaped calendar coasters.", 
    image: heartCoasters
  },
  { 
    id: "j1", 
    title: "Custom Resin Gift", 
    category: "Jewelry", 
    price: 499, 
    originalPrice: 599,
    description: "Elegant custom resin gift item.", 
    image: customGift
  },
  { 
    id: "a1", 
    title: "Mini Photo Albums", 
    category: "Albums", 
    price: 899, 
    description: "Handcrafted mini resin photo albums.", 
    image: miniAlbums
  }
];