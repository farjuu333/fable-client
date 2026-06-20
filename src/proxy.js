// import { NextResponse } from "next/server";
// import { auth } from "./lib/auth";
// import { headers } from "next/headers"; 

// export async function proxy(request) {
//    const session = await auth.api.getSession({
//     headers: await headers()
//    }) 

//    if(session?.user?.role == "user" && session?.user?.plan === "free") {
//     return NextResponse.redirect(new URL('/pricing', request.url))
//    }

//    if(!session){
//     return NextResponse.redirect(new URL('/signin', request.url))
//    }

// }

// export const config = {
//     matcher: ['/profile', '/dashboard/user']
// }

import { NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers"; 

// 🟢 নাম 'middleware' হতে হবে এবং export default করতে হবে
export default async function proxy(request) {
   const session = await auth.api.getSession({
     headers: await headers()
   });

   const { pathname } = request.nextUrl;

   // 🟢 যদি সেশন না থাকে এবং ইউজার প্রোফাইল বা ড্যাশবোর্ডে যাওয়ার চেষ্টা করে, তবে সাইন-ইন এ পাঠাবে
   if (!session) {
     return NextResponse.redirect(new URL('/login', request.url));
   }

   // আপনার প্রোজেক্টের রিকোয়ারমেন্ট অনুযায়ী ফ্রি প্ল্যান ইউজারদের প্রিসিং পেজে পাঠানো
   if (session?.user?.role === "user" && session?.user?.plan === "free") {
     return NextResponse.redirect(new URL('/pricing', request.url));
   }

   return NextResponse.next();
}

export const config = {
   // যেসব রাউট সুরক্ষিত রাখতে চান শুধু সেগুলো এখানে থাকবে
   matcher: ['/profile', '/dashboard/user/:path*', '/dashboard/writer/:path*']
};