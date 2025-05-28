import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const sliderImages = [
  { src: '/a2.jpg', title: 'Cuisine créative', color: 'text-purple-600' },
  { src: '/a3.jpg', title: 'Ingrédients locaux', color: 'text-pink-500' },
  { src: '/a4.jpg', title: 'Livraison Express', color: 'text-yellow-500' },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex(i => (i + 1) % sliderImages.length), 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-3xl h-[280px] mx-auto">
      <AnimatePresence initial={false}>
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <Image
            src={sliderImages[index].src}
            alt={sliderImages[index].title}
            width={340}
            height={220}
            className="rounded-2xl shadow-xl object-cover border-4 border-white"
            priority
          />
          <span className={`text-2xl md:text-4xl font-bold mt-4 md:mt-0 ml-0 md:ml-8 drop-shadow-lg ${sliderImages[index].color}`}>{sliderImages[index].title}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
