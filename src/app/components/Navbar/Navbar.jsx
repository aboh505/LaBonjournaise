'use client';

import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect, useState } from 'react';

const translations = {
  fr: {
    home: "Accueil",
    about: "À propos",
    blog: "Blog",
    contact: "Contact",
    dashboard: "Tableau de bord",
    register: "Inscription",
    cart: "Panier"
  },
  en: {
    home: "Home",
    about: "About",
    blog: "Blog",
    contact: "Contact",
    dashboard: "Dashboard",
    register: "Register",
    cart: "Cart"
  }
};

export default function Navbar() {
  const { user } = useUser();
  const [cartCount, setCartCount] = useState(0);
  const { lang, setLang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    // Fonction pour mettre à jour le compteur
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartCount(cart.length);
    };
    updateCartCount();
    // Écouteur d'événement personnalisé pour MAJ en direct
    window.addEventListener('cartUpdated', updateCartCount);
    // Pour MAJ si on change d'onglet
    window.addEventListener('storage', updateCartCount);
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md py-4 px-6 z-50">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Sublime logo calligraphique */}
        <Link href="/" className="text-4xl md:text-5xl font-extrabold italic font-[\'Dancing_Script\',cursive] bg-gradient-to-r from-purple-600 via-pink-400 to-orange-400 text-transparent bg-clip-text drop-shadow-lg tracking-wider select-none">
          La Bonjournaise
        </Link>

        <nav className="hidden md:flex gap-8 mx-auto">
          <Link href="/" className="text-purple-700 font-bold text-lg tracking-wide hover:underline hover:underline-offset-8 hover:text-pink-500 transition-all duration-150">{t.home}</Link>
          <Link href="/about" className="text-purple-700 font-bold text-lg tracking-wide hover:underline hover:underline-offset-8 hover:text-pink-500 transition-all duration-150">{t.about}</Link>
          <Link href="/blog" className="text-purple-700 font-bold text-lg tracking-wide hover:underline hover:underline-offset-8 hover:text-pink-500 transition-all duration-150">{t.blog}</Link>
          <Link href="/contact" className="text-purple-700 font-bold text-lg tracking-wide hover:underline hover:underline-offset-8 hover:text-pink-500 transition-all duration-150">{t.contact}</Link>
        </nav>

        
        <div className="flex items-center gap-4">
          {/* Sélecteur de langue */}
          <select
            value={lang}
            onChange={e => setLang(e.target.value)}
            className="bg-purple-50 border border-purple-200 text-purple-700 font-bold rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm cursor-pointer transition"
            style={{ minWidth: 70 }}
            aria-label="Language selector"
          >
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
          {user ? (
            <Link href="/dashboard/profile" className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-600 text-white font-bold text-lg hover:bg-purple-700 transition">
              {user.username ? user.username[0].toUpperCase() : '?'}
            </Link>
          ) : (
            <Link href="/register" className="text-gray-600 hover:text-purple-600 transition">
              <User size={25} />
            </Link>
          )}
          <Link href="/cart" className="relative text-gray-600 hover:text-purple-600 transition">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] px-1 flex items-center justify-center text-xs font-bold rounded-full bg-purple-600 text-white border-2 border-white shadow">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
   
  );
}
