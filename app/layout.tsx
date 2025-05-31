import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryClientProvider from "@/components/react-query-client-provider";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NutriPlan AI – AI-Powered Meal Planning SaaS",
  description:
    "NutriPlan AI is a multi-tenant SaaS platform that generates personalized AI meal plans based on user goals, allergies, and preferences. Built with Next.js 14, OpenAI, and Stripe.",
  keywords:
    "NutriPlan, AI meal planner, SaaS, personalized nutrition, multi-tenant app, Next.js, OpenAI GPT, Stripe billing, Clerk auth, Prisma, PostgreSQL",
  metadataBase: new URL("https://nutriplanai.neelxh.ca"),
  openGraph: {
    title: "NutriPlan AI – Personalized Meal Planning SaaS",
    description:
      "Generate tailored meal plans using AI. Built with Next.js 14, OpenAI, Prisma, Stripe, and Vercel.",
    url: "https://nutriplanai.neelxh.ca",
    siteName: "NutriPlan AI",
    images: [
      {
        url: "https://nutriplanai.neelxh.ca/logo.png",
        width: 1200,
        height: 630,
        alt: "NutriPlan AI - AI Meal Planner",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NutriPlan AI – Personalized AI Meal Planner",
    description:
      "AI-powered meal planning SaaS using OpenAI GPT. Multi-tenant architecture with Stripe, PostgreSQL, and Vercel.",
    images: ["https://nutriplanai.neelxh.ca/logo.png"],
    creator: "@neelprime", // optional
  },
  icons: {
    icon: "https://nutriplanai.neelxh.ca/favicon.ico",
    apple: "https://nutriplanai.neelxh.ca/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ReactQueryClientProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-900`}
          >
            <NavBar />
            <div className="max-w-7xl mx-auto pt-16 p-4 min-h-screen">
              {children}
            </div>
            <Footer />
          </body>
        </html>
      </ReactQueryClientProvider>
    </ClerkProvider>
  );
}
