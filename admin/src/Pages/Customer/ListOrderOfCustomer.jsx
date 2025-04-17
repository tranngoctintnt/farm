import React from 'react'
import DetaiOrder from '../../Components/DetaiOrder/DetaiOrder';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../../api';
import { useEffect } from 'react';

const ListOrderOfCustomer = () => {
    const {id} = useParams();
    const [orderUser, setOrder] = useState([]);

    const navigate = useNavigate();

    const fetchOrder = async () => {
        try {
            // console.log(id);
            const response = await api.get(`/orders/orderOfCustomer/${id}`, {
                withCredentials: true,
            });
            // console.log(response.data);
            setOrder(response.data);
        }
        catch (err) {
            console.error(err.response?.data?.message || "Failed to load orders");
        }
    }
    useEffect(() => {
        fetchOrder();

    }, [id]);
    if (!orderUser || orderUser.length === 0) {
        return <p>Không có đơn hàng nào</p>;
    }
    // console.log(orderUser);

  return (
    <div className="col2 w-full lg:w-[100%] py-3 px-10">
          <div className="flex flex-col gap-6">
            <div className="py-5 px-3 rounded-lg border-b shadow-md border-[rgba(0,0,0,0.1)]">
              <h2 className="text-[1.2rem] font-[500]">Đơn hàng</h2>
            </div>

            {orderUser.orders.map((orderItem) => {
              // console.log(orderItem);

              return (
                <div
                  key={orderItem.idOrder}
                  className="contentOrder rounded-md shadow-md"
                >
                  <div className="max-sm:p-3 lg:p-6 flex flex-col gap-5">
                    <div className="flex flex-row sm:flex-row items-start sm:items-center justify-between mb-1 gap-3 sm:gap-0">
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <h2 className="mr-3 font-[500] text-[14px]">
                          #{orderItem.idOrder}
                        </h2>
                        <span className="text-[14px]">
                          ({orderItem.items.length} sản phẩm / 1 kiện)
                        </span>
                      </div>

                      <Link
                        state={{ orderItems: orderItem }}
                        className="text-blue-800 text-[14px]"
                        to={`/order/orderdetail/${orderItem.idOrder}`}
                      >
                        Chi tiết
                      </Link>
                    </div>

                    <DetaiOrder data={orderItem} status={orderItem.orderStatus} />

                    
                  </div>
                </div>
              );
            })}
          </div>
        </div>
  )
}

export default ListOrderOfCustomer