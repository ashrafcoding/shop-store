'use client';
import { ShoppingCart } from "lucide-react";
import { CartContextType, CartItem, useCart } from "@/context/cart-context";
import {  useEffect, useState } from "react";
import {  getProductsManyByIds } from "@/lib/actions";
import { useUser } from '@clerk/nextjs'
import CartSmall from "./cart-small";
export default function CartCount() {
    const { user } = useUser()
    const [isOpen, setIsOpen] = useState(false)

  const { cartItems, setCartItems } = useCart() as CartContextType;

  useEffect(() => {  
    const cartFetch = async () => {
      try {
          if (user) {
              const items = (await getProductsManyByIds(user.id as string)) as CartItem[];
              if(items) setCartItems(items);
            } 
            else setCartItems([])
      } catch (error) {
          console.error("Failed to fetch cart items:", error);
      }     
  }
    cartFetch()
    },[setCartItems, user])
  return (
    <div onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 cursor-pointer">
      <ShoppingCart />
      <p>({cartItems?.length || 0})</p>
      {isOpen && <CartSmall items={cartItems} />}
    </div>
  );
}
