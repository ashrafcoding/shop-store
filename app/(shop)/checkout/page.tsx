'use client';
import {Elements} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '@/components/ui/checkout/checkout-form';
import { useSearchParams } from 'next/navigation';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise  = loadStripe( process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string); 
export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  if(!amount) {
    throw new Error('amount is required')};
  const options = {
    mode: 'payment' as const,
    currency: 'usd',
     amount: Number(amount) ,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={Number(amount) } />
    </Elements>
  );
  
}