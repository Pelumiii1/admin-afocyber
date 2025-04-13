"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

export const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: userCredentials.email,
      password: userCredentials.password,
    });
    if (error) {
      setError(true);
      setLoading(false);
      return;
    }

    setError(false);
    router.push("/dashboard");
  };

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      <div className="grid space-y-2">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          name="email"
          autoComplete="email"
          value={userCredentials.email}
          onChange={handleChange}
          placeholder="Enter your email"
          type="email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B043A] focus:border-transparent transition-all duration-200 outline-none"
          required
        />
      </div>
      <div className="grid space-y-2">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            name="password"
            value={userCredentials.password}
            onChange={handleChange}
            placeholder="Enter your password"
            type={isPasswordVisible ? "text" : "password"}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1B043A] focus:border-transparent transition-all duration-200 outline-none pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isPasswordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
          Invalid email or password. Please try again.
        </div>
      )}

      <button
        type="submit"
        className={`w-full bg-[#1B043A] text-white py-3 rounded-lg font-medium transition-all duration-200 hover:bg-[#2a0655] focus:ring-2 focus:ring-[#1B043A] focus:ring-offset-2 ${
          loading ? "opacity-70 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Signing in...
          </span>
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};
