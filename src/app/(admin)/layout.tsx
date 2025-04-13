import { Metadata } from "next";
import React from "react";
import "./globals.css";
import UserAuthHandler from "@/components/UserAuthHandler";
import { Manrope } from "next/font/google";
import AdminSidebar from "@/components/Admin/Layout/AdminSidebar";
import AdminNavbar from "@/components/Admin/Layout/AdminNavbar";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Afo Cyber Sec Admin",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans`}>
        <UserAuthHandler>
          <AdminNavbar />
          <div className="flex lg:[--sidebar-width:15vw] bg-[#1B043A] min-h-screen">
            <AdminSidebar />
            <div className="ml-[var(--sidebar-width)] w-full bg-gray-50 min-h-[calc(100vh-4rem)]">
              {children}
            </div>
          </div>
        </UserAuthHandler>
      </body>
    </html>
  );
}
