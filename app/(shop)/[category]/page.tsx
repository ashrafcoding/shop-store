import ProductCard from "@/components/ui/product-card";
import { getProductsByCategory } from "@/lib/data";
import Image from "next/image";
export default async function page({params}:{params:Promise<{category:string}>}) {
  const category = (await params).category  
  const products = await getProductsByCategory(category);

  return (
    <section>
      <h2 className="text-2xl font-bold p-3">Get what you want from {category} section</h2>
      <Image src={`/${category}.jpg`} width={500} height={300} alt={category} className="w-full h-96 p-3 object-cover" />
      <div className=" grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4 justify-items-center">
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
      </div>
    </section>
  );
}
