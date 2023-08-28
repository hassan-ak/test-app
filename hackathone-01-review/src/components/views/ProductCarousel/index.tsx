"use client";
import { FC } from "react";
import { oneProductType } from "@/components/utils/ProductDataArrayAndTypes";
import Card from "../Card";
import { isTemplateExpression } from "typescript";

// const ProductCarousel: FC<{ ProductData: Array<oneProductType> }> = ({
//   ProductData,
// }) => {
//   return (
//     <div className="grid">
//       {ProductData.map((item: oneProductType, index: number) => (
//         <Card singleProductData={item} key={""} />
//       ))}
//     </div>
//   );
// };

const ProductCarousel: FC<{ ProductData: Array<oneProductType> }> = ({
  ProductData,
}) => {
  let initialX: number;
  let isDragging = false;
  let tabBox: any;

  const isBrowser = () => typeof window !== "undefined";

  if (isBrowser()) {
    tabBox = document.querySelector(".scrollGrab");
  }

  // Desktop functions
  function mouseMoves(e: any) {
    if (!isDragging) return;
    if (tabBox) {
      tabBox.scrollLeft -= e.movementX;
    }
  }
  function mouseDown() {
    console.log("moving orignal");
    isDragging = true;
  }
  function mouseUp() {
    isDragging = false;
  }

  // mobile functions
  function mouseMovesForMobile(e: any) {
    if (!isDragging) return;
    if (tabBox) {
      var currentX = e.touches[0].clientX;
      var movementX = currentX - initialX;
      tabBox.scrollLeft -= movementX / 5;
    }
  }
  function mouseDownForMobile(e: any) {
    isDragging = true;
    initialX = e.touches[0].clientX;
  }
   let dataToItrate = ProductData.slice(0, 15);
  return (
    <div className="space-y-4">
      <div className="text-center space-y-3">
        <p className="text-blue-800 text-sm">PRODUCTS</p>
        <h3 className="text-3xl text-gray-800 font-bold">Check What We Have</h3>
      </div>
      <div
        onMouseMove={mouseMoves}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        className="select-none flex gap-4 overflow-x-hidden py-4 scrollGrab overflow-y-hidden"
        onTouchMove={mouseMovesForMobile}
        onTouchStart={mouseDownForMobile}
        onTouchEnd={mouseUp}
      >
        {dataToItrate.map((item: oneProductType, index: number) => (
          <Card key={index} singleProductData={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
