"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

// আপনার প্রজেক্টের image ফোল্ডার থেকে ইমেজগুলোর পাথ এখানে দিন
const slides = [
  {
    id: 1,
    image: "/image/banner1.png", 
    tagline: "Discover & Read Original Ebooks",
    description: "Explore a vast collection of indie ebooks written by talented authors worldwide."
  },
  {
    id: 2,
    image: "/image/banner2.png",
    tagline: "Your Library, Anywhere Anytime",
    description: "Carry your favorite stories in your pocket and dive into new worlds."
  }
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // অটো-স্লাইড লজিক
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[80vh] overflow-hidden bg-gray-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt="Fable Banner"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Overlay Gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">
        <motion.div 
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            {slides[current].tagline}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
            {slides[current].description}
          </p>
          
          <Link
            href="/browse"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition-all duration-300 shadow-xl hover:shadow-indigo-500/20"
          >
            <BookOpen className="w-5 h-5" />
            Browse Ebooks
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;