'use client';

import Image from "next/image";
import { useLanguage } from './context/LanguageContext';
import Link from 'next/link';
import { motion } from 'framer-motion';
import UserGallerySection from './components/UserGallerySection';

const images = ['/a17.jpg', '/a17.jpg', '/18.jpg', '/a19.jpg', '/a20.jpg', '/a19.jpg'];

const translations = {
  fr: {
    heroTitle: "La Bonjournaise",
    heroSubtitle: "Saveurs & Qualité",
    heroSubtitle2: "Livraison Rapide",
    whyUs: "Pourquoi La Bonjournaise ?",
    qualityGuaranteed: "Qualité garantie",
    qualityDesc: "Menus soigneusement sélectionnés par nos chefs.",
    fastDelivery: "Livraison rapide",
    deliveryDesc: "Disponible partout au Cameroun et au-delà.",
    securePayment: "Paiement sécurisé",
    paymentDesc: "Transferts sécurisés, mobile money ou carte.",
    featured: "Produits en vedette",
    featuredDesc: "Découvrez notre sélection unique et incontournable !",
    testimonials: "Ce que disent nos clients",
    callToAction: "Prêt à découvrir nos offres ?",
    explore: "Explorez des centaines de produits sélectionnés pour vous.",
    accessMenu: "Accéder au Menu",
    team: "Notre Équipe",
    gallery: "Galerie",
    ourValues: "Nos Valeurs",
    passionForTaste: "Passion du goût",
    passionDesc: "Chaque recette est pensée pour éveiller vos papilles.",
    localCommitment: "Engagement local",
    localDesc: "Nous collaborons avec des producteurs de la région.",
    trustAndService: "Confiance & service",
    trustDesc: "Votre satisfaction est notre priorité chaque jour."
  },
  en: {
    heroTitle: "La Bonjournaise",
    heroSubtitle: "Flavors & Quality",
    heroSubtitle2: "Fast Delivery",
    whyUs: "Why La Bonjournaise?",
    qualityGuaranteed: "Quality guaranteed",
    qualityDesc: "Menus carefully selected by our chefs.",
    fastDelivery: "Fast delivery",
    deliveryDesc: "Available everywhere in Cameroon and beyond.",
    securePayment: "Secure payment",
    paymentDesc: "Secure transfers, mobile money or card.",
    featured: "Featured Products",
    featuredDesc: "Discover our unique and must-have selection!",
    testimonials: "What our customers say",
    callToAction: "Ready to discover our offers?",
    explore: "Explore hundreds of products selected for you.",
    accessMenu: "Access Menu",
    team: "Our Team",
    gallery: "Gallery",
    ourValues: "Our Values",
    passionForTaste: "Passion for taste",
    passionDesc: "Every recipe is designed to delight your taste buds.",
    localCommitment: "Local commitment",
    localDesc: "We work with local producers.",
    trustAndService: "Trust & service",
    trustDesc: "Your satisfaction is our priority every day."
  }
};

