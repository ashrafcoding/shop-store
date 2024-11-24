"use client";
import { makeOrder } from "@/lib/actions";
import { useCart } from "@/context/cart-context";
import { useUser } from "@clerk/nextjs";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";

export default function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, seterrorMessage] = useState<string | undefined>("");
  const [clientSecret, setclientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCartItems } = useCart();
  const { user } = useUser();

  useEffect(() => {
    fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setclientSecret(data);
      });
  }, [amount]);
 console.log(clientSecret);
 
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      seterrorMessage(submitError.message);
      setLoading(false);
      return;
    }
    
    if (clientSecret) {
      setLoading(false);
      await makeOrder(user?.id as string, amount);
      setCartItems([]);
    }

    const result = await stripe.confirmPayment({
      clientSecret,
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://shop-store-puce.vercel.app/checkout/payment-confirmed",        
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      seterrorMessage(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
    setLoading(false);
  };

  return (
    <div className="m-auto  ">
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        {clientSecret && <PaymentElement />}
        <button
          disabled={!stripe || loading}
          className="bg-blue-500 w-full p-4 rounded-xl text-white disabled:opacity-50 disabled:animate-pulse"
        >
          {loading ? "Processing Payment..." : `Pay $ ${amount} Now `}
        </button>
        <div className="text-red-500 text-sm p-2">
          <p>Test Card Number: 4242 4242 4242 4242</p>
          <p>Expiration datae: 12/33</p>
          <p>CVV: 123</p>
        </div>
      </form>
    </div>
  );
}
