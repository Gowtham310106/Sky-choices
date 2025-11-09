/*
Sky Choices — Compact Product Cards with Offer Pricing
*/

import React, { useEffect, useMemo, useState } from "react";

// === CONFIG ===
const SELLER_WHATSAPP_NUMBER = "918122853272";
const INSTAGRAM_USERNAME = "_sky_choices_";
const BRAND_NAME = "Sky Choices";
const TAGLINE = "Resin crafts destination";
// ==============

const CATEGORIES = ["All", "Frames", "Clocks", "Keychains", "Coasters", "Jewelry"];

// Brand Logo
function BrandLogo({ size = 40 }) {
  return (
    <div className="flex items-center gap-2 select-none">
      <div className="relative">
        <svg width={size} height={size} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden className="drop-shadow">
          <defs>
            <linearGradient id="wave" x1="0" x2="1">
              <stop offset="0%" stopColor="#7ecdf2" />
              <stop offset="100%" stopColor="#0b6bd6" />
            </linearGradient>
          </defs>
          <circle cx="32" cy="32" r="30" fill="url(#wave)" />
          <path d="M10 38c10-10 20-6 26-2s10 4 18-2c-3 10-12 18-24 18S12 46 10 38z" fill="#0a4ea3" opacity=".35" />
          <path d="M38 26c-6-6-16-2-20 2 4-1 9 0 12 2 6 4 10 4 16 0-2-2-4-3-8-4z" fill="#2aa4f4" opacity=".85" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className="font-bold text-lg sm:text-xl tracking-tight text-sky-900">{BRAND_NAME}</div>
        <div className="text-xs text-sky-700/80 font-medium hidden sm:block">{TAGLINE}</div>
      </div>
    </div>
  );
}

// Loading spinner component
function LoadingSpinner({ size = "medium" }) {
  const sizes = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12"
  };
  
  return (
    <div className={`${sizes[size]} border-4 border-sky-200 border-t-sky-600 rounded-full animate-spin`}></div>
  );
}

