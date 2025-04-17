import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import BASE_URL from "../../config";


const CategoryForm = ({ initialData, onSubmit, loading, mode = "edit" }) => {

  const [form] = Form.useForm();
  const [imgCatePreview, setImgCatePreview] = useState(
    initialData?.data?.imgCate || null
  );
  // console.log("form img data",initialData?.data?.imgCate);
  // console.log("img data",imgCatePreview); 



  const [imgCateFile, setImgCateFile] = useState(null);
  useEffect(() => {
    // console.log("useEffect triggered", { initialData, mode });
    // console.log("useEffect triggered", { initialData });
    // console.log('test',mode === "edit" && initialData.data);
    if (mode === "edit" && initialData?.data) {
    // console.log('test',mode === "edit" && initialData.data);

      const currentValues = form.getFieldsValue();
      // console.log('curr value',currentValues);
      const newValues = {
        nameCategory: initialData.data.nameCategory,
        imgCate: initialData.data.imgCate,
      };
      // console.log("Current values:", currentValues);
      // console.log("New values:", newValues);
      form.setFieldsValue(newValues);

      if (JSON.stringify(currentValues) !== JSON.stringify(newValues)) {
        // console.log("Form updated with:", newValues);

        form.setFieldsValue(newValues);
      }
      // setAvatarPreview(initialData.Avatar || null);
      if (imgCatePreview !== (initialData.data.imgCate || null)) {
        setImgCatePreview(initialData.data.imgCate || null);
      }
      //   setImgCatePreview(initialData.imgCate || null);
    } else {
      form.resetFields();
      setImgCatePreview(null);
    }
  }, [initialData?.data, mode]);

  const handleFinish = async (values) => {
    // console.log(
    //   `${mode === "create" ? "Creating" : "Updating"} with values:`,
    //   values
    // );
    onSubmit(values, imgCateFile, imgCatePreview);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const isImage = file.type.startsWith("image/");
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isImage) {
        alert("You can only upload image files!");
        return;
      }
      if (!isLt2M) {
        alert("Image must be smaller than 2MB!");
        return;
      }
      setImgCateFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImgCatePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setImgCatePreview(null);
    setImgCateFile(null);
  };
  // console.log("FormCate render");

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={handleFinish}
      autoComplete="off"
      initialValues={(mode === "create" && initialData) || {}}
      className="w-full"
    >
      <div className="w-full">
        <Form.Item
          label="Name"
          name="nameCategory"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input className="w-full mb-3 py-3 px-5 text-[16px] border focus:bg-white rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]" />
        </Form.Item>

        <Form.Item label="Image">
          <div className="relative w-full border border-dashed border-gray-300 rounded-md min-h-[150px] flex justify-center items-center">
            <input
              className="w-full absolute inset-0 cursor-pointer block opacity-0 text-[16px]"
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              disabled={loading}
            />
            {imgCatePreview ? (
              <div className="relative">
                <img
                  src={
                    imgCatePreview.startsWith("/")
                      ? `${BASE_URL}${imgCatePreview}`
                      : imgCatePreview
                  }
                  alt="Img Cate Preview"
                  className="w-full max-w-full max-h-[150px] object-contain"
                />
                {imgCatePreview && (
                  <Button
                    disabled={loading}
                    onClick={handleRemoveAvatar}
                    className="absolute !rounded-full !p-0 !top-0 !right-0 !w-[20px] !h-[20px]"
                    danger
                  >
                    <IoClose />
                  </Button>
                )}
              </div>
            ) : (
              <div className="max-w-full flex flex-col justify-center items-center min-h-[150px]">
                <div className="text-[50px] text-gray-400">
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
                  <span className="text-primary">Click to browse</span>
                </p>
              </div>
            )}
          </div>
        </Form.Item>

        <Form.Item label={null}>
        <NavLink to="/categories/list">
                  <Button
                    className="button !border mr-5 !border-solid !border-[#ff5151] !h-12 !rounded-xl !px-5 !py-2 bg-transparent"
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
            className="button !h-12 !rounded-xl !px-5 !py-2 !bg-primary !text-white"
            htmlType="submit"
            loading={loading}
          >
            {mode === "create" ? "Create" : "Save"}
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default CategoryForm;
