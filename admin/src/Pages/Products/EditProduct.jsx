import React from "react";
import ProductForm from "../../Components/ProductForm";


const EditProduct = () => {
  return (
    <>
      <div className="px-9 py-5">
        <div className="edit pb-6">
          <h2 className="text-[24px]">Edit Product</h2>
        </div>

        <ProductForm />
      </div>
      
    </>
  );
};

export default EditProduct;
