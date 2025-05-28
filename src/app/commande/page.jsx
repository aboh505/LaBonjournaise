"use client";
import React, { useState, useEffect } from "react";
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import Image from "next/image";

// Placeholders for payment logos (replace with actual paths if you have the images)
const orangeLogo = "/a14.jpg";
const momoLogo = "/a15.jpg";
const cbLogo = "/a16.jpg";

const translations = {
  fr: {
    order: "Passer une commande",
    name: "Nom complet",
    email: "Email",
    phone: "Téléphone",
    address: "Adresse de livraison",
    product: "Produit",
    quantity: "Quantité",
    payment: "Moyen de paiement",
    submit: "Valider ma commande",
    success: "Commande enregistrée avec succès !",
    summary: "Résumé de la commande",
    subtotal: "Sous-total",
    delivery: "Livraison",
    total: "Total",
    pay: "À payer",
    empty: "Votre panier est vide.",
    confirm: "Confirmer",
    processing: "Traitement...",
    backHome: "Retour à l'accueil",
    seeOrders: "Voir mes commandes",
    thankYou: "Merci pour votre commande !",
    confirmation: "Vous recevrez un email de confirmation.",
    orderNumber: "Numéro de commande",
    acceptTerms: "J'accepte les ",
    terms: "conditions générales de vente",
    required: "Merci de remplir tous les champs et accepter les conditions.",
    emptyCart: "Votre panier est vide."
  },
  en: {
    order: "Place an order",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    address: "Delivery address",
    product: "Product",
    quantity: "Quantity",
    payment: "Payment method",
    submit: "Submit my order",
    success: "Order registered successfully!",
    summary: "Order summary",
    subtotal: "Subtotal",
    delivery: "Delivery",
    total: "Total",
    pay: "To pay",
    empty: "Your cart is empty.",
    confirm: "Confirm",
    processing: "Processing...",
    backHome: "Back to home",
    seeOrders: "See my orders",
    thankYou: "Thank you for your order!",
    confirmation: "You will receive a confirmation email.",
    orderNumber: "Order number",
    acceptTerms: "I accept the ",
    terms: "terms and conditions",
    required: "Please fill all fields and accept the terms.",
    emptyCart: "Your cart is empty."
  }
};

