"use client";
import Link from "next/link";
import { FaLock } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 text-center">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <h2 className="text-xl font-bold text-white mb-2">বাহারি পিঠা ঘর</h2>
        <p className="text-sm mb-4">ঐতিহ্যবাহী সুস্বাদু পিঠার বিশ্বস্ত ঠিকানা।</p>
        
        <div className="border-t border-gray-700 w-full max-w-md my-4"></div>
        
        <div className="flex justify-between items-center w-full max-w-md text-xs text-gray-500">
          <p>© 2026 বাহারি পিঠা ঘর. All rights reserved.</p>
          
          {/* এডমিন লগিন পেজে যাওয়ার ছোট্ট সিক্রেট লিংক */}
          <Link href="/admin" className="hover:text-white flex items-center gap-1 transition">
            <FaLock size={10} /> এডমিন
          </Link>
        </div>
      </div>
    </footer>
  );
}