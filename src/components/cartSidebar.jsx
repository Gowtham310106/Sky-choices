import React from 'react';
import CartItem from './CartItem';

function CartSidebar({ 
  cartOpen, 
  setCartOpen, 
  cartItemCount, 
  getCartItems, 
  updateQuantity, 
  clearCart, 
  openCheckout 
}) {
  const cartTotal = getCartItems().reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <>
      {cartOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-sky-950/30 backdrop-blur-sm" 
            onClick={() => setCartOpen(false)}
          ></div>
          
          {/* Cart Panel */}
          <div className="absolute bottom-0 left-0 right-0 h-4/5 sm:h-full sm:right-0 sm:left-auto sm:top-0 sm:bottom-auto sm:w-full sm:max-w-md bg-white/95 backdrop-blur-lg border-t sm:border-l border-sky-100 shadow-2xl transform transition-transform duration-300 rounded-t-2xl sm:rounded-none">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-4 sm:p-6 border-b border-sky-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-sky-900">Your Cart</h3>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="p-2 hover:bg-sky-50 rounded-xl transition-colors"
                  >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-sky-700 mt-1">
                  {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in cart
                </p>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
                {getCartItems().length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🛒</div>
                    <h4 className="text-base sm:text-lg font-semibold text-sky-900 mb-2">Your cart is empty</h4>
                    <p className="text-sky-700 mb-4 sm:mb-6 text-sm sm:text-base">Add some beautiful resin crafts to get started!</p>
                    <button 
                      onClick={() => setCartOpen(false)}
                      className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  getCartItems().map((item) => (
                    <CartItem 
                      key={item.id} 
                      item={item} 
                      onUpdateQuantity={updateQuantity}
                      onRemove={(id) => updateQuantity(id, 0)}
                    />
                  ))
                )}
              </div>

              {/* Footer */}
              {getCartItems().length > 0 && (
                <div className="p-4 sm:p-6 border-t border-sky-100 bg-white/80 backdrop-blur">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between text-base sm:text-lg font-bold text-sky-900">
                      <span>Total</span>
                      <span>₹{cartTotal.toLocaleString()}</span>
                    </div>
                    
                    <div className="flex gap-2 sm:gap-3">
                      <button 
                        onClick={openCheckout}
                        className="flex-1 px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 font-semibold text-center text-sm sm:text-base"
                      >
                        🛒 Checkout
                      </button>
                      <button 
                        onClick={clearCart}
                        className="px-3 sm:px-6 py-3 sm:py-3.5 rounded-xl border border-sky-200 text-sky-700 hover:bg-sky-50 transition-all duration-200 font-semibold text-sm sm:text-base"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CartSidebar;