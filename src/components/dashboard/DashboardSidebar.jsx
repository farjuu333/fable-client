import { auth } from "@/lib/auth"; 
import { headers } from "next/headers"; 

import { LayoutSideContentLeft, Bell, Envelope, Gear, House, Magnifier, Person, Bookmark, FileText, CreditCard } from "@gravity-ui/icons";


import { LayoutDashboard, BookOpen, PlusCircle, TrendingUp, Users, User, Building, Settings } from "lucide-react";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export async function DashboardSidebar() {
    
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;
    const role = user?.role || "user"; 

    const userNavLinks = [
        { icon: LayoutDashboard, href: "/dashboard/user", label: "Overview" },
        { icon: BookOpen, href: "/dashboard/user/history", label: "Purchase History" },
        { icon: BookOpen, href: "/dashboard/user/purchased", label: "Purchased Ebooks" },
        { icon: Bookmark, href: "/dashboard/user/bookmarks", label: "Bookmarked" },
        { icon: User, href: "/dashboard/user/profile", label: "Profile" },
    ];

    const writerNavLinks = [
        { icon: LayoutDashboard, href: "/dashboard/writer", label: "Overview" },
        { icon: BookOpen, href: "/dashboard/writer/manage", label: "Manage Ebooks" },
        { icon: PlusCircle, href: "/dashboard/writer/manage/add", label: "Add a book" },
        { icon: Bookmark, href: "/dashboard/writer/bookmarks", label: "Bookmarked" },
        { icon: TrendingUp, href: "/dashboard/writer/sales", label: "Sales History" },
    ];

    const adminNavLinks = [
        { icon: LayoutDashboard, href: "/dashboard/admin", label: "Overview" },
        { icon: Users, href: "/dashboard/admin/users", label: "Manage Users" },
        { icon: BookOpen, href: "/dashboard/admin/ebooks", label: "Manage Ebooks" },
        { icon: TrendingUp, href: "/dashboard/admin/transactions", label: "Transactions" },
    ];

    const navLinksMap = {
        user: userNavLinks,
        writer: writerNavLinks,
        admin: adminNavLinks
    };
console.log("Current User Role:", role);
    const navItems = navLinksMap[role] || userNavLinks;
    // const navItems = navLinksMap[user?.role] || "reader";

    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
                <Link
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    href={item.href}
                >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                </Link>
            ))}
        </nav>
    );

    return (
        <>
            <aside className="lg:block w-64 shrink-0 border-r border-default p-4 ">
                {navContent}
            </aside>
            
           
             <Drawer>
                <Button className={"hidden"} variant="secondary"><LayoutSideContentLeft></LayoutSideContentLeft> Sidebar</Button>
                    
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navContent}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
           
        </>
    );
    

  }

