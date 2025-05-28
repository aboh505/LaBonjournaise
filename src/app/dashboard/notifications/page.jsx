"use client";
import React from "react";
import { Bell, CheckCircle, AlertTriangle } from "lucide-react";

const notifications = [
  {
    type: "info",
    icon: <Bell className="text-purple-500" size={28} />,
    title: "Bienvenue sur le dashboard !",
    description: "Retrouvez ici toutes les notifications importantes liées à votre activité."
  },
  {
    type: "success",
    icon: <CheckCircle className="text-green-500" size={28} />,
    title: "Commande validée",
    description: "Votre commande #1023 a été validée avec succès."
  },
  {
    type: "alert",
    icon: <AlertTriangle className="text-yellow-500" size={28} />,
    title: "Produit en rupture",
    description: "Le produit 'Casque Bluetooth' est bientôt en rupture de stock."
  },
];

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-10 text-center flex items-center gap-2 justify-center">
          <Bell className="inline-block text-purple-400" size={32} /> Notifications
        </h1>
        <div className="flex flex-col gap-6">
          {notifications.map((notif, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 bg-white rounded-2xl shadow-md border-l-8 ${notif.type === "success" ? "border-green-400" : notif.type === "alert" ? "border-yellow-400" : "border-purple-300"} p-6`}
            >
              {notif.icon}
              <div>
                <div className="font-bold text-lg mb-1 text-gray-800">{notif.title}</div>
                <div className="text-gray-600 text-sm">{notif.description}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center text-gray-400 text-xs">Dernière mise à jour : {new Date().toLocaleString()}</div>
      </div>
    </div>
  );
}
