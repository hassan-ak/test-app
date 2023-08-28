import React, { FC } from "react";
import { oneProductType } from "../utils/ProductDataArrayAndTypes";
import ImageUrlBuilder from "@sanity/image-url";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import { url } from "inspector";
import Link from "next/link";


const builder = ImageUrlBuilder(client);
// function to create URLfor images
function urlFor(source: any){
  return builder.image(source)
}


const Card: FC<{ singleProductData: oneProductType }> = ({singleProductData,}) => {
  // urlFor(singleProductData.image[0]).width(500).url()
  return(
    <Link href={`/catalog/${singleProductData.slug.current}`}>
    <div className="max-w-sm min-w-[24rem] space-y-3 select-none hover:scale-110 duration-300">
      <div className="relative w-full">
        <div className="absolute inset-0 z-10" />
        <Image width={500} height={500} src={urlFor(singleProductData.image[0]).width(1000).height(1000).url()} alt={singleProductData.image[0].alt} />
        </div>
        <div className="space-y-1 text-gray-800 font-semibold text-lg select-none">
          <h6>{singleProductData.productName}</h6>
          <p>${singleProductData.price}</p>
      </div>
    </div>
    </Link>
  )
  
} 

export default Card;
