"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Perfume, getPerfumes } from "@/lib/perfumeService"
import { addToCart } from "@/lib/cartService"
import { Button } from "@/components/ui/button"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FallbackPerfumeImage } from "@/components/ui/fallback-image"
import { useAnimation } from "@/lib/animation-context"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  },
}

export function DecantCard({ perfume, index }: { perfume: Perfume, index: number }) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { exitAnimation } = useAnimation()

  // Check if the image is valid before trying to render it
  const hasValidImage = perfume.image && !imageError

  // Fixed decant price
  const decantPrice = 6990

  const handleAddToCart = async () => {
    try {
      setIsLoading(true)
      // Añadir al carrito usando el servicio de carrito
      await addToCart({
        id: `${perfume.id}-decant`,
        name: perfume.name,
        price: decantPrice,
        image: perfume.image,
        volume: "5ml"
      })
      
      toast({
        title: "¡Producto agregado!",
        description: "Decant añadido a tu carrito de compras.",
        variant: "success"
      })
      
      // Animate out before navigation
      await exitAnimation()
      
      // Redirigir a la página de checkout
      router.push('/checkout')
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo agregar el decant al carrito.",
        variant: "destructive"
      })
      setIsLoading(false)
    }
  }

  return (
    <motion.div 
      variants={fadeInUp}
      className="perfume-card group h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden border-none shadow-lg">
        <div className="relative h-[280px] perfume-card-image-container">
          {hasValidImage ? (
            <Image
              src={perfume.image}
              alt={`Decant de ${perfume.name}`}
              fill
              className="object-cover perfume-card-image"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <FallbackPerfumeImage index={index} />
            </div>
          )}
          <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-xs font-medium py-1 px-2 rounded-full">
            Decant
          </div>
        </div>
        <CardHeader className="pt-6 pb-2">
          <CardTitle className="font-serif text-xl tracking-tight">{perfume.name}</CardTitle>
          <CardDescription>{perfume.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-muted-foreground">5ml</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center border-t pt-4">
          <div className="font-medium">$6.990</div>
          <Button 
            onClick={handleAddToCart}
            className="transition-colors duration-300 hover:bg-blue-700 hover:text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Agregando...
              </div>
            ) : "Añadir al Carrito"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export function DecantsShowcase() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [perfumes, setPerfumes] = useState<Perfume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPerfumes = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getPerfumes()
        setPerfumes(data)
      } catch (err) {
        console.error('Error fetching perfumes:', err)
        setError('No se pudieron cargar los decants. Por favor, inténtelo de nuevo más tarde.')
      } finally {
        setLoading(false)
      }
    }

    fetchPerfumes()
  }, [])

  const filteredPerfumes = 
    selectedFilter === "new" 
      ? perfumes.filter(p => p.isNew)
      : selectedFilter === "bestsellers" 
        ? perfumes.filter(p => p.isBestseller)
        : perfumes

  return (
    <section className="py-24 bg-background decants-showcase">
      <div className="perfume-container">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            className="heading-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Decants
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Prueba nuestros perfumes en presentaciones de 5ml antes de comprar el frasco completo
          </motion.p>
        </div>

        <motion.div 
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Button 
            variant={selectedFilter === "all" ? "default" : "outline"}
            onClick={() => setSelectedFilter("all")}
          >
            Todos
          </Button>
          <Button 
            variant={selectedFilter === "new" ? "default" : "outline"}
            onClick={() => setSelectedFilter("new")}
          >
            Novedades
          </Button>
          <Button 
            variant={selectedFilter === "bestsellers" ? "default" : "outline"}
            onClick={() => setSelectedFilter("bestsellers")}
          >
            Más Vendidos
          </Button>
        </motion.div>

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {loading ? (
            // Loading state
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="h-[500px] flex flex-col overflow-hidden border-none shadow-lg">
                  <div className="relative h-[280px]">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardHeader className="pt-6 pb-2">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent className="flex-1">
                    <Skeleton className="h-4 w-20" />
                  </CardContent>
                  <CardFooter className="flex justify-between items-center border-t pt-4">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-10 w-28" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : error ? (
            // Error state
            <div className="text-center py-12">
              <p className="text-destructive">{error}</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Reintentar
              </Button>
            </div>
          ) : filteredPerfumes.length > 0 ? (
            <Carousel 
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {filteredPerfumes.map((perfume, index) => (
                  <CarouselItem key={`decant-${perfume.id}`} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 p-2">
                    <DecantCard perfume={perfume} index={index + 1} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center gap-2 mt-8">
                <CarouselPrevious />
                <CarouselNext />
              </div>
            </Carousel>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No se encontraron decants con el filtro seleccionado.</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
} 