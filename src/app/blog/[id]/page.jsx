"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import { useLanguage } from '../../context/LanguageContext';

const translations = {
  fr: {
    ingredients: "Ingrédients",
    size: "Taille",
    weight: "Poids",
    volume: "Volume",
    colors: "Couleurs",
    origin: "Origine",
    back: "Retour au blog",
    notFound: "Produit introuvable.",
    details: "Voir les détails",
    price: "FCFA"
  },
  en: {
    ingredients: "Ingredients",
    size: "Size",
    weight: "Weight",
    volume: "Volume",
    colors: "Colors",
    origin: "Origin",
    back: "Back to blog",
    notFound: "Product not found.",
    details: "View details",
    price: "CFA"
  }
};

export default function ProductDetailPage() {
  const params = useParams();
  const { lang } = useLanguage();
  const t = translations[lang];
  const { id } = params;
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    // Ajoute dynamiquement des ingrédients différents selon l'id pour la démo
    let found = products.find(p => String(p.id) === String(id));
    if(found && !found.ingredients) {
      if(found.name.toLowerCase().includes('pizza')) found.ingredients = 'Pâte à pizza, Sauce tomate, Mozzarella, Basilic';
      else if(found.name.toLowerCase().includes('burger')) found.ingredients = 'Pain, Steak, Fromage, Salade, Tomate, Sauce';
      else if(found.name.toLowerCase().includes('hamburger')) found.ingredients = 'Pain, Double steak, Cheddar, Bacon, Oignons, Sauce';
      else found.ingredients = 'Ingrédient 1, Ingrédient 2, Ingrédient 3';
    }
    setProduct(found || null);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!cart.find(p => p.id === product.id)) {
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem("cart", JSON.stringify(cart));
      setAdded(true);
      // Déclenche l'événement pour MAJ navbar
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cartUpdated'));
      }
    }
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
        Produit introuvable.
        <button onClick={() => router.push("/blog")} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg">Retour au blog</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 via-purple-50 to-gray-200 py-0 px-0">
      {/* Bouton retour visible et élégant */}
      <div className="sticky top-0 left-0 z-30 flex w-full max-w-4xl mx-auto">
        <button
          onClick={() => router.push("/blog")}
          className="flex items-center gap-2 mt-6 ml-2 md:ml-0 px-4 py-2 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-base font-semibold shadow-lg transition-all border-2 border-white"
          style={{boxShadow: '0 4px 24px #a78bfa44'}}>
          <span className="text-lg">←</span> <span>Retour au blog</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto mt-12 md:mt-20 mb-10 px-2 md:px-6">
        <div className="bg-white/95 rounded-3xl shadow-2xl p-4 md:p-8 flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Image produit */}
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-[400px]">
            <div className="w-full aspect-[4/3] relative mb-4 md:mb-0">
              <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 600px) 100vw, 400px" className="rounded-xl object-cover shadow-xl border-2 border-purple-100" style={{minHeight: 200}} />
            </div>
          </div>
          {/* Détails produit */}
          <div className="flex-1 flex flex-col gap-2 md:gap-4 w-full">
            <h1 className="text-2xl md:text-3xl font-extrabold text-purple-700 mb-1 leading-tight">{product.name}</h1>
            {/* Ingrédients listés */}
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">🍔</span>
                <span className="font-semibold text-purple-700">{t.ingredients}</span>
              </div>
              <ul className="list-disc ml-8 text-gray-700 text-sm">
                {(product.ingredients ? product.ingredients.split(',') : ['Pain', 'Viande', 'Fromage', 'Salade', 'Sauce'])
                  .map((ing, i) => <li key={i}>{ing.trim()}</li>)}
              </ul>
            </div>
            <div className="mb-2 text-gray-700 text-base md:text-lg">{product.description}</div>

            <div className="flex flex-wrap gap-3 my-2">
              {product.size && <div className="bg-purple-50 rounded px-3 py-1 text-purple-700 font-semibold">{t.size} : {product.size}</div>}
              {product.weight && <div className="bg-purple-50 rounded px-3 py-1 text-purple-700 font-semibold">{t.weight} : {product.weight}</div>}
              {product.volume && <div className="bg-purple-50 rounded px-3 py-1 text-purple-700 font-semibold">{t.volume} : {product.volume}</div>}
              {product.colors && <div className="bg-purple-50 rounded px-3 py-1 text-purple-700 font-semibold">{t.colors} : {product.colors}</div>}
              {product.origin && <div className="bg-purple-50 rounded px-3 py-1 text-purple-700 font-semibold">{t.origin} : {product.origin}</div>}
            </div>

            <div className="text-2xl font-extrabold text-orange-600 mb-1">{product.price} {t.price}</div>
            {product.oldPrice && (
              <div className="text-base text-gray-400 line-through">{product.oldPrice} {t.price}</div>
            )}
            {product.promo && (
              <div className="text-green-600 font-semibold">Promo : {product.promo}</div>
            )}
            <div className="text-xs text-gray-500">Taxes et frais de livraison inclus</div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-yellow-500 flex">
                {[...Array(Math.round(product.rating || 4))].map((_, i) => <Star key={i} size={18} />)}
              </span>
              <span className="font-semibold text-base">{product.rating || 4.5}/5</span>
              <span className="text-gray-500">({product.reviewsCount || 25} avis)</span>
            </div>
            <div className="mt-2 text-gray-600 text-sm">
              <div>"Produit excellent, livraison rapide !"</div>
              <div>"Très bon goût, je recommande."</div>
            </div>

            <div className="mt-2">
              <span className={product.stock === 0 ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
                {product.stock === 0 ? "Rupture de stock" : product.stock <= 5 ? `Quantité limitée (${product.stock})` : "En stock"}
              </span>
            </div>

            <div className="text-xs text-gray-500 mt-1">
              {product.prepTime ? `Préparation : ${product.prepTime}` : product.deliveryTime ? `Livraison estimée : ${product.deliveryTime}` : "Livraison estimée sous 2 à 5 heures"}
            </div>

            <button
              disabled={added}
              onClick={handleAddToCart}
              className={`mt-4 px-4 py-2 rounded-full text-white font-bold text-base shadow transition-all ${added ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"}`}
            >
              {added ? "Ajouté au panier" : "Ajouter au panier"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
