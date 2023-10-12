import Header from "@/components/layout/header";
import "./globals.css";
import type { Metadata } from "next";
import { Cutive } from "next/font/google";
import { Providers } from "./providers";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

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
      <body className={cutive.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
        <footer className="flex justify-between bg-black p-4 text-white">
          <a
            className="flex items-center underline"
            href="tonyschocolonely.tinloof.com"
            target="_blank"
          >
            Inspired by Tinloof{" "}
            <ArrowTopRightOnSquareIcon className="ml-2 inline-block h-4 w-4" />
          </a>
          <p>Created with Next 13, Supabase, Tailwind & Stripe</p>
        </footer>
      </body>
    </html>
  );
}
