"use server";

import prisma from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";

function getGoogleDriveDirectLink(url: string) {
  if (!url.includes("drive.google.com")) return url;

  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  const fileId = match ? match[1] : null;

  if (fileId) {
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

    const imageUrl = rawImageUrl 
      ? getGoogleDriveDirectLink(rawImageUrl) 
      : "https://images.unsplash.com/photo-placeholder";

    await prisma.pitha.create({
      data: { name, description, price, imageUrl },
    });

    revalidatePath("/admin");
    revalidatePath("/");
    
    // টাইপস্ক্রিপ্ট এরর ফিক্স করার জন্য এখান থেকে return { success: true } সরিয়ে দেওয়া হয়েছে
  } catch (error) {
    console.error("Error adding pitha:", error);
  }
}

export async function deletePitha(id: string) {
  try {
    await prisma.pitha.delete({ where: { id } });
    revalidatePath("/admin");
    revalidatePath("/");
  } catch (error) {
    console.error("Error deleting pitha:", error);
  }
}