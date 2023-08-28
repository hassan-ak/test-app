import { oneProductType, responseType } from '@/components/utils/ProductDataArrayAndTypes';
import Card from '@/components/views/Card';
import React, { FC } from 'react'

async function fetchAllProductsData() {
  
  let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-07-08/data/query/production?query=*%5B_type+%3D%3D+%22products%22+%26%26productTypes%5B0%5D+%3D%3D%22Kid%22%5D+`)
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}

const Kid =  async ({params}:{params:{ftype:string}}) => {
  let res:responseType = await fetchAllProductsData();
  

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 content-center justify-center lg:grid-cols-3 gap-4 py-10'>
      {res.result.map((items:oneProductType, index:number)=>(
      <Card singleProductData={items} key={index}/>
    ))}</div>
  )
}

export default Kid