import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // IMPORTANT for nodemailer on Vercel

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, notes } = body;

    if (!process.env.GMAIL_APP_PASSWORD) {
      throw new Error("Missing GMAIL_APP_PASSWORD");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ahadsyed193@gmail.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Apex Dental Form" <ahadsyed193@gmail.com>`,
      to: "ahadsyed193@gmail.com",
      subject: "New Appointment Booking",
      html: `
        <h2>New Appointment Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Notes:</strong> ${notes}</p>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error: any) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Email failed" },
      { status: 500 }
    );
  }
}