import BASE_PATH_FORAPI from "@/components/shared/BasePath";
import Hero from "@/components/views/Hero";
import ProductsType from "@/components/views/ProductsType";
import ProductCarousel from "@/components/views/ProductCarousel";
import { responseType } from "@/components/utils/ProductDataArrayAndTypes";
import Jewelry from "@/components/views/Jewelry";
import Newsletter from "@/components/views/NewsLetter";

async function fetchAllProductsData() {
  // let res = await fetch(`${BASE_PATH_FORAPI}/api/products`);
  let res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "products"]`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}

export default async function Home() {
  // let  {response } = await fetchAllProductsData();
  let { result }: responseType = await fetchAllProductsData();

  return (
    <div>
      <Hero />
      <ProductsType />
      <ProductCarousel ProductData={result} />
      <Jewelry />
      <Newsletter />
    </div>
  );
}
