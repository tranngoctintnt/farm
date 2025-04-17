import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Form, Button, Input, message } from "antd";
// import { Button } from "@mui/material";
import axios from "axios";
import api from "../../api";

message.config({
  top: 10, // Cách đỉnh màn hình 10px
  right: 10,
  duration: 2, // Hiển thị trong 2 giây
  maxCount: 1, // Chỉ hiển thị 1 thông báo cùng lúc
});
const Register = () => {
  const [form] = Form.useForm(); // Sử dụng Form của antd
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const response = await api.post(
        "/user/register", // Giả định endpoint API
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Lưu thời gian bắt đầu OTP vào localStorage
      const startTime = Date.now();
      localStorage.setItem("otpStartTime", startTime);
      localStorage.setItem("otpEmail", values.email); // Lưu email để Verify kiểm tra
      // Đăng ký thành công
      message.success("OTP đã được gửi đến email của bạn!");
      setTimeout(() => {
        navigate("/verify", { state: { email: values.email } }); // Chuyển hướng với email
      }, 2000);
    } catch (error) {
      // Xử lý lỗi từ API
      // console.log("Error from API:", error.response);
      const errorMessage =
        error.response?.data?.message || "Đã xảy ra lỗi không xác định";
      // console.log(error.response?.status);
      switch (error.response?.status) {
        case 409: // Email hoặc phone đã tồn tại
          message.error(errorMessage);
          break;
        case 400: // Thiếu trường bắt buộc
          message.error("Vui lòng điền đầy đủ các trường bắt buộc");
          break;
        case 500: // Lỗi server
          message.error("Lỗi server, vui lòng thử lại sau");
          break;
        default:
          message.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };
  // Hàm ngăn nhập ký tự không phải số
  const handleNumberOnly = (e) => {
    const charCode = e.charCode;
    if (charCode < 48 || charCode > 57) {
      e.preventDefault(); // Ngăn không cho nhập ký tự không phải số
    }
  };
  return (
    <section className="section py-10 bg-[#f9f9f9]">
      <div className="container">
        <div className="card shadow-lg w-[31.25rem] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[1.4rem] font-[600] text-black font-a">
            Đăng ký tài khoản
          </h3>

          <Form
            onFinish={handleSubmit}
            form={form}
            initialValues={{
              fullName: "",
              email: "",
              phone: "",
              password: "",
            }}
            layout="vertical"
            className="w-full mt-5"
          >
            <div className="form-item vertical">
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[
                  { required: true, message: "Vui lòng nhập họ và tên!" },
                ]}
              >
                <Input
                  placeholder="Nhập họ và tên"
                  className="w-full py-3 px-5 text-[16px] border focus:bg-white focus:outline-none focus:border-primary focus:!ring-primary focus-within:!ring-primary focus-within:!border-primary rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]"
                />
              </Form.Item>
            </div>
            <div className="form-group mt-5 w-full">
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Số điện thoại phải là 10 chữ số!",
                  },
                ]}
              >
                <Input
                  placeholder="Nhập số điện thoại"
                  onKeyPress={handleNumberOnly} // Chỉ cho phép nhập số
                  maxLength={10} // Giới hạn 10 ký tự
                  inputMode="numeric" // Hiển thị bàn phím số trên mobile
                  className="w-full py-3 px-5 text-[16px] border focus:bg-white focus:outline-none focus:border-primary focus:!ring-primary focus-within:!ring-primary focus-within:!border-primary rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]"
                />
              </Form.Item>
            </div>
            <div className="form-group mt-5 w-full">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email!" },
                  { type: "email", message: "Email không hợp lệ!" },
                ]}
              >
                <Input
                  placeholder="Nhập email"
                  className="w-full py-3 px-5 text-[16px] border focus:bg-white focus:outline-none focus:border-primary focus:!ring-primary focus-within:!ring-primary focus-within:!border-primary rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]"
                />
              </Form.Item>
            </div>

            <div className="form-group w-full my-5 relative">
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Vui lòng nhập mật khẩu!" },
                  {
                    min: 8,
                    message: "Mật khẩu phải có ít nhất 8 ký tự!",
                  },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                    message:
                      "Mật khẩu phải chứa chữ hoa, chữ thường và ký tự đặc biệt!",
                  },
                ]}
              >
                <Input.Password placeholder="Nhập password" className="w-full py-3 px-5 text-[16px] border focus:bg-white focus:outline-none focus:border-primary focus:!ring-primary focus-within:!ring-primary focus-within:!border-primary rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]" />
              </Form.Item>
            </div>

            {/* <a className="link cursor-pointer text-[0.94rem] font-[600] !py-4">Quên mật khẩu?</a> */}

            <div className="flex items-center justify-center mt-3">
              <Form.Item className="m-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className="btn-pri !px-8 h-[50px] !py-3 w-full"
                >
                  {loading ? "Đang xử lý..." : "Đăng Ký"}
                </Button>
              </Form.Item>
            </div>

            <p className="text-center mt-3">
              Đã có sẵn tài khoản?
              <Link
                to="/login"
                className="link text-primary text-[0.93rem] font-[600]"
              >
                Đăng nhập
              </Link>
            </p>

            <p className="text-center font-[500] mt-3">
              Hoặc tiếp tục đăng nhập với tài khoản Google
            </p>

            <Button className="flex gap-3 h-[50px] !mt-3 w-full !py-3 !text-black !bg-[#fafafa]">
              <FcGoogle className="text-[1.3rem]" />
              Đăng nhập với Google
            </Button>
          </Form>
        </div>
      </div>
    </section>
  );
};
export default Register;
