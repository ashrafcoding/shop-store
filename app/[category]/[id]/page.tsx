import { cloudinaryUrl, getProductById, getProductsByCategory } from "@/lib/data";
import Image from "next/image";

export default async function page({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const id = (await params).id;
  const category = (await params).category;
  const product = await getProductById(id);
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
          <p className="text-gray-700">Stock: {product.stockQuantity}</p>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Add to Cart
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8">Recommended Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {similarItems.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <Image
              src={cloudinaryUrl + product.img}
              alt={product.name}
              width={100}
              height={100}
              className="rounded-lg"
            />
            <h3 className="text-lg font-bold mt-2 line-clamp-2">
              {product.name}
            </h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
