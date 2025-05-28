import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { useLanguage } from '../context/LanguageContext';

const translations = {
  fr: {
    gallery: "Votre Galerie",
    addPhotos: "Ajoutez vos propres photos (jpg, png...)",
    empty: "Aucune image pour l'instant. Ajoutez-en !",
    remove: "Supprimer",
    filePlaceholder: "Choisissez des images..."
  },
  en: {
    gallery: "Your Gallery",
    addPhotos: "Add your own photos (jpg, png...)",
    empty: "No images yet. Add some!",
    remove: "Remove",
    filePlaceholder: "Select images..."
  }
};

export default function UserGallerySection() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const [images, setImages] = useState([]);
  const fileInput = useRef();

  useEffect(() => {
    const stored = localStorage.getItem('userGallery');
    if (stored) setImages(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('userGallery', JSON.stringify(images));
  }, [images]);

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages(imgs => [...imgs, ev.target.result]);
      };
      reader.readAsDataURL(file);
    });
    fileInput.current.value = '';
  };

  const handleRemove = idx => setImages(imgs => imgs.filter((_,i) => i !== idx));

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 px-6 bg-purple-50"
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-purple-800">{t.gallery}</h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
        <input
          type="file"
          accept="image/*"
          multiple
          ref={fileInput}
          onChange={handleUpload}
          className="block w-full max-w-xs text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
          placeholder={t.filePlaceholder}
        />
        <span className="text-gray-500 text-sm">{t.addPhotos}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        {images.length === 0 && (
          <div className="col-span-4 text-center text-gray-400">{t.empty}</div>
        )}
        {images.map((img, i) => (
          <motion.div key={i} whileHover={{scale:1.04}} className="relative group">
            <img src={img} alt={`user-img-${i}`} className="rounded-xl w-full h-48 object-cover shadow-lg" />
            <button
              onClick={() => handleRemove(i)}
              className="absolute top-2 right-2 bg-white/80 hover:bg-red-200 text-red-500 rounded-full p-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition"
              title={t.remove}
            >✕</button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
