export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// @ts-ignore
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, phone, service, notes } = await req.json();

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
      from: `"Apex Dental Booking" <ahadsyed193@gmail.com>`,
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