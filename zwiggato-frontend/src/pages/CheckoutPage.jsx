import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const CheckoutPage = () => {
  const { cartItems, user, clearCart } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      navigate('/success');
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-secondary mb-8 text-center">Checkout</h1>
      
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <form onSubmit={handlePayment} className="space-y-8">
          {/* Delivery Details */}
          <div>
            <h2 className="text-xl font-bold text-secondary mb-4 flex items-center border-b pb-2">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Delivery Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input required type="tel" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea required rows="3" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none"></textarea>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-xl font-bold text-secondary mb-4 flex items-center border-b pb-2">
              <span className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Payment Method
            </h2>
            <div className="space-y-4">
              <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <input type="radio" name="payment" className="text-primary focus:ring-primary h-4 w-4" defaultChecked />
                <span className="ml-3 font-medium">Credit / Debit Card</span>
              </label>
              <div className="pl-8 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <input type="text" placeholder="Card Number" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div>
                  <input type="text" placeholder="MM/YY" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div>
                  <input type="text" placeholder="CVC" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none" />
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-lg transform hover:-translate-y-1"
          >
            Pay & Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
