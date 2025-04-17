import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export const MyListItem = () => {
  return (
    <div className="cartWrapper mt-4 flex gap-7">
      <div className="leftPart w-full">
        <div className="table-responsive shadow-md overflow-hidden w-full">
          <table className="table text-[#212529 mb-[1rem] w-full">
            <thead className="bg-[#f1f1f1] !rounded-lg">
              <tr className="text-start">
                <th className="!w-[40%] px-2 text-start !py-4">Product</th>
                <th className="!w-[30%] px-2 text-start !py-4">Unit Price</th>
                {/* <th className="!w-[25%] px-2 text-start !py-4">
                        Quantity
                      </th>
                      <th className="!w-[15%] px-2 text-start !py-4">
                        Subtotal
                      </th> */}
                <th className="!w-[30%] px-2 text-center !py-4">Remove</th>
              </tr>
            </thead>

            <tbody className="border-b border-[rgba(0,0,0,0.1)]">
              <tr>
                <td className="py-3  !w-[40%]">
                  <div className="flex">
                    <div className="img w-[40%] px-3 rounded-md overflow-hidden">
                      <Link to="/product/1234" className="group">
                        <img
                          src="/feed1.png"
                          alt=""
                          className="w-full group-hover:scale-105"
                        />
                      </Link>
                    </div>
                    <div className="infoCartItem flex flex-col justify-center ml-4 w-[85%]">
                      <p className="text-[1rem]">
                        <Link className="link font-[500]">Sung My</Link>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-1 !w-[30%]">
                  <div className="flex flex-col my-2 gap-2">
                    <span className="old-price line-through text-gray-500 font-[500]">
                      200.000 <span>VND</span>
                    </span>
                    <span className="old-price text-[#D86500] font-bold">
                      150.000 <span>VND</span>
                    </span>
                  </div>
                </td>
                {/* <td className="py-3 !w-[20%]">
                        <QtyBox />
                      </td> */}
                {/* <td className="py-3 !w-[15%]">
                        <span className="text-[1rem] text-[#D86500] font-bold">
                          150.000<span>VND</span>
                        </span>
                      </td> */}
                <td className="py-3 !w-[30%] relative">
                  <IoClose className=" absolute top-[40%] left-[50%] cursor-pointer text-[1.4rem]" />
                </td>
              </tr>
            </tbody>

            <tbody className="border-b border-[rgba(0,0,0,0.1)]">
              <tr>
                <td className="py-3 !w-[40%]">
                  <div className="flex">
                    <div className="img w-[40%] px-3 !rounded-md overflow-hidden">
                      <Link to="/product/1234" className="group">
                        <img
                          src="/feed1.png"
                          alt=""
                          className="w-full group-hover:scale-105"
                        />
                      </Link>
                    </div>
                    <div className="infoCartItem flex flex-col justify-center ml-4 w-[85%]">
                      <p className="text-[1rem]">
                        <Link className="link font-[500]">Sung My</Link>
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-1 !w-[30%]">
                  <div className="flex flex-col my-2 gap-2">
                    <span className="old-price line-through text-gray-500 font-[500]">
                      200.000 <span>VND</span>
                    </span>
                    <span className="old-price text-[#D86500] font-bold">
                      150.000 <span>VND</span>
                    </span>
                  </div>
                </td>
                {/* <td className="py-3 !w-[20%]">
                        <QtyBox />
                      </td> */}
                {/* <td className="py-3 !w-[15%]">
                        <span className="text-[1rem] text-[#D86500] font-bold">
                          150.000<span>VND</span>
                        </span>
                      </td> */}
                <td className="py-3 !w-[30%] relative">
                  <IoClose className=" absolute top-[40%] left-[50%] cursor-pointer text-[1.4rem]" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* <div className="rightPart w-[25%]">
              <div className="shadow-md rounded-md p-4 bg-white">
                <h2 className="pb-3 border-b font-[500] border-[rgba(0,0,0,0.1)]">
                    Card Totals
                </h2>

                <p className="flex items-center pt-3 justify-between">
                    <span className="text-[0.86rem] font-[500]">Subtotal</span>
                    <span className="text-[#D86500] font-bold">300.000 <span>VND</span></span>
                </p>

                <p className="flex items-center pt-3 justify-between">
                    <span className="text-[0.86rem] font-[500]">Shiping</span>
                    <span className=" font-bold">Free</span>
                </p>

                <p className="flex items-center pt-3 justify-between">
                    <span className="text-[0.86rem] font-[500]">Total</span>
                    <span className="text-[#D86500] font-bold">300.000 <span>VND</span></span>
                </p>

                <Button className="!mt-6 w-full btn-pri flex gap-3"><IoBagCheckOutline className="text-[20px]"/> Checkout</Button>
              </div>
            </div> */}
    </div>
  );
};
