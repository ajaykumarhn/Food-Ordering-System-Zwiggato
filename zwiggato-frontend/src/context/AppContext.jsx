import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('zwiggato-user')) || null;
    } catch {
      return null;
    }
  });

  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('zwiggato-cart')) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('zwiggato-user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('zwiggato-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const login = (email) => {
    const nextUser = { email, fullName: email.split('@')[0] || 'Guest' };
    setUser(nextUser);
  };

  const logout = () => {
    setUser(null);
  };

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem => cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCartItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const nextQty = item.quantity + change;
      return { ...item, quantity: nextQty > 0 ? nextQty : 1 };
    }));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(() => ({
    user,
    login,
    logout,
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    cartCount,
  }), [user, cartItems, cartCount]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
