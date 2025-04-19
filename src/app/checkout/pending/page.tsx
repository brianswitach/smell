"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentPendingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Process any necessary actions with the payment info
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const merchantOrderId = searchParams.get('merchant_order_id');
    
    console.log('Payment pending', { paymentId, status, merchantOrderId });
    
    // Here you could call your API to update the order status
  }, [searchParams]);
  
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="bg-yellow-50 rounded-lg p-8 max-w-2xl mx-auto">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-yellow-800 mb-4">Pago en Proceso</h1>
        
        <p className="text-lg mb-6">
          Tu pago está siendo procesado. Recibirás un correo electrónico cuando se complete.
        </p>
        <p className="text-md mb-6">
          Si realizaste un pago en efectivo o transferencia, puede tomar hasta 2 días hábiles en acreditarse.
        </p>
        
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
          <Link href="/" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90 transition">
            Volver a la tienda
          </Link>
        </div>
      </div>
    </div>
  );
} 