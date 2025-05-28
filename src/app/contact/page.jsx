'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import Image from 'next/image';

const translations = {
  fr: {
    title: "Contactez-nous",
    name: "Nom",
    email: "E-mail",
    message: "Message",
    send: "Envoyer",
    success: "Merci pour votre message !"
  },
  en: {
    title: "Contact us",
    name: "Name",
    email: "Email",
    message: "Message",
    send: "Send",
    success: "Thank you for your message!"
  }
};

export default function Page() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('contactForm');
    if (storedData) {
      setFormData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contactForm', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('submittedForm', JSON.stringify(formData));
    setFormData({ name: '', email: '', message: '' });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-gray-800 dark:text-gray-200 pt-32 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Image à gauche */}
        <div className="w-full md:w-1/2">
          <Image
            src="/a10.jpg" // 🖼️ Remplace ceci par le chemin de ton image
            alt="Contact"
            width={600}
            height={700}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Formulaire à droite */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-extrabold mb-6 text-purple-700 dark:text-purple-300 text-center md:text-left">
            {t.title}
          </h1>

          {submitted ? (
            <div className="bg-green-100 dark:bg-green-900/30 border border-green-300 text-green-800 dark:text-green-200 p-5 rounded-lg text-center shadow-md">
              ✅ {t.success}
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/90 dark:bg-gray-900/80 rounded-xl shadow-lg p-8 space-y-6 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
            >
              <div>
                <label className="block mb-2 text-sm font-medium">{t.name}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">{t.email}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">💬 {t.message}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300"
              >
                {t.send}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
