import React from 'react';
import { CATEGORIES, INPUT_CLASS } from '../data/constants';

function Filters({ activeCat, setActiveCat, query, setQuery }) {
  return (
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
  );
}

export default Filters;