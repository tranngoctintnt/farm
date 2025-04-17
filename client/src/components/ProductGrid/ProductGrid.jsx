// components/ProductGrid.jsx
import React from "react";
import ProductItems from "../ProductItems";
import ProductItemListView from "../ProductItemViewList";


const ProductGrid = ({ products, viewMode, categoryMap }) => {
  return (
    <div
      className={`grid gap-4 ${
        viewMode === "grid"
          ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          : "grid-cols-1"
      }`}
    >
      {products.map((product) =>
        viewMode === "grid" ? (
          <ProductItems
            key={product.idProduct}
            product={product}
            categoryName={categoryMap[product.idCate]}
          />
        ) : (
          <ProductItemListView
            key={product.idProduct}
            product={product}
            categoryName={categoryMap[product.idCate]}
          />
        )
      )}
    </div>
  );
};

export default ProductGrid;