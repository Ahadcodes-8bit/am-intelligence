import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// We load the base font here for the whole site
const inter = Inter({ subsets: ["latin"] });

// --- THIS IS THE PART THAT FIXES THE TAB TITLE ---
export const metadata: Metadata = {
  title: "AM Intelligence | AI Front Desk",
  description: "24/7 AI Receptionist for Clinics",
  icons: {
    icon: "/favicon.ico", // Ensure you have a favicon in /public if you want one
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}