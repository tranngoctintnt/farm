import React, { useContext, useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const FogotPassword = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPassword2, setIsShowPassword2] = useState(false);

  // const context = useContext(MyContext);

  // const history = useNavigate();

  return (
    <section className="section py-10">
      <div className="container">
        <div className="card shadow-lg w-[31.25rem] m-auto rounded-md bg-white p-5 px-10">
          <h3 className="text-center text-[1.4rem] font-[600] text-black font-a">
            Quên mật khẩu
          </h3>

          <form className="w-full mt-5">
            <div className="form-group w-full relative">
              <TextField
                type={isShowPassword === false ? "password" : "text"}
                className="w-full"
                id="password"
                label="Mật khẩu mới"
                variant="outlined"
                name="name"
              />

              <Button
                onClick={() => setIsShowPassword2(!isShowPassword2)}
                className="!absolute top-[10px] right-[10px] z-40 !w-[2.3rem] !h-[2.3rem] !min-w-[2.3rem] !rounded-full !text-black"
              >
                {isShowPassword2 === false ? (
                  <IoIosEye className="text-[1.4rem] opacity-75" />
                ) : (
                  <IoIosEyeOff className="text-[1.4rem] opacity-75" />
                )}
              </Button>
            </div>

            <div className="form-group w-full my-5 relative">
              <TextField
                className="w-full"
                id="confirm_password"
                type={isShowPassword2 === false ? "password" : "text"}
                label="Xác nhận lại mật khẩu"
                variant="outlined"
                name="password"
              />
              <Button
                onClick={() => setIsShowPassword2(!isShowPassword2)}
                className="!absolute top-[10px] right-[10px] z-40 !w-[2.3rem] !h-[2.3rem] !min-w-[2.3rem] !rounded-full !text-black"
              >
                {isShowPassword2 === false ? (
                  <IoIosEye className="text-[1.4rem] opacity-75" />
                ) : (
                  <IoIosEyeOff className="text-[1.4rem] opacity-75" />
                )}
              </Button>
            </div>

            <div className="flex items-center mt-3">
              <Button className="btn-pri w-full">Đổi mật khẩu</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FogotPassword;