export default function CommandePage() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const { user } = useUser();
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: user?.username || "",
    address: "",
    email: user?.email || "",
    phone: "",
    payment: "",
    accept: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [delivery] = useState(1200);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
    else setCart([]);
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const total = subtotal + delivery;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) } : item
      );
      localStorage.setItem("cart", JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    if (!form.name || !form.address || !form.email || !form.phone || !form.payment || !form.accept) {
      setError("Merci de remplir tous les champs et accepter les conditions.");
      setSubmitting(false);
      return;
    }
    if (cart.length === 0) {
      setError("Votre panier est vide.");
      setSubmitting(false);
      return;
    }
    // Générer un numéro de commande unique
    const id = "CMD" + Date.now();
    setOrderId(id);
    // Enregistrement dans le dashboard (localStorage)
    const order = {
      id,
      user: user?.username || "Invité",
      name: form.name,
      email: form.email,
      phone: form.phone,
      items: cart,
      total,
      address: form.address,
      contact: form.email || form.phone,
      payment: form.payment,
      date: new Date().toISOString(),
      status: "En attente",
    };
    // Migration rapide pour anciens objets (si besoin)
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    users = users.map(u => ({
      ...u,
      name: u.name || u.user || "",
      email: u.email || u.contact || "",
      phone: u.phone || ""
    }));
    users.push(order);
    localStorage.setItem("users", JSON.stringify(users));
    // Ajout dans finances
    const finances = JSON.parse(localStorage.getItem("finances") || "[]");
    localStorage.setItem("finances", JSON.stringify([...finances, order]));
    // Ajout dans activités
    if (user) {
      const activities = JSON.parse(localStorage.getItem("activities") || "[]");
      localStorage.setItem("activities", JSON.stringify([...activities, { type: "commande", order, user: user.username, date: order.date }]));
    }
    // Vider le panier
    localStorage.setItem("cart", "[]");
    setCart([]);
    setSuccess(true);
    setSubmitting(false);
    setTimeout(() => router.push("/commande"), 1800);
  };

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-24">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-lg w-full text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-2">{t.thankYou}</h2>
          <p className="mb-2">{t.confirmation}</p>
          <p className="mb-4">{t.orderNumber} : <span className="font-mono text-purple-700">{orderId}</span></p>
          <div className="flex flex-col gap-4 mt-6">
            <button onClick={() => router.push("/")} className="px-6 py-3 rounded bg-purple-600 text-white font-bold hover:bg-purple-700">{t.backHome}</button>
            <button onClick={() => router.push("/commandes")} className="px-6 py-3 rounded bg-gray-200 text-purple-800 font-bold hover:bg-gray-300">{t.seeOrders}</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-10 px-2 md:px-0 flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-10 max-w-3xl w-full border border-purple-100">
        <h1 className="text-3xl font-extrabold mb-8 text-purple-700 tracking-tight flex items-center gap-2">
          <span className="inline-block bg-purple-100 p-2 rounded-full"><svg width="24" height="24" fill="none" stroke="currentColor" className="text-purple-600"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18"/></svg></span>
          {t.submit}
        </h1>
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <div className="bg-gray-50 rounded-xl p-6 shadow-inner border border-gray-100">
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-1">
                {t.name} <span className="text-red-500">*</span>
              </label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full border-2 border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition mb-3" required />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-1">
                {t.address} <span className="text-red-500">*</span>
              </label>
              <input type="text" name="address" value={form.address} onChange={handleChange} className="w-full border-2 border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition mb-3" required />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-1">
                {t.email} <span className="text-red-500">*</span>
              </label>
              <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border-2 border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition mb-3" required />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-1 flex items-center gap-1">
                {t.phone} <span className="text-red-500">*</span>
              </label>
              <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full border-2 border-purple-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 transition" required />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 font-semibold mb-2 mt-3">{t.payment} <span className="text-red-500">*</span></label>
              <div className="flex flex-col gap-3">
                <label className={`flex items-center gap-3 border-2 rounded-lg px-4 py-2 cursor-pointer transition ${form.payment === 'Orange Money' ? 'border-orange-400 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`}>
                  <input type="radio" name="payment" value="Orange Money" checked={form.payment === 'Orange Money'} onChange={handleChange} required className="accent-orange-500" />
                  <Image src={orangeLogo} alt="Orange Money" width={30} height={30} />
                  <span className="font-medium">Orange Money</span>
                </label>
                <label className={`flex items-center gap-3 border-2 rounded-lg px-4 py-2 cursor-pointer transition ${form.payment === 'Mobile Money' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200 hover:border-yellow-300'}`}>
                  <input type="radio" name="payment" value="Mobile Money" checked={form.payment === 'Mobile Money'} onChange={handleChange} required className="accent-yellow-500" />
                  <Image src={momoLogo} alt="Mobile Money" width={30} height={30} />
                  <span className="font-medium">Mobile Money</span>
                </label>
                <label className={`flex items-center gap-3 border-2 rounded-lg px-4 py-2 cursor-pointer transition ${form.payment === 'CB' ? 'border-blue-400 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}>
                  <input type="radio" name="payment" value="CB" checked={form.payment === 'CB'} onChange={handleChange} required className="accent-blue-500" />
                  <Image src={cbLogo} alt="Carte bancaire" width={30} height={30} />
                  <span className="font-medium">Carte bancaire</span>
                </label>
              </div>
            </div>
            <div className="flex items-center mt-6 mb-2">
              <input type="checkbox" name="accept" checked={form.accept} onChange={handleChange} required className="mr-2 accent-purple-600" />
              <span className="text-xs text-gray-600">{t.acceptTerms}<a href="#" className="underline hover:text-purple-700">{t.terms}</a></span>
            </div>
            {error && <div className="text-red-500 mt-4 text-sm font-semibold border border-red-200 bg-red-50 px-4 py-2 rounded-lg animate-pulse">{t.required}</div>}
          </div>
          <div className="bg-gradient-to-br from-purple-50 via-white to-orange-50 rounded-2xl shadow-2xl border-2 border-purple-100 p-6 flex flex-col gap-5 w-full max-w-full mt-6 md:mt-0 mx-auto md:max-w-sm md:w-[350px]">
            <h2 className="text-xl font-extrabold mb-2 flex items-center gap-2 text-purple-700">
              <span className="inline-block bg-purple-200 p-1.5 rounded-full">
                <svg width="22" height="22" fill="none" stroke="currentColor" className="text-purple-700"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
              </span>
              {t.summary}
            </h2>
            {cart.length === 0 ? (
              <p className="text-gray-400 italic text-center">{t.empty}</p>
            ) : (
              <div className="flex flex-col gap-4">
                {cart.map((item, idx) => (
                  <div key={item.id} className="flex items-center gap-4 bg-white/80 rounded-xl shadow-inner border border-gray-100 px-3 py-2 relative">
                    <div className="relative">
                      <Image src={item.image} alt={item.name} width={54} height={54} className="rounded-lg border-2 border-purple-100 shadow-sm" />
                      <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">x{item.quantity || 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-base text-gray-800 truncate mb-1">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.price} FCFA</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 text-lg font-bold text-purple-700 flex items-center justify-center shadow transition-all">-</button>
                      <span className="px-2 text-lg font-semibold text-purple-800">{item.quantity || 1}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 rounded-full bg-purple-100 hover:bg-purple-200 text-lg font-bold text-purple-700 flex items-center justify-center shadow transition-all">+</button>
                    </div>
                    <div className="text-base font-bold text-orange-500 min-w-[80px] text-right">{item.price * (item.quantity || 1)} FCFA</div>
                    {idx < cart.length - 1 && <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-100 to-transparent" />}
                  </div>
                ))}
                <div className="flex justify-between items-center text-gray-700 mt-3">
                  <span className="font-medium">{t.subtotal}</span>
                  <span className="font-semibold">{subtotal} FCFA</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                  <span className="font-medium">{t.delivery}</span>
                  <span className="font-semibold">{delivery} FCFA</span>
                </div>
                <div className="flex justify-between items-center text-2xl font-extrabold text-purple-700 mt-3 w-full overflow-hidden flex-wrap">
                  <span className="flex items-center gap-2 min-w-0 truncate">
                    {t.total}
                    <span className="inline-block bg-orange-400 text-white rounded-full px-3 py-1 text-xs font-bold ml-2">{t.pay}</span>
                  </span>
                  <span className="flex items-center gap-1 min-w-0 truncate max-w-[55%] justify-end text-right">
                    <span className="truncate">{total} <span className="text-base font-bold">FCFA</span></span>
                    <svg width="22" height="22" fill="none" stroke="currentColor" className="text-orange-500 flex-shrink-0"><circle cx="11" cy="11" r="10" strokeWidth="2" /><path d="M7 11h8M11 7v8" strokeWidth="2"/></svg>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <button
          disabled={submitting || cart.length === 0}
          type="submit"
          className={`mt-8 w-full py-3 rounded-lg text-white font-bold text-lg transition ${submitting || cart.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
        >
          {submitting ? t.processing : t.confirm}
        </button>
      </form>
    </div>
  );
}
