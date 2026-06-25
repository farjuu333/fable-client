"use client";
import { motion } from "framer-motion";
import { Star, BookOpen, TrendingUp } from "lucide-react";

const writers = [
  {
    name: "Eleanor Vance",
    avatar: "E",
    sales: 1450,
    genre: "Gothic Horror",
    rating: 4.9,
    ebooks: 28,
    bio: "Master of atmospheric suspense and dark folklore.",
    gradient: "from-slate-700 to-gray-900",
  },
  {
    name: "Julian Sterling",
    avatar: "J",
    sales: 1120,
    genre: "Cyberpunk",
    rating: 4.8,
    ebooks: 15,
    bio: "Exploring digital dystopias and human evolution.",
    gradient: "from-blue-600 to-indigo-700",
  },
  
  {
    name: "Liam Thorne",
    avatar: "L",
    sales: 870,
    genre: "Historical Fiction",
    rating: 4.7,
    ebooks: 35,
    bio: "Bringing forgotten eras back to vivid life.",
    gradient: "from-emerald-600 to-teal-700",
  }
];

export default function TopWritersSection() {
  return (
    <section className="py-26 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Top <span className="text-blue-600">Writers</span>
          </h2>
         <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
    Meet the master storytellers and creative minds behind Fable's most acclaimed literary works.
  </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {writers.map((writer, i) => (
            <motion.div
              key={writer.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${writer.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-6`}
                >
                  {writer.avatar}
                </div>

                <h3 className="text-xl font-bold text-gray-900">
                  {writer.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1 mb-4">{writer.bio}</p>

                <div className="px-3 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium mb-8">
                  {writer.genre}
                </div>

                {/* Stats with Specific Icons */}
                <div className="w-full grid grid-cols-3 gap-2 border-t border-gray-50 pt-6">
                  <div className="flex flex-col items-center">
                    <BookOpen className="w-4 h-4 text-indigo-500 mb-1" />
                    <p className="text-lg font-bold text-gray-900">
                      {writer.ebooks}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                      Books
                    </p>
                  </div>
                  <div className="flex flex-col items-center border-x border-gray-50">
                    <TrendingUp className="w-4 h-4 text-green-500 mb-1" />
                    <p className="text-lg font-bold text-gray-900">
                      {writer.sales}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                      Sales
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Star className="w-4 h-4 text-yellow-500 mb-1" />
                    <p className="text-lg font-bold text-gray-900">
                      {writer.rating}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                      Rating
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}