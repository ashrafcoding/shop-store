import Image from "next/image";
import child from "@/public/child.jpg";
import Card from "@/components/ui/home/card";
import {getOneFromCategory} from '@/lib/data'
import Link from "next/link";

export default async function Home() {
  const products = await getOneFromCategory()  
  return (
    <>
      <div className="relative block h-screen  overflow-auto ">
        <Link href="/kids">
        <Image
          src={child}
          sizes="100vw"
          alt="kids"
          fill
          className="object-cover"
          priority
        />
        </Link>
        <div className="h-[40vh] "> </div>
        <div className=" grid grid-cols-2 gap-3  md:grid-cols-3 justify-items-center bg-gradient-to-t from-amber-300/50 via-amber-300/25 p-6">
          {products&& products.map((product) => (
            <Card key={product.id} img={product.img} title={product.category} />
          ))}
        </div>
      </div>
    </>
  );
}
