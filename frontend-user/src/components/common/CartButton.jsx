import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthProvider';

function CartButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cart, removeFromCart, getCartTotal, getCartCount, rentAllInCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [show, setShow] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (!show) return;
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setShow(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [show]);

  const toggleShow = () => setShow((s) => !s);

  const handlePay = () => {
    if (cart.length === 0) return;


    if (!isAuthenticated()) {
      navigate('/login', { state: { from: location } });
      setShow(false);
      return;
    }

    rentAllInCart();
    setShow(false);
    navigate('/my-rentals');
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={toggleShow}
        className="relative w-10 h-10 bg-primary rounded flex items-center justify-center text-white hover:opacity-90 transition cursor-pointer"
        aria-label="Panier"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {/* On affiche le compteur seulement s'il est > 0 */}
        {getCartCount() > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
            {getCartCount()}
          </span>
        )}
      </button>

      {show && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-3 z-50">
          <h4 className="text-sm font-semibold text-white mb-2">Panier</h4>
          {cart.length === 0 ? (
            <div className="text-sm text-gray-400">Votre panier est vide</div>
          ) : (
            <>
              <ul className="space-y-2 max-h-64 overflow-auto">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center p-2 bg-gray-800 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.poster || item.backdrop || ''}
                        alt={item.title}
                        className="w-12 h-16 object-cover rounded"
                        loading="lazy"
                      />
                      <div>
                        <div className="text-white font-semibold text-sm">{item.title}</div>
                        <div className="text-xs text-gray-400">{item.price}€</div>
                      </div>
                    </div>

                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500 bg-gray-700/30 px-2 py-1 rounded cursor-pointer transition-colors"
                        title="Supprimer"
                    >
                        ✕
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Total</span>
                  <span className="text-white font-bold">{getCartTotal().toFixed(2)}€</span>
                </div>
                <button
                  onClick={handlePay}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded cursor-pointer transition-colors"
                >
                  Payer
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CartButton;