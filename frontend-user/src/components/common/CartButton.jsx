import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function CartButton() {
  const navigate = useNavigate();
  const { getCartCount } = useCart();

  return (
    <button
      onClick={() => navigate('/cart')}
      className="relative w-10 h-10 bg-primary rounded flex items-center justify-center text-white hover:opacity-90 transition cursor-pointer"
      aria-label="Voir le panier"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {getCartCount() > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
          {getCartCount()}
        </span>
      )}
    </button>
  );
}

export default CartButton;