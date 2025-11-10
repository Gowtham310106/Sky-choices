import React, { useState } from 'react';
import { CONFIG } from '../data/constants';
import LoadingSpinner from './LoadingSpinner';

function ProductCard({ product, onAddToCart }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
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
            <span className="text-base font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              ₹{product.price.toLocaleString()}
            </span>
            
            {product.originalPrice && (
              <span className="text-xs text-sky-500 line-through">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
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
            href={`https://wa.me/${CONFIG.SELLER_WHATSAPP_NUMBER}?text=Hi! I'm interested in ${encodeURIComponent(product.title)}`}
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

export default ProductCard;