"use client";

import { useCartStore } from "../store/useCartStore";

export default function ProductCard({ pitha }: { pitha: any }) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* যদি আসল ছবি থাকে তবে সেটা দেখাবে, না হলে ডেমো কালার বক্স দেখাবে */}
      {pitha.imageUrl && pitha.imageUrl !== "https://images.unsplash.com/photo-placeholder" ? (
        <img src={pitha.imageUrl} alt={pitha.name} className="h-48 w-full object-cover" />
      ) : (
        <div className="h-48 bg-orange-200 flex items-center justify-center text-orange-800 font-bold text-xl">
          {pitha.name}
        </div>
      )}
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{pitha.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{pitha.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold text-[#D84315]">৳ {pitha.price}</span>
          <button 
            onClick={() => addToCart({ ...pitha, quantity: 1 })}
            className="bg-[#D84315] text-white px-4 py-2 rounded font-medium hover:bg-orange-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}