import React, { useEffect, useMemo, useState } from 'react';

// Import your local images directly
import marriageFrame from "./assets/Marriage_memo.png";
import petFrame from "./assets/frame_1.png";
import babyFrame from "./assets/baby_memories.png";
import resinClock from "./assets/clock_2.png";
import heartCoasters from "./assets/heart_calender.png";
import customGift from "./assets/custom_gift.png";
import miniAlbums from "./assets/mini_albums.png";
import KeyChain from "./assets/key_chain.png";


// Sample products with ONLY local images
const SAMPLE_PRODUCTS = [
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
  { 
    id: "k1", 
    title: "Ocean Drop Keychain", 
    category: "Keychains", 
    price: 299, 
    originalPrice: 399,
    description: "Beautiful ocean-inspired resin keychain with shimmer.", 
    image: KeyChain // Using existing image as placeholder
  },
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

// Config constants
const CONFIG = {
  SELLER_WHATSAPP_NUMBER: "918122853272",
  INSTAGRAM_USERNAME: "_sky_choices_",
  BRAND_NAME: "Sky Choices",
  TAGLINE: "Resin crafts destination"
};

const CATEGORIES = ["All", "Frames", "Clocks", "Keychains", "Coasters", "Jewelry"];
const INPUT_CLASS = "w-full px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border-2 border-sky-200 bg-white/90 text-sky-900 placeholder-sky-500/70 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all duration-200 text-sm sm:text-base";

// Import components
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AdminPanel from "./components/AdminPanel";
import Filters from "./components/Filters";
import ProductCard from "./components/ProductCard";
import CartSidebar from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";
import OrderToast from "./components/OrderToast";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

// Custom hook for localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item && item !== "undefined" ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [storedValue, setValue];
}

export default function App() {
  const [products, setProducts] = useLocalStorage("sky_products", []);
  const [cart, setCart] = useLocalStorage("sky_cart", {});
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

  // FORCE RESET - Clear old data and use only local images
  useEffect(() => {
    console.log('🔄 FORCE RESET: Loading local images only');
    
    // Clear old localStorage data
    localStorage.removeItem("sky_products");
    localStorage.removeItem("sky_cart");
    
    const timer = setTimeout(() => {
      console.log('📦 Setting products with local images:', SAMPLE_PRODUCTS);
      setProducts(SAMPLE_PRODUCTS);
      setCart({});
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [setProducts]);

  // Cart functions
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

  function openCheckout() { 
    if (Object.keys(cart).length === 0) return alert("Cart is empty."); 
    setCheckoutOpen(true); 
    setCartOpen(false);
  }

  // Admin functions - ONLY allow local image uploads
  function handleAdminSubmit(e) {
    e.preventDefault();
    const { title, price, originalPrice, description, imageFile, category } = adminForm;
    if (!title || !price) return alert("Please provide title and price.");

    function createProductWithImage(imgData) {
      const newP = { 
        id: "p" + Date.now(), 
        title, 
        category, 
        price: parseFloat(price), 
        originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
        description, 
        image: imgData || marriageFrame // Use local image as default
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

  // Checkout functions
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
    const waLink = `https://wa.me/${CONFIG.SELLER_WHATSAPP_NUMBER}?text=${waText}`;
    window.open(waLink, "_blank");
    clearCart();
    setCheckoutOpen(false);
    setCustomer({ name: "", email: "", address: "" });
    
    setTimeout(() => setOrderInfo(null), 5000);
  }

  // Filter products
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 text-sky-950">
      <Navigation 
        cartItemCount={cartItemCount}
        setCartOpen={setCartOpen}
        showAdmin={showAdmin}
        setShowAdmin={setShowAdmin}
      />

      <HeroSection />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 pb-12 sm:pb-16" id="catalog">
        <AdminPanel 
          showAdmin={showAdmin}
          setShowAdmin={setShowAdmin}
          adminForm={adminForm}
          setAdminForm={setAdminForm}
          handleAdminSubmit={handleAdminSubmit}
          products={products}
        />

        <Filters 
          activeCat={activeCat}
          setActiveCat={setActiveCat}
          query={query}
          setQuery={setQuery}
        />

        {/* Product Grid */}
        <section>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-sky-900">Hot Deals</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-sky-700 bg-sky-100 px-2 py-1 rounded-full">
                {filtered.length} items
              </span>
              <button 
                onClick={resetProducts}
                className="text-xs bg-amber-500 text-amber-950 px-2 py-1 rounded-lg hover:bg-amber-400 transition-colors"
              >
                Reset Products
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8 sm:py-12">
              <div className="text-center">
                <LoadingSpinner size="medium" />
                <p className="mt-3 text-sky-700 text-sm">Loading local images...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onAddToCart={addToCart} />
                ))}
              </div>
              
              {filtered.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📦</div>
                  <h3 className="text-base sm:text-lg font-semibold text-sky-900 mb-1">No products available</h3>
                  <button 
                    onClick={resetProducts}
                    className="px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-xs sm:text-sm"
                  >
                    Load Local Products
                  </button>
                </div>
              )}
            </>
          )}
        </section>

        <CartSidebar 
          cartOpen={cartOpen}
          setCartOpen={setCartOpen}
          cartItemCount={cartItemCount}
          getCartItems={getCartItems}
          updateQuantity={updateQuantity}
          clearCart={clearCart}
          openCheckout={openCheckout}
        />

        <CheckoutModal 
          checkoutOpen={checkoutOpen}
          setCheckoutOpen={setCheckoutOpen}
          customer={customer}
          setCustomer={setCustomer}
          cartTotal={cartTotal}
          getCartItems={getCartItems}
          handlePayment={handlePayment}
        />

        <OrderToast orderInfo={orderInfo} />
      </main>

      <Footer />
    </div>
  );
}