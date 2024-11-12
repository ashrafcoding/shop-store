import ProductCard from "@/components/ui/product-card";
import { getProductsByCategory } from "@/lib/data";
export default async function page({params}:{params:Promise<{category:string}>}) {
  const category = (await params).category
  const products = await getProductsByCategory(category);

  return (
    <section>
      <h3>Get what you want from {category} section</h3>
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
