"use server";

import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

// গুগল ড্রাইভের নরমাল লিংক থেকে ডাইরেক্ট ইমেজের লিংক বানানোর ম্যাজিক ফাংশন
function getGoogleDriveDirectLink(url: string) {
  if (!url.includes("drive.google.com")) return url;

  // লিংক থেকে ID এক্সট্র্যাক্ট করা
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  const fileId = match ? match[1] : null;

  if (fileId) {
    // ইমেজের জন্য গুগল ড্রাইভের সবচেয়ে স্টেবল ডাইরেক্ট লিংক ফরম্যাট
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return url;
}

export async function getPithas() {
  noStore();
  try {
    return await prisma.pitha.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Error fetching pithas:", error);
    return [];
  }
}

export async function addPitha(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseInt(formData.get("price") as string);
    const rawImageUrl = formData.get("imageUrl") as string;

    // ক্লায়েন্টের দেওয়া ড্রাইভ লিংক এখানে কনভার্ট হবে, ফাঁকা থাকলে ডেমো ছবি বসবে
    const imageUrl = rawImageUrl 
      ? getGoogleDriveDirectLink(rawImageUrl) 
      : "https://images.unsplash.com/photo-placeholder";

    await prisma.pitha.create({
      data: { name, description, price, imageUrl },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    
    return { success: true };
  } catch (error) {
    console.error("Error adding pitha:", error);
    return { success: false };
  }
}

export async function deletePitha(id: string) {
  try {
    await prisma.pitha.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting pitha:", error);
    return { success: false };
  }
}