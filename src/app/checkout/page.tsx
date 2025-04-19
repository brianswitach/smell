"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCartItems, getCartTotal, CartItem } from "@/lib/cartService";
import Head from "next/head";

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

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
      } catch (err) {
        setError('Error creating payment: ' + (err instanceof Error ? err.message : String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    createPreference();
  }, [router]);

  // Initialize MercadoPago when preferenceId is available
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined' || !preferenceId) return;

    // Load MercadoPago script
    const script = document.createElement('script');
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.type = "text/javascript";
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore - MercadoPago is not typed
      const mp = new window.MercadoPago('APP_USR-1bcd6114-8366-4424-b46b-88349e173e8b', {
        locale: 'es-AR'
      });

      // Render the payment button
      mp.checkout({
        preference: {
          id: preferenceId
        },
        render: {
          container: '#mp-button-container',
          label: 'Pagar con Mercado Pago',
        }
      });
    };

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [preferenceId]);

  const { subtotal, shipping, total } = getCartTotal();

  return (
    <div className="container mx-auto px-4 py-8">
      <Head>
        <title>Checkout - Smell&Co</title>
      </Head>
      
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
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Resumen de tu pedido</h2>
            <div className="border rounded-lg p-4 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between py-2 border-b">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.quantity} x ${item.price.toFixed(2)}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
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
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
            <div className="border rounded-lg p-4">
              <div id="mp-button-container" className="mt-4"></div>
              {!preferenceId && !isLoading && (
                <p className="text-sm text-gray-600 mt-2">Cargando opciones de pago...</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 