export default function Page() {
  const { lang } = useLanguage();
  const t = translations[lang];
  // On duplique les images pour un effet de boucle continue
  const repeatedImages = [...images, ...images];

  return (
    <main className="bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-800">
      {/* GRANDE SECTION HERO AVEC 3 IMAGES ET 3 TITRES */}
      <section className="relative flex flex-col items-center justify-center min-h-[580px] w-full bg-gradient-to-br from-purple-200 via-white to-pink-100 overflow-hidden py-16 px-4">
        <div className="flex flex-row justify-center items-end gap-6 w-full max-w-5xl mb-8">
          <div className="relative group">
            <img src="/b5.jpg" alt="Cuisine créative" className="w-64 h-80 object-cover rounded-3xl shadow-2xl border-4 border-white group-hover:scale-105 transition duration-300" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-3xl font-bold text-purple-700 bg-white/70 px-4 py-1 rounded-xl shadow-lg">{lang === 'fr' ? "Cuisine créative" : "Creative Cooking"}</span>
          </div>
          <div className="relative group z-10">
            <img src="/a3.jpg" alt="Ingrédients locaux" className="w-72 h-96 object-cover rounded-3xl shadow-2xl border-4 border-white group-hover:scale-105 transition duration-300" />
            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-4xl font-extrabold text-pink-500 bg-white/80 px-6 py-2 rounded-2xl shadow-xl">{lang === 'fr' ? "Ingrédients locaux" : "Local Ingredients"}</span>
          </div>
          <div className="relative group">
            <img src="/b4.jpg" alt="Livraison Express" className="w-64 h-80 object-cover rounded-3xl shadow-2xl border-4 border-white group-hover:scale-105 transition duration-300" />
            <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-2xl font-bold text-yellow-500 bg-white/70 px-4 py-1 rounded-xl shadow-lg">{t.heroSubtitle2}</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-2">
          <h1 className="text-5xl md:text-6xl font-extrabold text-purple-700 drop-shadow-lg">{t.heroTitle}</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-pink-500 drop-shadow">{t.heroSubtitle}</h2>
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mt-2">{t.heroSubtitle2}</h2>
        </div>
      </section>

      {/* POURQUOI NOUS */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-purple-50 py-20 px-6 text-center"
      >
        <h2 className="text-3xl font-bold text-purple-800 mb-8">{t.whyUs}</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold">{t.qualityGuaranteed}</h3>
            <p className="text-gray-600 mt-2">{t.qualityDesc}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">{t.fastDelivery}</h3>
            <p className="text-gray-600 mt-2">{t.deliveryDesc}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">{t.securePayment}</h3>
            <p className="text-gray-600 mt-2">{t.paymentDesc}</p>
          </div>
        </div>
      </motion.section>

      {/* PRODUITS EN VEDETTE */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-50 py-20 px-6"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-purple-800">🔥 {t.featured}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {['/a20.jpg', '/a17.jpg', '/a18.jpg', '/a19.jpg'].map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-white"
            >
              <Image src={img} alt={`Produit ${i}`} width={400} height={300} className="object-cover w-full h-56" />
              <div className="p-4">
                <p className="text-gray-600 text-sm">{t.featuredDesc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* TÉMOIGNAGES */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-white"
      >
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-10">💬 {t.testimonials}</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <blockquote className="bg-purple-100 p-6 rounded-lg shadow">
            {lang === 'fr' ? "Super service client et produits conformes à mes attentes. Je recommande à 100% !" : "Great customer service and products as expected. I recommend 100%!"}
            <footer className="mt-2 font-semibold">— Sarah M.</footer>
          </blockquote>
          <blockquote className="bg-purple-100 p-6 rounded-lg shadow">
            {lang === 'fr' ? "Livraison rapide, interface agréable, je suis fan de La Bonjournaise !" : "Fast delivery, pleasant interface, I'm a fan of La Bonjournaise!"}
            <footer className="mt-2 font-semibold">— Youssouf B.</footer>
          </blockquote>
        </div>
      </motion.section>

      {/* APPEL À L’ACTION */}
      <motion.section
        whileInView={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center py-20 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white"
      >
        <h2 className="text-3xl font-bold mb-4">{t.callToAction}</h2>
        <p className="mb-6 text-lg">{t.explore}</p>
        <Link
          href="/blog"
          className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          {t.accessMenu}
        </Link>
      </motion.section>
      {/* SECTION ÉQUIPE */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-gradient-to-l from-purple-100 via-white to-pink-100"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-purple-800">{t.team}</h2>
        <div className="flex flex-wrap gap-10 justify-center">
          {[{name:'Aïcha',role:'Fondatrice',img:'/b3.jpg'},{name:'Yann',role:'Chef cuisinier',img:'/b11.jpg'},{name:'Moussa',role:'Livreur',img:'/b2.jpg'}].map((m,i)=>(
            <motion.div key={i} whileHover={{scale:1.07}} className="bg-white rounded-2xl shadow-lg p-6 w-64 flex flex-col items-center">
              <Image src={m.img} alt={m.name} width={120} height={120} className="rounded-full object-cover mb-4" />
              <h3 className="text-xl font-semibold text-purple-700">{m.name}</h3>
              <p className="text-gray-600">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* GALERIE ANIMÉE */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-white"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-purple-800">{t.gallery}</h2>
        <div className="flex gap-6 overflow-x-auto pb-4">
          {[...Array(8)].map((_,i)=>(
            <motion.div key={i} whileHover={{rotate:2,scale:1.06}} className="min-w-[300px] h-[200px] rounded-xl overflow-hidden shadow-lg">
              <Image src={`/a${(i%6)+2}.jpg`} alt={`galerie${i}`} width={300} height={200} className="object-cover w-full h-full" />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* NOS VALEURS */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-gray-50"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-purple-800">{t.ourValues}</h2>
        <div className="flex flex-wrap gap-10 justify-center items-center">
          <motion.div whileHover={{scale:1.05}} className="bg-white rounded-xl shadow-md px-10 py-8 flex flex-col items-center max-w-xs">
            <span className="text-5xl mb-3">🍔</span>
            <h3 className="font-bold text-xl text-purple-700 mb-2">{t.passionForTaste}</h3>
            <p className="text-gray-600">{t.passionDesc}</p>
          </motion.div>
          <motion.div whileHover={{scale:1.05}} className="bg-white rounded-xl shadow-md px-10 py-8 flex flex-col items-center max-w-xs">
            <span className="text-5xl mb-3">🚚</span>
            <h3 className="font-bold text-xl text-pink-500 mb-2">{t.localCommitment}</h3>
            <p className="text-gray-600">{t.localDesc}</p>
          </motion.div>
          <motion.div whileHover={{scale:1.05}} className="bg-white rounded-xl shadow-md px-10 py-8 flex flex-col items-center max-w-xs">
            <span className="text-5xl mb-3">🤝</span>
            <h3 className="font-bold text-xl text-yellow-500 mb-2">{t.trustAndService}</h3>
            <p className="text-gray-600">{t.trustDesc}</p>
          </motion.div>
        </div>
      </motion.section>

      {/* VOTRE GALERIE PERSONNELLE */}
      <UserGallerySection />
    </main>
  );
}

