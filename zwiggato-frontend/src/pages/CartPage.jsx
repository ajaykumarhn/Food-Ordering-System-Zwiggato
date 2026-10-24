import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem } = useAppContext();
  const [imageErrors, setImageErrors] = useState(new Set());

  const handleImageError = (itemId) => {
    setImageErrors(prev => new Set([...prev, itemId]));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = cartItems.length > 0 ? 99 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-secondary mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-medium text-gray-500 mb-4">Your cart is empty</h2>
          <Link to="/menu" className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {cartItems.map(item => (
                  <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-xl shadow-sm flex items-center justify-center overflow-hidden">
                      {imageErrors.has(item.id) ? (
                        <span className="text-3xl">🍽️</span>
                      ) : (
                        <img 
                          src={item.imageUrl || item.img || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80'} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(item.id)}
                        />
                      )}
                    </div>
                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="text-lg font-bold text-secondary">{item.name}</h3>
                      <p className="text-primary font-bold mt-1">₹{Math.round(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 text-gray-600 hover:text-primary transition-colors">-</button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 text-gray-600 hover:text-primary transition-colors">+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 transition-colors">
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-24">
              <h3 className="text-xl font-bold text-secondary mb-6">Order Summary</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-secondary">₹{Math.round(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-secondary">₹{deliveryFee}</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between text-lg font-bold text-secondary">
                  <span>Total</span>
                  <span className="text-primary">₹{Math.round(total)}</span>
                </div>
              </div>
              <Link to="/checkout" className="block w-full text-center bg-primary hover:bg-orange-600 text-white font-semibold py-3 rounded-lg shadow-md transition-all mt-8">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
