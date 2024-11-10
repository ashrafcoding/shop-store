"use client";

import { CldImage } from "next-cloudinary";



// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Test() {
  return (
    <CldImage
    width="400" // Transform the image: auto-crop to square aspect_ratio
      height="400"
      src="https://res.cloudinary.com/dnbtcv8mr/image/upload/v1731181104/IL201904140934331462.jpg_300x400x80_mxmwfj.jpg"
      crop={{
        type: 'auto',
        source: true
      }}
      preserveTransformations
      alt="logo"
    />
  );
}