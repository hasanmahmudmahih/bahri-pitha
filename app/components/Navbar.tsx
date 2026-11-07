"use client";

import { useCartStore } from "../store/useCartStore";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // কার্টে মোট কয়টি আইটেম আছে তার হিসাব
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="bg-[#D84315] text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold cursor-pointer">বাহারি পিঠা ঘর</h1>
          
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="relative cursor-pointer bg-white/20 px-4 py-2 rounded-md hover:bg-white/30 transition flex items-center gap-2 font-medium"
          >
            <span>কার্ট ({totalItems})</span>
          </button>
        </div>
      </header>

      {/* কার্ট ড্রয়ার কম্পোনেন্ট (পরের ধাপে বানাচ্ছি) */}
      {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
    </>
  );
}