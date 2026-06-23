"use client";
import BookCard from '@/components/BookCard';
import React, { useEffect, useState } from 'react';


export default function BrowseBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/all-books`)
      .then(res => res.json())
      .then(data => {
        setBooks(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-20 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0d0d0e] p-8">
      <h1 className="text-3xl text-white font-bold mb-8">Browse Books</h1>
      
      {/* Responsive Grid: 2 mobile, 3 tablet, 4 desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.length > 0 ? (
          books.map(book => <BookCard key={book._id} book={book} />)
        ) : (
          <p className="text-zinc-500 col-span-full text-center">No ebooks found.</p>
        )}
      </div>
    </div>
  );
}