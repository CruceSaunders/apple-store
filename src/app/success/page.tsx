'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Success() {
  const [confetti, setConfetti] = useState<Array<{id: number; left: number; delay: number; duration: number}>>([]);

  useEffect(() => {
    // Generate confetti pieces
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2
    }));
    setConfetti(pieces);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute top-0 text-2xl animate-fall"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        >
          {['🍎', '🎉', '✨', '🎊'][piece.id % 4]}
        </div>
      ))}

      <div className="text-center px-4 relative z-10">
        <div className="text-8xl mb-6 animate-bounce">🍎</div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Order Confirmed!
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
          Thank you for your purchase. Your delicious apple is on its way!
        </p>
        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 max-w-sm mx-auto mb-8">
          <p className="text-gray-400 mb-2">Order Number</p>
          <p className="text-2xl font-mono font-bold">#APL-{Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
        </div>
        <Link 
          href="/"
          className="inline-block bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg shadow-red-500/25"
        >
          Continue Shopping
        </Link>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </main>
  );
}
