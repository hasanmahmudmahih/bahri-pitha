"use client";

import { loginAdmin } from "@/app/actions/auth";
import { useState } from "react";
import { FaLock } from "react-icons/fa";

export default function AdminLogin() {
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await loginAdmin(formData);
    
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm border text-center">
        <div className="bg-gray-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 text-[#D84315]">
          <FaLock size={24} />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">এডমিন লগ ইন</h2>
        
        {error && <p className="text-red-500 bg-red-50 p-2 rounded text-sm mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="password" 
            name="password" 
            required 
            placeholder="পাসওয়ার্ড দিন" 
            className="w-full border p-3 rounded text-center tracking-widest focus:outline-[#D84315]" 
          />
          <button type="submit" className="w-full bg-[#D84315] text-white py-3 rounded font-bold hover:bg-orange-700 transition">
            লগ ইন করুন
          </button>
        </form>
      </div>
    </div>
  );
}