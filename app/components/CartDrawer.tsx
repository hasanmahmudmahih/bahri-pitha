"use client";

import { useCartStore } from "../store/useCartStore";
import { useState } from "react";
import { createOrder } from "../actions/order"; // Server Action ইমপোর্ট করলাম

export default function CartDrawer({ onClose }: { onClose: () => void }) {
  const { items, removeFromCart, getTotalPrice, clearCart } = useCartStore();
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return alert("আপনার কার্ট খালি!");
    
    setIsSubmitting(true);

    const orderData = {
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      items: items,
      totalAmount: getTotalPrice(),
    };

    // Server Action কল করা হলো
    const response = await createOrder(orderData);

    setIsSubmitting(false);

    if (response.success) {
      alert(response.message);
      clearCart(); // অর্ডার সফল হলে কার্ট খালি হয়ে যাবে
      onClose();   // এবং ড্রয়ার বন্ধ হয়ে যাবে
    } else {
      alert(response.message);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/50 transition-opacity">
      <div className="absolute inset-0" onClick={onClose}></div>
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
        <div className="p-4 bg-[#D84315] text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">আপনার কার্ট</h2>
          <button onClick={onClose} className="text-2xl font-bold hover:text-gray-200">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">আপনার কার্টে কোনো পিঠা নেই!</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">৳{item.price} x {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-[#D84315]">৳{item.price * item.quantity}</span>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm font-bold">বাদ দিন</button>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between text-lg font-bold pt-4">
                <span>সর্বমোট:</span>
                <span>৳{getTotalPrice()}</span>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <h3 className="font-bold mb-3 text-gray-800">ডেলিভারি ইনফরমেশন (COD)</h3>
            <form onSubmit={handleCheckout} className="space-y-3">
              <input required type="text" placeholder="আপনার নাম" 
                className="w-full border p-2 rounded focus:outline-[#D84315]"
                value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input required type="tel" placeholder="ফোন নাম্বার" 
                className="w-full border p-2 rounded focus:outline-[#D84315]"
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
              <textarea required placeholder="পূর্ণাঙ্গ ঠিকানা" rows={2}
                className="w-full border p-2 rounded focus:outline-[#D84315]"
                value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-3 rounded font-bold transition ${isSubmitting ? 'bg-gray-400' : 'bg-[#D84315] hover:bg-orange-700 text-white'}`}
              >
                {isSubmitting ? "প্রসেসিং হচ্ছে..." : "অর্ডার কনফার্ম করুন"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}