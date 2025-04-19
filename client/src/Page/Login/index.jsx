import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MyContext } from "../../App";
import { Form, Button, Input, message } from "antd";
// import axios from "axios";
import { useAuthUser } from "../../Context/AuthContextUser";
import api from "../../api";
// import { values } from "lodash";

const Login = () => {
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { user, setUser, loading: authLoading,accessToken,login } = useAuthUser();
//   const user = useAuthUser();
// console.log(user);
  const context = useContext(MyContext);
  // const [formFields, setFormFields] = useState({
  //   email:'',
  //   password:''
  // });
  useEffect(() => {
    // Xử lý redirect từ Google callback
    const query = new URLSearchParams(location.search);
    const error = query.get("error");
    const success = query.get("success");

    if (error) {
      message.error(
        error === "google_auth_failed"
          ? "Đăng nhập với Google thất bại"
          : "Lỗi máy chủ"
      );
    }

    if (success === "google_auth_success") {
      // Kiểm tra cookie và lấy thông tin user
      api
        .get("/auth/checkuser", { withCredentials: true })
        .then((response) => {
          setUser(response.data.user);
          message.success("Đăng nhập với Google thành công");
          navigate("/", { state: { message: "Login successful" } });
        })
        .catch(() => {
          message.error("Không thể xác thực người dùng");
        });
    }

    // Kiểm tra xem user đã đăng nhập chưa
    if (!authLoading && user) {
      navigate("/", { replace: true });
    }
  }, [user, authLoading, navigate, location, setUser]);

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/", { replace: true });
    }

    if (accessToken) {
      // Ví dụ: Giải mã token để lấy thông tin
      const payload = JSON.parse(atob(accessToken.split('.')[1]));
      console.log('Token payload:', payload);
    }

    // if (accessToken) {
    //   // Ví dụ: Giải mã token để lấy thông tin
    //   const payload = JSON.parse(atob(accessToken.split('.')[1]));
    //   console.log('Token payload:', payload);
    // }
  }, [user, authLoading, navigate,accessToken]);

  // const handleLogin = async (values) => {
  //   if (loading) return;
  
  //   setLoading(true);
  //   try {
  //     const response = await api.post(
  //       "/user/login",
  //       values,
  //       {
  //         withCredentials: true, // Gửi cookie
  //       }
      
  //     );
  //     setUser(response.data.user);
  //     console.log(response.data);
  //     // setAccessToken(response.data.accessToken);
  //     message.success("Đăng nhập thành công");
  //     navigate("/", { state: { message: "Login successful" } });
  //   } catch (err) {
  //     const errorMsg = err.response?.data?.message || "Đăng nhập thất bại.";
  //     form.setFields([
  //       { name: "email", errors: [errorMsg] },
  //       { name: "password", errors: [errorMsg] },
  //     ]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (accessToken) {
  //     // Ví dụ: Giải mã token để lấy thông tin
  //     const payload = JSON.parse(atob(accessToken.split('.')[1]));
  //     console.log('Token payload:', payload);
  //   }
  // }, [accessToken]);
  // const handleLogin = async (values) =>{
  //   try{
  //     await login(values);
  //         // setAccessToken(response.data.accessToken);
  //         message.success("Đăng nhập thành công");
  //         navigate("/", { state: { message: "Login successful" } });
  //   }catch(err){
  //     const errorMsg = err.response?.data?.message || "Đăng nhập thất bại.";
  //     form.setFields([
  //       { name: "email", errors: [errorMsg] },
  //       { name: "password", errors: [errorMsg] },
  //     ]);
  //   }finally {
  //         setLoading(false);
  //       }
  // }

  const handleLogin = async (credentials) => {
    await login(credentials);
    // message.success("Đăng nhập thành công");
    //     navigate("/", { state: { message: "Login successful" } });
  };

  const handleGoogleLogin = () => {
    // Chuyển hướng đến endpoint Google OAuth của backend
    window.location.href = `${api.defaults.baseURL}/auth/google`;
  };
  const fogotPassword = () => {
    context.openAlertBox("success", "OTP send");

    history("/verify");
  };
  return (
    <section className="section py-10 bg-[#f9f9f9]">
      <div className="container">
        <div className="card shadow-lg md:w-[31.25rem] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[1.4rem] font-[600] text-black font-a">
            Đăng nhập
          </h3>

          <Form
            onFinish={handleLogin}
            form={form}
            initialValues={{
              email: "",
              password: "",
            }}
            layout="vertical"
            className="w-full mt-5"
          >
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
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              >
                <Input.Password
                  placeholder="Nhập password"
                  className="w-full py-3 px-5 text-[16px] border focus:bg-white focus:outline-none focus:border-primary focus:!ring-primary focus-within:!ring-primary focus-within:!border-primary rounded-md border-[rgba(0,0,0,0.1)] bg-[#f1f1f1]"
                />
              </Form.Item>
            </div>

            <a
              className="link cursor-pointer text-[0.94rem] font-[600] !py-4"
              onClick={fogotPassword}
            >
              Quên mật khẩu?
            </a>

            <div className="flex items-center justify-center mt-3">
              <Form.Item className="m-0">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className="btn-pri !px-8 h-[50px] !py-3 w-full"
                >
                  {loading ? "Đang xử lý..." : "Đăng Nhập"}
                </Button>
              </Form.Item>
            </div>

            <p className="text-center mt-3">
              Chưa có tài khoản?{" "}
              <Link
                className="link text-primary text-[0.93rem] font-[600]"
                to="/register"
              >
                Đăng ký
              </Link>
            </p>

            <p className="text-center font-[500] mt-3">
              Hoặc tiếp tục đăng nhập với tài khoản Google
            </p>

            <Button  onClick={handleGoogleLogin} className="flex gap-3 h-[50px] !mt-3 w-full !py-3 !text-black !bg-[#fafafa]"><FcGoogle className="text-[1.3rem]"/>Đăng nhập với Google</Button>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
