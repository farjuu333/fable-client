// 'use client';
// import { useSession } from "@/lib/auth-client";
 

// const WriterDashboardPage = () => {
//     const { data: session, isPending } = useSession();

//     if (isPending) {
//         return <div>Loading...</div>
//     }
//      const user = session?.user;
//     console.log("Session data in RecruiterDashboardHomePage:", session);

//     return (
//         <div>
//             <h2 className="text-4xl">Welcome back, {user?.name}</h2>
//         </div>
//     );
// };

// export default WriterDashboardPage;

'use client';
import React from 'react';
import { useSession } from "@/lib/auth-client";

// Gravity UI icons
import { BookOpen, CreditCard, Bookmark,ArrowUpRightFromSquare} from '@gravity-ui/icons';

import { DashboardStats } from '@/components/dashboard/DashboardStats';

const WriterDashboardPage = () => {
    const { data: session, isPending } = useSession();

    if (isPending) return <div>Loading...</div>;

    // Writer dashboard stats
    const writerStats = [
        { title: "Published Stories", value: "12", icon: BookOpen },
        { title: "Total Sales", value: "485", icon: CreditCard },
        { title: "Bookmarks", value: "1,204", icon: Bookmark },
        { title: "Revenue", value: "$3,420", icon: ArrowUpRightFromSquare },
    ];

    const user = session?.user;

    return (
        <div className="p-6 space-y-8">
            <div>
                <h2 className="text-3xl font-bold">Welcome back, {user?.name} 👋</h2>
                <p className="text-neutral-400 mt-1">Manage your stories, track your growth, and connect with your readers.</p>
            </div>
            
            <DashboardStats statsData={writerStats} />
            
            {/* এখানে আপনি Activity Feed বা অন্যান্য সেকশন যোগ করতে পারবেন */}
        </div>
    );
};

export default WriterDashboardPage;