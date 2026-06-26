"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";

export default function SalesHistoryPage() {
  const { data: session } = authClient.useSession();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(
        `http://localhost:5000/api/dashboard/writer/sales?writerEmail=${session.user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setSales(Array.isArray(data) ? data : []);
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

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.price, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">💰 Sales History</h1>
          <p className="text-gray-500 text-sm mt-1">Ebooks you’ve sold</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-indigo-600">
            ${totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Sold Ebooks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left p-3 font-medium">Ebook</th>
                <th className="text-left p-3 font-medium">Buyer Email</th>
                <th className="text-left p-3 font-medium">Price</th>
                <th className="text-left p-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {sales.length > 0 ? (
                sales.map((sale, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-50 hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium text-gray-900">
                      {sale.title}
                    </td>
                    <td className="p-3 text-gray-500">{sale.buyerEmail}</td>
                    <td className="p-3 text-indigo-600 font-semibold">
                      ${sale.price}
                    </td>
                    <td className="p-3 text-gray-500">
                      {new Date(
                        sale.updatedAt || sale.createdAt,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-gray-400">
                    No sales yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}