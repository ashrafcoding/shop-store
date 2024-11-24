// import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key from the environment variables.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,
  {
    apiVersion: '2024-11-20.acacia',
    typescript: true
  }
)
export  async function POST (req: Request) {
  if (req.method === 'POST') {
    try {
      const {amount} = await  req.json(); 
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(amount) * 100,
        currency: 'usd',        
      })  
       
      return NextResponse.json(paymentIntent.client_secret)
    } catch (err) {
      console.error('Error creating Stripe checkout secret:', err);
      return NextResponse.json({ error: 'Error creating Stripe checkout secret' }, { status: 500 });
    }
  }
}
