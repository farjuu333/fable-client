"use client";
import Link from "next/link";
import { ImBook } from "react-icons/im";

export default function Footer() {
  const handleSubscribe = (e) => {
    e.preventDefault();

    alert("Thank you for subscribing to Fable Newsletter!");
    e.target.reset();
  };

  return (
    <footer className="bg-gray-300 text-black border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/">
              <div className="flex items-center gap-3 hover:opacity-90 transition-opacity">
                
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0070F3]/10 text-[#0070F3]">
                  <ImBook className="text-xl" />
                </div>
                <p className="font-black text-gray-950 tracking-tight text-xl sm:text-2xl">
                  Fable
                </p>
              </div>
            </Link>
            <p className="text-sm text-gray-800 leading-relaxed">
             A premium digital platform connecting indie ebook writers with passionate global readers.
            </p>
          </div>

          <div>
            <h3 className="text-black font-bold text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-indigo-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-indigo-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-black font-bold text-sm uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-500 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-500 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.95 4.57a10 10 0 01-2.82.77 4.96 4.96 0 002.16-2.72c-.95.55-2 .95-3.12 1.18a4.92 4.92 0 00-8.38 4.48A14 14 0 011.64 3.16a4.92 4.92 0 001.52 6.57 4.9 4.9 0 01-2.23-.61v.06a4.92 4.92 0 003.95 4.83 4.9 4.9 0 01-2.22.08 4.92 4.92 0 004.6 3.42A9.9 9.9 0 010 19.54a13.94 13.94 0 007.55 2.21c9.05 0 14-7.5 14-14 0-.21 0-.42-.01-.63A10 10 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-500 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-black font-bold text-sm uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-xs text-gray-400 mb-3">
              Stay updated with newly published ebooks.
            </p>
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                placeholder="Enter email"
                className="bg-gray-800 text-white placeholder-gray-500 text-sm px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500 w-full"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-4 py-2 rounded-lg shadow-sm transition-all whitespace-nowrap"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Fable Platform. All rights reserved.
          </p>
          <p>created for all user.</p>
        </div>
      </div>
    </footer>
  );
}