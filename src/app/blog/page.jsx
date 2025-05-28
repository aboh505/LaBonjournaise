'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Star } from 'lucide-react';

import { useLanguage } from '../context/LanguageContext';

const defaultProducts = [
  {
    id: 1,
    name: 'Burger Classic',
    description: 'Un burger juteux avec fromage, salade et tomate.',
    price: 3500,
    image: '/a2.jpg',
    category: 'Burger',
    rating: 4.5
  },
  {
    id: 2,
    name: 'Pizza Margherita',
    description: 'Pizza italienne classique avec sauce tomate et mozzarella.',
    price: 5000,
    image: '/a3.jpg',
    category: 'Pizza',
    rating: 4.7
  },
  {
    id: 3,
    name: 'Hamburger Deluxe',
    description: 'Hamburger avec double steak, fromage cheddar et bacon.',
    price: 4500,
    image: '/a4.jpg',
    category: 'Hamburger',
    rating: 4.6
  },

];

const translations = {
  fr: {
    title: "Nos Produits",
    intro: "Bienvenue sur notre blog gourmand ! Découvrez nos recettes, astuces et coups de cœur culinaires. Explorez nos produits phares, comparez, et trouvez l’inspiration pour vos prochains repas. Bon appétit !",
    search: "Rechercher un produit...",
    details: "Voir les détails",
    price: "Cfa",
    noResults: "Aucun produit trouvé."
  },
  en: {
    title: "Our Products",
    intro: "Welcome to our tasty blog! Discover our recipes, tips, and favorites. Explore our featured products, compare, and get inspired for your next meals. Enjoy!",
    search: "Search for a product...",
    details: "View details",
    price: "CFA",
    noResults: "No products found."
  }
};

export default function Page() {
  const { lang } = useLanguage();
  const t = translations[lang];

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState(defaultProducts);



  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');
    if (storedProducts.length > 0) {
      setProducts(storedProducts);
    } else {
      setProducts(defaultProducts);
    }
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductClick = (product) => {
    router.push(`/blog/${product.id}`);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-1 px-6 py-12 max-w-6xl mx-auto mt-24">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">{t.title}</h1>
        <p className="text-2xl md:text-3xl font-extrabold italic font-['Dancing_Script',cursive] bg-gradient-to-r from-purple-600 via-pink-400 to-orange-400 text-transparent bg-clip-text drop-shadow-lg tracking-wider select-none">{t.intro}</p>

        <div className="mb-8 max-w-md mx-auto">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-purple-50 border border-purple-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 text-lg font-semibold py-12">{t.noResults}</div>
          ) : (
            filteredProducts.map(product => (
              <div
                key={product.id}
                className="rounded-xl p-5 shadow hover:shadow-xl transition bg-white flex flex-col items-center text-center relative group"
              >
                <Image src={product.image} alt={product.name} width={400} height={300} className="rounded-md mb-4 object-cover w-full h-40" />
                <h2 className="text-lg font-bold text-purple-800 mb-1">{product.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-purple-700 font-bold">{t.price} {product.price.toFixed()}</span>
                  <span className="flex items-center space-x-1 text-yellow-500">
                    {[...Array(Math.round(product.rating || 4))].map((_, i) => (
                      <Star key={i} size={14} />
                    ))}
                  </span>
                </div>
                <button
                  onClick={() => handleProductClick(product)}
                  className="px-4 py-2 rounded-full bg-purple-600 text-white font-semibold shadow hover:bg-purple-700 transition-all mt-auto"
                >
                  {t.details}
                </button>
                <ShoppingCart className="absolute top-4 right-4 w-6 h-6 text-gray-300 group-hover:text-purple-500 transition" />
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
