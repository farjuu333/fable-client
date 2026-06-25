"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { BookOpen, Eye } from "lucide-react";

export default function MyEbooksPage() {
  const { data: session } = authClient.useSession();
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(
        `http://localhost:5000/api/dashboard/user/purchases?email=${session.user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setEbooks(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📚 My Ebooks</h1>
          <p className="text-gray-500 mt-1">Your purchased digital library</p>
        </div>
        <Link
          href="/ebook"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition shadow-md shadow-indigo-200"
        >
          <BookOpen className="w-4 h-4" />
          Browse More
        </Link>
      </div>

      {ebooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ebooks.map((ebook, i) => (
            <motion.div
              key={ebook._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <Link href={`/ebooks/${ebook._id}`}>
                <div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-300 overflow-hidden flex flex-col h-full">
                  {/* Cover */}
                  <div className="relative bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 p-6 flex items-center justify-center h-40 overflow-hidden">
                    {ebook.coverImage ? (
                      <img
                        src={ebook.coverImage}
                        alt={ebook.title}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="text-6xl drop-shadow-md group-hover:scale-110 transition-transform">
                        📖
                      </span>
                    )}
                    {/* Hover overlay with eye icon */}
                    <div className="absolute inset-0 bg-indigo-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {ebook.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {ebook.writerName}
                    </p>
                    <div className="mt-auto pt-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-[11px] font-semibold">
                        Purchased
                      </span>
                      <span className="text-indigo-600 font-bold text-sm">
                        ${ebook.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm"
        >
          <div className="w-24 h-24 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <BookOpen className="w-12 h-12 text-gray-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            No ebooks yet
          </h2>
          <p className="text-gray-500 max-w-sm mx-auto mb-6">
            You haven&apos;t purchased any ebooks. Explore our collection and
            start reading today.
          </p>
          <Link
            href="/ebook"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition shadow-lg shadow-indigo-200"
          >
            <BookOpen className="w-5 h-5" />
            Browse Ebooks
          </Link>
        </motion.div>
      )}
    </div>
  );
}