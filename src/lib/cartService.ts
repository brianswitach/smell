// Definir tipos para el carrito
export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  volume: string
}

// Simulamos el almacenamiento del carrito (en una app real esto podría estar en un contexto o estado global)
// Utilizamos los datos añadidos desde un localStorage, pero en un entorno de servidor esto no funcionaría
// Una solución mejor sería utilizar un estado global con React Context o un gestor de estado como Redux

export const getCartItems = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const storedCart = localStorage.getItem('cart')
    return storedCart ? JSON.parse(storedCart) : []
  } catch (error) {
    console.error('Error al obtener carrito:', error)
    return []
  }
}

export const saveCartItems = (items: CartItem[]): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('cart', JSON.stringify(items))
  } catch (error) {
    console.error('Error al guardar carrito:', error)
  }
}

export const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1): Promise<void> => {
  return new Promise((resolve) => {
    const cartItems = getCartItems()
    
    // Verificar si el producto ya está en el carrito
    const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id)
    
    if (existingItemIndex >= 0) {
      // Actualizar cantidad si ya existe
      cartItems[existingItemIndex].quantity += quantity
    } else {
      // Agregar nuevo item
      cartItems.push({ ...item, quantity })
    }
    
    saveCartItems(cartItems)
    
    // Add a small delay for animation before resolving
    setTimeout(() => {
      resolve();
    }, 300);
  });
}

export const updateCartItemQuantity = (id: string, quantity: number): void => {
  if (quantity < 1) return
  
  const cartItems = getCartItems()
  const updatedItems = cartItems.map(item => 
    item.id === id ? { ...item, quantity } : item
  )
  
  saveCartItems(updatedItems)
}

export const removeCartItem = (id: string): void => {
  const cartItems = getCartItems()
  const updatedItems = cartItems.filter(item => item.id !== id)
  
  saveCartItems(updatedItems)
}

export const clearCart = (): void => {
  saveCartItems([])
}

export const getCartTotal = (): { subtotal: number, shipping: number, total: number } => {
  const cartItems = getCartItems()
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  // Aplicar lógica de envío
  const shippingThreshold = 200
  const shipping = subtotal >= shippingThreshold ? 0 : 15
  
  return {
    subtotal,
    shipping,
    total: subtotal + shipping
  }
}

// Funciones para integración con Mercado Pago (a implementar en el futuro)
export const createMercadoPagoCheckout = async (items: CartItem[]): Promise<{ checkoutUrl: string }> => {
  // Esta función sería implementada para integrar con Mercado Pago
  // Usualmente involucraría una llamada a tu backend, que a su vez llamaría a la API de Mercado Pago
  
  // Ejemplo de estructura para cuando se implemente:
  // 1. Preparar datos para enviar al backend
  // 2. Hacer fetch a tu API
  // 3. Recibir y devolver la URL de checkout o preferenceId
  
  // Por ahora es un placeholder
  console.log('Items para procesar con Mercado Pago:', items)
  return { checkoutUrl: '/checkout/mercadopago' }
}

// Esta función podría ser utilizada para procesar el resultado de la compra
export const processMercadoPagoResult = async (paymentId: string, status: string): Promise<{ success: boolean, message: string }> => {
  // Implementación futura para procesar el resultado del pago
  console.log(`Procesando pago ${paymentId} con estado ${status}`)
  
  return {
    success: status === 'approved',
    message: status === 'approved' 
      ? '¡Pago completado correctamente!' 
      : 'Hubo un problema con el pago, por favor intenta nuevamente.'
  }
} 