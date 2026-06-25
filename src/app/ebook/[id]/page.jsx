"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from "@heroui/react";
import { loadStripe } from '@stripe/stripe-js';
import { authClient } from '@/lib/auth-client';




// স্কিলেটন লোডার কম্পোনেন্ট
const SkeletonLoader = () => (
  <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 animate-pulse">
    <div className="w-full md:w-1/3 h-96 bg-zinc-800 rounded-xl"></div>
    <div className="w-full md:w-2/3 flex flex-col gap-4">
      <div className="h-10 bg-zinc-800 rounded w-3/4"></div>
      <div className="h-6 bg-zinc-800 rounded w-1/2"></div>
      <div className="h-4 bg-zinc-800 rounded w-full"></div>
      <div className="h-4 bg-zinc-800 rounded w-full"></div>
      <div className="h-10 bg-zinc-800 rounded w-1/4"></div>
    </div>
  </div>
);

export default function EbookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

// const { data: session } = authClient.useSession();
//   const userId = session?.user?.id;

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/books/${id}`)
      .then(res => res.json())
      .then(data => {
        setBook(data);
        setLoading(false);});
      }, [id]);




  if (loading) return <div className="text-center py-20 text-white"><SkeletonLoader /></div>;
  if (!book) return <div className="text-center py-20 text-white">Ebook not found.</div>;

  return (
    <div className="min-h-screen bg-[#0d0d0e] p-8 text-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10">
        
        {/* Left: Cover Image */}
        <div className="w-full md:w-1/3">
          <img src={book.coverImage} alt={book.title} className="w-full rounded-xl shadow-2xl border border-zinc-700" />
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <h1 className="text-4xl font-bold">{book.title}</h1>
          <p className="text-lg text-zinc-400">
            By <a href={`/writer/${book.writerEmail}`} className="text-blue-400 hover:underline">{book.writerName}</a>
          </p>
          
          <div className="flex gap-4">
            <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">{book.genre}</span>
            <span className={`px-3 py-1 rounded-full text-sm ${book.status === 'Available' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
              {book.status}
            </span>
          </div>

          <p className="text-2xl font-semibold text-emerald-400">${book.price}</p>
          <p className="text-zinc-300 leading-relaxed">{book.description}</p>
          {/* <p className="text-sm text-zinc-500">Uploaded on: {new Date(book.uploadDate).toLocaleDateString()}</p> */}
          {/* <p className="text-sm text-zinc-500">
  Uploaded on: {book._id ? new Date(parseInt(book._id.substring(0, 8), 16) * 1000).toLocaleDateString() : "Date not available"}
</p> */}
{/* নিরাপদ তারিখ ফরম্যাটিং */}
{/* new add */}
          {book._id && (
            <p className="text-sm text-zinc-500">
              Uploaded on: {new Date(parseInt(book._id.substring(0, 8), 16) * 1000).toLocaleDateString()}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-4">
            {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8"onClick={handlePurchase} >
              Purchase Now
            </Button> */}
            <form action="/api/checkout_sessions" method="POST">
            <input name="bookId" value={book._id}></input>
      <section>
        <button type="submit" role="link">
          Purchase Now
        </button>
      </section>
    </form>
            <Button variant="bordered" className="text-white border-zinc-600 hover:bg-zinc-800">
              Bookmark
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 
