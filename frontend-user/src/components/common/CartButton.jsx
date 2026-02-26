import React, { useEffect, useMemo, useRef, useState } from 'react';

function CartButton() {
  const [cartItems, setCartItems] = useState([]);
  const [show, setShow] = useState(false);
  const [confirmRemoveId, setConfirmRemoveId] = useState(null);
  const [confirmPos, setConfirmPos] = useState(null);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const onAdd = (e) => {
      const movie = e?.detail;
      if (!movie) return;
      setCartItems((prev) => {
        const existing = prev.find((i) => i.id === movie.id);
        if (existing) {
          return prev; //On ne peut louer qu'une seule fois le film
        }
        return [...prev, { ...movie, qty: 1 }];
      });
      setShow(true);
    };

    const onRemove = (e) => {
      const id = e?.detail;
      if (!id) return;
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    };

    window.addEventListener('add-to-cart', onAdd);
    window.addEventListener('remove-from-cart', onRemove);
    return () => {
      window.removeEventListener('add-to-cart', onAdd);
      window.removeEventListener('remove-from-cart', onRemove);
    };
  }, []);

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

  const removeFromCart = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));
  const toggleShow = () => setShow((s) => !s);

  const cartCount = useMemo(() => cartItems.reduce((s, i) => s + (i.qty || 1), 0), [cartItems]);

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        onClick={toggleShow}
        className="relative w-10 h-10 bg-primary rounded flex items-center justify-center text-white hover:opacity-90 transition"
        aria-label="Panier"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
            {cartCount}
          </span>
        )}
      </button>

      {show && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-3 z-50">
          <h4 className="text-sm font-semibold text-white mb-2">Panier</h4>
          {cartItems.length === 0 ? (
            <div className="text-sm text-gray-400">Votre panier est vide</div>
          ) : (
            <ul className="space-y-2 max-h-64 overflow-auto">
              {cartItems.map((item) => (
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
                      <div className="text-white font-semibold">{item.title}</div>
                      <div className="text-xs text-gray-400">{item.qty} × {item.price}€</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-white font-bold">{(item.qty * (item.price || 0)).toFixed(2)}€</div>
                    
                    {confirmRemoveId === item.id ? null : (
                      <button
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setConfirmPos({ top: rect.top + rect.height / 2, left: rect.right });
                          setConfirmRemoveId(item.id);
                        }}
                        className="text-gray-300 hover:text-white bg-gray-700/30 px-2 py-1 rounded"
                        title="Supprimer"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Floating confirm popover rendered outside the cart list, near the delete button */}
      {confirmRemoveId && confirmPos && (
        <div
          style={{ position: 'fixed', top: confirmPos.top - 10, left: confirmPos.left + 8, zIndex: 60 }}
        >
          <div className="bg-gray-900 border border-gray-700 rounded-md p-2 shadow-lg">
            <div className="text-sm text-gray-200 mb-2">Êtes-vous sûr de vouloir retirer ce film du panier ?</div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  removeFromCart(confirmRemoveId);
                  setConfirmRemoveId(null);
                  setConfirmPos(null);
                }}
                className="px-3 py-1 bg-red-600 text-white text-sm rounded"
              >
                Oui
              </button>
              <button
                onClick={() => {
                  setConfirmRemoveId(null);
                  setConfirmPos(null);
                }}
                className="px-3 py-1 bg-gray-700 text-white text-sm rounded"
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartButton;
