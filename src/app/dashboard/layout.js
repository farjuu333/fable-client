import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { auth } from "@/lib/auth";

import { headers } from "next/headers";


export default async function DashboardLayout({ children }) {
  

  return (
    <div className="flex h-screen bg-gray-200 ">
       <div className="flex flex-1 overflow-hidden">
         
        <DashboardSidebar></DashboardSidebar>
        {/* navbar */}
        <div className="flex-1 overflow-y-auto">
            
            <main className="p-5">
                
                {children}</main>
        </div>

       </div>
    </div>
  );
}
