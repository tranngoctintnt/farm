// components/ProductDetailDialog.jsx
import React from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { ProductDetailComponent } from "../ProductDetailComponent";
import { ProductZoom } from "../ProductZoom";

const ProductDetailDialog = ({
  open,
  onClose,
  selectedProduct,
  maxWidth = "lg",
  fullWidth = true,
}) => {
  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className="productDetailModal"
    >
      <DialogContent>
        <div className="flex w-full productDetailModalContainer relative">
          <Button
            onClick={onClose}
            className="!w-[2.5rem] !h-[2.5rem] !min-w-[2.5rem] !bg-[#f1f1f1f1] !rounded-full !text-[#000] !absolute top-[0px] right-[0px]"
          >
            <IoMdClose className="text-[1.4rem]" />
          </Button>
          <div className="col1 w-[40%]">
            <ProductZoom data={selectedProduct} />
          </div>
          <div className="col2 px-8 py-5 w-[60%]">
            <ProductDetailComponent data={selectedProduct} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailDialog;