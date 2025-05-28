"use client";
import React, { useEffect, useState } from "react";
// import { useLanguage } from '../context/LanguageContext';

const translations = {
  fr: {
    users: "Utilisateurs",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    delete: "Supprimer",
    export: "Exporter CSV"
  },
  en: {
    users: "Users",
    name: "Name",
    email: "Email",
    phone: "Phone",
    delete: "Delete",
    export: "Export CSV"
  }
};

export default function Users() {
  // const { lang } = useLanguage();
  // const t = translations[lang];
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const commandes = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(commandes);
  }, []);

  const handleDelete = (idx) => {
    const updated = users.filter((_, i) => i !== idx);
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
  };

  const handleExport = () => {
    const csv = [
      'Nom,Email,Téléphone,Date,Montant,Statut',
      ...users.map(u => `${u.name || ''},${u.email || ''},${u.phone || ''},${u.date || u.createdAt || ''},${u.total || 0},${u.status || 'Enregistré'}`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'utilisateurs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Utilisateurs</h1>
      <div className="bg-white rounded-xl shadow p-8 mb-12 flex flex-col items-center w-full">
        <div className="flex w-full justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-purple-700">Liste des utilisateurs</h2>
          <button onClick={handleExport} className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-semibold hover:bg-purple-200 transition">Exporter</button>
        </div>
        {users.length === 0 ? (
          <div className="w-full max-w-2xl h-64 flex flex-col justify-center items-center text-gray-400">
            <span>Aucun utilisateur à afficher.</span>
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead>
                <tr className="bg-purple-50">
                  <th className="py-2 px-3 font-bold">Nom</th>
                  <th className="py-2 px-3 font-bold">Email</th>
                  <th className="py-2 px-3 font-bold">Téléphone</th>
                  <th className="py-2 px-3 font-bold">Date</th>
                  <th className="py-2 px-3 font-bold">Montant</th>
                  <th className="py-2 px-3 font-bold">Statut</th>
                  <th className="py-2 px-3 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, idx) => (
                  <tr key={idx} className="border-b hover:bg-purple-50 transition">
                    <td className="py-2 px-3">{u.name || <span className="italic text-gray-400">-</span>}</td>
                    <td className="py-2 px-3">{u.email || <span className="italic text-gray-400">-</span>}</td>
                    <td className="py-2 px-3">{u.phone || <span className="italic text-gray-400">-</span>}</td>
                    <td className="py-2 px-3">{u.date || u.createdAt || <span className="italic text-gray-400">-</span>}</td>
                    <td className="py-2 px-3 font-semibold text-orange-600">{u.total ? u.total.toLocaleString() : 0} FCFA</td>
                    <td className="py-2 px-3">
                      <span className="inline-block bg-green-100 text-green-700 rounded-full px-3 py-1 text-xs font-bold">
                        {u.status || 'Enregistré'}
                      </span>
                    </td>
                    <td className="py-2 px-3">
                      <button onClick={() => handleDelete(idx)} className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition mr-2">Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
