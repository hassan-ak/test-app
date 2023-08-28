import AllProductsCompo from "@/components/views/AllProduct";
async function fetchAllProductData() {
  let res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "products"]`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }
  return res.json();
}
const Products = async () => {
  const ProductData = await fetchAllProductData();
  return (
    <div>
      <AllProductsCompo ProductsArray={ProductData.result} />
    </div>
  );
};
export default Products;