// Compact Product Card with Offer Pricing
function ProductCard({ product, onAddToCart }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Calculate discount percentage
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article className="group rounded-xl sm:rounded-2xl overflow-hidden bg-white/80 backdrop-blur border border-sky-100/80 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      {/* Discount badge */}
      {discountPercent > 0 && (
        <div className="absolute top-2 left-2 z-10">
          <span className="px-1.5 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full shadow">
            {discountPercent}% OFF
          </span>
        </div>
      )}
      
      {/* Premium badge for expensive items */}
      {product.price > 2000 && !discountPercent && (
        <div className="absolute top-2 left-2 z-10">
          <span className="px-1.5 py-0.5 text-xs font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 rounded-full shadow">
            Premium
          </span>
        </div>
      )}
      
      <div className="relative h-32 sm:h-36 bg-gradient-to-br from-sky-50 via-white to-sky-100 overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <LoadingSpinner size="small" />
          </div>
        )}
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.title}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sky-600">
            <div className="text-center">
              <div className="text-2xl mb-1">🖼️</div>
            </div>
          </div>
        )}
      </div>
      
      <div className="p-2 sm:p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="inline-flex text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-sky-100/80 text-sky-800 border border-sky-200/60 font-semibold">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-sm font-semibold text-sky-950 mb-1 line-clamp-1 leading-tight">
          {product.title}
        </h3>
        
        <p className="text-xs text-sky-700/90 leading-relaxed line-clamp-2 mb-2 h-8 overflow-hidden">
          {product.description}
        </p>
        
        {/* Pricing Section */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1">
            {/* Offer Price */}
            <span className="text-base font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              ₹{product.price.toLocaleString()}
            </span>
            
            {/* Original Price with strikethrough */}
            {product.originalPrice && (
              <span className="text-xs text-sky-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          {/* Discount percentage */}
          {discountPercent > 0 && (
            <span className="text-xs font-medium text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
              Save {discountPercent}%
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between gap-1">
          <button 
            onClick={() => onAddToCart(product.id)}
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow hover:shadow-md hover:scale-105 transform transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-sky-300 text-xs flex-1 justify-center"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add
          </button>
          
          <a 
            href={`https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=Hi! I'm interested in ${encodeURIComponent(product.title)}`}
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-1 text-xs text-sky-700 hover:text-sky-900 hover:underline transition-colors shrink-0 ml-1 p-1"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.176-1.24-6.165-3.495-8.411"/>
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

// Cart Item Component
function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(item.id), 300);
  };

  return (
    <div className={`flex items-center gap-3 p-3 bg-white/50 rounded-xl border border-sky-100/50 transition-all duration-300 ${isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border border-sky-100 shadow-sm"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop";
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sky-900 text-sm sm:text-base truncate">{item.title}</div>
        <div className="text-xs sm:text-sm text-sky-700">
          ₹{item.price.toLocaleString()} each
          {item.originalPrice && (
            <span className="text-sky-500 line-through ml-1">
              ₹{item.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 sm:mt-2">
          <button 
            onClick={() => onUpdateQuantity(item.id, item.qty - 1)}
            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors text-xs"
          >
            −
          </button>
          <div className="w-6 sm:w-8 text-center text-sm font-medium text-sky-900">{item.qty}</div>
          <button 
            onClick={() => onUpdateQuantity(item.id, item.qty + 1)}
            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors text-xs"
          >
            +
          </button>
          <button 
            onClick={handleRemove}
            className="ml-1 sm:ml-2 text-xs text-rose-600 hover:text-rose-700 hover:underline transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-sky-900 text-sm sm:text-base">₹{(item.price * item.qty).toLocaleString()}</div>
        {item.originalPrice && (
          <div className="text-xs text-sky-500 line-through">
            ₹{(item.originalPrice * item.qty).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}

// Sample products with offer pricing
const SAMPLE_PRODUCTS = [
  { 
    id: "f1", 
    title: "Ocean Wave Frame", 
    category: "Frames", 
    price: 1299, 
    originalPrice: 1499,
    description: "Resin frame with ocean blue pour and shell accents.", 
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" 
  },
  { 
    id: "f2", 
    title: "Gold Leaf Frame", 
    category: "Frames", 
    price: 899, 
    originalPrice: 1099,
    description: "Clear resin with gold leaf detailing.", 
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop" 
  },
  { 
    id: "c1", 
    title: "Marbled Wall Clock", 
    category: "Clocks", 
    price: 2499, 
    originalPrice: 2799,
    description: "Silent movement, marble swirl design.", 
    image: "https://images.unsplash.com/photo-1508963493744-76fce69379c0?w=400&h=300&fit=crop" 
  },
  { 
    id: "c2", 
    title: "Geode Desk Clock", 
    category: "Clocks", 
    price: 1799, 
    originalPrice: 1999,
    description: "Geode crystal effect with gold accents.", 
    image: "https://images.unsplash.com/photo-1518133835872-cc4eev-0d6b7c3f9c8a?w=400&h=300&fit=crop" 
  },
  { 
    id: "k1", 
    title: "Initial Keychain", 
    category: "Keychains", 
    price: 199, 
    description: "Custom initial with glitter sealed in resin.", 
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" 
  },
  { 
    id: "k2", 
    title: "Ocean Drop Keychain", 
    category: "Keychains", 
    price: 249, 
    description: "Ocean blue with tiny shells inside.", 
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop" 
  },
  { 
    id: "cs1", 
    title: "Marble Coasters Set", 
    category: "Coasters", 
    price: 749, 
    originalPrice: 899,
    description: "Set of 4 marble coasters with cork.", 
    image: "https://images.unsplash.com/photo-1508963493744-76fce69379c0?w=400&h=300&fit=crop" 
  },
  { 
    id: "j1", 
    title: "Flower Pendant", 
    category: "Jewelry", 
    price: 399, 
    description: "Pressed flowers in clear resin pendant.", 
    image: "https://images.unsplash.com/photo-1518133835872-cc4eev-0d6b7c3f9c8a?w=400&h=300&fit=crop" 
  },
  { 
    id: "f3", 
    title: "Mini Photo Frame", 
    category: "Frames", 
    price: 599, 
    description: "Small resin frame for desk photos.", 
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" 
  },
  { 
    id: "k3", 
    title: "Crystal Keychain", 
    category: "Keychains", 
    price: 299, 
    originalPrice: 399,
    description: "Crystal clear with colorful flakes.", 
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop" 
  },
  { 
    id: "cs2", 
    title: "Geode Coasters", 
    category: "Coasters", 
    price: 849, 
    description: "Geode style coasters set of 4.", 
    image: "https://images.unsplash.com/photo-1508963493744-76fce69379c0?w=400&h=300&fit=crop" 
  },
  { 
    id: "j2", 
    title: "Resin Earrings", 
    category: "Jewelry", 
    price: 349, 
    originalPrice: 449,
    description: "Handmade resin drop earrings.", 
    image: "https://images.unsplash.com/photo-1518133835872-cc4eev-0d6b7c3f9c8a?w=400&h=300&fit=crop" 
  },
];

const INPUT_CLASS = "w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-sky-200 bg-white/90 text-sky-900 placeholder-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all duration-200 text-sm sm:text-base";

export default function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminForm, setAdminForm] = useState({ 
    title: "", 
    price: "", 
    originalPrice: "",
    description: "", 
    imageFile: null, 
    imageURL: "", 
    category: "Frames" 
  });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [customer, setCustomer] = useState({ name: "", email: "", address: "" });
  const [activeCat, setActiveCat] = useState("All");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);

  // Load products
  useEffect(() => {
    const loadData = () => {
      try {
        const savedProducts = localStorage.getItem("sky_products");
        const savedCart = localStorage.getItem("sky_cart");
        
        if (savedProducts && savedProducts !== "undefined") {
          const parsedProducts = JSON.parse(savedProducts);
          setProducts(parsedProducts);
        } else {
          setProducts(SAMPLE_PRODUCTS);
          localStorage.setItem("sky_products", JSON.stringify(SAMPLE_PRODUCTS));
        }
        
        if (savedCart && savedCart !== "undefined") {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.error("Error loading data:", error);
        setProducts(SAMPLE_PRODUCTS);
        localStorage.setItem("sky_products", JSON.stringify(SAMPLE_PRODUCTS));
      }
    };

    const timer = setTimeout(() => {
      loadData();
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Save products to localStorage
  useEffect(() => { 
    if (products.length > 0) {
      localStorage.setItem("sky_products", JSON.stringify(products)); 
    }
  }, [products]);

  // Save cart to localStorage
  useEffect(() => { 
    localStorage.setItem("sky_cart", JSON.stringify(cart)); 
  }, [cart]);

  function addToCart(productId) { 
    setCart((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 })); 
  }

  function updateQuantity(productId, qty) { 
    setCart((prev) => { 
      const next = { ...prev }; 
      if (qty <= 0) delete next[productId]; 
      else next[productId] = qty; 
      return next; 
    }); 
  }

  function clearCart() { 
    setCart({}); 
    setCartOpen(false);
  }

  // Admin: add product
  function handleAdminSubmit(e) {
    e.preventDefault();
    const { title, price, originalPrice, description, imageFile, imageURL, category } = adminForm;
    if (!title || !price) return alert("Please provide title and price.");

    function createProductWithImage(imgData) {
      const newP = { 
        id: "p" + Date.now(), 
        title, 
        category, 
        price: parseFloat(price), 
        originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
        description, 
        image: imgData || imageURL || "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" 
      };
      setProducts((prev) => [newP, ...prev]);
      setAdminForm({ 
        title: "", 
        price: "", 
        originalPrice: "",
        description: "", 
        imageFile: null, 
        imageURL: "", 
        category: "Frames" 
      });
      setShowAdmin(false);
    }

    if (imageFile) { 
      const reader = new FileReader(); 
      reader.onload = () => createProductWithImage(reader.result); 
      reader.readAsDataURL(imageFile); 
    }
    else createProductWithImage(null);
  }

  function openCheckout() { 
    if (Object.keys(cart).length === 0) return alert("Cart is empty."); 
    setCheckoutOpen(true); 
    setCartOpen(false);
  }

  function getCartItems() { 
    return Object.entries(cart)
      .map(([id, qty]) => { 
        const prod = products.find((p) => p.id === id); 
        return prod ? { ...prod, qty } : null; 
      })
      .filter(Boolean); 
  }

  function cartTotal() { 
    return getCartItems().reduce((s, it) => s + it.price * it.qty, 0); 
  }

  function handlePayment(e) {
    e.preventDefault();
    const items = getCartItems();
    const order = { 
      id: "ORD" + Date.now().toString().slice(-6), 
      customer, 
      items, 
      total: cartTotal(), 
      createdAt: new Date().toISOString() 
    };
    setOrderInfo(order);
    
    const messageLines = [
      `🛍️ New Order from ${customer.name || "(no name)"}`,
      `📧 Email: ${customer.email || "(no email)"}`,
      "---",
      ...items.map((it) => `${it.qty} x ${it.title} — ₹${(it.price * it.qty).toLocaleString()}`),
      "---",
      `💰 Total: ₹${order.total.toLocaleString()}`,
      `🏠 Delivery: ${customer.address || "(not provided)"}`,
      `📦 Order ID: ${order.id}`
    ];
    
    const waText = encodeURIComponent(messageLines.join("\n"));
    const waLink = `https://wa.me/${SELLER_WHATSAPP_NUMBER}?text=${waText}`;
    window.open(waLink, "_blank");
    clearCart();
    setCheckoutOpen(false);
    setCustomer({ name: "", email: "", address: "" });
    
    setTimeout(() => setOrderInfo(null), 5000);
  }

  const filtered = useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }
    
    return products.filter((p) => {
      const inCat = activeCat === "All" || p.category === activeCat;
      const inQuery = !query || [p.title, p.description, p.category].join(" ").toLowerCase().includes(query.toLowerCase());
      return inCat && inQuery;
    });
  }, [products, activeCat, query]);

  const cartItemCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const resetProducts = () => {
    setProducts(SAMPLE_PRODUCTS);
    localStorage.setItem("sky_products", JSON.stringify(SAMPLE_PRODUCTS));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 text-sky-950">
      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-sky-100/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <BrandLogo />
          
          <div className="flex items-center gap-1 sm:gap-2">
            <a 
              href={`https://instagram.com/${INSTAGRAM_USERNAME}`} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-sky-200 text-sky-700 hover:bg-sky-50 transition-all duration-200 shadow-sm"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            
            <a 
              href={`https://wa.me/${SELLER_WHATSAPP_NUMBER}`} 
              target="_blank" 
              rel="noreferrer" 
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg hover:scale-105 transform transition-all duration-200"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.176-1.24-6.165-3.495-8.411"/>
              </svg>
            </a>
            
            <button 
              onClick={() => setShowAdmin((s) => !s)} 
              className="p-2 sm:px-3 sm:py-2 rounded-xl border border-sky-200 text-sky-700 hover:bg-sky-50 transition-all duration-200 shadow-sm text-xs sm:text-sm"
            >
              {showAdmin ? "Close" : "Admin"}
            </button>
            
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 sm:px-3 sm:py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 shadow-lg hover:scale-105 transform transition-all duration-200 font-semibold text-xs sm:text-sm"
            >
              🛒
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-lg animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-12 relative">
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white/60 backdrop-blur-lg border border-sky-100/80 shadow-xl">
            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold tracking-tight text-sky-900 mb-2 sm:mb-3">
              Hand‑crafted <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">Resin Art</span>
            </h1>
            <p className="text-sm sm:text-lg text-sky-700 mb-4 sm:mb-6">
              Discover unique resin crafts with special offers! Limited time discounts available.
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a 
                href="#catalog" 
                className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 font-semibold text-xs sm:text-sm"
              >
                🛍️ Shop Deals
              </a>
              <a 
                href={`https://wa.me/${SELLER_WHATSAPP_NUMBER}`} 
                target="_blank" 
                rel="noreferrer"
                className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl border-2 border-sky-200 text-sky-800 hover:bg-sky-50 transition-all duration-200 font-semibold text-xs sm:text-sm"
              >
                💬 Custom Order
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 pb-12 sm:pb-16" id="catalog">
        {/* Admin Panel */}
        {showAdmin && (
          <section className="mb-4 sm:mb-6 bg-white/70 backdrop-blur rounded-xl sm:rounded-2xl border border-sky-100/80 shadow-lg p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className="text-base sm:text-lg font-bold text-sky-900">Admin Panel</h2>
              <span className="text-xs text-sky-700 bg-sky-100 px-2 py-1 rounded-full">
                {products.length} products
              </span>
            </div>
            <form onSubmit={handleAdminSubmit} className="grid gap-2 sm:gap-3 text-sm">
              <input value={adminForm.title} onChange={(e)=>setAdminForm(f=>({...f,title:e.target.value}))} placeholder="Product Title" className={INPUT_CLASS} />
              <div className="grid grid-cols-2 gap-2">
                <input value={adminForm.price} onChange={(e)=>setAdminForm(f=>({...f,price:e.target.value}))} placeholder="Offer Price (₹)" type="number" className={INPUT_CLASS} />
                <input value={adminForm.originalPrice} onChange={(e)=>setAdminForm(f=>({...f,originalPrice:e.target.value}))} placeholder="Original Price (₹)" type="number" className={INPUT_CLASS} />
              </div>
              <select value={adminForm.category} onChange={(e)=>setAdminForm(f=>({...f,category:e.target.value}))} className={INPUT_CLASS}>
                {CATEGORIES.filter((c)=>c!=="All").map((c)=>(<option key={c}>{c}</option>))}
              </select>
              <input value={adminForm.imageURL} onChange={(e)=>setAdminForm(f=>({...f,imageURL:e.target.value}))} placeholder="Image URL (optional)" className={INPUT_CLASS} />
              <div>
                <label className="block text-xs font-medium text-sky-700 mb-1">Or upload image:</label>
                <input type="file" accept="image/*" onChange={(e)=>setAdminForm(f=>({...f,imageFile:e.target.files?.[0]}))} className="w-full text-xs text-sky-700" />
              </div>
              <div>
                <textarea value={adminForm.description} onChange={(e)=>setAdminForm(f=>({...f,description:e.target.value}))} placeholder="Product Description" className={`${INPUT_CLASS} h-20 sm:h-24 resize-none`} />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 font-semibold text-xs sm:text-sm">
                  + Add Product
                </button>
                <button type="button" onClick={() => setShowAdmin(false)} className="px-3 sm:px-4 py-2 rounded-xl border border-sky-200 text-sky-700 hover:bg-sky-50 transition-all duration-200 text-xs sm:text-sm">
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Filters */}
        <section className="mb-3 sm:mb-4">
          <div className="flex flex-col gap-2 sm:gap-3">
            {/* Category Filters */}
            <div className="overflow-x-auto pb-1 -mx-3 sm:mx-0 px-3 sm:px-0">
              <div className="flex gap-1 sm:gap-2 min-w-max">
                {CATEGORIES.map((c) => (
                  <button 
                    key={c} 
                    onClick={() => setActiveCat(c)} 
                    className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs border transition-all duration-200 font-medium whitespace-nowrap ${
                      activeCat===c
                        ? "bg-gradient-to-r from-sky-600 to-blue-600 text-white border-transparent shadow-md"
                        : "bg-white/70 backdrop-blur border-sky-200 text-sky-800 hover:bg-sky-50 hover:border-sky-300 shadow-sm"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <input 
                value={query} 
                onChange={(e)=>setQuery(e.target.value)} 
                placeholder="Search products..." 
                className={`${INPUT_CLASS} pl-9 text-sm`} 
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </section>

        {/* Compact Product Grid */}
        <section>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-sky-900">Hot Deals</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-sky-700 bg-sky-100 px-2 py-1 rounded-full">
                {filtered.length} items
              </span>
              {products.length === 0 && (
                <button 
                  onClick={resetProducts}
                  className="text-xs bg-amber-500 text-amber-950 px-2 py-1 rounded-lg hover:bg-amber-400 transition-colors"
                >
                  Load Products
                </button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8 sm:py-12">
              <div className="text-center">
                <LoadingSpinner size="medium" />
                <p className="mt-3 text-sky-700 text-sm">Loading products...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Compact Grid - 2 columns on mobile, 3-4 on larger screens */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
                ))}
              </div>
              
              {filtered.length === 0 && products.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📦</div>
                  <h3 className="text-base sm:text-lg font-semibold text-sky-900 mb-1">No products available</h3>
                  <p className="text-sky-700 max-w-md mx-auto text-xs sm:text-sm mb-3">
                    Click below to load sample products with special offers!
                  </p>
                  <button 
                    onClick={resetProducts}
                    className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-xs sm:text-sm"
                  >
                    Load Sample Products
                  </button>
                </div>
              )}
              
              {filtered.length === 0 && products.length > 0 && (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🔍</div>
                  <h3 className="text-base sm:text-lg font-semibold text-sky-900 mb-1">No products found</h3>
                  <p className="text-sky-700 max-w-md mx-auto text-xs sm:text-sm">
                    Try different search terms or categories.
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        {/* Rest of the components (Cart, Checkout, Footer) remain the same */}
        {/* ... */}
      </main>
    </div>
  );
}