import { cloudinaryUrl } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default function Card({img,title}:{img:string,title:string}) {
  return (
    <div className="relative  overflow-hidden rounded-lg shadow-lg transition hover:shadow-lg max-w-md w-full">
      <Image
      width={300}
      height={400}
        alt={title}
        src={cloudinaryUrl + img }
        className="absolute  inset-0 h-full w-full object-cover"
      />
      <div className="relative bg-gradient-to-t from-amber-900/50 via-amber-900/25   pt-32 sm:pt-48 lg:pt-64">
        <div className="p-4 sm:p-6">
          <Link href={`/${title}`}>
            <p className="mt-0.5 text-lg capitalize font-bold text-white">
              enjoy shopping from {title} section
            </p>
          </Link>
          
        </div>
      </div>
    </div>
  );
}
