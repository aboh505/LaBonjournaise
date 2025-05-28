"use client";
import React from "react";

export default function Activites() {
  const [activities, setActivities] = React.useState([]);

  React.useEffect(() => {
    // Simule l'historique à partir des commandes
    const commandes = JSON.parse(localStorage.getItem('users') || '[]');
    const acts = commandes.slice(-10).reverse().map(cmd => ({
      type: 'Commande',
      date: cmd.date || cmd.createdAt || new Date().toLocaleString(),
      user: cmd.name || cmd.email || 'Client',
      montant: cmd.total || 0,
      paiement: cmd.payment || 'Inconnu',
    }));
    setActivities(acts);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Activités</h1>
      <div className="bg-white rounded-xl shadow p-8 mb-12 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-purple-700">Historique des activités</h2>
        <div className="w-full max-w-2xl min-h-64 flex flex-col gap-6 items-center">
          {activities.length === 0 ? (
            <div className="flex flex-col items-center text-gray-400 mt-12">
              <svg width="48" height="48" fill="none" stroke="currentColor" className="mb-2 text-purple-200"><circle cx="24" cy="24" r="22" strokeWidth="2" /><path d="M16 24l6 6 10-14" strokeWidth="2"/></svg>
              <span>Aucune activité récente.</span>
            </div>
          ) : (
            <ol className="relative border-l-4 border-purple-200 ml-4">
              {activities.map((a, i) => (
                <li key={i} className="mb-8 ml-4">
                  <div className="absolute -left-6 flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full ring-4 ring-white">
                    <svg width="20" height="20" fill="none" stroke="currentColor" className="text-purple-500"><path d="M5 13l4 4L19 7" strokeWidth="2"/></svg>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <span className="text-sm font-semibold text-purple-700">{a.type}</span>
                    <span className="text-xs bg-purple-50 text-purple-400 px-2 py-1 rounded-full">{a.date}</span>
                    <span className="text-xs text-gray-500">{a.user}</span>
                    <span className="text-xs font-bold text-orange-500">{a.montant.toLocaleString()} FCFA</span>
                    <span className="text-xs bg-orange-100 text-orange-500 px-2 py-1 rounded">{a.paiement}</span>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
