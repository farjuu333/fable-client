// import { auth } from "@/lib/auth"; 
// import { headers } from "next/headers"; 

// import { LayoutSideContentLeft, Bell, Envelope, Gear, House, Magnifier, Person, Bookmark, FileText, CreditCard } from "@gravity-ui/icons";


// import { LayoutDashboard, BookOpen, PlusCircle, TrendingUp, Users, User, Building, Settings } from "lucide-react";
// import { Button, Drawer } from "@heroui/react";
// import Link from "next/link";

// export async function DashboardSidebar() {
    
//     const session = await auth.api.getSession({
//         headers: await headers(),
//     });

//     const user = session?.user;
//     const role = user?.role || "user"; 
//     console.log(role)

//     const userNavLinks = [
//         { icon: LayoutDashboard, href: "/dashboard/user", label: "Overview" },
//         { icon: BookOpen, href: "/dashboard/user/purchases", label: "Purchase History" },
//         { icon: BookOpen, href: "/dashboard/user/purchased-ebooks", label: "Purchased Ebooks" },
//         { icon: Bookmark, href: "/dashboard/user/bookmarks", label: "Bookmarked" },
        
//     ];

//     const writerNavLinks = [
//         { icon: LayoutDashboard, href: "/dashboard/writer", label: "Overview" },
//         { icon: BookOpen, href: "/dashboard/writer/manage", label: "Manage Ebooks" },
//         { icon: PlusCircle, href: "/dashboard/writer/manage/add", label: "Add a book" },
//         { icon: Bookmark, href: "/dashboard/writer/bookmarks", label: "Bookmarked" },
//         { icon: TrendingUp, href: "/dashboard/writer/sales", label: "Sales History" },
//     ];

//     const adminNavLinks = [
//         { icon: LayoutDashboard, href: "/dashboard/admin", label: "Overview" },
//         { icon: Users, href: "/dashboard/admin/users", label: "Manage Users" },
//         { icon: BookOpen, href: "/dashboard/admin/ebooks", label: "Manage Ebooks" },
//         { icon: TrendingUp, href: "/dashboard/admin/transactions", label: "Transactions" },
//     ];

//     const navLinksMap = {
//         user: userNavLinks,
//         writer: writerNavLinks,
//         admin: adminNavLinks
//     };
// console.log("Current User Role:", role);
//     const navItems = navLinksMap[role] || userNavLinks;
//     // const navItems = navLinksMap[user?.role] || "reader";

//     const navContent = (
//         <nav className="flex flex-col gap-1">
//             {navItems.map((item) => (
//                 <Link
//                     key={item.label}
//                     className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
//                     href={item.href}
//                 >
//                     <item.icon className="size-5 text-muted" />
//                     {item.label}
//                 </Link>
//             ))}
//         </nav>
//     );

//     return (
//         <>
//             <aside className="lg:block w-64 shrink-0 border-r border-default p-4 ">
//                 {navContent}
//             </aside>
            
           
//              <Drawer>
//                 <Button className={"hidden"} variant="secondary"><LayoutSideContentLeft></LayoutSideContentLeft> Sidebar</Button>
                    
//                 <Drawer.Backdrop>
//                     <Drawer.Content placement="left">
//                         <Drawer.Dialog>
//                             <Drawer.CloseTrigger />
//                             <Drawer.Header>
//                                 <Drawer.Heading>Navigation</Drawer.Heading>
//                             </Drawer.Header>
//                             <Drawer.Body>
//                                 {navContent}
//                             </Drawer.Body>
//                         </Drawer.Dialog>
//                     </Drawer.Content>
//                 </Drawer.Backdrop>
//             </Drawer>
           
//         </>
//     );
    

//   }
"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, PlusCircle, TrendingUp, Users, Bookmark, ShoppingBag, Menu } from "lucide-react";
import { Button, Drawer, DrawerContent, DrawerTrigger, DrawerHeader, DrawerBody } from "@heroui/react";

export function DashboardSidebar() {
    const { data: session } = authClient.useSession();
    const pathname = usePathname();
    const role = session?.user?.role || "user";

    const navLinksMap = {
        user: [
            { icon: LayoutDashboard, href: "/dashboard/user", label: "Overview" },
            { icon: ShoppingBag, href: "/dashboard/user/purchases", label: "Purchase History" },
            { icon: BookOpen, href: "/dashboard/user/my-ebooks", label: "My Ebooks" },
            { icon: Bookmark, href: "/dashboard/user/bookmarks", label: "Bookmarked" },
        ],
        writer: [
            { icon: LayoutDashboard, href: "/dashboard/writer", label: "Overview" },
            { icon: BookOpen, href: "/dashboard/writer/ebooks", label: "My Ebooks" },
            { icon: PlusCircle, href: "/dashboard/writer/manage/add", label: "Add Ebook" },
            { icon: TrendingUp, href: "/dashboard/writer/sales", label: "Sales History" },
        ],
        admin: [
            { icon: LayoutDashboard, href: "/dashboard/admin", label: "Overview" },
            { icon: Users, href: "/dashboard/admin/users", label: "Manage Users" },
            { icon: BookOpen, href: "/dashboard/admin/ebooks", label: "All Ebooks" },
        ]
    };

    const navItems = navLinksMap[role] || navLinksMap.user;

    const NavList = () => (
        <nav className="flex flex-col gap-1 p-2">
            {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                            isActive 
                            ? "bg-indigo-600 text-white shadow-md" 
                            : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                        }`}
                    >
                        <item.icon className="size-5" />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* ডেস্কটপ সাইডবার */}
            <aside className="hidden lg:block w-64 border-r border-gray-200 h-screen bg-white fixed left-0 top-0 overflow-y-auto">
                <div className="p-6 font-bold text-xl text-indigo-600">Fable Dashboard</div>
                <NavList />
            </aside>

            {/* মোবাইল মেনু বাটন ও ড্রয়ার */}
            <div className="lg:hidden p-4 bg-white border-b flex items-center justify-between sticky top-0 z-50">
                <span className="font-bold text-indigo-600">Fable</span>
                <Drawer placement="left">
                    <DrawerTrigger asChild>
                        <Button variant="flat" isIconOnly><Menu /></Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>Menu</DrawerHeader>
                        <DrawerBody>
                            <NavList />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    );
}