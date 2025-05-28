"use client";
import React from "react";
import { useUser } from "../../context/UserContext";

export default function Parametres() {
  const { user } = useUser();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
      <div className="bg-white rounded-xl shadow p-8 mb-12 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-4 text-purple-700">Préférences administrateur</h2>
        <div className="w-full max-w-2xl flex flex-col items-center">
          {user && (
            <div className="mb-6 text-left w-full max-w-md bg-gray-50 p-4 rounded-lg shadow-inner">
              <div className="mb-2"><span className="font-semibold text-gray-700">Nom :</span> {user.name || user.username || "-"}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Email :</span> {user.email}</div>
              <div className="mb-2"><span className="font-semibold text-gray-700">Rôle :</span> <span className="text-purple-700 font-bold uppercase">{user.role}</span></div>
            </div>
          )}
          {!user && <span className="text-gray-400">Aucune information administrateur disponible.</span>}
        </div>
      </div>
    </div>
  );
}

