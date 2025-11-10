import React, { useEffect, useMemo, useState } from 'react';
import { SAMPLE_PRODUCTS } from './data/constants';
import { useLocalStorage } from './hooks/useLocalStorage';

// Components
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AdminPanel from './components/AdminPanel';
import Filters from './components/Filters';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/cartSidebar';
import CheckoutModal from './components/CheckoutModal';
import OrderToast from './components/OrderToast';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

export default function App() {
  // State
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

  // Load initial products
  useEffect(() => {
    const timer = setTimeout(() => {
      if (products.length === 0) {
        setProducts(SAMPLE_PRODUCTS);
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [products.length, setProducts]);

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

  // Admin functions
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
    const waLink = `https://wa.me/918122853272?text=${waText}`;
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