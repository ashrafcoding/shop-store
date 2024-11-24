import { getProductById, getProductsByCategory } from "@/lib/data";
import Image from "next/image";
import AddToCart from "@/components/ui/cart/cart-button";
import { Product, cloudinaryUrl } from "@/lib/definitions";
import ProductCard from "@/components/ui/home/product-card";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const id = (await params).id;
  const category = (await params).category;
  const product: Product = (await getProductById(id)) as Product;
  const products = await getProductsByCategory(category);

  const similarItems = products.slice(0, 6);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2">
          <Image
            src={cloudinaryUrl + product.img}
            alt="Primary Image"
            width={400}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 md:ml-8">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-2">Price: {product.price}</p>
          <AddToCart product={product} />
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-8">Recommended Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {similarItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
