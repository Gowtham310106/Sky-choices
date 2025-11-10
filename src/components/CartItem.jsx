import React, { useState } from 'react';

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [isRemoving, setIsRemoving] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => onRemove(item.id), 300);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className={`flex items-center gap-3 p-3 bg-white/50 rounded-xl border border-sky-100/50 transition-all duration-300 ${isRemoving ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {!imageError ? (
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg border border-sky-100 shadow-sm"
          onError={handleImageError}
        />
      ) : (
        <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-sky-100 rounded-lg border border-sky-200">
          <div className="text-sky-600 text-xs text-center">No Image</div>
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sky-900 text-sm sm:text-base truncate">{item.title}</div>
        <div className="text-xs sm:text-sm text-sky-700">
          ₹{item.price.toLocaleString()} each
          {item.originalPrice && (
            <span className="text-sky-500 line-through ml-1">
              ₹{item.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 sm:mt-2">
          <button 
            onClick={() => onUpdateQuantity(item.id, item.qty - 1)}
            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors text-xs"
          >
            −
          </button>
          <div className="w-6 sm:w-8 text-center text-sm font-medium text-sky-900">{item.qty}</div>
          <button 
            onClick={() => onUpdateQuantity(item.id, item.qty + 1)}
            className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border border-sky-200 rounded-lg hover:bg-sky-50 transition-colors text-xs"
          >
            +
          </button>
          <button 
            onClick={handleRemove}
            className="ml-1 sm:ml-2 text-xs text-rose-600 hover:text-rose-700 hover:underline transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="text-right">
        <div className="font-bold text-sky-900 text-sm sm:text-base">₹{(item.price * item.qty).toLocaleString()}</div>
        {item.originalPrice && (
          <div className="text-xs text-sky-500 line-through">
            ₹{(item.originalPrice * item.qty).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}

export default CartItem;