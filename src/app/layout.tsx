import Header from "@/components/layout/header";
import "./globals.css";
import type { Metadata } from "next";
import { Cutive } from "next/font/google";
import { Providers } from "./providers";
import Footer from "@/components/layout/footer";

const cutive = Cutive({
  subsets: ["latin-ext"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "The chocolate shop",
  description:
    "A demo ecommerce app created using Nextjs 13, supabase, stripe & Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cutive.className} cursor-brutal-arrow`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
