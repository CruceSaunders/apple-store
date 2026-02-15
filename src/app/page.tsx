'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  const addToCart = () => {
    setCartCount(prev => prev + 1);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
    
    // Store in localStorage for cart page
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    currentCart.push({
      id: Date.now(),
      name: 'Premium Red Apple',
      price: 4.99,
      quantity: 1
    });
    localStorage.setItem('cart', JSON.stringify(currentCart));
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍎</span>
              <span className="text-xl font-semibold tracking-tight">AppleStore</span>
            </div>
            <Link href="/cart" className="relative group">
              <div className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 transition-all px-4 py-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
              The Perfect Apple
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto">
              Handpicked. Premium quality. Delivered fresh to your door.
            </p>
          </div>

          {/* Product Card */}
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700 hover:border-red-500/50 transition-all duration-300">
              <div className="relative aspect-square mb-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl overflow-hidden flex items-center justify-center">
                <img 
                  src="https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Premium Red Apple"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />
              </div>
              
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Premium Red Apple</h2>
                <p className="text-gray-400 mb-4">Organic • Fresh • Delicious</p>
                <div className="flex items-center justify-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-gray-400 ml-2">(4.9)</span>
                </div>
                
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-bold">$4.99</span>
                  <span className="text-gray-500 line-through text-lg">$7.99</span>
                </div>

                <button 
                  onClick={addToCart}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-red-500/25"
                >
                  Add to Cart
                </button>

                {showAddedMessage && (
                  <div className="mt-4 text-green-400 font-medium animate-pulse">
                    ✓ Added to cart!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-400">On orders over $20</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold mb-2">100% Organic</h3>
              <p className="text-gray-400">Farm to table freshness</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">💯</div>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-gray-400">Or your money back</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 text-center text-gray-500">
        <p>© 2026 AppleStore. All rights reserved.</p>
      </footer>
    </main>
  );
}
