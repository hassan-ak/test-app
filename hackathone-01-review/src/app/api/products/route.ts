import { oneProductType } from "@/components/utils/ProductDataArrayAndTypes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const originalData: Array<oneProductType> = [];
  const url = request.nextUrl.searchParams;
  let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "products"]`
  );
  
  let dataFrom_API = await res.json()
  originalData.push(...dataFrom_API.result)

 if(url.has("satrt")||url.has("end")){
  if (originalData[Number(url.get("start"))]){
     let productArray= originalData.slice(Number(url.get("start")), Number(url.get("end")))
   return NextResponse.json({productArray})
  }  else
   
     return NextResponse.json({ productArray: "Not Found" })
  }
  return NextResponse.json({ originalData })
 };

