"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(formData: FormData) {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (password === adminPassword) {
    // পাসওয়ার্ড ঠিক থাকলে কুকি সেট করবে (১ দিনের জন্য)
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 
    });
    redirect("/admin"); // লগিন সফল হলে এডমিন ড্যাশবোর্ডে পাঠাবে
  }

  return { error: "পাসওয়ার্ড ভুল হয়েছে!" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/"); // লগআউট হলে হোমপেজে পাঠাবে
}