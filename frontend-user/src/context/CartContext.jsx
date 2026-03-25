import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [rentals, setRentals] = useState(() => {
    const savedRentals = localStorage.getItem('rentals');
    return savedRentals ? JSON.parse(savedRentals) : [];
  });

  const [cartNotification, setCartNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('rentals', JSON.stringify(rentals));
  }, [rentals]);

  const addToCart = (movie) => {
    if (!isInCart(movie.id) && !isRented(movie.id)) {
      setCart((prev) => [...prev, movie]);
      
      setCartNotification(`"${movie.title}" ajouté au panier !`);
      
      setTimeout(() => {
        setCartNotification(null);
      }, 3000);
    }
  };

  const removeFromCart = (movieId) => {
    setCart((prev) => prev.filter((m) => m.id !== movieId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, movie) => total + (movie.price || 0), 0);
  };

  const getCartCount = () => {
    return cart.length;
  };

  const rentMovie = (movie) => {
    const rentalDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    const rental = {
      id: Date.now(),
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster,
      price: movie.price,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
    };

    setRentals((prev) => [...prev, rental]);
    removeFromCart(movie.id);

    return { success: true, rental };
  };

  const rentAllInCart = () => {
    const rentalDate = new Date();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);

    const newRentals = cart.map((movie, index) => ({
      id: Date.now() + index,
      movieId: movie.id,
      title: movie.title,
      poster: movie.poster,
      price: movie.price,
      rentalDate: rentalDate.toISOString(),
      expiryDate: expiryDate.toISOString(),
    }));

    setRentals((prev) => [...prev, ...newRentals]);
    clearCart();

    return { success: true, count: newRentals.length };
  };

  const isRented = (movieId) => {
    return rentals.some((r) => String(r.movieId) === String(movieId));
  };

  const getRentalByMovieId = (movieId) => {
    return rentals.find((r) => String(r.movieId) === String(movieId));
  };

  const isInCart = (movieId) => {
    return cart.some((m) => String(m.id) === String(movieId));
  };

  const value = {
    cart,
    rentals,
    cartNotification,
    setCartNotification,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount,
    rentMovie,
    rentAllInCart,
    isRented,
    getRentalByMovieId,
    isInCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}