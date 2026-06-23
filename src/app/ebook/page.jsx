// "use client";
// import BookCard from '@/components/BookCard';
// import React, { useEffect, useState } from 'react';


// export default function BrowseBooks() {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/all-books`)
//       .then(res => res.json())
//       .then(data => {
//         setBooks(data);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="text-center py-20 text-white">Loading...</div>;

//   return (
//     <div className="min-h-screen bg-[#0d0d0e] p-8">
//       <h1 className="text-3xl text-white font-bold mb-8">Browse Books</h1>
      
//       {/* Responsive Grid: 2 mobile, 3 tablet, 4 desktop */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {books.length > 0 ? (
//           books.map(book => <BookCard key={book._id} book={book} />)
//         ) : (
//           <p className="text-zinc-500 col-span-full text-center">No ebooks found.</p>
//         )}
//       </div>
//     </div>
//   );
// } 
"use client";
import BookCard from '@/components/BookCard';
import React, { useEffect, useState } from 'react';
import { Select, SelectItem, Input, Button } from "@heroui/react";

export default function BrowseBooks() {
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // ফিল্টার স্টেট
  const [params, setParams] = useState({ 
    search: '', genre: '', sort: 'newest', page: 1, status: '' 
  });

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams(params).toString();
    console.log("Fetching URL:", `${process.env.NEXT_PUBLIC_API_URL}/api/all-books?${query}`);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/all-books?${query}`)
      .then(res => res.json())
      .then(data => {
        console.log("API Response Data:", data); // এটি দিয়ে চেক করুন সার্ভার থেকে কি ডাটা আসছে
        setBooks(data.books || []);
        // new add
        const total = data.totalPages || 1;
        // old
        setTotalPages(data.totalPages || 0);
        // new add
        if (params.page > total) {
        setParams(prev => ({ ...prev, page: total }));
      }
      // old
        setLoading(false);
      });
  }, [params]);

  // const handleFilter = (key, value) => {
  //   setParams(prev => ({ ...prev, [key]: value, page: 1 }));
  // };
const handleFilter = (key, value) => {
    setParams(prev => {
      // যদি পেজ পরিবর্তন করি, তবে শুধু পেজ আপডেট হবে
      if (key === 'page') {
        return { ...prev, page: value };
      }
      // অন্য ফিল্টার পরিবর্তন করলে পেজ ১ এ ফিরে যাবে
      return { ...prev, [key]: value, page: 1 };
    });
  };

  return (
    <div className="min-h-screen bg-[#0d0d0e] p-8">
      <h1 className="text-3xl text-white font-bold mb-8">Browse Ebooks</h1>

      {/* সার্চ এবং ফিল্টার বার */}
      <div className="flex flex-wrap gap-4 mb-8 bg-[#121214] p-4 rounded-xl border border-zinc-800">
        <Input 
          placeholder="Search by title or writer..." 
          className="w-full md:w-64"
          onChange={(e) => handleFilter('search', e.target.value)}
        />
        <select className="bg-[#1c1c1e] text-white p-2 rounded-lg" onChange={(e) => handleFilter('sort', e.target.value)}>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
        <select className="bg-[#1c1c1e] text-white p-2 rounded-lg" onChange={(e) => handleFilter('status', e.target.value)}>
          <option value="">All Status</option>
          <option value="Published">Published</option>
          <option value="Sold">Sold</option>
        </select>
      </div>

      {/* বুক গ্রিড */}
      {loading ? (
        <div className="text-center py-20 text-white">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.length > 0 ? (
            books.map(book => <BookCard key={book._id} book={book} />)
          ) : (
            <p className="text-zinc-500 col-span-full text-center">No ebooks found.</p>
          )}
        </div>
      )}

      
      {/* <div className="flex justify-center items-center gap-4 mt-12">
        <Button disabled={params.page === 1} onClick={() => handleFilter('page', params.page - 1)}>Previous</Button>
        <span className="text-white">Page {params.page} of {totalPages}</span>
        <Button disabled={params.page >= totalPages} onClick={() => handleFilter('page', params.page + 1)}>Next</Button>
      </div> */}

      <div className="flex justify-center items-center gap-4 mt-12">
  <Button 
    // disabled={params.page <= 1} 
    disabled={params.page === 1}
    onClick={() => handleFilter('page', Math.max(1, params.page - 1))}
  >
    Previous
  </Button>
  
  <span className="text-white">Page {params.page} of {totalPages}</span>
  
  <Button 
    // disabled={params.page >= totalPages || totalPages === 0} 
    disabled={params.page >= totalPages || totalPages === 0}
    onClick={() => handleFilter('page', params.page + 1)}
  >
    Next
  </Button>
</div>
    </div>
  );
}