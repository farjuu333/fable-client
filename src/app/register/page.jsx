"use client";
import React, { useState } from 'react';
import { Card, Select, ListBox } from "@heroui/react";
import { Button, Form, Input, Label, TextField, FieldError, Description } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation"; 
import { FcGoogle } from "react-icons/fc";
import { FaBookOpen } from "react-icons/fa"; 
import toast from "react-hot-toast";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();
  const [passwordValue, setPasswordValue] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // BetterAuth-এর signUp.email কল করা
    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image || "",
      // BetterAuth-এ কাস্টম ডাটা হিসেবে রোল এবং ডিফল্ট প্ল্যান পাস করা
      role: user.role || "user", 
      plan: "free"
    });
    
    if (data) {
      toast.success("Registration Successful!");
      router.push('/'); // 🟢 রিকোয়ারমেন্ট অনুযায়ী সরাসরি হোমে রিডাইরেক্ট
      router.refresh();
    }
    
    if (error) {
      toast.error(error.message || "Registration failed. Please try again.");
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", // 🟢 গুগল লগইনের পর সরাসরি হোম পেজ
      });
    } catch (err) {
      toast.error("Google sign-up failed");
    }
  };

  return (
    <div className="min-h-[90vh] w-full flex items-center justify-center bg-slate-50/50 px-4 py-12">
      <Card className="bg-white px-8 py-10 rounded-[2.5rem] shadow-[0_10px_50px_rgba(0,0,0,0.03)] border border-gray-100/50 w-full max-w-[440px] flex flex-col items-center">
        
        {/* Fable Brand Logo Container */}
        <div className="w-14 h-14 rounded-2xl bg-[#48C8D0] flex items-center justify-center text-white text-2xl shadow-md shadow-cyan-200/50 mb-4">
          <FaBookOpen />
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">Register</h1>
          <p className="text-gray-400 text-sm mt-1 font-medium">Create your Fable account</p>
        </div>

        <Form onSubmit={onSubmit} className="flex flex-col gap-4 w-full">
          
          {/* 1. Full Name Field */}
          <TextField isRequired name="name" type="text" className="w-full">
            <Label className="text-sm font-bold text-gray-700 tracking-wide block mb-1">Full Name</Label>
            <Input 
              placeholder="Enter your full name" 
              className="w-full rounded-xl border-gray-200 focus-within:border-[#48C8D0] transition-colors"
            />
            <FieldError className="text-[11px] text-rose-500 mt-1 font-medium" />
          </TextField>

          {/* 2. Email Field */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-bold text-gray-700 tracking-wide block mb-1">Email</Label>
            <Input 
              placeholder="Enter your email" 
              className="w-full rounded-xl border-gray-200 focus-within:border-[#48C8D0] transition-colors"
            />
            <FieldError className="text-[11px] text-rose-500 mt-1 font-medium" />
          </TextField>

          {/* 3. Password Field */}
          <TextField
            isRequired
            name="password"
            type="password"
            className="w-full"
            onChange={(value) => setPasswordValue(value)}
            validate={(value) => {
              if (value.length < 6) return "Password must be at least 6 characters";
              if (!/[A-Z]/.test(value)) return "Must contain at least one uppercase letter";
              if (!/[0-9]/.test(value)) return "Must contain at least one number";
              return null;
            }}
          >
            <Label className="text-sm font-bold text-gray-700 tracking-wide block mb-1">Password</Label>
            <Input 
              placeholder="Enter your password" 
              className="w-full rounded-xl border-gray-200 focus-within:border-[#48C8D0] transition-colors"
            />
            <Description className="text-[11px] text-gray-400 mt-1 block leading-tight">
              Must be at least 6 characters with 1 uppercase and 1 number
            </Description>
            <FieldError className="text-[11px] text-rose-500 mt-1 font-medium" />
          </TextField>

          {/* 4. Confirm Password Field (Requirement 🟢) */}
          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            className="w-full"
            validate={(value) => {
              if (value !== passwordValue) {
                return "Passwords do not match";
              }
              return null;
            }}
          >
            <Label className="text-sm font-bold text-gray-700 tracking-wide block mb-1">Confirm Password</Label>
            <Input 
              placeholder="Re-enter your password" 
              className="w-full rounded-xl border-gray-200 focus-within:border-[#48C8D0] transition-colors"
            />
            <FieldError className="text-[11px] text-rose-500 mt-1 font-medium" />
          </TextField>

          {/* 5. Role Selection Dropdown (Requirement 🟢) */}
          <Select isRequired name="role" placeholder="Select your role" className="w-full">
            <Label className="text-sm font-bold text-gray-700 tracking-wide block mb-1">Choose Role</Label>
            <Select.Trigger className="w-full rounded-xl border-gray-200 transition-colors">
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="user" textValue="user">
                  User (Reader)
                </ListBox.Item>
                <ListBox.Item id="writer" textValue="writer">
                  Writer
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          {/* Register Button */}
          <Button 
            className="rounded-xl w-full bg-[#48C8D0] hover:bg-[#3db3bb] text-white font-bold py-6 text-sm shadow-sm transition-all mt-2" 
            type="submit"
          >
            Register
          </Button>
        </Form>

        {/* Separator Line */}
        <div className="w-full flex items-center justify-center gap-3 my-5">
          <div className="h-[1px] bg-gray-100 flex-1"></div>
          <span className="text-sm text-gray-400 font-bold uppercase tracking-wider">Or</span>
          <div className="h-[1px] bg-gray-100 flex-1"></div>
        </div>

        {/* Google Signup Button */}
        <div className="w-full">
          <Button 
            onClick={handleGoogleSignin} 
            className="w-full rounded-xl border border-gray-200 bg-white hover:bg-slate-50 flex items-center justify-center gap-2 py-6 font-bold text-gray-600 text-sm shadow-sm transition-all"
          >
            <FcGoogle className="text-lg" /> Continue with Google
          </Button>
        </div>

        {/* Already have an account Link */}
        <p className="text-center mt-6 text-sm text-gray-400 font-medium">
          Already have an account?{" "}
          <Link href="/signin" className="text-[#48C8D0] hover:underline font-bold ml-0.5">
            Login
          </Link>
        </p>

      </Card>
    </div>
  );
};

export default SignUpPage;