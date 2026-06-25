"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { Bookmark, Eye } from "lucide-react";

export default function BookmarksPage() {
  const { data: session } = authClient.useSession();
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(
        `http://localhost:5000/api/bookmarks?email=${session.user.email}`,
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
          <h1 className="text-3xl font-bold text-gray-900">🔖 My Bookmarks</h1>
          <p className="text-gray-500 mt-1">Ebooks you’ve saved for later</p>
        </div>
      </div>

      {ebooks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {ebooks.map((ebook, i) => (
            <motion.div
              key={ebook._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6 }}
            >
              <Link href={`/ebooks/${ebook._id}`}>
                <div className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl hover:border-indigo-100 transition-all duration-300 overflow-hidden">
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 flex items-center justify-center h-40 relative">
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
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-indigo-600">
                      {ebook.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {ebook.writerName}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-indigo-600 font-bold text-sm">
                        ${ebook.price}
                      </span>
                      <span className="text-yellow-500">
                        <Bookmark className="w-4 h-4 fill-current" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <span className="text-4xl block mb-4">🔖</span>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No bookmarks yet
          </h2>
          <p className="text-gray-500 mb-4">
            Save ebooks you like for later reading.
          </p>
          <Link href="/ebook" className="btn btn-primary">
            Browse Ebooks
          </Link>
        </div>
      )}
    </div>
  );
}