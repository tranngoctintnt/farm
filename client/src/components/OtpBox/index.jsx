import {Form, Input } from "antd";
import React, { useState, useRef } from "react";

const OtpBox = ({ length, onOtpSubmit, error}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  // Handle input change
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Allow only numbers

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Only take the last digit
    setOtp(newOtp);

    // Move focus to next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Trigger OTP submission if all inputs are filled
    if (newOtp.join("").length === length) {
      onOtpSubmit(newOtp.join(""));
    }
  };

  // Handle Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {otp.map((_, index) => (
        <Form.Item key={index}>
        <Input
          key={index}
          type="text"
          className="w-12 h-12 text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength="1"
          value={otp[index]}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(el) => (inputRefs.current[index] = el)}
        />
        </Form.Item>
      ))}
      {/* {error && <p className="text-red-500 text-center mt-2">{error}</p>} */}
    </div>
  );
};

export default OtpBox;
