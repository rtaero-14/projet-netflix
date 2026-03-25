import React from 'react';
import { useCart } from '../../context/CartContext';

function CartToast() {
  const { cartNotification } = useCart();

  if (!cartNotification) return null;

  return (
    // Positionnement FIXE en haut à droite, au-dessus de tout (z-50)
    <div className="fixed top-20 right-4 z-[100] bg-green-500 text-white px-4 py-3 rounded-lg shadow-xl font-semibold flex items-center gap-2 animate-pulse">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {cartNotification}
    </div>
  );
}

export default CartToast;