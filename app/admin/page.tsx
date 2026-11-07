import { getPithas, addPitha, deletePitha } from "../actions/pitha";
import { logoutAdmin } from "../actions/auth";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // সিকিউরিটি চেক: কুকি না থাকলে লগিন পেজে পাঠিয়ে দিবে
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  
  if (session?.value !== "true") {
    redirect("/admin/login");
  }

  const pithas = await getPithas();

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#D84315]">এডমিন প্যানেল</h1>
        <div className="flex gap-4">
          <Link href="/" className="bg-gray-200 text-gray-800 px-4 py-2 rounded font-medium hover:bg-gray-300">
            হোমপেজ
          </Link>
          <form action={logoutAdmin}>
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700">
              লগআউট
            </button>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* পিঠা অ্যাড করার ফর্ম */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-bold mb-4">নতুন পিঠা যোগ করুন</h2>
          <form action={addPitha} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">পিঠার নাম</label>
              <input type="text" name="name" required className="w-full border p-2 rounded" placeholder="যেমন: ভাপা পিঠা" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">বিবরণ</label>
              <textarea name="description" required rows={3} className="w-full border p-2 rounded" placeholder="পিঠার বিবরণ..." />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">দাম (৳)</label>
              <input type="number" name="price" required className="w-full border p-2 rounded" placeholder="150" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ছবির লিংক (ঐচ্ছিক)</label>
              <input type="url" name="imageUrl" className="w-full border p-2 rounded" placeholder="https://..." />
            </div>
            <button type="submit" className="w-full bg-[#D84315] text-white py-2 rounded font-bold hover:bg-orange-700">
              পিঠা সেভ করুন
            </button>
          </form>
        </div>

        {/* বর্তমান পিঠার তালিকা */}
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-bold mb-4">মেন্যুতে থাকা পিঠা ({pithas.length})</h2>
          
          {pithas.length === 0 ? (
            <p className="text-gray-500 text-sm">এখনো কোনো পিঠা যোগ করা হয়নি।</p>
          ) : (
            <div className="space-y-4 overflow-y-auto max-h-[400px] pr-2">
              {pithas.map((pitha) => (
                <div key={pitha.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h3 className="font-bold">{pitha.name}</h3>
                    <p className="text-sm text-gray-600">৳{pitha.price}</p>
                  </div>
                  <form action={async () => {
                    "use server";
                    await deletePitha(pitha.id);
                  }}>
                    <button type="submit" className="text-red-500 text-sm font-bold bg-red-50 px-2 py-1 rounded hover:bg-red-100">
                      ডিলিট
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}