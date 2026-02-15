'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export default function Checkout() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: ''
  });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
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

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\s/g, '').replace(/\D/g, '');
      const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
      setFormData(prev => ({ ...prev, [name]: formatted.slice(0, 19) }));
      return;
    }
    
    // Format expiry as MM/YY
    if (name === 'expiry') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length >= 2) {
        setFormData(prev => ({ ...prev, [name]: cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4) }));
      } else {
        setFormData(prev => ({ ...prev, [name]: cleaned }));
      }
      return;
    }
    
    // CVV - only numbers, max 4
    if (name === 'cvv') {
      const cleaned = value.replace(/\D/g, '').slice(0, 4);
      setFormData(prev => ({ ...prev, [name]: cleaned }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear cart and redirect to success
    localStorage.removeItem('cart');
    router.push('/success');
  };

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
            <Link href="/cart" className="text-gray-400 hover:text-white transition-all">
              ← Back to Cart
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact */}
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all"
                />
              </div>

              {/* Shipping */}
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Street address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="w-full mt-4 bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all"
                />
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all"
                  />
                  <input
                    type="text"
                    name="zip"
                    placeholder="ZIP"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                    className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all"
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                  <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                    <rect width="48" height="48" rx="8" fill="#1A1F71"/>
                    <path d="M18 31L20.5 17H24L21.5 31H18Z" fill="white"/>
                    <path d="M32 17.5C31 17 29.5 17 28.5 17C25.5 17 23.5 18.5 23.5 20.5C23.5 22 24.5 23 26.5 24C28 24.5 28.5 25 28.5 25.5C28.5 26.5 27.5 27 26 27C24.5 27 23.5 26.5 23 26.5L22.5 29.5C23.5 30 25 30.5 27 30.5C30 30.5 32 29 32 26.5C32 25 31 24 29 23C27.5 22.5 27 22 27 21.5C27 21 27.5 20.5 29 20.5C30 20.5 31 20.5 31.5 21L32 17.5Z" fill="white"/>
                  </svg>
                  <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                    <rect width="48" height="48" rx="8" fill="#EB001B"/>
                    <circle cx="20" cy="24" r="10" fill="#EB001B"/>
                    <circle cx="28" cy="24" r="10" fill="#F79E1B"/>
                    <path d="M24 16.5C26.5 18.5 28 21 28 24C28 27 26.5 29.5 24 31.5C21.5 29.5 20 27 20 24C20 21 21.5 18.5 24 16.5Z" fill="#FF5F00"/>
                  </svg>
                  <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                    <rect width="48" height="48" rx="8" fill="#016FD0"/>
                    <path d="M10 24H38M10 20H38M10 28H38" stroke="white" strokeWidth="2"/>
                  </svg>
                </div>
                <input
                  type="text"
                  name="cardName"
                  placeholder="Name on card"
                  value={formData.cardName}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all"
                />
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card number"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  required
                  maxLength={19}
                  className="w-full mt-4 bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all font-mono"
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <input
                    type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    value={formData.expiry}
                    onChange={handleChange}
                    required
                    maxLength={5}
                    className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all font-mono"
                  />
                  <input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                    maxLength={4}
                    className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 transition-all font-mono"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-red-500/25 disabled:shadow-none"
              >
                {processing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  `Pay $${total.toFixed(2)}`
                )}
              </button>
            </form>

            {/* Order Summary */}
            <div className="lg:pl-8">
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.name} className="flex items-center gap-4">
                      <div className="text-3xl">🍎</div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-700 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t border-gray-700">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
