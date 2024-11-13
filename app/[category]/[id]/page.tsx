import { getProductById, getProductsByCategory } from "@/lib/data";
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
  const cloudinaryUrl =
    "https://res.cloudinary.com/dnbtcv8mr/image/upload/v1731223851/";
  const similarItems = products.slice(0, 6);
  return (
    <div>
      <div className="flex gap-5">
        <div className="">
          <Image
            alt={category}
            src={cloudinaryUrl + product.img}
            width={300}
            height={300}
            className="w-40 h-40 object-contain"
          />
        </div>
        <div className=""></div>
        <p>{product.description}</p>
      </div>
      <div className="flex gap-2">
        {similarItems.map((product) => (
          <div key={product.id}>
            <Image
              width={200}
              height={200}
              alt={product.name}
              src={cloudinaryUrl + product.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
