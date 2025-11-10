import React from 'react';
import { CONFIG } from '../data/constants';
import BrandLogo from './BrandLogo';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-sky-50/50 border-t border-sky-100/80 mt-12 sm:mt-20">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="text-center">
          <BrandLogo size={36} />
          <p className="text-sky-700 mt-4 text-sm sm:text-base">
            Creating beautiful, hand-crafted resin art that brings joy to every home.
          </p>
          
          <div className="flex justify-center gap-4 sm:gap-6 mt-6">
            <a 
              href={`https://instagram.com/${CONFIG.INSTAGRAM_USERNAME}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-sky-700 hover:text-sky-900 transition-colors text-sm sm:text-base"
            >
              Instagram
            </a>
            <span className="text-sky-300">•</span>
            <a 
              href={`https://wa.me/${CONFIG.SELLER_WHATSAPP_NUMBER}`} 
              target="_blank" 
              rel="noreferrer"
              className="text-sky-700 hover:text-sky-900 transition-colors text-sm sm:text-base"
            >
              WhatsApp
            </a>
          </div>
        </div>
        
        <div className="pt-6 sm:pt-8 border-t border-sky-100/60 text-center">
          <div className="text-xs sm:text-sm text-sky-700">
            © {new Date().getFullYear()} {CONFIG.BRAND_NAME} — {CONFIG.TAGLINE}
          </div>
          <div className="text-xs text-sky-600 mt-1">
            Handmade with 💙 in India
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;