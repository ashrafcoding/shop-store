import ProductCard from "@/components/ui/home/product-card";
import { getProductsByCategory } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const category = (await params).category;

  const products = await getProductsByCategory(category);
  if(products.length === 0) return notFound()
  return  (
    <section>
      <h2 className="text-2xl font-bold capitalize p-5">
        Get what you want from {category} section
      </h2>
      <Image
        src={`/${category}.jpg`}
        width={1000}
        height={200}
        alt={category}
        className="w-full  object-fill "
      />
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

