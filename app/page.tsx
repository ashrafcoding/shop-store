"use client";
import Image from "next/image";
import kids from "../public/kids.jpg";
import Card from "./components/home/card";

export default function Home() {
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
          <Card
            img="IL201810192326044535.jpg_300x400x80"
            title="Get your new gadget today"
          />
          <Card
            img="IL201811141752316762.jpg_300x400x80"
            title="Personal Care Appliances"
          />
          <Card
            img="IL201810091924556237.jpg_300x400x80"
            title="Get your new gadget today"
          />
          <Card
            img="IL201807261714048514.jpg_300x400x80"
            title="Women's Clothing"
          />
          <Card
            img="IL201903150943322348.jpg_300x400x80"
            title="Women's Clothing"
          />
          <Card
            img="IL20180725090019015.jpg_300x400x80"
            title="Women's Clothing"
          />
        </div>
      </div>
    </>
  );
}
