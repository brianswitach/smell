"use client";

import React, { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// Wrap the component that uses useSearchParams in a separate component
function FailureContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Process any necessary actions with the payment info
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const merchantOrderId = searchParams.get('merchant_order_id');
    
    console.log('Payment failed', { paymentId, status, merchantOrderId });
    
    // Here you could call your API to log the failure
  }, [searchParams]);
  
  return (
    <div className="bg-red-50 rounded-lg p-8 max-w-2xl mx-auto">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      
      <h1 className="text-3xl font-bold text-red-800 mb-4">Pago Fallido</h1>
      
      <p className="text-lg mb-6">
        Lo sentimos, ha ocurrido un problema al procesar tu pago. Tu compra no ha sido completada.
      </p>
      
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
        <Link href="/checkout" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
          Intentar nuevamente
        </Link>
        <Link href="/" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90 transition">
          Volver a la tienda
        </Link>
      </div>
    </div>
  );
}

// Loading fallback for Suspense
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function PaymentFailurePage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <Suspense fallback={<LoadingFallback />}>
        <FailureContent />
      </Suspense>
    </div>
  );
} 