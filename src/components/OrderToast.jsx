import React from 'react';

function OrderToast({ orderInfo }) {
  if (!orderInfo) return null;

  return (
    <div className="fixed left-3 right-3 sm:left-6 bottom-6 bg-white/95 backdrop-blur-lg border border-sky-100 px-4 sm:px-6 py-3 sm:py-4 rounded-xl shadow-2xl transform transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 rounded-full animate-pulse"></div>
        <div className="flex-1">
          <div className="font-semibold text-sky-900 text-sm sm:text-base">Order Placed! 🎉</div>
          <div className="text-xs sm:text-sm text-sky-700">ID: {orderInfo.id}</div>
        </div>
      </div>
    </div>
  );
}

export default OrderToast;