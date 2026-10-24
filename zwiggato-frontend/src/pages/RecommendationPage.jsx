import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PLACEHOLDER_RESTAURANT_IMAGE = 'https://via.placeholder.com/800x600?text=Restaurant+image+not+available';

const RecommendationPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());
  const navigate = useNavigate();

  const handleImageError = (restId) => {
    setImageErrors(prev => new Set([...prev, restId]));
  };

  const fetchRestaurants = async (query = '') => {
    setLoading(true);
    setError(null);

    try {
      const url = `/api/restaurants${query ? `?search=${encodeURIComponent(query)}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to load restaurants');
      }
      const data = await response.json();
      setRestaurants(data);
    } catch (err) {
      setError('Unable to load restaurants. Please try again later.');
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleSearch = () => {
    setActiveQuery(searchQuery);
    fetchRestaurants(searchQuery);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const navigateToMenu = (restaurant) => {
    const params = new URLSearchParams();
    params.set('restaurantId', restaurant.id);
    params.set('restaurantName', restaurant.name);
    navigate(`/menu?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-secondary to-gray-800 rounded-3xl p-8 mb-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl font-bold mb-4">Craving something delicious?</h1>
          <p className="text-lg text-gray-300 mb-6">Get the best food from top restaurants delivered fast to your door.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for restaurants, cuisine or a dish..."
              className="px-4 py-3 rounded-lg text-secondary w-full focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSearch}
              className="bg-primary hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Top Brands */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-secondary">Top brands for you</h2>
          {activeQuery && (
            <span className="text-sm text-gray-500">Showing results for "{activeQuery}"</span>
          )}
        </div>

        {loading ? (
          <div className="rounded-3xl bg-white p-10 shadow-sm border border-gray-100 text-center">
            <h3 className="text-xl font-semibold text-secondary mb-3">Loading restaurants...</h3>
          </div>
        ) : error ? (
          <div className="rounded-3xl bg-white p-10 shadow-sm border border-gray-100 text-center">
            <h3 className="text-xl font-semibold text-secondary mb-3">{error}</h3>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 shadow-sm border border-gray-100 text-center">
            <h3 className="text-xl font-semibold text-secondary mb-3">No results found</h3>
            <p className="text-gray-500">Try a different restaurant name or cuisine.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {restaurants.map((res) => (
              <button
                key={res.id}
                onClick={() => navigateToMenu(res)}
                className="text-left bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  <img
                    src={res.imageUrl || res.img || PLACEHOLDER_RESTAURANT_IMAGE}
                    alt={res.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      if (e.currentTarget.src !== PLACEHOLDER_RESTAURANT_IMAGE) {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = PLACEHOLDER_RESTAURANT_IMAGE;
                      }
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-sm font-bold shadow flex items-center">
                    ⭐ {res.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg text-secondary mb-1">{res.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{res.category}</p>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-gray-600">🕒 {res.deliveryTime || res.time || '25-30 min'}</span>
                    <span className="text-primary bg-orange-50 px-2 py-1 rounded">View Menu</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;
