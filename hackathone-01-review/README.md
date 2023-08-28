# Changes to resolve errors

1. Update `hackathone-01-main/src/components/views/Footer/index.tsx`

   ```
   replace "stroke-linecap" with "strokeLinecap"
   replace "stroke-linejoin" with "strokeLinejoin"
   replace "stroke-width" with "strokeWidth"
   ```

2. Update `hackathone-01-main/src/components/assets/images/image/kid.html`

   ```
   replace "stroke-width" with "strokeWidth"
   ```

3. Update `hackathone-01-review/.env` to following

   ```.env
   NEXT_PUBLIC_SANITY_PROJECT_ID="no7le7lq"
   NEXT_PUBLIC_SANITY_DATASET="production"
   ```

4. Create `hackathone-01-review/.env.production` with following content

   ```.env
   NEXT_PUBLIC_SANITY_PROJECT_ID="no7le7lq"
   NEXT_PUBLIC_SANITY_DATASET="production"
   ```

5. Update `hackathone-01-main/src/app/products/page.tsx` with the following content

   ```tsx
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
   ```

   Fetch call to snaity is done directly from the page rather than through API. Updated props of `AllProductsCompo` from object to data array

6. Update `hackathone-01-main/src/components/views/AllProduct/index.tsx` with the following content

   ```tsx
   import { oneProductType } from "@/components/utils/ProductDataArrayAndTypes";
   import Card from "../Card";
   interface propsType {
     ProductsArray: oneProductType[];
   }
   export default async function AllProductsCompo({
     ProductsArray,
   }: propsType) {
     return (
       <div className="grid grid-cols-1 md:grid-cols-2 content-center justify-center lg:grid-cols-3 gap-4 py-10">
         {ProductsArray &&
           ProductsArray.map((product, index: number) => (
             <Card singleProductData={product} key={index} />
           ))}
       </div>
     );
   }
   ```

   Class component converted into functional component. `Card` component is mapped based on `ProductsArray` available in the params.

7. Rename `hackathone-01-main/src/app/catalog/slug` to `hackathone-01-main/src/app/catalog/[slug]`. Static `slug` route is converted to dynamic `[slug]` route.

8. Rename `hackathone-01-main/src/app/Search` to `hackathone-01-main/src/app/search`. `Search` route is renamed to `search` route.
