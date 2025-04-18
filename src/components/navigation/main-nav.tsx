"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  ShoppingBag, 
  Search, 
  Menu, X 
} from "lucide-react"
import { useState } from "react"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const routes = [
  {
    href: "/",
    label: "Home",
  }
]

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="perfume-container h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-serif text-xl md:text-2xl tracking-tight">
            smell&co
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <li key={route.href}>
                <Link
                  href={route.href}
                  className="text-sm font-medium transition-colors hover:text-primary relative group"
                >
                  {route.label}
                  {pathname === route.href && (
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-full h-px bg-primary"
                      layoutId="navbar-indicator"
                    />
                  )}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingBag className="h-[1.2rem] w-[1.2rem]" />
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6 pt-16">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-[1.2rem] w-[1.2rem]" />
              </Button>
              <div className="flex flex-col gap-6">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {route.label}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-4 mt-auto">
                <Button variant="outline" className="w-full gap-2">
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
} 