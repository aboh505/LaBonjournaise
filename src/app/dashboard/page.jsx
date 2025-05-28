"use client";
import React from "react";
import { useLanguage } from '../context/LanguageContext';

const translations = {
  fr: {
    dashboard: "Tableau de bord",
    welcome: "Bienvenue sur votre espace administrateur",
    stats: "Statistiques du jour",
    orders: "Commandes",
    users: "Utilisateurs",
    products: "Produits"
  },
  en: {
    dashboard: "Dashboard",
    welcome: "Welcome to your admin space",
    stats: "Today's stats",
    orders: "Orders",
    users: "Users",
    products: "Products"
  }
};

export default function DashboardHome() {
  const { lang } = useLanguage();
  const t = translations[lang];
  // Stats dynamiques
  const [produitCount, setProduitCount] = React.useState(0);
  const [commandeCount, setCommandeCount] = React.useState(0);
  const [revenus, setRevenus] = React.useState(0);

  React.useEffect(() => {
    function updateStats() {
      let produits = JSON.parse(localStorage.getItem('products') || '[]');
      if (!produits.length) {
        produits = [
          { id: 1, name: 'Burger Classic', price: 3500 },
          { id: 2, name: 'Pizza Margherita', price: 5000 },
          { id: 3, name: 'Hamburger Deluxe', price: 4500 },
          { id: 4, name: 'Sandwich Poulet', price: 2500 },
          { id: 5, name: 'Tacos Viande Hachée', price: 3000 },
          { id: 6, name: 'Hot Dog Classique', price: 2000 }
        ];
      }
      setProduitCount(produits.length);
      const commandes = JSON.parse(localStorage.getItem('users') || '[]');
      setCommandeCount(commandes.length);
      const totalRevenus = commandes.reduce((acc, c) => acc + (c.total || 0), 0);
      setRevenus(totalRevenus);
    }
    updateStats();
    // Rafraîchit toutes les 1s pour capter les changements locaux
    const interval = setInterval(updateStats, 1000);
    // Rafraîchit aussi si un autre onglet modifie le localStorage
    const onStorage = (e) => {
      if (["products", "users"].includes(e.key)) updateStats();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const stats = [
    { label: "Produits", value: produitCount, color: "bg-orange-100 text-orange-500" },
    { label: "Commandes", value: commandeCount, color: "bg-purple-100 text-purple-500" },
    { label: "Revenus", value: revenus.toLocaleString() + ' FCFA', color: "bg-cyan-100 text-cyan-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`rounded-xl shadow p-6 flex flex-col items-center ${s.color}`}
          >
            <span className="text-2xl font-bold mb-2">{s.value}</span>
            <span className="text-gray-500">{s.label}</span>
          </div>
        ))}
      </div>
      {/* Graphique d'évolution fictif */}
      <div className="bg-white rounded-xl shadow p-8 mb-12 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-purple-700">Évolution du site</h2>
        <div className="w-full max-w-2xl h-64">
          <svg width="100%" height="100%" viewBox="0 0 500 200">
            <polyline fill="none" stroke="#a78bfa" strokeWidth="4" points="0,180 80,160 160,120 240,100 320,60 400,40 480,20" />
          </svg>
          <div className="flex justify-between mt-2 text-gray-400 text-xs">
            <span>Jan</span><span>Fév</span><span>Mar</span><span>Avr</span><span>Mai</span><span>Juin</span>
          </div>
        </div>
      </div>
    </div>
  );
}
