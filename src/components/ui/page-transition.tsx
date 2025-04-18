"use client"

import { motion } from "framer-motion"
import { useAnimation } from "@/lib/animation-context"
import { ReactNode, useEffect } from "react"

export function PageTransition({ children }: { children: ReactNode }) {
  const { isNavigating, setIsNavigating } = useAnimation()
  
  useEffect(() => {
    // Reset navigation state when component mounts
    setIsNavigating(false)
  }, [setIsNavigating])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        transition: {
          duration: 0.4,
          ease: "easeOut"
        }
      }}
      exit={{ 
        opacity: 0,
        transition: {
          duration: 0.3,
          ease: "easeIn"
        } 
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  )
} 