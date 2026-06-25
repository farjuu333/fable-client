import React from 'react';
import { Card,Button } from "@heroui/react"; // CardBody বাদ দেওয়া হয়েছে
import Link from 'next/link';
import Image from 'next/image';

export default function BookCard({ book }) {
    console.log("Book Data:", book);
  return (
    <Card className="bg-[#121214] border border-zinc-800 p-4 hover:border-zinc-600 transition-all rounded-xl shadow-lg">
      {/* ইমেজের অংশ */}
      {/* <div className="aspect-[3/4] w-full overflow-hidden rounded-lg mb-4">
        <Image
          src={book.coverImage} 
          alt={book.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
      </div> */}
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg mb-4">
        <Image
          src={book.coverImage || '/default-book.png'} // ইমেজ না থাকলে একটি ডিফল্ট ইমেজ দেখাবে
          alt={book.title} 
          fill // এটি ব্যবহার করলে ইমেজটি প্যারেন্ট ডিভের সাইজ অনুযায়ী নিজে সেট হয়ে যাবে
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 hover:scale-105" 
        />
      </div>

      {/* বইয়ের তথ্য */}
      <div className="flex flex-col gap-2">
        <h3 className="text-white font-bold text-lg truncate">{book.title}</h3>
        <p className="text-zinc-400 text-sm">by {book.writerName}</p>
        
        {/* Genre যুক্ত করা হলো */}
        <div className="flex items-center gap-2 mt-1">
          <span className="bg-zinc-800 text-zinc-300 text-[10px] px-2 py-1 rounded uppercase tracking-wider">
            {book.genre || "N/A"}
          </span>
        </div>
      </div>

      {/* প্রাইস এবং স্ট্যাটাস */}
      <div className="flex justify-between items-center my-4">
        <span className="text-white font-bold text-xl">${book.price}</span>
        {book.status && (
          <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded border border-red-500/50">
            {book.status}
          </span>
        )}
      </div>

      {/* বাটন */}
      <Link href={`/ebook/${book._id}`}>
        <Button className="w-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors">
          View Details
        </Button>
      </Link>
    </Card>
  );
}