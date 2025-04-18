import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/navigation/main-nav";
import { Footer } from "@/components/navigation/footer";
import { AnimationProvider } from "@/lib/animation-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "smell&co | Artisanal Perfumes",
  description: "Discover your signature scent with smell&co's collection of artisanal perfumes crafted with precision and the finest ingredients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <AnimationProvider>
          <div className="flex flex-col min-h-screen">
            <MainNav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AnimationProvider>
      </body>
    </html>
  );
}
