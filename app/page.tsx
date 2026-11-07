import { getPithas } from "./actions/pitha";
import ProductCard from "./components/ProductCard";
import { FaFacebookMessenger } from "react-icons/fa";

// Next.js-কে পেজটা ডাইনামিক রাখতে বাধ্য করার কোড
export const dynamic = "force-dynamic";

export default async function Home() {
  // ডাটাবেস থেকে রিয়েল ডেটা ফেচ করা হচ্ছে (কোনো ডেমো ডেটা আর নেই)
  const pithas = await getPithas();

  return (
    <div className="relative pb-20">
      <section className="bg-orange-100 py-12 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#D84315] mb-4">
          শীতের আমেজে ঐতিহ্যবাহী স্বাদ
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto text-lg">
          আমাদের প্রতিটি পিঠা তৈরি হয় ঘরোয়া পরিবেশে, খাঁটি উপকরণ ও পরম যত্নে। আপনার পছন্দের পিঠা অর্ডার করুন এখনই!
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        {pithas.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">এখনো কোনো পিঠা মেন্যুতে যুক্ত করা হয়নি।</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* ডাটাবেসের পিঠাগুলো ম্যাপ করে কার্ডে পাঠানো হচ্ছে */}
            {pithas.map((pitha) => (
              <ProductCard key={pitha.id} pitha={pitha} />
            ))}
          </div>
        )}
      </section>

      {/* মেসেঞ্জার চ্যাট উইজেট (লিংকটি তোমার পেজের লিংকে পরিবর্তন করে নিও) */}
      <a 
        href="https://m.me/yourfacebookpageid" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#0084FF] text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all hover:scale-110 z-50 flex items-center justify-center group"
      >
        <FaFacebookMessenger size={28} />
        <span className="absolute right-16 bg-black/70 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          আমাদের মেসেজ করুন
        </span>
      </a>
    </div>
  );
}