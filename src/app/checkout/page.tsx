"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCartItems, getCartTotal, CartItem, updateCartItemQuantity, removeCartItem } from "@/lib/cartService";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FallbackPerfumeImage } from "@/components/ui/fallback-image";

// Colores para las animaciones
const colors = [
  "#FF5F7E", // Rosa
  "#42A5F5", // Azul
  "#66BB6A", // Verde
  "#FFA726", // Naranja
  "#AB47BC", // Púrpura
  "#EC407A", // Rosa oscuro
  "#7E57C2", // Púrpura claro
  "#26C6DA", // Turquesa
];

// Componente de burbujas animadas
const AnimatedBubbles = () => {
  return (
    <div className="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden pointer-events-none z-0">
      {colors.map((color, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            background: color,
            width: Math.random() * 60 + 20,
            height: Math.random() * 60 + 20,
            left: `${Math.random() * 80}%`,
          }}
          initial={{ 
            y: Math.random() * 1000 + 500,
            opacity: 0.7,
            rotate: 0,
          }}
          animate={{ 
            y: -100,
            opacity: [0.7, 0.9, 0.7, 0.4],
            rotate: Math.random() > 0.5 ? 360 : -360,
            scale: [1, 1.2, 1, 0.8, 1]
          }}
          transition={{ 
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [initPoint, setInitPoint] = useState<string | null>(null);
  const [loadingMP, setLoadingMP] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load cart items
    const items = getCartItems();
    setCartItems(items);
    
    if (items.length === 0) {
      router.push('/');
      return;
    }
    
    // Create Mercado Pago preference
    const createPreference = async () => {
      try {
        setIsLoading(true);
        
        // Calculate totals to ensure consistency
        const { subtotal, shipping, total } = getCartTotal();
        
        const response = await fetch('/api/mercadopago', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: items.map(item => ({
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            })),
            total: total, // Send the exact total to ensure consistency
            buyer: {
              name: "",
              email: "",
            },
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to create payment preference');
        }

        const data = await response.json();
        setPreferenceId(data.preferenceId);
        setInitPoint(data.init_point);
      } catch (err) {
        setError('Error creating payment: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    createPreference();
  }, [router]);

  // Esta función se ejecutará cuando el usuario haga clic en "Proceder al pago"
  const handlePayment = () => {
    if (initPoint) {
      setLoadingMP(true);
      // Redireccionar directamente a la URL de pago de Mercado Pago
      window.location.href = initPoint;
    }
  };

  const handleImageError = (itemId: string) => {
    setImageErrors(prev => ({
      ...prev,
      [itemId]: true
    }));
  };

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(itemId, newQuantity);
      // Actualizar estado local
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      handleRemoveItem(itemId);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    removeCartItem(itemId);
    // Actualizar estado local
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    
    // Si el carrito queda vacío, redirigir al inicio
    if (cartItems.length <= 1) {
      router.push('/');
    }
  };

  const { subtotal, shipping, total } = getCartTotal();

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <Head>
        <title>Checkout - Smell&Co</title>
      </Head>
      
      {/* Burbujas animadas */}
      <AnimatedBubbles />
      
      <h1 className="text-3xl font-bold mb-6">Finalizar Compra</h1>
      
      {isLoading ? (
        <div className="text-center py-10">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Preparando tu pago...</p>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            onClick={() => router.push('/')}
            className="mt-4 bg-primary text-white px-4 py-2 rounded"
          >
            Volver a la tienda
          </button>
        </div>
      ) : (
        <motion.div 
          className="grid md:grid-cols-2 gap-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-xl font-semibold mb-4">Resumen de tu pedido</h2>
            <div className="border rounded-lg p-4 mb-4 bg-white/80 backdrop-blur-sm shadow-lg">
              {cartItems.map((item, index) => (
                <div key={item.id} className="flex flex-wrap py-4 border-b items-center">
                  {/* Imagen del producto */}
                  <div className="h-16 w-16 sm:h-20 sm:w-20 relative mr-3 sm:mr-4 rounded-md overflow-hidden flex-shrink-0">
                    {item.image && !imageErrors[item.id] ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        onError={() => handleImageError(item.id)}
                      />
                    ) : (
                      <div className="w-full h-full">
                        <FallbackPerfumeImage index={index + 1} />
                      </div>
                    )}
                  </div>
                  
                  {/* Información del producto */}
                  <div className="flex-grow min-w-[120px]">
                    <p className="font-medium text-sm sm:text-base">{item.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{item.volume}</p>
                    <p className="text-xs sm:text-sm font-medium">${item.price.toFixed(2)}</p>
                  </div>
                  
                  {/* Controles de cantidad y precio en layout flexible */}
                  <div className="flex items-center justify-between w-full sm:w-auto mt-3 sm:mt-0">
                    {/* Controles de cantidad */}
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                      >
                        <MinusIcon size={14} />
                      </button>
                      
                      <span className="mx-1 sm:mx-2 w-5 sm:w-6 text-center text-sm">{item.quantity}</span>
                      
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                      >
                        <PlusIcon size={14} />
                      </button>
                      
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-2 sm:ml-4 p-1 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                      >
                        <XIcon size={14} />
                      </button>
                    </div>
                    
                    {/* Precio total del item */}
                    <div className="font-semibold text-sm sm:text-base">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between mb-2">
                  <p>Envío</p>
                  <p>${shipping.toFixed(2)}</p>
                </div>
                <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                  <p>Total</p>
                  <p className="text-xl">${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            {/* Botón de pago para móviles (visible solo en pantallas pequeñas) */}
            <div className="block md:hidden mt-4">
              <MercadoPagoButton 
                onClick={handlePayment} 
                disabled={!initPoint || loadingMP} 
                loading={loadingMP} 
              />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
            <div className="border rounded-lg p-6 bg-white/80 backdrop-blur-sm shadow-lg">
              <div className="mb-6">
                <h3 className="font-medium mb-2">Información de pago</h3>
                <p className="text-sm text-gray-600">
                  Tu pago será procesado de forma segura por Mercado Pago.
                </p>
                <p className="text-sm text-gray-600 mb-6">
                  Al hacer clic en el botón de pago, serás redirigido a la plataforma de pago.
                </p>
                
                {/* Botón de Mercado Pago para escritorio (oculto en móviles) */}
                <div className="hidden md:block">
                  <MercadoPagoButton 
                    onClick={handlePayment} 
                    disabled={!initPoint || loadingMP} 
                    loading={loadingMP} 
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-2 mt-6">
                <img src="/mercadopago-logo.png" alt="Mercado Pago" className="h-8" onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }} />
                <span className="text-sm text-gray-500">Pago seguro con Mercado Pago</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Componente para el botón de Mercado Pago
const MercadoPagoButton = ({ 
  onClick, 
  disabled, 
  loading 
}: { 
  onClick: () => void; 
  disabled: boolean; 
  loading: boolean;
}) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-4 rounded-lg font-bold text-white relative overflow-hidden"
      style={{ 
        background: "linear-gradient(90deg, #09f 0%, #0CC 100%)",
        boxShadow: "0 6px 12px rgba(0, 153, 255, 0.2)"
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Procesando...
        </span>
      ) : (
        <div className="flex items-center justify-center">
          <img src="/mercadopago-logo.png" alt="" className="h-6 mr-2" />
          <span>Pagar con Mercado Pago</span>
        </div>
      )}
      
      {/* Efecto de brillo */}
      <motion.div 
        className="absolute top-0 -left-10 w-20 h-full bg-white opacity-20 transform rotate-12"
        animate={{ 
          left: ["-10%", "120%"],
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          repeatDelay: 3
        }}
      />
    </motion.button>
  );
}; 