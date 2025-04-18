"use client"

import { createContext, useState, useContext, ReactNode } from 'react'

type AnimationContextType = {
  isNavigating: boolean
  setIsNavigating: (value: boolean) => void
  exitAnimation: () => Promise<void>
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [isNavigating, setIsNavigating] = useState(false)

  const exitAnimation = async () => {
    setIsNavigating(true)
    // Wait for animation
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 400) // Time for exit animation
    })
  }

  return (
    <AnimationContext.Provider value={{ isNavigating, setIsNavigating, exitAnimation }}>
      {children}
    </AnimationContext.Provider>
  )
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider')
  }
  return context
} 