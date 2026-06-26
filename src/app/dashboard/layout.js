// import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
// import { auth } from "@/lib/auth";

// import { headers } from "next/headers";


// export default async function DashboardLayout({ children }) {
  

//   return (
//     <div className="flex h-screen bg-gray-200 ">
//        <div className="flex flex-1 overflow-hidden">
         
//         <DashboardSidebar></DashboardSidebar>
//         {/* navbar */}
//         <div className="flex-1 overflow-y-auto">
            
//             <main className="p-5">
                
//                 {children}</main>
//         </div>

//        </div>
//     </div>
//   );
// }

"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signin");
      return;
    }

    if (session?.user?.role && pathname) {
      const role = session.user.role;
      
      if (role === "user" && pathname.startsWith("/dashboard/admin")) router.push("/dashboard/user");
      if (role === "writer" && pathname.startsWith("/dashboard/admin")) router.push("/dashboard/writer");
    }
  }, [isPending, session, router, pathname]);

  if (isPending) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Component handles its own responsive logic */}
      <DashboardSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 p-4 md:p-8">
        {children}
      </div>
    </div>
  );
}
