"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpenText, Sparkles, CornerDownLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FF] px-4">
      <div className="text-center max-w-xl">
        
        {/* Animated Floating Book */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-8xl mb-8 relative"
        >
          <span className="relative z-10">📜</span>
          <div className="absolute inset-0 bg-indigo-200 blur-3xl opacity-30 rounded-full"></div>
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          This story isn't written yet
        </h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          The page you are trying to visit seems to have slipped out of the library. Let's get you back to the main collection.
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-indigo-200"></div>
          <Sparkles className="text-indigo-400 w-5 h-5" />
          <div className="h-px w-12 bg-indigo-200"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-900 hover:bg-gray-400 text-blue-600 font-medium rounded-2xl transition-all duration-300"
          >
            <CornerDownLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Chapter One
          </Link>
          
          <Link
            href="/ebook"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-700 font-medium rounded-2xl border border-gray-200 hover:border-indigo-200 hover:text-indigo-600 transition-all"
          >
            <BookOpenText className="w-4 h-4" />
            Explore Library
          </Link>
        </div>

        {/* Subtle Footer Text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-xs text-gray-400 uppercase tracking-widest"
        >
          Error 404 • Fable Digital Archives
        </motion.p>
      </div>
    </div>
  );
}