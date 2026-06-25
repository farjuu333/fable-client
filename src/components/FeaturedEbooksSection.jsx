"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BookCard from "./BookCard"; 

export default function FeaturedEbooksSection() {
  const [books, setBooks] = useState([]); // নাম পরিবর্তন করা হয়েছে
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // লোকাল সার্ভারের URL
    fetch("http://localhost:5000/api/featured-books") 
      .then((res) => res.json())
      .then((data) => {
        console.log("সার্ভার থেকে প্রাপ্ত ডাটা:", data);
        setBooks(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="loading loading-spinner loading-lg text-indigo-500"></span>
        </div>
      </section>
    );
  }

  // এখানেও condition টি আপডেট করা হয়েছে
  if (books.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-black mb-4"
          >
            Featured <span className="text-indigo-500">Ebooks</span>
          </motion.h2>
          <p className="text-zinc-400 max-w-md mx-auto">
            Discover our latest and most popular handpicked stories.
          </p>
        </div>

        {/* Ebooks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book, i) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              {/* এখানে book prop হিসেবে পাঠানো হচ্ছে */}
              <BookCard book={book} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}