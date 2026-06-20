"use client";

import React, { useState } from "react";
import { Button, Input, Label, TextField, FieldError, Form } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import Link from "next/link";

export default function LogInPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("Reader");
  const [showPassword, setShowPassword] = useState(false);

  const roles = ["Reader", "Writer", "Admin"];

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(formData.entries());

    if (selectedRole === "Admin") {
      if (email === "admin@fable.com" && password === "Admin@123") {
        toast.success("Admin Login Successful!");
        router.push("/dashboard/admin"); 
        router.refresh();
        return;
      } else {
        toast.error("Invalid Admin Credentials!");
        return;
      }
    }

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (data) {
      toast.success(`${selectedRole} Login Successful!`);
      if (selectedRole === "Writer") {
        router.push("/dashboard/writer");
      } else {
        router.push("/"); 
      }
      router.refresh();
    }

    if (error) {
      toast.error(error.message || "Invalid email or password.");
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    } catch (err) {
      toast.error("Google sign-in failed");
    }
  };

  return (
    // এই ডিভটি পুরো পেজটিকে কভার করবে এবং কার্ডটিকে স্ক্রিনের একদম মাঝখানে (center) ধরে রাখবে
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-transparent px-4 py-10">
      
      {/* হুবহু স্ক্রিনশটের মতো ফিক্সড ছোট সাইজের কার্ড (w-[350px] দিয়ে লক করা) */}
      <div className="bg-white p-6 sm:p-7 rounded-[2rem] border border-gray-200/80 w-[350px] flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.03)] mx-auto box-border">
        
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">Welcome back</h1>
          <p className="text-gray-400 text-xs mt-1 font-medium">Enter your credentials to access your account</p>
        </div>

        {/* Role Selection Buttons (১ লাইনে পাশাপাশি সুন্দর ছোট সাইজ) */}
        <div className="flex flex-row bg-gray-100 p-1 rounded-xl gap-1 w-full mb-5 border border-gray-200/60 box-border">
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setSelectedRole(role)}
              className={`flex-1 py-1.5 px-0.5 text-[10px] font-bold rounded-lg transition-all text-center whitespace-nowrap overflow-hidden text-ellipsis ${
                selectedRole === role
                  ? "bg-white text-[#0070F3] border border-[#0070F3]/20 shadow-sm"
                  : "text-gray-500 hover:text-[#0070F3] hover:bg-gray-50"
              }`}
            >
              Login as {role}
            </button>
          ))}
        </div>

        {/* Form Elements */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-4 w-full box-border">
          
          {/* Email Field */}
          <TextField isRequired name="email" className="w-full">
            <Label className="text-xs font-bold text-gray-700 tracking-wide block mb-1">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <div className="relative flex items-center w-full box-border">
              <span className="absolute left-3.5 text-gray-400 text-xs font-semibold z-10 select-none">@</span>
              <Input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl pl-8 pr-4 bg-gray-50/50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm py-2.5 outline-none focus:outline-none focus:border-[#0070F3] focus:ring-1 focus:ring-[#0070F3] transition-colors shadow-none box-border"
              />
            </div>
            <FieldError className="text-[10px] text-red-500 mt-1 font-medium" />
          </TextField>

          {/* Password Field */}
          <TextField isRequired name="password" className="w-full">
            <Label className="text-xs font-bold text-gray-700 tracking-wide block mb-1">
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative flex items-center w-full box-border">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full rounded-xl pl-4 pr-10 bg-gray-50/50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm py-2.5 outline-none focus:outline-none focus:border-[#0070F3] focus:ring-1 focus:ring-[#0070F3] transition-colors shadow-none box-border"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-gray-600 z-10"
              >
                {showPassword ? <IoEyeOffOutline size={15} /> : <IoEyeOutline size={15} />}
              </button>
            </div>
            <FieldError className="text-[10px] text-red-500 mt-1 font-medium" />
          </TextField>

          {/* Sign In Button */}
          <Button
            className="rounded-xl w-full bg-[#0070F3] hover:bg-[#0062d1] text-white font-bold py-3.5 text-xs tracking-wide shadow-sm transition-all mt-1"
            type="submit"
          >
            Sign In
          </Button>
        </Form>

        {/* Google Sign In Divider */}
        {selectedRole !== "Admin" && (
          <>
            <div className="w-full flex items-center justify-center gap-3 my-4 box-border">
              <div className="h-[1px] bg-gray-200/80 flex-1"></div>
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Or</span>
              <div className="h-[1px] bg-gray-200/80 flex-1"></div>
            </div>

            <div className="w-full box-border">
              <Button
                onClick={handleGoogleSignin}
                className="w-full rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 flex items-center justify-center gap-2 py-3.5 font-bold text-xs transition-all shadow-sm"
              >
                <FcGoogle className="text-sm" /> Continue with Google
              </Button>
            </div>
          </>
        )}

        {/* Footer Link */}
        <p className="text-center mt-5 text-[11px] text-gray-400 font-medium">
          New to Fable?{" "}
          <Link href="/register" className="text-[#0070F3] hover:underline font-bold ml-0.5">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}