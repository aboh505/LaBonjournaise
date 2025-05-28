
'use client'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

const translations = {
  fr: {
    title: "La Bonjournaise",
    desc: "Plateforme de gestion moderne de vos commandes, simple et rapide.",
    nav: "Navigation",
    home: "Accueil",
    dashboard: "Dashboard",
    login: "Connexion",
    register: "Inscription",
    follow: "Suivez-nous",
    newsletter: "Newsletter",
    newsletterDesc: "Recevez nos actus par email",
    subscribe: "S’abonner",
    rights: "Tous droits réservés."
  },
  en: {
    title: "La Bonjournaise",
    desc: "Modern platform for managing your orders, simple and fast.",
    nav: "Navigation",
    home: "Home",
    dashboard: "Dashboard",
    login: "Login",
    register: "Register",
    follow: "Follow us",
    newsletter: "Newsletter",
    newsletterDesc: "Get our news by email",
    subscribe: "Subscribe",
    rights: "All rights reserved."
  }
};

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang];
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-center md:text-left">

        {/* Nom & description */}
        <div>
         <Link href="/" className="text-2xl md:text-3xl font-extrabold italic font-[\'Dancing_Script\',cursive] bg-gradient-to-r from-purple-600 via-pink-400 to-orange-400 text-transparent bg-clip-text drop-shadow-lg tracking-wider select-none">
          {t.title}
        </Link>
<div className="flex flex-col items-center md:items-start gap-1 mb-2">
  <div className="flex items-center gap-2 text-gray-300 text-sm"><span className="text-lg">📞</span> <span>+237 6 90 55 82 16</span></div>
  <div className="flex items-center gap-2 text-gray-300 text-sm"><span className="text-lg">📍</span> <span>Chateau MRS Deido, Douala</span></div>
</div>
<p className="text-gray-400 text-sm">
  {t.desc}
</p>
        </div>

        {/* Liens rapides */}
        <div>
          <h3 className="text-xl font-semibold mb-3">{t.nav}</h3>
          <ul className="space-y-1 text-gray-300">
            <li><a href="/" className="hover:underline">{t.home}</a></li>
            <li><a href="/about" className="hover:underline">{t.about}</a></li>
            <li><a href="/blog" className="hover:underline">{t.blog}</a></li>
            <li><a href="/contact" className="hover:underline">{t.contact}</a></li>
            <li><a href="/dashboard" className="hover:underline">{t.dashboard}</a></li>
          </ul>
        </div>

        {/* Réseaux sociaux avec animation */}
        <div>
          <h3 className="text-xl font-semibold mb-3">{t.follow}</h3>
          <div className="flex justify-center md:justify-start gap-5 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-125">
              <Facebook className="w-6 h-6 text-white hover:text-blue-500" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-125">
              <Twitter className="w-6 h-6 text-white hover:text-sky-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-125">
              <Instagram className="w-6 h-6 text-white hover:text-pink-500" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-125">
              <Linkedin className="w-6 h-6 text-white hover:text-blue-700" />
            </a>
          </div>
        </div>

        {/* Formulaire de newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-3">{t.newsletter}</h3>
          <p className="text-gray-400 mb-2 text-sm">{t.newsletterDesc}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert(t.subscribe);
            }}
            className="flex flex-col gap-2"
          >
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              required
              className="px-3 py-2 rounded text-white"
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
            >
              {t.subscribe}
            </button>
          </form>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-10">
        &copy; {new Date().getFullYear()} {t.title}. {t.rights}
      </div>
    </footer>
  );
}
