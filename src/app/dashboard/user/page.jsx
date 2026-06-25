
// "use client";

// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { ShoppingBag, Bookmark, TrendingUp, Eye } from "lucide-react";
// import { authClient } from "@/lib/auth-client";

// export default function UserDashboard() {
//   const { data: session } = authClient.useSession();
//   const [purchasedEbooks, setPurchasedEbooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (session?.user?.email) {
//       fetch(
//         `http://localhost:5000/api/dashboard/user/purchases?email=${session.user.email}`,
//       )
//         .then((res) => res.json())
//         .then((data) => {
//           setPurchasedEbooks(Array.isArray(data) ? data : []);
//           setLoading(false);
//         })
//         .catch(() => setLoading(false));
//     }
//   }, [session]);

//   if (loading) {
//     return (
//       <div className="flex justify-center py-20">
//         <span className="loading loading-spinner loading-lg text-indigo-600"></span>
//       </div>
//     );
//   }

//   const stats = [
//     {
//       label: "Purchased",
//       value: purchasedEbooks.length,
//       icon: ShoppingBag,
//       color: "bg-blue-500",
//     },
//     { label: "Bookmarks", value: "0", icon: Bookmark, color: "bg-yellow-500" },
//     {
//       label: "Total Spent",
//     //   value: `$${purchasedEbooks.reduce((s, e) => s + e.price, 0).toFixed(2)}`,
//     value: `$${purchasedEbooks
//     .reduce((s, e) => {
//       // price টি নাম্বার কি না নিশ্চিত করুন, নাহলে 0 ধরুন
//       const price = typeof e.price === 'string' ? parseFloat(e.price) : (e.price || 0);
//       return s + price;
//     }, 0)
//     .toFixed(2)}`,
//       icon: TrendingUp,
//       color: "bg-purple-500",
//     },
//   ];

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "N/A";
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <div>
//       {/* Profile Header */}
//       <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
//         <div className="flex items-center gap-4">
//           <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
//             {session?.user?.name?.[0]?.toUpperCase() || "U"}
//           </div>
//           <div>
//             <h2 className="text-xl font-bold text-gray-900">
//               {session?.user?.name || "Reader"}
//             </h2>
//             <p className="text-gray-500 text-sm">{session?.user?.email}</p>
//             <span className="badge bg-indigo-50 text-indigo-600 text-xs mt-1">
//               Reader
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
//         {stats.map((stat, i) => (
//           <motion.div
//             key={stat.label}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//             className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
//           >
//             <div className="flex items-center gap-3">
//               <div
//                 className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}
//               >
//                 <stat.icon className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <p className="text-xs text-gray-500">{stat.label}</p>
//                 <p className="text-xl font-bold">{stat.value}</p>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Purchase History Table */}
//       <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
//         <div className="p-4 border-b border-gray-100">
//           <h2 className="font-semibold text-gray-900">📋 Purchase History</h2>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="bg-gray-50 text-gray-500">
//               <tr>
//                 <th className="text-left p-3 font-medium">Ebook</th>
//                 <th className="text-left p-3 font-medium">Writer</th>
//                 <th className="text-left p-3 font-medium">Price</th>
//                 <th className="text-left p-3 font-medium">Date</th>
//                 <th className="text-left p-3 font-medium">Status</th>
//                 <th className="text-left p-3 font-medium">View</th>
//               </tr>
//             </thead>
//             <tbody>
//               {purchasedEbooks.length > 0 ? (
//                 purchasedEbooks.map((ebook, i) => (
//                   <tr
//                     key={i}
//                     className="border-t border-gray-50 hover:bg-gray-50"
//                   >
//                     <td className="p-3 font-medium text-gray-900">
//                       {ebook.title}
//                     </td>
//                     <td className="p-3 text-gray-500">{ebook.writerName}</td>
//                     <td className="p-3 font-semibold text-indigo-600">
//                       ${ebook.price}
//                     </td>
//                     <td className="p-3 text-gray-500">
//                       {formatDate(ebook.createdAt || ebook.uploadedDate)}
//                     </td>
//                     <td className="p-3">
//                       <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
//                         Purchased
//                       </span>
//                     </td>
//                     <td className="p-3">
//                       <Link
//                         href={`/ebooks/${ebook._id}`}
//                         className="text-indigo-600 hover:text-indigo-800"
//                       >
//                         <Eye className="w-4 h-4" />
//                       </Link>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={6} className="p-6 text-center text-gray-400">
//                     No purchase history yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// } 
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Bookmark, TrendingUp, Eye, Package } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function UserDashboard() {
  const { data: session } = authClient.useSession();
  const [purchasedEbooks, setPurchasedEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(
        `http://localhost:5000/api/dashboard/user/purchases?email=${session.user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setPurchasedEbooks(Array.isArray(data) ? data : []);
          setBookmarks(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  const stats = [
    { label: "Purchased", value: purchasedEbooks.length, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Bookmarks", value: bookmarks.length, icon: Bookmark, color: "text-yellow-600", bg: "bg-yellow-50" },
    { 
      label: "Total Spent", 
      value: `$${purchasedEbooks.reduce((s, e) => s + (parseFloat(e.price) || 0), 0).toFixed(2)}`, 
      icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" 
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Profile Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-r from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold border border-white/30">
            {session?.user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{session?.user?.name || "Reader"}</h1>
            <p className="opacity-80">{session?.user?.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-xs font-semibold backdrop-blur-sm">Premium Member</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={`p-4 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="font-bold text-lg text-gray-800 flex items-center gap-2">
            <Package className="text-indigo-600" /> Recent Purchases
          </h2>
          <Link href="/ebooks" className="text-sm text-indigo-600 font-semibold hover:underline">View All</Link>
        </div>
        
        <table className="w-full">
          <thead className="bg-gray-50/50">
            <tr>
              <th className="text-left p-4 text-gray-400 font-medium text-xs uppercase">Ebook</th>
              <th className="text-left p-4 text-gray-400 font-medium text-xs uppercase">Writer</th>
              <th className="text-left p-4 text-gray-400 font-medium text-xs uppercase">Price</th>
              <th className="text-center p-4 text-gray-400 font-medium text-xs uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {purchasedEbooks.length > 0 ? purchasedEbooks.map((ebook, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-semibold text-gray-800">{ebook.title}</td>
                <td className="p-4 text-gray-500">{ebook.writerName}</td>
                <td className="p-4 font-bold text-indigo-600">${parseFloat(ebook.price).toFixed(2)}</td>
                <td className="p-4 text-center">
                  <Link href={`/ebooks/${ebook._id}`} className="inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-indigo-600 hover:text-white transition-all">
                    <Eye className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            )) : (
              <tr><td colSpan={4} className="p-10 text-center text-gray-400">No purchases yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}