import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const API_BASE = import.meta.env.VITE_API_BASE || '';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/500x300?text=Image+not+available';

const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeCategory, setActiveCategory] = useState('All');
  const [imageErrors, setImageErrors] = useState(new Set());
  const { addToCart } = useAppContext();

  const restaurantId = searchParams.get('restaurantId');
  const restaurantName = searchParams.get('restaurantName');
  const searchParam = searchParams.get('search');

  const handleImageError = (itemId) => {
    setImageErrors(prev => new Set([...prev, itemId]));
  };

  const categories = useMemo(() => [
    'All',
    ...Array.from(new Set(menuItems.map((item) => item.category))),
  ], [menuItems]);

  useEffect(() => {
    if (searchParam !== searchQuery) {
      setSearchQuery(searchParam || '');
    }
  }, [searchParam]);

  useEffect(() => {
    if (restaurantId) {
      const fetchRestaurant = async () => {
        try {
          const response = await fetch(`${API_BASE}/api/restaurants/${restaurantId}`);
          if (!response.ok) {
            throw new Error('Restaurant not found');
          }
          const data = await response.json();
          setRestaurant(data);
        } catch {
          setRestaurant({ name: restaurantName || 'Selected Restaurant' });
        }
      };
      fetchRestaurant();
    } else {
      setRestaurant(null);
    }
  }, [restaurantId, restaurantName]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (restaurantId) params.set('restaurantId', restaurantId);
        if (searchParam) params.set('search', searchParam);
        if (activeCategory && activeCategory !== 'All') params.set('category', activeCategory);
        const response = await fetch(`${API_BASE}/api/menu-items?${params.toString()}`);
        if (!response.ok) {
          throw new Error('Failed to load menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError('Unable to load menu items. Please try again later.');
        setMenuItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [restaurantId, searchParam, activeCategory]);

  useEffect(() => {
    if (activeCategory !== 'All' && !categories.includes(activeCategory)) {
      setActiveCategory('All');
    }
  }, [categories, activeCategory]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const filteredItems = menuItems;

  const title = restaurant
    ? `${restaurant.name} Menu`
    : searchParam
    ? 'Search results'
    : `${activeCategory} Menu`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-secondary">{title}</h2>
        <p className="text-gray-500 mt-2">
          {restaurant
            ? `Explore dishes from ${restaurant.name}`
            : searchParam
            ? `Showing menu items matching "${searchParam}"`
            : 'Explore our delicious offerings'}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="lg:w-1/4 bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-24">
          <h3 className="text-xl font-bold text-secondary mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => setActiveCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeCategory === category ? 'bg-primary text-white font-medium shadow-md' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:w-3/4">
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && handleSearch()}
              placeholder="Search within the menu..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleSearch}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              Search Menu
            </button>
          </div>

          {loading ? (
            <div className="rounded-3xl bg-white p-10 shadow-sm border border-gray-100 text-center">
              <h3 className="text-xl font-semibold text-secondary mb-3">Loading menu items...</h3>
            </div>
          ) : error ? (
            <div className="rounded-3xl bg-white p-10 shadow-sm border border-gray-100 text-center">
              <h3 className="text-xl font-semibold text-secondary mb-3">{error}</h3>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 shadow-sm border border-gray-100 text-center">
              <h3 className="text-xl font-semibold text-secondary mb-3">No menu items found</h3>
              <p className="text-gray-500">Try adjusting your search or selecting another category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                  <div className="relative h-48 overflow-hidden group bg-gray-200">
                    <img
                      src={item.imageUrl || item.img || PLACEHOLDER_IMAGE}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        if (e.currentTarget.src !== PLACEHOLDER_IMAGE) {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = PLACEHOLDER_IMAGE;
                        }
                      }}
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-secondary">{item.name}</h3>
                      <span className="font-bold text-primary">₹{Math.round(item.price)}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4 flex-grow">{item.description}</p>
                    <button onClick={() => addToCart(item)} className="w-full bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-2 rounded-lg transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
