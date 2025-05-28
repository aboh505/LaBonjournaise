"use client";
import React from "react";
import { useLanguage } from '../../context/LanguageContext';

const translations = {
  fr: {
    finances: "Finances",
    revenue: "Revenus du jour",
    expenses: "Dépenses",
    balance: "Solde",
    stats: "Statistiques financières",
    total: "Total :",
    thisMonth: "Ce mois :",
    paymentMethod: "Par méthode de paiement"
  },
  en: {
    finances: "Finances",
    revenue: "Today's Revenue",
    expenses: "Expenses",
    balance: "Balance",
    stats: "Financial Stats",
    total: "Total :",
    thisMonth: "This Month :",
    paymentMethod: "By Payment Method"
  }
};

export default function Finances() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [stats, setStats] = React.useState({
    mois: [],
    revenus: [],
    total: 0,
    courant: 0,
    parMethode: {},
  });

  React.useEffect(() => {
    const commandes = JSON.parse(localStorage.getItem('users') || '[]');
    // Prépare les 6 derniers mois
    const now = new Date();
    const moisLabels = [];
    const revenusParMois = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      moisLabels.push(d.toLocaleString('fr-FR', { month: 'short' }));
      revenusParMois.push(0);
    }
    let total = 0;
    let courant = 0;
    const parMethode = { 'Orange Money': 0, 'Mobile Money': 0, 'CB': 0 };
    commandes.forEach(c => {
      const date = c.date ? new Date(c.date) : (c.createdAt ? new Date(c.createdAt) : now);
      const moisIdx = (date.getFullYear() === now.getFullYear()) ? now.getMonth() - date.getMonth() : -1;
      const montant = c.total || 0;
      total += montant;
      // Répartition par mois (6 derniers mois)
      for (let i = 0; i < 6; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
        if (date.getFullYear() === d.getFullYear() && date.getMonth() === d.getMonth()) {
          revenusParMois[i] += montant;
          if (i === 5) courant += montant;
        }
      }
      // Par méthode de paiement
      if (parMethode[c.payment]) parMethode[c.payment] += montant;
      else if (c.payment) parMethode[c.payment] = montant;
    });
    setStats({ mois: moisLabels, revenus: revenusParMois, total, courant, parMethode });
  }, []);

  // Bar chart SVG
  const max = Math.max(...stats.revenus, 1);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Finances</h1>
      <div className="bg-white rounded-xl shadow p-8 mb-12 flex flex-col items-center w-full">
        <h2 className="text-xl font-bold mb-4 text-purple-700">Statistiques de revenus</h2>
        <div className="w-full max-w-2xl flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-between">
          <div className="flex-1 flex flex-col gap-3">
            <div className="flex gap-4">
              <div className="bg-green-100 text-green-700 rounded-xl px-4 py-2 font-bold text-lg flex-1 text-center">
                Total : {stats.total.toLocaleString()} FCFA
              </div>
              <div className="bg-blue-100 text-blue-700 rounded-xl px-4 py-2 font-bold text-lg flex-1 text-center">
                Ce mois : {stats.courant.toLocaleString()} FCFA
              </div>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {Object.entries(stats.parMethode).map(([k, v]) => (
                <span key={k} className="bg-orange-100 text-orange-700 rounded-full px-3 py-1 text-xs font-bold">
                  {k} : {v.toLocaleString()} FCFA
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <svg width="260" height="120" viewBox="0 0 260 120" className="w-full max-w-xs">
              {stats.revenus.map((val, i) => (
                <rect key={i} x={20 + i * 38} y={120 - (val / max) * 100} width="28" height={(val / max) * 100} rx="6" fill="#a78bfa" />
              ))}
              <line x1="0" y1="120" x2="260" y2="120" stroke="#ddd" strokeWidth="2" />
            </svg>
            <div className="flex justify-between w-full mt-2 text-gray-400 text-xs max-w-xs">
              {stats.mois.map((m, i) => (
                <span key={i} className="w-8 text-center">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
