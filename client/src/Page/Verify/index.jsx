import React, { useEffect, useState } from "react";
import OtpBox from "../../components/OtpBox";
// import {  } from "@mui/material";
import { Form, Button, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import NotFound from "../../components/NotFound";
import api from "../../api";

const Verify = () => {
  // const [otp, setOtp] = useState("");
  // const handleOtpChange = (value) => {
  //   setOtp(value);
  // };
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0); // Khởi tạo 0, sẽ tính sau
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || localStorage.getItem("otpEmail"); // Lấy email từ Register
  const [otpError, setOtpError] = useState("");

  // Tính thời gian còn lại khi tải trang
  useEffect(() => {
    //Luôn truyền 10 vào parseInt khi làm việc với số trong localStorage để tránh lỗi không mong muốn
    const startTime = parseInt(localStorage.getItem("otpStartTime"), 10); //chuyển otpStartTime sang kiểu int hệ thập phân (10),
    // vì nếu không có số 10 giá trị otpStartTime có giá trị bắt đầu bằng số 0 phía trước sẽ hiểu về hệ bát phân
    // ví dụ otpStartTime = 0123 sẽ chuyển về bát phân thành 83
    // console.log(startTime);
    const totalDuration = 2 * 60 * 1000; // 2 phút tính bằng milliseconds
    // console.log(Date.now() - startTime);
    if (startTime) {
      const elapsedTime = Date.now() - startTime; // Thời gian đã trôi qua
      const remainingTime = Math.max(0, totalDuration - elapsedTime); // Thời gian còn lại
      setTimeLeft(Math.floor(remainingTime / 1000)); // Chuyển sang giây
    } else {
      // Nếu không có startTime (trường hợp bất thường), chuyển về đăng ký
      navigate("/register");
    }
  }, [navigate]);

  // Đếm ngược thời gian
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup khi component unmount hoặc re-render
  }, [timeLeft]);

  if (!email) {
    return (
      <>
        <NotFound />
      </>
    );
  }
  // Đếm ngược thời gian

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
  };
  const handleOtpSubmit = async (otp) => {
    setLoading(true);

    try {
      const response = await api.post(
        "/user/verify-otp",
        { email, otpCode: otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      message.success("Xác minh OTP thành công! Đăng ký hoàn tất.");
      localStorage.removeItem("otpStartTime"); // Xóa sau khi xác minh thành công
      localStorage.removeItem("otpEmail");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      setOtpError(""); // Xóa lỗi nếu thành công
    } catch (error) {
      // console.log("Error from API:", error.response);
      const errorMessage =
        error.response?.data?.message || "Đã xảy ra lỗi không xác định";
      setOtpError(errorMessage);
      switch (error.response?.status) {
        case 400:
          message.error(errorMessage); // "OTP không đúng" hoặc "OTP đã hết hạn"
          break;
        case 404:
          message.error("Email không tồn tại");
          break;
        case 500:
          message.error("Lỗi server, vui lòng thử lại sau");
          break;
        default:
          message.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);

    try {
      const response = await api.post(
        "/user/resendOtp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      message.success("OTP mới đã được gửi đến email của bạn!");
      const newStartTime = Date.now();
      localStorage.setItem("otpStartTime", newStartTime); // Cập nhật thời gian mới
      setTimeLeft(120); // Reset đếm ngược về 2 phút
    } catch (error) {
      // console.log("Error from API:", error.response);
      const errorMessage =
        error.response?.data?.message || "Đã xảy ra lỗi không xác định";
      switch (error.response?.status) {
        case 404:
          message.error("Email không tồn tại");
          break;
        case 500:
          message.error("Lỗi server, vui lòng thử lại sau");
          break;
        default:
          message.error(errorMessage);
      }
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-10">
          <div className="text-center flex items-center justify-center">
            <img width="80" src="/cyber-security.png" alt="verify" />
          </div>
          <h3 className="text-center text-[18px] mt-4 text-black">
            Xác thực mã OTP
          </h3>
          <p className="text-center mt-3">
            OTP sẽ gửi đến{" "}
            <span className="text-primary font-[600]">
              <strong>{email}</strong>
            </span>
          </p>

          <Form form={form} layout="vertical" initialValues={{ otpCode: "" }}>
            <OtpBox length={6} onOtpSubmit={handleOtpSubmit} error={otpError} />

            <div className="text-center mt-4">
              <p className="mb-3">
                Thời gian còn lại:{" "}
                <span className="font-bold">{formatTime(timeLeft)}</span>
              </p>
              {timeLeft === 0 && (
                <p className="mb-3 text-red-500">
                  Mã OTP đã hết hạn. Vui lòng gửi lại.
                </p>
              )}
            </div>
            {/* <div className="flex items-center justify-center mt-5">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className="btn-pri !px-8 h-[50px] !py-3 w-full"
                  disabled={loading} // Vô hiệu hóa nút khi đang xử lý
                >
                  {loading ? "Đang xử lý..." : "Xác minh"}
                </Button>
              </Form.Item>
            </div> */}

            <Form.Item>
              <Button
                className="!px-8 h-[50px] !py-3 w-full"
                type="default"
                onClick={handleResendOtp}
                loading={resendLoading}
                block
                disabled={resendLoading || timeLeft > 0} // Chỉ cho gửi lại khi hết thời gian
              >
                {resendLoading ? "Đang gửi..." : "Gửi lại OTP"}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Verify;
