'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const translations = {
  fr: {
    introDesc: "Découvrez notre univers, notre mission et nos valeurs. Nous sommes là pour offrir la meilleure expérience e-commerce, avec passion et engagement.",
    contactBtn: "Nous contacter",
    identity: "Notre identité",
    missionBadge: "🎯 Notre mission",
    visionBadge: "🚀 Notre vision",
    experienceBadge: "💼 Notre expérience",
    valuesBadge: "💜 Nos valeurs",
    faqBadge: "FAQ",
    blogBadge: "Blog",
    intro: "Bienvenue chez La Bonjournaise",
    mission: "Notre mission",
    missionDesc: "Offrir des produits de qualité à des prix abordables tout en garantissant une expérience fluide et agréable.",
    vision: "Notre vision",
    visionDesc: "Devenir une référence du e-commerce en Afrique et en Europe, centrée sur l’innovation et la satisfaction client.",
    experience: "Notre expérience",
    experienceDesc: "Avec plus de 5 ans dans la vente en ligne, nous avons bâti une communauté fidèle grâce à notre transparence.",
    values: "Nos valeurs",
    valuesDesc: "Nos valeurs fondamentales :",
    valuesList: [
      "Service client de qualité",
      "Engagement éthique",
      "Accessibilité pour tous",
      "Innovation continue"
    ],
    faq: "FAQ",
    faqData: [
      {
        question: "Comment commander ?",
        answer: "Choisissez vos produits, ajoutez au panier et validez.",
      },
      {
        question: "Quels sont vos délais de livraison ?",
        answer: "La livraison standard prend entre 2 à 5 heures selon votre localisation.",
      },
      {
        question: "Comment puis-je payer ma commande ?",
        answer: "Nous acceptons le paiement par carte bancaire, Mobile Money et transferts bancaires sécurisés.",
      },
      {
        question: "Puis-je annuler ma commande ?",
        answer: "Oui, avant l’expédition, contactez notre service client.",
      },
    ],
    blog: "Blog",
    blogData: [
      {
        title: "Les tendances mode de 2025",
        image: "/a11.jpg",
        excerpt: "Découvrez les couleurs et styles incontournables de la nouvelle année.",
      },
      {
        title: "Comment choisir un produit tech fiable",
        image: "/a12.jpg",
        excerpt: "Nos astuces pour bien investir dans vos accessoires numériques.",
      },
      {
        title: "Nos engagements éthiques en 2025",
        image: "/a13.jpg",
        excerpt: "Un aperçu de nos actions pour un e-commerce plus responsable.",
      },
    ]
  },
  en: {
    introDesc: "Discover our world, our mission and our values. We are here to offer the best e-commerce experience, with passion and commitment.",
    contactBtn: "Contact us",
    identity: "Our identity",
    missionBadge: "🎯 Our Mission",
    visionBadge: "🚀 Our Vision",
    experienceBadge: "💼 Our Experience",
    valuesBadge: "💜 Our Values",
    faqBadge: "FAQ",
    blogBadge: "Blog",
    intro: "Welcome to La Bonjournaise",
    mission: "Our Mission",
    missionDesc: "Offer quality products at affordable prices while ensuring a smooth and enjoyable experience.",
    vision: "Our Vision",
    visionDesc: "Become a benchmark for e-commerce in Africa and Europe, focused on innovation and customer satisfaction.",
    experience: "Our Experience",
    experienceDesc: "With over 5 years in online sales, we have built a loyal community thanks to our transparency.",
    values: "Our Values",
    valuesDesc: "Our core values:",
    valuesList: [
      "Quality customer service",
      "Ethical commitment",
      "Accessibility for all",
      "Continuous innovation"
    ],
    faq: "FAQ",
    faqData: [
      {
        question: "How to order?",
        answer: "Choose your products, add to cart and validate.",
      },
      {
        question: "What are your delivery times?",
        answer: "Standard delivery takes between 2 to 5 hours depending on your location.",
      },
      {
        question: "How can I pay for my order?",
        answer: "We accept payment by credit card, Mobile Money and secure bank transfers.",
      },
    ],
    blog: "Blog",
    blogData: [
      {
        title: "2025 Fashion Trends",
        image: "/a11.jpg",
        excerpt: "Discover the must-have colors and styles of the new year.",
      },
      {
        title: "How to Choose a Reliable Tech Product",
        image: "/a12.jpg",
        excerpt: "Our tips for investing wisely in your digital accessories.",
      },
      {
        title: "Our Ethical Commitments in 2025",
        image: "/a13.jpg",
        excerpt: "An overview of our actions for a more responsible e-commerce.",
      },
    ],
  },
};

