import React from 'react';
import { CONFIG, INPUT_CLASS } from '../data/constants';

function CheckoutModal({ 
  checkoutOpen, 
  setCheckoutOpen, 
  customer, 
  setCustomer, 
  cartTotal, 
  getCartItems, 
  handlePayment 
}) {
  return (
    <>
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-sky-950/40 backdrop-blur-sm" 
            onClick={() => setCheckoutOpen(false)}
          ></div>
          
          <div className="relative bg-white/95 backdrop-blur-lg rounded-t-2xl sm:rounded-2xl border border-sky-100 p-4 sm:p-6 w-full h-5/6 sm:h-auto sm:max-w-md shadow-2xl transform transition-all duration-300 overflow-y-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-sky-900 mb-2">Checkout</h3>
            <p className="text-sky-700 mb-4 sm:mb-6 text-sm sm:text-base">We'll connect you on WhatsApp for payment</p>
            
            <form onSubmit={handlePayment} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-sm font-medium text-sky-700 mb-2">Full Name *</label>
                <input 
                  value={customer.name} 
                  onChange={(e)=>setCustomer(c=>({...c,name:e.target.value}))} 
                  placeholder="Enter your full name"
                  className={INPUT_CLASS}
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-sky-700 mb-2">Email</label>
                <input 
                  value={customer.email} 
                  onChange={(e)=>setCustomer(c=>({...c,email:e.target.value}))} 
                  placeholder="your.email@example.com"
                  type="email" 
                  className={INPUT_CLASS} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-sky-700 mb-2">Shipping Address *</label>
                <textarea 
                  value={customer.address} 
                  onChange={(e)=>setCustomer(c=>({...c,address:e.target.value}))} 
                  placeholder="Full address with pincode"
                  className={`${INPUT_CLASS} h-20 sm:h-24 resize-none`}
                  required
                />
              </div>
              
              <div className="p-3 sm:p-4 bg-sky-50/50 rounded-xl sm:rounded-2xl border border-sky-100">
                <div className="flex items-center justify-between text-base sm:text-lg font-bold text-sky-900">
                  <span>Order Total</span>
                  <span>₹{cartTotal().toLocaleString()}</span>
                </div>
                <p className="text-sm text-sky-700 mt-1 sm:mt-2">
                  {getCartItems().length} items
                </p>
              </div>

              <div className="flex gap-2 sm:gap-3 pt-2">
                <button 
                  type="submit" 
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 font-semibold flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.176-1.24-6.165-3.495-8.411"/>
                  </svg>
                  Pay via WhatsApp
                </button>
                
                <button 
                  type="button" 
                  onClick={()=>setCheckoutOpen(false)}
                  className="px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-sky-200 text-sky-700 hover:bg-sky-50 transition-all duration-200 font-semibold text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckoutModal;