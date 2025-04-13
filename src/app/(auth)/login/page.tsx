import { LoginForm } from "@/components/LoginForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="bg-gradient-to-br from-[#1B043A] to-[#2a0655] min-h-screen">
      <div className="pt-5 h-[7vh] md:h-[15vh]">
        <Link href="/" className="p-5  text-white flex items-center gap-3">
          <ArrowLeft />
          Back
        </Link>
      </div>

      <div className="h-[80vh] flex items-center justify-center  p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
              <p className="mt-2 text-sm text-gray-600">
                Please sign in to your account
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
