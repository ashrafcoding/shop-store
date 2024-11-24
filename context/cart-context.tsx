'use client';
import { createContext, useContext, useState } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  img: string;
  quantity: number;
  // Add other properties as needed (e.g., name, price, quantity)
}

export interface CartContextType {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode   
 }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext); 