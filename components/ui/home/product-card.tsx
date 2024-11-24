import { Product } from "@/lib/definitions";
import Image from "next/image";
import Link from 'next/link'
import {cloudinaryUrl} from '@/lib/definitions'


export default function ProductCard({product}:{product:Product}) {
    const category = product.category
    const id = product.id

  return (
    <Link href={`/${category}/${id}`} className="block hover:border-2 overflow-hidden flex-col gap-2 rounded-lg p-4 h-81 shadow-lg shadow-indigo-100 max-w-md ">
      <Image
      width={300}
      height={400}
        alt=""
        src={cloudinaryUrl + product.img }
        // unoptimized
        className="w-full h-72 rounded-md object-contain"
      />

      <div className="mt-2 h-20">
            <h3 className="text-sm text-gray-500">{product.price}</h3>
            <h3 className="font-medium line-clamp-2">{product.description}</h3>
      </div>
    </Link>
  );
}
