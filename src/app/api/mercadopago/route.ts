import { NextResponse } from 'next/server';
// @ts-ignore - TS doesn't properly recognize the mercadopago module
import * as mercadopago from 'mercadopago';

// Configure Mercado Pago with credentials
mercadopago.configure({
  access_token: 'APP_USR-8600047072822639-041813-e07936229b4d611d40a4c3b043e4f01b-823990491'
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extract items, amount, etc. from the request
    const { items, buyer } = body;
    
    // Create the preference with the received data
    const preferenceData = {
      items: items.map((item: any) => ({
        title: item.name,
        unit_price: Number(item.price),
        quantity: Number(item.quantity),
        currency_id: 'ARS', // Adjust based on your country/currency
      })),
      payer: {
        name: buyer?.name || '',
        email: buyer?.email || '',
      },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://smellandco.com'}/checkout/success`,
        failure: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://smellandco.com'}/checkout/failure`,
        pending: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://smellandco.com'}/checkout/pending`,
      },
      auto_return: 'approved',
      statement_descriptor: 'Smell&Co',
      external_reference: body.orderId || Date.now().toString(),
    };
    
    // Create the preference in Mercado Pago
    const response = await mercadopago.preferences.create(preferenceData);
    
    // Return the preference ID to the client
    return NextResponse.json({ 
      preferenceId: response.body.id,
      init_point: response.body.init_point
    });
  } catch (error) {
    console.error('Error creating Mercado Pago preference:', error);
    return NextResponse.json(
      { error: 'Failed to create payment preference' },
      { status: 500 }
    );
  }
} 