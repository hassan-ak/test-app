import { oneProductType } from "@/components/utils/ProductDataArrayAndTypes";
import Card from "../Card";

interface propsType {
  ProductsArray: oneProductType[];
}

export default async function AllProductsCompo({ ProductsArray }: propsType) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 content-center justify-center lg:grid-cols-3 gap-4 py-10">
      {ProductsArray&& ProductsArray.map((product, index: number) => (
        <Card singleProductData={product} key={index} />
      ))}
    </div>
  );
}