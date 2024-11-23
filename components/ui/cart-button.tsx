"use client";
import { Button } from "@/components/ui/sidebar/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { insertUser, addToCart } from "@/lib/actions";
import { CartContextType, useCart, CartItem } from "@/context/cart-context";
import { Product, User } from "@/lib/definitions"; // Import the insertUser from "@/lib/actions";

export default function AddToCart({ product }: { product: Product }) {
  const {  setCartItems } = useCart() as CartContextType;
  const { isSignedIn, user } = useUser();
  const newUser = {
    id: user?.id,
    name: user?.firstName,
    email: user?.primaryEmailAddress?.emailAddress,
  };
  const router = useRouter();

  async function handleClick() {
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
  }
  return (
    <div className="">
      <Button
        onClick={handleClick}
        className="mt-4 bg-blue-500 hover:bg-blue-600"
      >
        Add to Cart
      </Button>
    </div>
  );
}
