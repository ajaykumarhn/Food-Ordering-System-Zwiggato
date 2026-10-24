import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RecommendationPage from './pages/RecommendationPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import ContactPage from './pages/ContactPage';

function NavBar() {
  const { cartCount, user, logout } = useAppContext();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-3xl font-bold text-primary">Zwiggato</Link>
          </div>
          <div className="flex space-x-4 items-center">
            <Link to="/" className="text-secondary hover:text-primary transition-colors font-medium">Home</Link>
            <Link to="/menu" className="text-secondary hover:text-primary transition-colors font-medium">Menu</Link>
            <Link to="/contact" className="text-secondary hover:text-primary transition-colors font-medium">Contact</Link>
            <Link to="/cart" className="text-secondary hover:text-primary transition-colors font-medium">
              Cart <span className="bg-primary text-white text-xs px-2 py-1 rounded-full ml-1">{cartCount}</span>
            </Link>
            {user ? (
              <button onClick={logout} className="bg-gray-100 text-secondary px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors shadow-sm">
                Logout
              </button>
            ) : (
              <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-md">Login</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <NavBar />

          {/* Main Content */}
          <main className="flex-grow bg-gray-50">
            <Routes>
              <Route path="/" element={<RecommendationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <footer className="bg-secondary text-white py-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <h2 className="text-2xl font-bold text-primary mb-4">Zwiggato</h2>
              <p className="text-gray-400">Delivering happiness to your doorstep.</p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
