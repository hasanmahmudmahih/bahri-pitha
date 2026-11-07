"use server";

import prisma from "../../lib/prisma";
import nodemailer from "nodemailer";

export async function createOrder(data: {
  name: string;
  phone: string;
  address: string;
  items: any[];
  totalAmount: number;
}) {
  try {
    const order = await prisma.order.create({
      data: {
        customerName: data.name,
        customerPhone: data.phone,
        customerAddress: data.address,
        orderItems: JSON.stringify(data.items),
        totalAmount: data.totalAmount,
      },
    });

    const itemList = data.items.map(item => `- ${item.name} (${item.quantity} পিস) - ৳${item.price * item.quantity}`).join("\n");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ইমেইলের বডিটা Apps Script পড়ার সুবিধার জন্য একদম পয়েন্ট টু পয়েন্ট রাখা হয়েছে
    const mailOptions = {
      from: `"বাহারি পিঠা ঘর" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, 
      subject: `[New Pitha Order] ৳${data.totalAmount} - ${data.name}`,
      text: `Name: ${data.name}\nPhone: ${data.phone}\nAddress: ${data.address}\n\nItems:\n${itemList}\n\nTotal: ${data.totalAmount}`,
    };

    await transporter.sendMail(mailOptions);

    return { success: true, message: "আপনার অর্ডার সফলভাবে প্লেস হয়েছে! ধন্যবাদ।" };
  } catch (error) {
    console.error("Order processing error:", error);
    return { success: false, message: "অর্ডার প্রসেস করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।" };
  }
}