"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Perfume } from "@/lib/perfumeService"
import { getPerfumes } from "@/lib/perfumeService"
import { Skeleton } from "@/components/ui/skeleton"
import { FallbackPerfumeImage } from "@/components/ui/fallback-image"

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
}

const staggeredContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: "easeOut" 
    } 
  },
}

export function HeroSection() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([])
  const [loading, setLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        setLoading(true)
        const data = await getPerfumes()
        setPerfumes(data.slice(0, 3)) // Get first 3 perfumes for the hero
      } catch (error) {
        console.error('Error loading perfumes:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPerfumes()
  }, [])

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({
      ...prev,
      [index]: true
    }))
  }

  // Check if we have valid perfume objects with images
  const hasPerfume1 = perfumes.length > 0 && perfumes[0] && perfumes[0].image && !imageErrors[0]
  const hasPerfume2 = perfumes.length > 1 && perfumes[1] && perfumes[1].image && !imageErrors[1] 
  const hasPerfume3 = perfumes.length > 2 && perfumes[2] && perfumes[2].image && !imageErrors[2]

  // Función para hacer scroll a la sección de colección
  const scrollToCollection = () => {
    const collectionSection = document.querySelector('.product-showcase')
    if (collectionSection) {
      collectionSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Función para hacer scroll a la sección de decants
  const scrollToDecants = () => {
    const decantsSection = document.querySelector('.decants-showcase')
    if (decantsSection) {
      decantsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted min-h-[calc(100vh-4rem)] flex items-center py-16">
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-[15%] w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          transition={{ duration: 6, delay: 0 }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-[20%] w-80 h-80 rounded-full bg-secondary/5 blur-3xl"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          transition={{ duration: 8, delay: 1 }}
        />
        <motion.div 
          className="absolute top-2/3 left-[30%] w-40 h-40 rounded-full bg-accent/5 blur-3xl"
          variants={floatingAnimation}
          initial="initial"
          animate="animate"
          transition={{ duration: 5, delay: 2 }}
        />
      </div>

      <div className="perfume-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={staggeredContainer}
            initial="hidden"
            animate="show"
            className="space-y-8"
          >
            <motion.h1 
              className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight"
              variants={fadeIn}
            >
              Descubri tu aroma <span className="text-blue-700">favorito.</span>
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg max-w-lg"
              variants={fadeIn}
            >
              Perfumes artesanales que combinan arte con naturaleza, creando experiencias sensoriales inolvidables y duraderas.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeIn}>
              <Button 
                size="lg" 
                className="px-8 transition-colors duration-300 hover:bg-blue-700 hover:text-white" 
                onClick={scrollToCollection}
              >
                Explorar Colección
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="transition-colors duration-300 hover:bg-blue-700 hover:text-white hover:border-blue-700"
                onClick={scrollToDecants}
              >
                Decants
              </Button>
            </motion.div>
          </motion.div>

          <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative z-20">
                  <Skeleton className="w-[300px] h-[500px] rounded-lg" />
                </div>
                <div className="absolute z-10 -left-10 -bottom-10">
                  <Skeleton className="w-[200px] h-[350px] rounded-lg" />
                </div>
                <div className="absolute z-10 -right-10 top-10">
                  <Skeleton className="w-[180px] h-[320px] rounded-lg" />
                </div>
              </div>
            ) : (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                {/* Main bottle */}
                <motion.div 
                  className="relative z-20"
                  variants={floatingAnimation}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 6, delay: 0.5 }}
                >
                  {hasPerfume1 ? (
                    <Image 
                      src={perfumes[0].image} 
                      alt={perfumes[0].name} 
                      width={300} 
                      height={500}
                      className="object-contain"
                      priority
                      onError={() => handleImageError(0)}
                    />
                  ) : (
                    <div className="w-[300px] h-[500px]">
                      <FallbackPerfumeImage index={1} />
                    </div>
                  )}
                </motion.div>

                {/* Secondary bottle 1 */}
                <motion.div 
                  className="absolute z-10 -left-10 -bottom-10"
                  variants={floatingAnimation}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 7, delay: 1 }}
                >
                  {hasPerfume2 ? (
                    <Image 
                      src={perfumes[1].image} 
                      alt={perfumes[1].name}
                      width={200} 
                      height={350}
                      className="object-contain opacity-70"
                      onError={() => handleImageError(1)}
                    />
                  ) : (
                    <div className="w-[200px] h-[350px] opacity-70">
                      <FallbackPerfumeImage index={2} />
                    </div>
                  )}
                </motion.div>

                {/* Secondary bottle 2 */}
                <motion.div 
                  className="absolute z-10 -right-10 top-10"
                  variants={floatingAnimation}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 5, delay: 1.5 }}
                >
                  {hasPerfume3 ? (
                    <Image 
                      src={perfumes[2].image}
                      alt={perfumes[2].name}
                      width={180} 
                      height={320}
                      className="object-contain opacity-70"
                      onError={() => handleImageError(2)}
                    />
                  ) : (
                    <div className="w-[180px] h-[320px] opacity-70">
                      <FallbackPerfumeImage index={3} />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 