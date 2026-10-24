import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg text-center border border-gray-100 transform transition-all">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-secondary mb-4">Payment Successful!</h1>
        <p className="text-gray-500 text-lg mb-8">
          Your order has been placed successfully. 
          <br/>We will send you an email confirmation shortly.
        </p>

        <div className="bg-gray-50 p-4 rounded-xl mb-8 inline-block text-left">
          <p className="text-sm text-gray-500">Order ID: <span className="font-bold text-secondary">#ZWIG-{Math.floor(Math.random() * 100000)}</span></p>
          <p className="text-sm text-gray-500">Estimated Delivery: <span className="font-bold text-secondary">25-30 mins</span></p>
        </div>
        
        <div>
          <Link to="/" className="inline-block bg-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-md transition-all">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
