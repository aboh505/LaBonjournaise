import React, { useEffect, useState } from 'react';

export default function UserHistory() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem('userHistory');
    setHistory(stored ? JSON.parse(stored) : []);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-8 text-center">Mon historique</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-8">
        {history.length === 0 ? (
          <div className="text-gray-400 text-center">Aucune activité pour l'instant.</div>
        ) : (
          <ul className="space-y-4">
            {history.map((item, i) => (
              <li key={i} className="border-b pb-2">
                <span className="font-semibold text-purple-600">{item.date} :</span> {item.action}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
