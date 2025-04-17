import React from "react";
import ProductForm from "../../Components/ProductForm";
import { message } from "antd";


message.config({
  top: 10, // Cách đỉnh màn hình 10px
  right: 10,
  duration: 2, // Hiển thị trong 2 giây
  maxCount: 1, // Chỉ hiển thị 1 thông báo cùng lúc
});
const AddProduct = () => {

  return (
    <>
      <div className="px-6 py-5">
        <div className="upload pb-6">
          <h2 className="text-[24px]">Add Product</h2>
        </div>

        <ProductForm/>

        
      </div>
     
    </>
  );
};

export default AddProduct;
