import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Select, Switch } from "antd";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import api from "../../api";
import BASE_URL from "../../config";

const { Option } = Select;

const FormAdmin = ({ initialData, onSubmit, loading, mode = "edit" }) => {
  // console.log('data form', initialData);
  const [form] = Form.useForm();
  // console.log('form', form);
  const [avatarPreview, setAvatarPreview] = useState(
    initialData?.Avatar || null
  );
  const [avatarFile, setAvatarFile] = useState(null);
  const [roleLoading, setRoleLoading] = useState(false);
  const [switchLoading, setSwitchLoading] = useState(false); // Local loading state
  const [isModified, setIsModified] = useState(false); // Track manual changes

  useEffect(() => {
    // console.log("useEffect triggered", { initialData, form });
    // console.log("useEffect triggered", { initialData, mode });
    // console.log("useEffect triggered", { initialData, isModified });
    if (mode === "edit" && initialData && !isModified) {
      const currentValues = form.getFieldsValue();
      const newValues = {
        fullName: initialData.fullName,
        username: initialData.username,
        password: initialData.passwordHash,
        email: initialData.email,
        role: initialData.role,
        phone: initialData.phone,
        isActive:
          currentValues.isActive !== undefined
            ? currentValues.isActive
            : initialData.isActive, // Preserve current Switch state
        // passwordHash: initialData.passwordHash || "",
        Avatar: initialData.Avatar,
      };
      // console.log("Current values:", currentValues);
      // console.log("New values:", newValues);

      if (JSON.stringify(currentValues) !== JSON.stringify(newValues)) {
        form.setFieldsValue(newValues);
        // console.log("Form updated with:", newValues);
      }
      // setAvatarPreview(initialData.Avatar || null);
      if (avatarPreview !== (initialData.Avatar || null)) {
        setAvatarPreview(initialData.Avatar || "/user.jpg");
      }
    } else if (mode === "create") {
      form.setFieldsValue({
        isActive: true, // Default for new account
        role: "Admin", // Default role
      });
    }
  }, [initialData, mode]);

  const handleFinish = (values) => {
    // values.Avatar = avatarPreview; // Include the avatar in the form submission
    // console.log(
    //   `${mode === "create" ? "Creating" : "Updating"} with values:`,
    //   values
    // );
    onSubmit(values, avatarFile, avatarPreview);
    setIsModified(false); // Reset after submission
  };
  const handleFileChange = (e) => {
    // e.preventDefault();
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
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target.result); // Set base64 string for preview and submission
      };
      reader.readAsDataURL(file);
      setIsModified(true); // Mark as modified
    }
  };
  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    setAvatarFile(null); // Clear file as well
    setIsModified(true);
  };

  const handleSwitchChange = async (checked) => {
    if (mode === "create" || !initialData?.idAdminUser) {
      // console.log(
      //   "Switch change skipped in create mode or missing idAdminUser"
      // );
      return; // Skip if creating or no ID
    }

    // console.log("Switch changed to:", checked);
    if (switchLoading) return;

    setSwitchLoading(true);
    form.setFieldsValue({ isActive: checked });
    // if (mode === "create") return;
    // console.log("Switch changed to:", checked);
    // if (switchLoading) return;

    // setSwitchLoading(true);
    // form.setFieldsValue({ isActive: checked }); // Update form state

    try {
      
      const response = await api.put(
        `/admin-users/${initialData.idAdminUser}`,
        { isActive: checked },
       
      );
      // console.log("Status updated:", response.data);
      message.success("User status updated successfully");
    } catch (error) {
      console.error("Failed to update status:", error);
      message.error("Failed to update status");
      form.setFieldsValue({ isActive: !checked }); // Revert on failure
    } finally {
      setSwitchLoading(false);
    }
  };

  const handleRoleChange = async (value) => {
    if (mode === "create" || !initialData?.idAdminUser) {
      // console.log("Role change skipped in create mode or missing idAdminUser");
      return; // Skip if creating or no ID
    }

    // console.log("Role changed to:", value);
    if (roleLoading) return;

    setRoleLoading(true);
    const originalValue = form.getFieldValue("role");
    form.setFieldsValue({ role: value });
    // if (mode === "create") return;
    // console.log("Role changed to:", value);
    // if (roleLoading) return;

    // setRoleLoading(true);
    // const originalValue = form.getFieldValue("role");
    // form.setFieldsValue({ role: value }); // Optimistic update

    try {
      const response = await api.put(
        `/admin-users/${initialData.idAdminUser}`,
        { role: value },
        { withCredentials: true }
      );
      // console.log("Role update response:", response.data);
      message.success("User role updated successfully");
    } catch (error) {
      console.error("Failed to update role:", error);
      message.error("Failed to update role");
      form.setFieldsValue({ role: originalValue }); // Revert on failure
    } finally {
      setRoleLoading(false);
    }
  };

  // console.log("FormAdmin render");

  // console.log("FormAdmin render");

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={
        mode === "create"
          ? { isActive: true, role: "Admin" }
          : initialData || {}
      }
      className="w-full px-8 flex h-full"
    >
      <div className="form-container vertical flex flex-col w-full justify-between">
        <div className="flex gap-4 ">
          <div className="w-[65%] flex flex-col gap-6">
            <div className="flex bg-white py-6 border rounded-md flex-col gap-4">
              <div className="card px-4">
                <h2 className="text-[20px] mb-6">Basic infomation</h2>

                <div className="">
                  <div className="form-item flex w-full gap-4 vertical">
                    <div className="olf-price w-full">
                      <Form.Item
                        label="Full Name"
                        name="fullName"
                        rules={[
                          {
                            required: true,
                            message: "Please input Full Name",
                          },
                        ]}
                      >
                        <Input className="w-full mb-3 py-3 px-5 text-[16px] border focus:bg-white rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]" />
                      </Form.Item>
                    </div>

                    <div className="new-price w-full">
                      <Form.Item
                        label="Phone"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Please input phone number",
                          },
                        ]}
                      >
                        <Input
                          disabled={loading}
                          className="w-full mb-3 py-3 px-5 text-[16px] border focus:bg-white rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]"
                        />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="form-item vertical">
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please input email",
                        },
                      ]}
                    >
                      <Input className="w-full mb-3 py-3 px-5 text-[16px] border focus:bg-white rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]" />
                    </Form.Item>
                  </div>
                  <div className="form-item flex w-full gap-4 vertical">
                    <div className="w-full">
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                          {
                            required: true,
                            message: "Please input your username!",
                          },
                        ]}
                      >
                        <Input
                          disabled={mode === "edit" ? true : false}
                          className="w-full mb-3 py-3 px-5 text-[18px] border focus:bg-white rounded-md border-[rgba(0,0,0,0.1)] !bg-[#f1f1f1]"
                        />
                      </Form.Item>
                    </div>

                    <div className="w-full">
                      <Form.Item
                        label="Password"
                        name="passwordHash"
                        rules={[
                          {
                            required: mode === "create",
                            min: 8,
                            message: "Password must be at least 6 characters",
                            validator: (_, value) =>
                              !value || value.length >= 8
                                ? Promise.resolve()
                                : Promise.reject(),
                          },
                        ]}
                      >
                        <Input.Password className="w-full mb-3 py-3 px-5 text-[16px] border focus:bg-white rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]" />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" w-[35%]">
            <div className="flex flex-col gap-6">
              <div className="card border py-6 rounded-md bg-white px-4">
                <h2 className="text-[20px] mb-6">Product Image</h2>

                <div className="">
                  <div className="form-item vertical">
                    <div className="mb-3">
                      <label className="form-label text-[18px]">Avatar</label>
                    </div>

                    <div className="grid">
                      <div className="flex items-center justify-center">
                        <Form.Item>
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
                            {avatarPreview ? ( 
                              <div className="relative">
                                <img
                                  src={
                                    avatarPreview.startsWith("/")
                                      ? `${BASE_URL}${avatarPreview}` // Existing URL from server
                                      : avatarPreview // New preview from FileReader
                                  }
                                  alt="Avatar Preview"
                                  className="max-w-full max-h-[150px] object-contain"
                                />
                                {avatarPreview && (
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
                                  <span className="text-primary">
                                    Click to browse
                                  </span>
                                </p>
                              </div>
                            )}
                          </div>
                        </Form.Item>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card  py-6 border rounded-md bg-white px-4">
                <h2 className="text-[22px] mb-6">Attribute</h2>
                <div className="flex items-center gap-1 mb-3">
                  {/* <h2 className="text-[16px] font-salute">Active</h2> */}
                  <Form.Item
                    name="isActive"
                    label="Status"
                    valuePropName="checked"
                  >
                    <Switch
                      checkedChildren="Active"
                      unCheckedChildren="Inactive"
                      disabled={loading || switchLoading || mode === "create"}
                      onChange={
                        mode === "edit" ? handleSwitchChange : undefined
                      }
                      // Disable during requests
                    />
                  </Form.Item>
                </div>

                <div className="form-item vertical">
                  <div className="select mt-2">
                    <Form.Item
                      name="role"
                      label="Role"
                      rules={[
                        { required: true, message: "Please select a role" },
                      ]}
                    >
                      <Select
                        onChange={
                          mode === "edit" ? handleRoleChange : undefined
                        }
                        disabled={loading || roleLoading}
                        
                        // Disable during updates
                      >
                        <Option value="Admin">Admin</Option>
                        <Option value="Super-Admin">Super-Admin</Option>
                        {/* Add more roles as needed */}
                      </Select>
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
                <NavLink to="/account-admin/account-admin-list/">
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
                  className="button !h-12 !rounded-xl !px-5 !py-2 !bg-primary !text-white"
                  htmlType="submit"
                  loading={loading}
                >
                  {mode === "create" ? "Create" : "Save"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default FormAdmin;
