import React from 'react';
import { CONFIG } from '../data/constants';

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
        <div className="font-bold text-lg sm:text-xl tracking-tight text-sky-900">{CONFIG.BRAND_NAME}</div>
        <div className="text-xs text-sky-700/80 font-medium hidden sm:block">{CONFIG.TAGLINE}</div>
      </div>
    </div>
  );
}

export default BrandLogo;