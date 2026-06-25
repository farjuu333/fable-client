import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { auth } from '@/lib/auth'

export async function POST(req) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const userSession= await auth.api.getSession({
        headers:await headers()
    })

    const user = userSession?.user
    const PRICE_ID = 'price_1Tk2EGPnPM0uAjeCOFpBEIBV'
    
    
   const formData = await req.formData()
        const bookId = formData.get('bookId')
        console.log(bookId)
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
        customer_email:user?.email,
      line_items: [
        {
          // Provide the exact Price ID (for example, price_1234) of the product you want to sell
          price: PRICE_ID,
          quantity: 1,
        },
      ],

      metadata:{
        priceId:PRICE_ID,
        userId:user.id,
        userEmail:user.email,
        bookId:bookId,
        
      },

      mode: 'subscription',
      success_url: `${origin}/ebook/success?session_id={CHECKOUT_SESSION_ID}`,
    
    });
    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    )
  }
}