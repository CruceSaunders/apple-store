'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    // Consolidate items
    const consolidated: { [key: string]: CartItem } = {};
    items.forEach((item: CartItem) => {
      if (consolidated[item.name]) {
        consolidated[item.name].quantity += 1;
      } else {
        consolidated[item.name] = { ...item, quantity: 1 };
      }
    });
    setCartItems(Object.values(consolidated));
    setLoading(false);
  }, []);

  const removeItem = (name: string) => {
    const newItems = cartItems.filter(item => item.name !== name);
    setCartItems(newItems);
    // Update localStorage
    const flatItems: CartItem[] = [];
    newItems.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        flatItems.push({ ...item, quantity: 1 });
      }
    });
    localStorage.setItem('cart', JSON.stringify(flatItems));
  };

  const updateQuantity = (name: string, delta: number) => {
    const newItems = cartItems.map(item => {
      if (item.name === name) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    setCartItems(newItems);
    // Update localStorage
    const flatItems: CartItem[] = [];
    newItems.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        flatItems.push({ ...item, quantity: 1 });
      }
    });
    localStorage.setItem('cart', JSON.stringify(flatItems));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="animate-spin text-4xl">🍎</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🍎</span>
              <span className="text-xl font-semibold tracking-tight">AppleStore</span>
            </Link>
            <div className="flex items-center space-x-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Cart</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-400 text-lg mb-6">Your cart is empty</p>
              <Link 
                href="/"
                className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-xl transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <div 
                    key={item.name}
                    className="bg-gray-800/50 rounded-2xl p-4 sm:p-6 border border-gray-700 flex items-center gap-4"
                  >
                    <div className="text-5xl">🍎</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-400">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.name, -1)}
                        className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-all"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.name, 1)}
                        className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-all"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      <button 
                        onClick={() => removeItem(item.name)}
                        className="text-red-400 hover:text-red-300 text-sm transition-all"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">Shipping</span>
                  <span className="font-semibold text-green-400">Free</span>
                </div>
                <div className="border-t border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link 
                  href="/checkout"
                  className="block w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 text-center shadow-lg shadow-red-500/25"
                >
                  Purchase
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
