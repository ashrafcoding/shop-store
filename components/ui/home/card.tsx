import { cloudinaryUrl } from "@/lib/definitions";
import Image from "next/image";

export default function Card({img,title}:{img:string,title:string}) {
  return (
    <article className="relative overflow-hidden rounded-lg shadow-lg transition hover:shadow-lg max-w-md w-full">
      <Image
      width={300}
      height={400}
        alt=""
        src={cloudinaryUrl + img }
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
        <div className="p-4 sm:p-6">
          <a href={`/${title}`}>
            <p className="mt-0.5 text-lg font-bold text-white">
              Enjoy Shopping from {title} section
            </p>
          </a>
          
        </div>
      </div>
    </article>
  );
}
