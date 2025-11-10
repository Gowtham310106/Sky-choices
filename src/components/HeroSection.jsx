import React from 'react';
import { CONFIG } from '../data/constants';

function HeroSection() {
  return (
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
              href={`https://wa.me/${CONFIG.SELLER_WHATSAPP_NUMBER}`} 
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
  );
}

export default HeroSection;