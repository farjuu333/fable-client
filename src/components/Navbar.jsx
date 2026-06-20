"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button, Dropdown } from "@heroui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { ImBook } from "react-icons/im"; // লোগো ইমেজের বদলে প্রিমিয়াম বুক আইকন
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const pathname = usePathname();
  
  // ড্যাশবোর্ড পেজগুলোতে নেভবার হাইড রাখার লজিক
  if (pathname.includes("dashboard")) {
    return null;
  }

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  // অ্যাক্টিভ রাউট হাইলাইট করার কন্ডিশনাল ক্লাস
  const getLinkClassName = (path) => {
    return pathname === path
      ? "font-bold text-[#0070F3] transition-colors text-sm"
      : "font-semibold text-gray-600 hover:text-[#0070F3] transition-colors text-sm";
  };

  return (
    <div className="w-full bg-white">
      {/* 🌟 আকর্ষণীয় ও প্রিমিয়াম Marquee সেকশন */}
      <div className="bg-[#0070F3] py-2.5  text-sm font-bold shadow-sm">
        <marquee scrollamount="5" className="tracking-wide">
          ✨ Welcome to Fable! Discover & Read Original Ebooks from Talented Global Writers 📚 | ✍️ Join as a Writer, Publish Your Masterpiece with Secure One-Time Verification Pay 🚀 | 💳 Fast, Safe & Seamless Transactions Powered by Stripe Gateway!
        </marquee>
      </div>

      {/* মেইন নেভিগেশন */}
      <nav className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          
          {/* লেফট সাইড: হ্যামবার্গার মেনু এবং ভেক্টর লোগো */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            <Link href="/">
              <div className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                {/* ইমেজ ফাইলের ঝামেলা ছাড়া স্টাইলিশ বুক আইকন লোগো */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0070F3]/10 text-[#0070F3]">
                  <ImBook className="text-xl" />
                </div>
                <p className="font-black text-gray-950 tracking-tight text-xl sm:text-2xl">
                  Fable
                </p>
              </div>
            </Link>
          </div>

          {/* সেন্টার লিঙ্ক (প্রোপার গ্যাপ ও রাউট হাইলাইটিং) */}
          <ul className="hidden items-center gap-8 md:flex">
            <li>
              <Link href="/" className={getLinkClassName("/")}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className={getLinkClassName("/products")}>
                Browse Ebooks
              </Link>
            </li>
            {user && (
              <li>
                <Link href={`/dashboard/${user?.role}`} className={getLinkClassName(`/dashboard/${user?.role}`)}>
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          {/* রাইট সাইড: অথেনটিকেশন একশন */}
          <div className="hidden items-center gap-6 md:flex">
            {!user ? (
              <>
                <Link 
                  href="/signin" 
                  className="text-sm font-bold text-gray-600 hover:text-[#0070F3] transition-colors"
                >
                  Sign In
                </Link>
                {/* ৪MD ফিক্স করার জন্য রাউটটি /signup থেকে /register এ পরিবর্তন করা হয়েছে */}
                <Link href="/register">
                  <Button className="rounded-full bg-[#0070F3] text-white hover:bg-[#0062d1] font-bold px-6 text-sm h-11 tracking-wide shadow-md shadow-[#0070F3]/20 transition-all">
                    Get Started
                  </Button>
                </Link>
              </>
            ) : (
              <Dropdown>
                <Dropdown.Trigger className="rounded-full cursor-pointer focus:outline-none">
                  <Avatar size="sm" className="w-9 h-9 transition-transform border-2 border-[#0070F3]/20">
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user?.name || "User"}
                      src={user?.image}
                    />
                    <Avatar.Fallback className="bg-[#0070F3]/10 text-[#0070F3] font-bold">
                      {user?.name?.charAt(0) || "U"}
                    </Avatar.Fallback>
                  </Avatar>
                </Dropdown.Trigger>
                <Dropdown.Popover className="border border-gray-100 shadow-xl rounded-2xl bg-white p-1">
                  <div className="px-4 pt-3 pb-2.5 border-b border-gray-100 mb-1">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" className="w-8 h-8">
                        <Avatar.Image alt={user?.name} src={user?.image} />
                        <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-xs font-bold text-gray-900 leading-tight">
                          {user?.name}
                        </p>
                        <p className="text-[10px] text-gray-400 font-medium leading-none mt-1">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
                    <Dropdown.Item id="dashboard" textValue="Dashboard" className="rounded-xl">
                      <Link
                        className="flex items-center gap-2.5 w-full text-gray-700 text-xs font-semibold py-1"
                        href={`/dashboard/${user?.role || "user"}`}
                      >
                        <MdDashboard className="text-gray-400 text-sm" />
                        <span>Dashboard</span>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item id="profile" textValue="Profile" className="rounded-xl">
                      <Link 
                        href="/profile" 
                        className="flex items-center gap-2.5 w-full text-gray-700 text-xs font-semibold py-1"
                      >
                        <CgProfile className="text-gray-400 text-sm" />
                        <span>Profile</span>
                      </Link>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="logout"
                      textValue="Logout"
                      variant="danger"
                      className="rounded-xl text-red-500 hover:bg-red-50"
                      onClick={handleSignOut}
                    >
                      <div className="flex items-center gap-2.5 w-full text-xs font-semibold py-1">
                        <BiLogOut className="text-sm" />
                        <span>Logout</span>
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            )}
          </div>
        </header>

        {/* মোবাইল রেস্পন্সিভ ড্রয়ার মেনু */}
        {isMenuOpen && (
          <div className="border-t border-gray-100 bg-white md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <ul className="flex flex-col gap-1 p-4">
              <li>
                <Link 
                  href="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2.5 px-3 text-sm font-bold rounded-xl hover:bg-gray-50 text-gray-700"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/products" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2.5 px-3 text-sm font-bold rounded-xl hover:bg-gray-50 text-gray-700"
                >
                  Browse Ebooks
                </Link>
              </li>
              {user && (
                <li>
                  <Link 
                    href={`/dashboard/${user?.role}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2.5 px-3 text-sm font-bold rounded-xl hover:bg-gray-50 text-gray-700"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              
              {!user ? (
                <li className="mt-2 flex flex-col gap-2 border-t border-gray-100 pt-3">
                  <Link 
                    href="/signin" 
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-center py-2.5 px-3 text-sm font-bold rounded-xl hover:bg-gray-50 text-gray-700"
                  >
                    Login
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full rounded-xl bg-[#0070F3] text-white hover:bg-[#0062d1] font-bold text-sm py-3 shadow-md shadow-[#0070F3]/10">
                      Get Started
                    </Button>
                  </Link>
                </li>
              ) : (
                <li className="mt-2 flex flex-col gap-1 border-t border-gray-100 pt-3">
                  <button 
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2.5 py-2.5 px-3 text-sm font-bold rounded-xl hover:bg-red-50 text-red-600 text-left w-full"
                  >
                    <BiLogOut /> Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;