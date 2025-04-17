import { Button } from "@mui/material";
import React, { useState } from "react";

import AccountSideBar from "../../components/AccountSideBar";
import { useAuthUser } from "../../Context/AuthContextUser";
// import { Menu } from "lucide-react"; // icon hamburger
// import LoadingComponent from "../../components/Loading";
import { Form, Input,Drawer  } from "antd";
import LoadingComponent from "../../components/Loading";

const MyAccount = () => {
  const {user} = useAuthUser();
  const [form] = Form.useForm();
  const [openSidebar, setOpenSidebar] = useState(false);
// console.log(user);
  if(!user){
    return <LoadingComponent/>
  }
  console.log(user);

  return (
  

<section className="py-10 bg-[#f9f9f9]  w-full">
  <div className="container flex flex-col lg:flex-row gap-5">
      {/* Sidebar */}
      <div className="col1 w-full lg:w-[30%]">
        <AccountSideBar />
      </div>
  
    {/* Main content */}
    <div className="w-full md:w-[70%]">
      <div className="bg-white shadow-md rounded-md p-5 w-full">
        <h2 className="pb-3 text-lg font-semibold">Thông tin cá nhân</h2>
        <hr className="mb-5" />

        <Form
          initialValues={{
            email: user.email,
            fullName: user.fullName,
            phone: user.phone,
          }}
          layout="vertical"
          form={form}
        >
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2">
              <Form.Item label="Họ và tên" name="fullName" className="mb-2">
                <Input
                  className="w-full py-3 px-5 text-[16px] border rounded-md border-gray-200 bg-gray-100 focus:bg-white"
                />
              </Form.Item>
            </div>
            <div className="w-full md:w-1/2">
              <Form.Item name="email" label="Email" className="mb-2">
                <Input
                  disabled
                  className="w-full py-3 px-5 text-[16px] border rounded-md border-gray-200 bg-gray-100"
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 mt-4">
            <div className="w-full md:w-1/2">
              <Form.Item name="phone" label="Số điện thoại">
                <Input
                  className="w-full py-3 px-5 text-[16px] border rounded-md border-gray-200 bg-gray-100 focus:bg-white"
                />
              </Form.Item>
            </div>
            <div className="w-full md:w-1/2">{/* Future input */}</div>
          </div>

          <div className="mt-6">
            <Button className="btn-pri w-[100px]">Lưu</Button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</section>

  );
};

export default MyAccount;
