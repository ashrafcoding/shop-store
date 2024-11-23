import Image from "next/image";
import kids from "@/public/kids.jpg";
import Card from "@/components/ui/home/card";
import {getOneFromCategory} from '@/lib/data'

export default async function Home() {
  const products = await getOneFromCategory()  
  return (
    <>
      <div className="relative block h-screen  overflow-auto ">
        <Image
          src={kids}
          sizes="100vw"
          alt="kids"
          fill
          className="object-cover"
          priority
        />
        <div className="h-[40vh] "> </div>
        <div className=" grid grid-cols-2 gap-1  md:grid-cols-3 justify-items-center">
          {products&& products.map((product) => (
            <Card key={product.id} img={product.img} title={product.category} />
          ))}
        </div>
      </div>
    </>
  );
}
