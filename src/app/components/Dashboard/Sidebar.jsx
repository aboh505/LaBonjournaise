"use client";
import React from "react";
import { LogOut } from "lucide-react";
import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Accueil", icon: "🏠" },
  { href: "/dashboard/finances", label: "Finances", icon: "💰" },
  { href: "/dashboard/activites", label: "Activités", icon: "📈" },
  { href: "/dashboard/notifications", label: "Notifications", icon: "🔔" },
  { href: "/dashboard/users", label: "Utilisateurs", icon: "👤" },
  { href: "/dashboard/produits", label: "Produits", icon: "🛒" },
  { href: "/dashboard/parametres", label: "Paramètres", icon: "⚙️" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-xl min-h-screen flex flex-col justify-between">
      <nav className="py-8 px-6 flex flex-col gap-6">
        <div className="text-2xl font-bold text-purple-700 mb-8">SM Info.</div>
        {navItems.map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-purple-100 hover:text-purple-700 text-gray-700 font-semibold transition-all duration-150 shadow-sm"
          >
            <span className="text-xl">{item.icon}</span> {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-6 border-t flex flex-col items-center">
        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("loggedIn");
            window.location.href = "/login";
          }}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow transition"
        >
          <LogOut size={20} /> Déconnexion
        </button>
      </div>
    </aside>
  );
}
