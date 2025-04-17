import React, { useEffect, useState } from "react";
import TextEditor from "../TextEditor";
import { Form, Input, Select, Image, Upload, message, Button, InputNumber } from "antd";
import { ConsoleSqlOutlined, PlusOutlined } from "@ant-design/icons";

import axios from "axios"; // Sử dụng axios để gửi request
import { NavLink, useParams } from "react-router-dom";
import api from "../../api";
import BASE_URL from "../../config";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };

const ProductForm = () => {
  const [form] = Form.useForm(); // Quản lý form bằng Ant Design
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [categories, setCategories] = useState([]); // State để lưu danh sách danh mục
  const { idProduct } = useParams();
  const isEditMode = !!idProduct;
  // const [values, setValues] = useState({
  //   oldprice: "",
  //   newprice: "",
  //   stock: ""
  // });

  // const handleChangeInput = (e,field) => {
  //   let inputValue = e?.target?.value || ""; // Nếu undefined thì dùng chuỗi rỗng
  // let rawValue = inputValue.replace(/\./g, ""); // Xóa dấu chấm khi nhập
  // if (!/^\d*$/.test(rawValue)) return; // Chỉ cho phép nhập số

  // let formattedValue = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thêm dấu chấm mỗi 3 số

  // setValues((prev) => ({
  //   ...prev,
  //   [field]: formattedValue, // Cập nhật giá trị của input cụ thể
  // }));
  // };

  //console.log(categories);

  // Lấy danh sách danh mục từ API khi component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/category");
        setCategories(response.data.data); // Lưu dữ liệu vào state
      } catch (error) {
        message.error("Failed to load categories");
      }
    };
  
  const fetchProduct = async () => {
    if (!isEditMode) return;
    try {
      const response = await api.get(`/product/${idProduct}`);
      const product = response.data.data;
      // console.log(product.newPrice.toString());
      if(product){
        setTimeout(() => { form.setFieldsValue({
          nameProdcut: product.nameProdcut || "",
          tilteProdcut: product.tilteProdcut || "",
          descripProdcut: product.descripProdcut || "",
          oldPrice: product.oldPrice ? product.oldPrice.toString() : "",
            newPrice: product.newPrice ? product.newPrice.toString() : "",
            stockProduct: product.stockProduct ? product.stockProduct.toString() : "",
          idCate: product.idCate ? product.idCate.toString() : "",
        
        });
    // console.log("Form values after set:", form.getFieldsValue());

      }, 100);
      
     
      const images = JSON.parse(product.imgProduct || "[]").map((url, index) => ({
        uid: `-${index}`,
        name: `image-${index}.jpg`,
        status: "done",
        url: url.startsWith("/") ? `${BASE_URL}${url}` : url,
      }));
      setFileList(images);
    }else {
      console.error("No product data found in response");
    }
    } catch (error) {
      message.error("Failed to load product data");
    }
  };

  fetchCategories();
  fetchProduct();
  }, [form, idProduct, isEditMode]);

  // Xử lý preview ảnh
  const handlePreview = (file) =>
    __awaiter(void 0, void 0, void 0, function* () {
      if (!file.url && !file.preview) {
        file.preview = yield getBase64(file.originFileObj);
      }
      setPreviewImage(file.url || file.preview);
      setPreviewOpen(true);
    });

  // Xử lý thay đổi fileList
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  // Nút upload
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  // const formatNumber = (value) => {
  //   if (!value || isNaN(value)) return "";
  //   const rawValue = value.toString().replace(/\./g, "");
  //   return rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  // };

  // const parseNumber = (value) => {
  //   return value ? value.replace(/\./g, "") : "";
  // };

  // const formatNumber = (value) => {
  //   if (!value) return "";
  //   return new Intl.NumberFormat("vi-VN").format(value); // Format kiểu Việt Nam
  // };
  
  // const parseNumber = (value) => {
  //   return value.replace(/\./g, ""); // Xóa dấu "." khi nhập vào
  // };

  // Xử lý submit form
  const onFinish = async (values) => {
  //   console.log("idCate:", values.idCate); // Log để kiểm tra
  //   console.log("Form values:", values); // Kiểm tra tất cả giá trị
  // console.log("descripProdcut:", values.descripProdcut); // Kiểm tra riêng descripProdcut
    setLoading(true);
    const formData = new FormData();

    // Thêm các trường dữ liệu vào formData
    formData.append("nameProdcut", values.nameProdcut || "");
    formData.append("tilteProdcut", values.tilteProdcut || ""); // Sửa lỗi typo từ titleProdcut
    formData.append("descripProdcut", values.descripProdcut || "");
    formData.append("oldPrice", values.oldPrice || "");
    formData.append("newPrice", values.newPrice || "");
    formData.append("idCate", values.idCate || "");
    formData.append("stockProduct", values.stockProduct || ""); // Sửa tên field từ stock thành stockProduct


    // Xử lý ảnh trong chế độ edit
    if (isEditMode) {
      // Gửi danh sách URL của ảnh cũ
      const existingImages = fileList
        .filter((file) => !file.originFileObj) // Lấy các ảnh cũ (không có originFileObj)
        .map((file) => file.url.replace(`${BASE_URL}`, "")); // Chuẩn hóa URL về dạng backend mong muốn
      formData.append("existingImages", JSON.stringify(existingImages));
    }

    // Gửi các ảnh mới
    // Thêm các file ảnh vào formData
    
    fileList.forEach((file) => {
      // console.log(file);
      if (file.originFileObj) {
        formData.append("imgProduct", file.originFileObj); // Tên field phải khớp với backend (upload.array('images'))
      }
    });

    // formData.forEach((value, key) => {
    //   console.log(`${key}:`, value);
    // });
  

    try {
      if (isEditMode) {
        // console.log(isEditMode);
        const response = await api.put(
          `/product/${idProduct}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        // console.log(response.data);
        message.success("Product updated successfully!");
      } else {
      const response = await api.post(
        "/product/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(response.data);
      message.success("Product created successfully!");
    
    }
    form.resetFields(); // Reset form sau khi thành công
    setFileList([]); // Xóa danh sách ảnh
    // console.log("Form values after reset:", form.getFieldsValue());
      // setCategories([]);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };
  // const [category, setCategory] = React.useState("");

  // const handleChange = (event) => {
  //   setCategory(event.target.value);
  // };
  
  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="w-full h-full"
      initialValues={{
        nameProdcut: "",
        tilteProdcut: "",
        descripProdcut: "",
        oldPrice: "",
        newPrice: "",
        stockProduct: "", // Khớp với backend
        idCate: categories.length > 0 ? categories[0].idCategory.toString() : undefined,
      }}
    >
      <div className="form-container vertical flex flex-col w-full justify-between">
        <div className="flex gap-4 ">
          <div className="w-[65%] flex flex-col gap-6">
            <div className="flex bg-white py-6 border rounded-md flex-col gap-4">
            <div className="upload px-4 pb-6">
          <h2 className="text-[24px]">{isEditMode ? "Edit Product" : "Create Product"}</h2>
        </div>
              <div className="card px-4">
                <h2 className="text-[20px] mb-6">Basic infomation</h2>

                <div className="">
                  <div className="form-item vertical">
                    <Form.Item
                      label="Product Name"
                      name="nameProdcut"
                      rules={[
                        {
                          required: true,
                          message: "Please input Product Name",
                        },
                      ]}
                    >
                        <Input
                          className="w-full py-3 px-5 text-[16px] border focus:bg-white focus:outline-none focus:border-primary focus:!ring-primary focus-within:!ring-primary focus-within:!border-primary rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]"
                          type="text"
                        />
                    </Form.Item>
                  </div>

                  <div className="form-item vertical">
                    <Form.Item
                      label="Title"
                      name="tilteProdcut"
                      rules={[
                        {
                          required: true,
                          message: "Please input Product Title",
                        },
                      ]}
                    >
                        <Input
                          className="w-full py-3 px-5 text-[16px] border focus:bg-white focus:outline-none focus:border-primary focus:!ring-primary focus-within:!ring-primary focus-within:!border-primary rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]"
                          type="text"
                          name="product title"
                          id=""
                        />
                    </Form.Item>
                  </div>
                  <div className="form-item vertical">
                    
                    <div>
                      <Form.Item
                        label="Description"
                        name="descripProdcut"
                        rules={[
                          {
                            required: true,
                            message: "Please input Description",
                          },
                        ]}
                        getValueFromEvent={(value) => value}
                      >
                        <TextEditor
                          value={form.getFieldValue("descripProdcut") || ""} // Giá trị từ form
                          onChange={(value) =>
                            form.setFieldsValue({ descripProdcut: value })
                          } // Cập nhật form
                        />
                      </Form.Item>
                      {/* <textarea
                        className="w-full mb-3 py-3 px-5 text-[16px] border focus:bg-white focus:outline-none focus:border-primary focus:!ring-primary focus-within:!ring-primary focus-within:!border-primary rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]"
                        type="text"
                        name="product name"
                        id=""
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex bg-white py-6 border rounded-md flex-col gap-4">
              <div className="card px-4">
                <h2 className="text-[20px] mb-6">Price</h2>

                <div className="">
                  <div className="form-item flex w-full gap-4 vertical">
                    <div className="old-price w-full">
                      <Form.Item
                        label="Old Price"
                        name="oldPrice"
                        rules={[
                          {
                            required: true,
                            message: "Please input Old Price",
                          },
                        ]}
                        // getValueFromEvent={(e) => parseNumber(e.target.value)} // Chuyển về số nguyên khi submit
                      >
                          <InputNumber
                          min={0}
                          formatter={(value) =>
                            value ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""
                          }
                          parser={(value) => value.replace(/\./g, "")} // Xóa dấu chấm khi nhập
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) event.preventDefault(); // Chỉ cho nhập số
                          }}
                            className="w-full py-2 text-[16px] border focus:bg-white focus:outline-none focus:border-primary focus:!ring-primary focus-within:!ring-primary focus-within:!border-primary rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]"
                          
                          />
                      </Form.Item>
                    </div>

                    <div className="new-price w-full">
                      <Form.Item
                        label="New Price"
                        name="newPrice"
                        rules={[
                          {
                            required: true,
                            message: "Please input New Price",
                          },
                        ]}
                        // getValueFromEvent={(e) => parseNumber(e.target.value)} // Chuyển về số nguyên khi submit
                      >
                          <InputNumber
                          formatter={(value) =>
                            value ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""
                          }
                          parser={(value) => value.replace(/\./g, "")} // Xóa dấu chấm khi nhập
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) event.preventDefault(); // Chỉ cho nhập số
                          }}
                            className="w-full py-2 text-[16px] border focus:bg-white focus:outline-none focus:border-primary focus:!ring-primary focus-within:!ring-primary focus-within:!border-primary rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]"
                            type="text"
                            name="new price"
                            id=""
                          />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="form-item vertical">
                    <Form.Item
                      label="Stock"
                      name="stockProduct"
                      rules={[
                        {
                          required: true,
                          message: "Please input Stock",
                        },
                      ]}
                      // getValueFromEvent={(e) => parseNumber(e.target.value)} // Chuyển về số nguyên khi submit
                    >
                        <InputNumber
                        formatter={(value) =>
                          value ? value.replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""
                        }
                        parser={(value) => value.replace(/\./g, "")} // Xóa dấu chấm khi nhập
                        onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) event.preventDefault(); // Chỉ cho nhập số
                        }}
                          className="w-full py-2 text-[16px] border focus:bg-white focus:outline-none focus:border-primary focus:!ring-primary focus-within:!ring-primary focus-within:!border-primary rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]"
                          
                        />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" w-[35%]">
            <div className="flex flex-col gap-6">
              <div className="card border py-6 rounded-md bg-white px-4">
                <h2 className="text-[20px] mb-6">Product Image</h2>

                {/* <div className="">
                  <div className="form-item vertical">
                    <div className="mb-3">
                      <label className="form-label">
                        Choose a product photo or simply drag and drop up to 5
                        photos here.
                      </label>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                      <div className="border flex items-center justify-center relative min-h-fit border-dashed">
                        <input
                          className="w-full absolute inset-0 cursor-pointer block opacity-0 text-[16px] "
                          type="file"
                          name="product name"
                          id=""
                        />

                        <div className="max-w-full flex flex-col justify-center items-center min-h-[130px]">
                          <div className="text-[50px]">
                            <svg
                              stroke="currentColor"
                              fill="currentColor"
                              viewBox="0 0 256 256"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M216,44H72A12,12,0,0,0,60,56V76H40A12,12,0,0,0,28,88V200a12,12,0,0,0,12,12H184a12,12,0,0,0,12-12V180h20a12,12,0,0,0,12-12V56A12,12,0,0,0,216,44ZM68,56a4,4,0,0,1,4-4H216a4,4,0,0,1,4,4v72.4l-16.89-16.89a12,12,0,0,0-17,0l-22.83,22.83L116.49,87.51a12,12,0,0,0-17,0L68,119ZM188,200a4,4,0,0,1-4,4H40a4,4,0,0,1-4-4V88a4,4,0,0,1,4-4H60v84a12,12,0,0,0,12,12H188Zm28-28H72a4,4,0,0,1-4-4V130.34l37.17-37.17a4,4,0,0,1,5.66,0l49.66,49.66a4,4,0,0,0,5.65,0l25.66-25.66a4,4,0,0,1,5.66,0L220,139.71V168A4,4,0,0,1,216,172ZM164,84a8,8,0,1,1,8,8A8,8,0,0,1,164,84Z"></path>
                            </svg>
                          </div>
                          <p className="text-center mt-1 text-xs">
                            <span className="text-gray-800 dark:text-white">
                              Drop your image here, or
                            </span>
                            <span className="text-primary">
                              Click to browse
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  beforeUpload={() => false} // Ngăn upload tự động, xử lý trong onFinish
                >
                  {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                  <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                      visible: previewOpen,
                      onVisibleChange: (visible) => setPreviewOpen(visible),
                      afterOpenChange: (visible) =>
                        !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                  />
                )}
              </div>

              <div className="card  py-6 border rounded-md bg-white px-4">
                <h2 className="text-[22px] mb-6">Attribute</h2>

                <div className="form-item vertical">
                  <div className="select mt-4">
                    <Form.Item
                      label="Category"
                      name="idCate"
                      rules={[
                        { required: true, message: "Please select a category" },
                      ]}
                      initialValue={
                        categories.length > 0
                          ? categories[0].idCategory.toString()
                          : undefined
                      } // Giá trị mặc định
                    >
                      <Select
                        showSearch
                        placeholder="Search to Select"
                        optionFilterProp="label"
                        options={categories.map((category) => ({
                          value: category.idCategory.toString(),
                          label: category.nameCategory,
                        }))}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-0 left-0 right-0 z-10 mt-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800  py-4 sticky">
          <div className="container mx-auto">
            <div className="flex items-center justify-end px-8">
              <div className="flex gap-4 items-center">
                <NavLink to='/product/product-list'>
                <Button
                  className="button !border !border-solid !border-[#ff5151] !h-12 !rounded-xl !px-5 !py-2 bg-transparent"
                  type="button"
                >
                  <span className="flex gap-1 items-center justify-center">
                    <span className="flex items-center gap-3 text-[#ff5252]">
                    
                      Cancel
                    </span>
                  </span>
                </Button>
                </NavLink>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  className="button !h-12 !rounded-xl !px-5 !py-2 !bg-primary !text-white"
                >
                {isEditMode ? "Update" : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default ProductForm;
