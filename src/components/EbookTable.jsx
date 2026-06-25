"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

export default function EbookTable({
  ebooks,
  title,
  emptyMessage,
  showStatus = true,
}) {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Your Ebooks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left p-3 font-medium">Ebook</th>
                <th className="text-left p-3 font-medium">Writer</th>
                <th className="text-left p-3 font-medium">Price</th>
                <th className="text-left p-3 font-medium">Date</th>
                {showStatus && (
                  <th className="text-left p-3 font-medium">Status</th>
                )}
                <th className="text-left p-3 font-medium">View</th>
              </tr>
            </thead>
            <tbody>
              {ebooks.length > 0 ? (
                ebooks.map((ebook, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-50 hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium text-gray-900">
                      {ebook.title}
                    </td>
                    <td className="p-3 text-gray-500">{ebook.writerName}</td>
                    <td className="p-3 font-semibold text-indigo-600">
                      ${ebook.price}
                    </td>
                    <td className="p-3 text-gray-500">
                      {formatDate(ebook.createdAt)}
                    </td>
                    {showStatus && (
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                          Purchased
                        </span>
                      </td>
                    )}
                    <td className="p-3">
                      <Link
                        href={`/ebooks/${ebook._id}`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={showStatus ? 6 : 5}
                    className="p-6 text-center text-gray-400"
                  >
                    {emptyMessage}{" "}
                    <Link
                      href="/ebook"
                      className="text-indigo-600 hover:underline"
                    >
                      Browse Ebooks
                    </Link>
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