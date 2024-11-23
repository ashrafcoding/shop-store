'use client'
// import { useCart } from '@/context/cart-context';
// import { useUser } from '@clerk/nextjs';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useState } from 'react';

export default function CheckoutForm({amount}: {amount: number}) {  
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, seterrorMessage] = useState("")
    // const { cartItems, setCartItems } = useCart();
    // const { user } = useUser();
  
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      if (!stripe || !elements) {
        return;
      }
      const handleError = (err: { message: string; }) => {
        seterrorMessage(err.message)
      }
      const {error} = await elements.submit();
      if(error) {
          handleError({message: error.message as string})
          return
      }
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount : amount }),
      })
  
      const  clientSecret  = await res.json();
      console.log(clientSecret);
      
      const result = await stripe.confirmPayment({
        clientSecret,
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/checkout/payment-confirmed",
        },
      });
  
      if (result.error) {
        // Show error to your customer (for example, payment details incomplete)
        console.log(result.error.message);
      } else {
        // Your customer will be redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer will be redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
    };
  
    return (
        <div className='m-auto  '>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleSubmit} className=' flex flex-col gap-4'>
          <PaymentElement />
          <button disabled={!stripe} className='bg-blue-500 w-full p-4 rounded-xl text-white'>Submit</button>
          <div className='text-red-500 text-sm p-2'>
            <p>Test Card Number: 4242 4242 4242 4242</p>
            <p>Expiration datae: 12/33</p>
            <p>CVV: 123</p>
          </div>
          
        </form>
        </div>
      
      );
}