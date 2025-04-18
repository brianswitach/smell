"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { ProductShowcase } from "@/components/sections/product-showcase"
import { DecantsShowcase } from "@/components/sections/decants-showcase"
import { Separator } from "@/components/ui/separator"
import { PageTransition } from "@/components/ui/page-transition"

export default function Home() {
  return (
    <PageTransition>
      <HeroSection />
      <ProductShowcase />
      <div className="perfume-container py-12">
        <hr className="border-t-2 border-gray-300" />
      </div>
      <DecantsShowcase />
    </PageTransition>
  )
}
