import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Footer ইমপোর্ট করা হলো

const hindSiliguri = Hind_Siliguri({ 
  subsets: ["latin", "bengali"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-hind-siliguri',
});

export const metadata: Metadata = {
  title: "বাহারি পিঠা ঘর",
  description: "ঐতিহ্যবাহী সুস্বাদু পিঠার সমাহার",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      {/* বডিতে flex flex-col min-h-screen অ্যাড করা হয়েছে যাতে ফুটার ঠিক জায়গায় থাকে */}
      <body className={`${hindSiliguri.variable} font-sans bg-[#FAFAFA] text-gray-800 antialiased flex flex-col min-h-screen`}>
        
        {/* ডায়নামিক নেভবার */}
        <Navbar />

        {/* main-এর ভেতর flex-grow দেওয়া হয়েছে যাতে পেজের কন্টেন্ট ছোট হলেও ফুটার একদম নিচে লেগে থাকে */}
        <main className="flex-grow">
          {children}
        </main>

        {/* ডায়নামিক ফুটার */}
        <Footer />
        
      </body>
    </html>
  );
}