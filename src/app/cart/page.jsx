'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useLanguage } from '../context/LanguageContext';

const translations = {
  fr: {
    back: "Retour à la boutique",
    cart: "🛒 Mon Panier",
    clear: "Vider le panier",
    empty: "Aucun produit dans le panier.",
    priceUnit: "FCFA / unité",
    price: "FCFA",
    subtotal: "Sous-total",
    delivery: "Livraison estimée",
    total: "Total",
    summary: "Récapitulatif",
    checkout: "Passer à la commande",
    deliveryNone: "—"
  },
  en: {
    back: "Back to shop",
    cart: "🛒 My Cart",
    clear: "Clear cart",
    empty: "No products in cart.",
    priceUnit: "CFA / unit",
    price: "CFA",
    subtotal: "Subtotal",
    delivery: "Estimated delivery",
    total: "Total",
    summary: "Summary",
    checkout: "Proceed to checkout",
    deliveryNone: "—"
  }
};

export default function CartPage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [cartItems, setCartItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCartItems(JSON.parse(stored));
  }, []);

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (id, delta) => {
    setCartItems(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } : item
      );
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  // Supprimer un article
  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  // Vider le panier
  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', '[]');
  };

  // Calculs totaux
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const delivery = cartItems.length > 0 ? 1200 : 0;
  const total = subtotal + delivery;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-2 md:px-8">
      <button onClick={() => router.push('/blog')} className="mt-8 flex items-center text-purple-700 hover:underline text-sm font-semibold"><ArrowLeft className="mr-2" />{t.back}</button>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mt-24">
        {/* Colonne principale - Liste des produits */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{t.cart}</h1>
            <button onClick={clearCart} className="text-red-500 hover:underline text-sm font-semibold">{t.clear}</button>
          </div>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">{t.empty}</p>
          ) : (
            <div className="space-y-6">

              {cartItems.map(item => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 rounded-xl shadow-sm p-4 gap-4"
                >
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Image src={item.image} alt={item.name} width={70} height={70} className="rounded-lg bg-white border" />
                    <div className="min-w-0">
                      <h2 className="text-base font-semibold truncate">{item.name}</h2>
                      {item.description && <p className="text-xs text-gray-500 truncate">{item.description}</p>}
                      <div className="text-sm text-gray-700 mt-1">{item.price} {t.priceUnit}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <button onClick={() => updateQuantity(item.id, -1)} className="w-7 h-7 rounded bg-gray-200 hover:bg-purple-200 text-lg font-bold flex items-center justify-center">-</button>
                    <span className="px-2 text-base font-semibold">{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} className="w-7 h-7 rounded bg-gray-200 hover:bg-purple-200 text-lg font-bold flex items-center justify-center">+</button>
                  </div>
                  <div className="text-base font-bold text-purple-700 min-w-[80px] text-right">{item.price * (item.quantity || 1)} {t.price}</div>
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 ml-2"><Trash2 /></button>
                </div>
              ))}
            </div>
          )}
      
        </div>

        {/* Colonne récapitulative */}
        <div className="w-full md:w-[340px] bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-24 self-start">
          <h2 className="text-xl font-bold mb-4">{t.summary}</h2>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>{t.subtotal}</span>
            <span>{subtotal} {t.price}</span>
          </div>
          <div className="flex justify-between text-gray-700 mb-2">
            <span>{t.delivery}</span>
            <span>{delivery > 0 ? delivery + ' ' + t.price : t.deliveryNone}</span>
          </div>
          <div className="border-t my-3"></div>
          <div className="flex justify-between text-lg font-bold text-purple-700 mb-4">
            <span>{t.total}</span>
            <span>{total} {t.price}</span>
          </div>
          <button
            disabled={cartItems.length === 0}
            className={`w-full py-3 rounded-lg text-white font-bold text-lg transition ${cartItems.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
            onClick={() => { if (cartItems.length > 0) router.push('/commande'); }}
          >
            {t.checkout}
          </button>
        </div>
      </div>
    </div>
  );
}
