"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import EbookTable from "@/Components/EbookTable";

export default function PurchaseHistoryPage() {
  const { data: session } = authClient.useSession();
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(
        
         `http://localhost:5000/api/dashboard/user/purchases?email=${session.user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
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
    <EbookTable
      ebooks={ebooks}
      title="📋 Purchase History"
      emptyMessage="No purchase history yet."
      showStatus={true}
    />
  );
}