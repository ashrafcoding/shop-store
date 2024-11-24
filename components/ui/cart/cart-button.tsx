"use client";
import { Button } from "@/components/ui/sidebar/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { insertUser, addToCart } from "@/lib/actions";
import { CartContextType, useCart, CartItem } from "@/context/cart-context";
import { Product, User } from "@/lib/definitions"; // Import the insertUser from "@/lib/actions";
import { useState } from "react";

export default function AddToCart({ product }: { product: Product }) {
  const {  setCartItems } = useCart() as CartContextType;
  const [loading, setLoading] = useState(false)
  const { isSignedIn, user } = useUser();
  const newUser = {
    id: user?.id,
    name: user?.firstName,
    email: user?.primaryEmailAddress?.emailAddress,
  };
  const router = useRouter();

  async function handleClick() {
    setLoading(true)
    if (!isSignedIn) {
      router.push("/sign-in");
    }
    await insertUser(newUser as User);
    const items = (await addToCart(
      user?.id as string,
      product.id,
      product.price
    )) as CartItem[];
        setCartItems(items);
        setLoading(false)
  }

  return (
    <div className="">
      <Button
      disabled={loading}
        onClick={handleClick}
        className="mt-4 bg-indigo-500 hover:bg-indigo-600  disabled:opacity-50 disabled:animate-pulse"
      >
        Add to Cart
      </Button>
    </div>
  );
}
