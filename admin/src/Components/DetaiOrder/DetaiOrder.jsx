import React from "react";
import { Select, Space } from 'antd';
import BASE_URL from "../../config";
const DetaiOrder = ({ data,status, onStatusChange}) => {
  return (
    <>
      {/* <div className="flex flex-col shadow-md px-4 py-4 sm:px-6 sm:py-6 rounded-md gap-4 sm:gap-5"> */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-md bg-[#f0f0f5] gap-3 sm:gap-0">
        <div className="flex items-center lg:gap-5 sm:gap-3">
          <h3 className="text-[14px]">Kiện 1/1 </h3>
          <span>|</span>
          <Space wrap>
            <Select
              value={status}
              style={{ width: 120 }}
              onChange={onStatusChange}
              options={[
                { value: "Pending", label: "Pending" },
                { value: "Confirm", label: "Confirm" },
                { value: "Delivered", label: "Delivered" },
                { value: "Success", label: "Success"},
                { value: "Failed", label: "Failed"},
                { value: "Cancelled", label: "Cancelled"},

              ]}
            />
           
          </Space>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <h2 className="border-b text-[14px] sm:border-b-0 px-0 sm:px-2 border-[rgba(0,0,0,1)]">
            Phí vận chuyển:{" "}
            <span className="text-[#f60] text-[14px] font-[600]">30.000 đ</span>
          </h2>
          <span className="lg:block md:hidden">|</span>
          <h2 className="text-[14px] lg:ml-2 sm:ml-0">
            Tổng tiền ({data.items.length} sản phẩm):{" "}
            <span className="text-[#f60] font-[600]">
              {data.totalAmount.toLocaleString("vi-Vn")} đ
            </span>
          </h2>
        </div>
      </div>

      <div className="flex flex-col w-full gap-4 items-center">
        {data.items.map((childItem) => {
          const imgProduct = JSON.parse(childItem.imgProduct);
          return (
            <div
              key={childItem.idProduct}
              className="itemOrder mt-3 flex sm:flex-row items-start sm:items-center w-full justify-between gap-3 sm:gap-0"
            >
              <div className="itemInfo flex sm:flex-row gap-3 sm:gap-5">
                <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-md min-w-[80px] sm:min-w-[110px]">
                  <img
                    className="w-full h-full object-cover rounded-md"
                    src={`${BASE_URL}${imgProduct[0]}`}
                    alt={childItem.nameProdcut}
                  />
                </div>

                <div className="info">
                  <h2 className="text-[14px] sm:text-[16px]">
                    {childItem.nameProdcut}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-6">
                <h2 className="text-[14px]">{childItem.quantity}</h2> x
                <h2 className="text-[14px] font-[600]">
                  {childItem.unitPrice.toLocaleString("vi-VN")} đ
                </h2>
              </div>
            </div>
          );
        })}
      </div>
      {/* </div> */}
    </>
  );
};

export default DetaiOrder;