export default function Page() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center items-start pt-32 pb-12 px-2">
      <main className="w-full max-w-4xl mx-auto flex flex-col gap-14">
        {/* Section intro */}
        <section className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-14 mb-2">
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
              {t.intro}
              <span className="bg-gradient-to-r from-purple-500 to-green-400 text-transparent bg-clip-text"> La Bonjournaise</span>
            </h1>
            <p className="text-lg text-gray-600">{t.introDesc}</p>
            <button onSubmit={'/contact'} className="mt-4 px-6 py-2 rounded-xl bg-purple-600 text-white font-bold shadow hover:bg-purple-700 transition">{t.contactBtn}</button>
          </div>
          <div className="flex-1 flex justify-center items-center">
            {/* Illustration style modern */}
            <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="80" cy="60" rx="70" ry="40" fill="#f3f4f6" />
              <path d="M60 60 Q80 20 100 60 T140 60" stroke="#a78bfa" strokeWidth="4" fill="none" />
              <circle cx="80" cy="60" r="28" fill="#a7f3d0" stroke="#10b981" strokeWidth="4" />
              <circle cx="80" cy="60" r="12" fill="#fff" stroke="#a78bfa" strokeWidth="2" />
            </svg>
          </div>
        </section>

        {/* Mission, Vision, Valeurs, Expérience */}
        <section className="flex flex-col gap-8">
          <div className="inline-block px-5 py-2 bg-green-300 text-green-900 font-bold rounded-full mb-2 w-max text-sm tracking-wide shadow">{t.identity}</div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
  { title: t.missionBadge, content: t.missionDesc, bg: "bg-white" },
  { title: t.visionBadge, content: t.visionDesc, bg: "bg-neutral-900 text-white" },
  { title: t.experienceBadge, content: t.experienceDesc, bg: "bg-white" },
  { title: t.valuesBadge, content: null, bg: "bg-neutral-900 text-white", isValues: true },
].map((section, i) => (
  <div key={i} className={`rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition duration-300 ${section.bg}`}>
    <h2 className="text-xl font-semibold mb-3">{section.title}</h2>
    <div className="text-gray-700 dark:text-gray-300">
      {section.isValues ? (
        <>
          <div>{t.valuesDesc}</div>
          <ul className="list-disc list-inside space-y-1 mt-2">
            {t.valuesList.map((v, idx) => <li key={idx}>{v}</li>)}
          </ul>
        </>
      ) : (
        section.content
      )}
    </div>
  </div>
))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="inline-block px-5 py-2 bg-purple-200 text-purple-800 font-bold rounded-full mb-6 w-max text-sm tracking-wide shadow">{t.faqBadge}</div>
          <div className="flex flex-col gap-4">
            {t.faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-md border border-gray-200 flex items-start gap-4 hover:shadow-xl transition">
                <div className="flex-shrink-0 mt-2">
                  <svg width="28" height="28" fill="none" stroke="#a78bfa" strokeWidth="2"><circle cx="14" cy="14" r="13" stroke="#a78bfa" strokeWidth="2"/><path d="M14 8v4m0 4h.01" stroke="#a78bfa" strokeWidth="2"/></svg>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-purple-700 mb-1">{faq.question}</div>
                  <div className="text-gray-600">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog animé */}
        <section>
          <div className="inline-block px-5 py-2 bg-yellow-200 text-yellow-900 font-bold rounded-full mb-6 w-max text-sm tracking-wide shadow">{t.blogBadge}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {t.blogData.map((post, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition bg-neutral-900 text-white border border-neutral-800 flex flex-col">
                <img src={post.image} alt={post.title} className="w-full h-44 object-cover" />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="font-semibold text-lg text-green-300 mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-100 mb-4">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
