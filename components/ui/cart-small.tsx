import { CartItem } from "@/context/cart-context";
import Image from "next/image";
import Link from "next/link";
import { cloudinaryUrl } from "@/lib/definitions";

export default function CartSmall({items}:{items:CartItem[]}) {
  let total = 0;
  items.forEach((item) => {
    const cost = Number(item.price?.slice(1));
    total += cost;
  });
  return (
    <div className="absolute z-20 right-24 top-16 overflow-auto h-96 ">
    <div
      className=" inset-0 w-screen max-w-sm border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
    >
      <button className="absolute end-4 top-4 text-gray-600 transition hover:scale-110">
        <span className="sr-only">Close cart</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {items.map((item) => (
          <li key ={item.id} className="flex items-center gap-4">
            <Image
              width={100}
              height={100}
              src={cloudinaryUrl + item.img}
              alt={item.name}
              className="size-16 rounded object-cover"
            />

            <div>
              <h3 className="text-sm line-clamp-1 text-gray-900">{item.name}</h3>

              <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                <div>
                  <dt className="inline">price:</dt>
                  <dd className="inline">{item.price}</dd>
                </div>

                <div>
                  <dd className="inline">{item.category}</dd>
                </div>
              </dl>
            </div>
          </li>
          ))}

          
        </ul>

        <div className="space-y-4 text-center">
          <Link
            href="/cart"
            className="block rounded border border-gray-600 px-5 py-3 text-sm text-gray-600 transition hover:ring-1 hover:ring-gray-400"
          >
            View my cart
          </Link>

          <Link
            href={`/checkout?amount=${total}`}
            className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
          >
            Checkout
          </Link>

          <Link
            href="/"
            className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
