import React from 'react';
import { CATEGORIES, INPUT_CLASS } from '../data/constants';

function AdminPanel({ 
  showAdmin, 
  setShowAdmin, 
  adminForm, 
  setAdminForm, 
  handleAdminSubmit, 
  products 
}) {
  if (!showAdmin) return null;

  return (
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
        <div>
          <label className="block text-xs font-medium text-sky-700 mb-1">Upload product image:</label>
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
  );
}

export default AdminPanel;