import React from 'react';
import { CONFIG } from '../data/constants';
import LoadingSpinner from './LoadingSpinner';
import ProductCard from './ProductCard';

function ProductDetailsModal({ 
  selectedProduct, 
  onClose, 
  products, 
  onAddToCart 
}) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  
  if (!selectedProduct) return null;

  // Get related products (same category, excluding current product)
  const relatedProducts = products.filter(p => 
    p.category === selectedProduct.category && p.id !== selectedProduct.id
  ).slice(0, 4);

  const discountPercent = selectedProduct.originalPrice 
    ? Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-sky-950/60 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white/95 backdrop-blur-lg rounded-2xl border border-sky-100 w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full border border-sky-200 text-sky-600 hover:text-sky-800 hover:bg-white transition-all duration-200 shadow-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Product Image */}
          <div className="p-6 lg:p-8">
            <div className="relative rounded-2xl overflow-hidden bg-white border border-sky-100 shadow-lg">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <LoadingSpinner size="large" />
                </div>
              )}
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.title}
                className={`w-full h-80 lg:h-96 object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {discountPercent > 0 && (
                  <span className="px-3 py-1 text-sm font-bold bg-red-500 text-white rounded-full shadow">
                    {discountPercent}% OFF
                  </span>
                )}
                {selectedProduct.price > 2000 && !discountPercent && (
                  <span className="px-3 py-1 text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 rounded-full shadow">
                    Premium
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6 lg:p-8 lg:border-l border-sky-100">
            <div className="space-y-6">
              <div>
                <span className="inline-block px-3 py-1 text-xs uppercase tracking-wider bg-sky-100 text-sky-800 rounded-full border border-sky-200 font-semibold mb-3">
                  {selectedProduct.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-sky-900 mb-4">
                  {selectedProduct.title}
                </h1>
                <p className="text-sky-700 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Pricing */}
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                    ₹{selectedProduct.price.toLocaleString()}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-xl text-sky-500 line-through">
                      ₹{selectedProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                
                {discountPercent > 0 && (
                  <div className="text-base font-medium text-red-600 bg-red-50 px-4 py-2 rounded-lg inline-block">
                    You save {discountPercent}% (₹{(selectedProduct.originalPrice - selectedProduct.price).toLocaleString()})
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={() => {
                    onAddToCart(selectedProduct.id);
                    onClose();
                  }}
                  className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 font-semibold text-base flex-1"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add to Cart
                </button>
                
                <a 
                  href={`https://wa.me/${CONFIG.SELLER_WHATSAPP_NUMBER}?text=Hi! I'm interested in ${encodeURIComponent(selectedProduct.title)} - ₹${selectedProduct.price}`}
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl border-2 border-sky-200 text-sky-700 hover:bg-sky-50 transition-all duration-200 font-semibold text-base flex-1"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.176-1.24-6.165-3.495-8.411"/>
                  </svg>
                  Buy on WhatsApp
                </a>
              </div>

              {/* Features */}
              <div className="bg-sky-50/50 rounded-xl p-4 border border-sky-100">
                <h3 className="text-base font-semibold text-sky-900 mb-3">Product Features</h3>
                <ul className="space-y-2 text-sm text-sky-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Handcrafted with premium resin material
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Unique design, no two pieces are exactly alike
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Durable and long-lasting finish
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Perfect for gifting and personal use
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-sky-200 p-6 lg:p-8">
            <h2 className="text-xl font-bold text-sky-900 mb-6 text-center">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard 
                  key={relatedProduct.id} 
                  product={relatedProduct} 
                  onAddToCart={onAddToCart}
                  onProductClick={onClose} // Close modal when clicking related product
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailsModal;