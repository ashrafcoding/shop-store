"use client";
import {
  getProductsManyByIds,
  removeFromCart,
  updateQuantity,
} from "@/lib/actions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { cloudinaryUrl } from "@/lib/definitions";
import { CartContextType, CartItem, useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { set } from "zod";
type Element = {
  id: string;
  quantity: number;
};

export default function CartPage() {
  const handleQuantityChange = async (id: string, quantity: number) => {
    try {
      await updateQuantity(user?.id as string, id, quantity);
      setCartItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };
  const { user } = useUser();
  const id = user?.id;
  const router = useRouter();
  const { cartItems, setCartItems } = useCart() as CartContextType;
  useEffect(() => {
    const cartFetch = async () => {
      try {
        const items = (await getProductsManyByIds(id as string)) as CartItem[];
        if (items) setCartItems(items);
        else setCartItems([]);
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };
    cartFetch();
  }, [setCartItems, id]);

  let total = 0;
  cartItems.forEach((item) => {
    const cost = Number(item.price?.slice(1));
    total += cost * item.quantity;
  });

  const handleRemoveFromCart = async (productId: string) => {
    try {
      const items = (await removeFromCart(
        id as string,
        productId
      )) as CartItem[];
      if (items) setCartItems(items);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <header className="text-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Your Cart
            </h1>
          </header>
          <div className="mt-8">
            <ul className="space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <li key={item.id} className="flex  items-center gap-4">
                    <Image
                      width={100}
                      height={100}
                      src={cloudinaryUrl + item.img}
                      alt=""
                      className="size-16 rounded object-cover"
                    />
                    <div className="max-w-xs">
                      <p className="text-sm line-clamp-1 text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-sm  text-gray-900">{item.category}</p>
                      <p className="text-xs  text-gray-900">
                        price: {item.price}
                      </p>
                    </div>
                    <div className="flex flex-1 items-center justify-end gap-2">
                      <div>
                        <label htmlFor="Quantity" className="sr-only">
                          {" "}
                          Quantity{" "}
                        </label>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={item.quantity === 1}
                            onClick={() =>
                              handleQuantityChange(
                                item.id,
                                item.quantity > 1 ? item.quantity - 1 : 1
                              )
                            }
                            className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                          >
                            &minus;
                          </button>
                          <input
                            readOnly
                            type="number"
                            id="Quantity"
                            value={item.quantity}
                            className="h-7 w-16 rounded border-gray-200 text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            className="size-10 leading-10 text-gray-600 transition hover:opacity-75"
                          >
                            &#43;
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-gray-900">{item.price}</p>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="text-gray-600 transition hover:text-red-600"
                      >
                        <span className="sr-only">Remove item</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center text-xl font-bold text-gray-900 sm:text-3xl">
                  <h1 className="p-4">Your Cart is empty</h1>
                  <Link className="p-4 text-indigo-700   rounded-md " href="/">
                    Shop now
                  </Link>
                </div>
              )}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <dt>Subtotal</dt>
                    <dd>$ {total}</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>VAT</dt>
                    <dd>$ 0</dd>
                  </div>

                  <div className="flex justify-between">
                    <dt>Discount</dt>
                    <dd>-$ 0</dd>
                  </div>

                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>$ {total}</dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="-ms-1 me-1.5 size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                      />
                    </svg>

                    <p className="whitespace-nowrap text-xs">
                      0 Discounts Applied
                    </p>
                  </span>
                </div>
                <div className="flex justify-end">
                  <button
                    disabled={total === 0}
                    onClick={() => router.push(`/checkout?amount=${total}`)}
                    className="block  rounded bg-indigo-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-indigo-600"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
