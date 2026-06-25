"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const genres = [
  { name: "Fiction", icon: "📚", color: "from-blue-500/20 to-blue-500/0" },
  { name: "Mystery", icon: "🔍", color: "from-purple-500/20 to-purple-500/0" },
  { name: "Romance", icon: "💕", color: "from-pink-500/20 to-pink-500/0" },
  { name: "Sci-Fi", icon: "🚀", color: "from-indigo-500/20 to-indigo-500/0" },
  { name: "Fantasy", icon: "🧙", color: "from-amber-500/20 to-amber-500/0" },
  { name: "Horror", icon: "👻", color: "from-red-500/20 to-red-500/0" },
  { name: "Thriller", icon: "🎯", color: "from-teal-500/20 to-teal-500/0" },
  { name: "Poetry", icon: "🎭", color: "from-rose-500/20 to-rose-500/0" },
];

export default function GenresSection() {
  return (
    <section className="py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Browse by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Genre</span>
          </h2>
          <p className="text-gray-500 text-lg">Find your next favorite story in our collection.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {genres.map((genre, i) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                href={`/browse?genre=${genre.name}`}
                className="group relative flex flex-col items-center justify-center p-6 bg-gray-50 border border-gray-200 rounded-3xl hover:border-indigo-400 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className={`absolute inset-0 bg-gradient-to-b ${genre.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <span className="text-4xl mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  {genre.icon}
                </span>
                <span className="font-semibold text-sm text-gray-700 group-hover:text-black tracking-wide relative z-10">
                  {genre.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}