"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FallbackPerfumeImage } from "@/components/ui/fallback-image"
import { PageTransition } from "@/components/ui/page-transition"
import { motion } from "framer-motion"
import {
  CartItem,
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  getCartTotal,
  createMercadoPagoCheckout
} from "@/lib/cartService"

// Animation variants for cart items
const cartItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  // Cargar items del carrito
  useEffect(() => {
    // Cuando el componente se monta, obtenemos los items del carrito
    const items = getCartItems()
    setCartItems(items)
    setLoading(false)

    // Si no hay items en localStorage, agregamos algunos de muestra
    if (items.length === 0) {
      // Datos de muestra - en producción esto se eliminaría
      const mockCartItems: CartItem[] = [
        {
          id: "lattafa-yara",
          name: "Lattafa Yara",
          price: 120,
          image: "https://lattafa.al/cdn/shop/files/image_tpO.webp?v=1721595528",
          quantity: 1,
          volume: "100ml"
        },
        {
          id: "lattafa-khamrah",
          name: "Lattafa Khamrah",
          price: 130,
          image: "https://avinari.cl/cdn/shop/files/o.fDr4cjowxjt-1_800x.jpg?v=1725747470",
          quantity: 2,
          volume: "100ml"
        }
      ]
      setCartItems(mockCartItems)
    }
  }, [])

  // Calcular totales
  const { subtotal, shipping, total } = getCartTotal()
  
  // Envío gratuito por encima de cierta cantidad
  const shippingThreshold = 200

  // Funciones para gestionar el carrito
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    updateCartItemQuantity(id, newQuantity)
    setCartItems(getCartItems()) // Actualizar estado local
  }
  
  const handleRemoveItem = (id: string) => {
    removeCartItem(id)
    setCartItems(getCartItems()) // Actualizar estado local
  }

  // Función para proceder al pago con Mercado Pago
  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true)
      // Aquí realizaríamos la integración con Mercado Pago
      const { checkoutUrl } = await createMercadoPagoCheckout(cartItems)
      
      // Por ahora, solo mostramos una alerta
      alert("Preparando integración con Mercado Pago...")
      
      // En una implementación real, redirigimos a la URL de checkout o integramos el formulario de MP
      // window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error al procesar el pago:", error)
      alert("Hubo un error al procesar el pago. Inténtalo nuevamente.")
    } finally {
      setCheckoutLoading(false)
    }
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.style.display = 'none'
    e.currentTarget.nextElementSibling?.classList.remove('hidden')
  }

  if (loading) {
    return (
      <PageTransition>
        <div className="container mx-auto py-10">
          <h1 className="text-2xl font-bold mb-8">Cargando carrito...</h1>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="container mx-auto py-10 px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-8"
        >
          <Link href="/" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a la tienda</span>
          </Link>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl font-bold mb-8"
        >
          Tu Carrito
        </motion.h1>
        
        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-20"
          >
            <h2 className="text-xl mb-4">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-8">Agrega algunos productos para comenzar</p>
            <Button asChild>
              <Link href="/">Explorar Productos</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Lista de Productos en el Carrito */}
            <div className="col-span-2 space-y-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-8 text-sm font-medium text-muted-foreground py-2 border-b"
              >
                <div className="col-span-4">Producto</div>
                <div className="col-span-1 text-center">Precio</div>
                <div className="col-span-2 text-center">Cantidad</div>
                <div className="col-span-1 text-right">Total</div>
              </motion.div>
              
              {cartItems.map((item, index) => (
                <motion.div 
                  custom={index}
                  variants={cartItemVariants}
                  initial="hidden"
                  animate="visible"
                  key={item.id} 
                  className="grid grid-cols-8 items-center py-4 border-b"
                >
                  <div className="col-span-4 flex items-center gap-4">
                    <div className="w-20 h-20 relative bg-muted rounded">
                      {item.image && (
                        <>
                          <Image 
                            src={item.image} 
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                            onError={handleImageError}
                          />
                          <div className="hidden w-full h-full">
                            <FallbackPerfumeImage index={parseInt(item.id.slice(-1)) || 1} />
                          </div>
                        </>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.volume}</p>
                    </div>
                  </div>
                  
                  <div className="col-span-1 text-center">${item.price}</div>
                  
                  <div className="col-span-2 flex items-center justify-center">
                    <div className="flex items-center border rounded-md">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-none"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-none"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="col-span-1 flex items-center justify-between">
                    <span className="font-medium">${item.price * item.quantity}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Resumen del Pedido */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="col-span-1"
            >
              <div className="bg-muted/50 rounded-lg p-6 space-y-6">
                <h2 className="text-xl font-bold">Resumen del Pedido</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span>{shipping === 0 ? "Gratis" : `$${shipping}`}</span>
                  </div>
                  {shipping > 0 && (
                    <div className="text-xs text-muted-foreground">
                      Añade ${shippingThreshold - subtotal} más para obtener envío gratis
                    </div>
                  )}
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full"
                  size="lg"
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                >
                  {checkoutLoading ? "Procesando..." : "Proceder al Pago"}
                </Button>
                
                <div className="text-center text-xs text-muted-foreground">
                  <p>Al finalizar la compra, aceptas nuestros <Link href="/terms" className="underline hover:text-foreground">Términos y Condiciones</Link></p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </PageTransition>
  )
} 