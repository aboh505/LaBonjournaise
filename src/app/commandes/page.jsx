"use client";
import { useEffect, useState } from "react";
import { useLanguage } from '../context/LanguageContext';
import { useUser } from "../context/UserContext";

const translations = {
  fr: {
    orders: "Commandes",
    id: "ID",
    name: "Nom",
    email: "Email",
    phone: "Téléphone",
    product: "Produit",
    total: "Total",
    status: "Statut",
    date: "Date",
    actions: "Actions",
    delete: "Supprimer",
    noOrders: "Aucune commande trouvée.",
    accessDenied: "Accès réservé",
    loginToSeeOrders: "Veuillez vous connecter pour voir vos commandes.",
    myOrders: "Mes commandes",
    number: "Numéro",
    items: "Articles"
  },
  en: {
    orders: "Orders",
    id: "ID",
    name: "Name",
    email: "Email",
    phone: "Phone",
    product: "Product",
    total: "Total",
    status: "Status",
    date: "Date",
    actions: "Actions",
    delete: "Delete",
    noOrders: "No orders found.",
    accessDenied: "Access denied",
    loginToSeeOrders: "Please login to see your orders.",
    myOrders: "My orders",
    number: "Number",
    items: "Items"
  }
};

export default function MesCommandesPage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    let allOrders = JSON.parse(localStorage.getItem("users") || "[]");
    if (user && user.role === "admin") {
      setOrders(allOrders);
    } else if (user) {
      setOrders(allOrders.filter(o => o.user === user.username));
    } else {
      setOrders([]);
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-24">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-2 text-purple-700">{t.accessDenied}</h2>
          <p>{t.loginToSeeOrders}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-10 flex flex-col items-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-purple-700">{t.myOrders}</h1>
        {orders.length === 0 ? (
          <div className="text-gray-500">{t.noOrders}</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left">{t.number}</th>
                <th className="py-2 px-4 text-left">{t.date}</th>
                <th className="py-2 px-4 text-left">{t.total}</th>
                <th className="py-2 px-4 text-left">{t.status}</th>
                <th className="py-2 px-4 text-left">{t.items}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b">
                  <td className="py-2 px-4 font-mono text-purple-700">{order.id}</td>
                  <td className="py-2 px-4">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{order.total} FCFA</td>
                  <td className="py-2 px-4">{order.status || order.statut || "En attente"}</td>
                  <td className="py-2 px-4">
                    <ul className="list-disc pl-4">
                      {order.items && order.items.map((item, idx) => (
                        <li key={idx}>{item.name} x {item.quantity || 1}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
