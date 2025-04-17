import React,{useState,useEffect} from "react";
import { Table, Button, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import api from "../../api";

const Orders = () => {
  const navigate = useNavigate();

  const [orderUser, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
 const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Confirm":
        return "bg-blue-500 text-white";
      case "Delivered":
        return "bg-indigo-500 text-white";
      case "Success":
        return "bg-green-500 text-white";
      case "Failed":
        return "bg-red-500 text-white";
      case "Cancelled":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };
  const fetchOrder = async () => {
    setLoading(true);
    try {
      const response = await api.get("/orders/order-admin",{
        withCredentials: true,
      });
      // console.log(response.data);
      setOrder(response.data);
      setPagination({
        ...pagination,
        current: response.data.page,
        total: response.data.total,
      });
      
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

console.log(orderUser);
  const columns = [
    {
      title: "Order ID",
      dataIndex: "idOrder",
      render: (_, record) => (
        <strong >#{record.idOrder}</strong>
      ),
      sorter: {
        compare: (a, b) => a.idOrder - b.idOrder,
      },

    },
    {
        title: "Date of Order",
        dataIndex: "orderDate",
    },
    {
      title: "Custormer Name",
      dataIndex: "customerName",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      sorter: (a, b) => a.orderStatus.localeCompare(b.orderStatus),
      render: (orderStatus) => (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusClass(orderStatus)}`}>
          {orderStatus}
        </span>
      )
      
    },

    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
    //   sorter: {
    //     compare: (a, b) => a.english - b.english,
    //     multiple: 1,
    //   },
    },

    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      sorter: {
        compare: (a, b) => a.totalAmount - b.totalAmount,
        multiple: 1,
      },
      render: (totalAmount) => (
        <span className="text-lg font-semibold text-gray-800">
          {totalAmount.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            className="hover:!border-primary hover:!text-primary"
            onClick={() =>
              navigate(`/order/orderdetail/${record.idOrder}`)
            }
          >
            <IoEyeOutline />
          </Button>
          {/* <Button
            className="hover:!border-primary hover:!text-primary"
            onClick={() => showDeleteConfirm(record.idProduct)}
          >
            <PiTrashLight />
          </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="h-full flex flex-auto flex-col">
        <div className="h-full flex flex-auto flex-col justify-between">
          <main className="h-full">
            <div className="page-container relative h-full flex flex-auto flex-col px-4 sm:px-6 py-4 sm:py-6 md:px-8 container mx-auto">
              <div className="container mx-auto h-full bg-[#fff] shadow-md rounded-md p-8">
                <div className="container mx-auto">
                  <div className="card card-border" role="presentation">
                    <div className="card-body">
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                          <h3 className="text-[20px]">Orders</h3>
                        </div>
                        <div className="searchBox w-[600px] px-8  flex items-center relative p-2">
                          <input
                            //   value={searchText}
                            //   onChange={handleSearch}
                            type="text"
                            placeholder="Search for orders..."
                            className="w-full text-[18px] px-6 rounded-[6px]  !bg-[#f1f1f1] h-12 focus:outline-none bg-inherit "
                          />
                          <Button className="!absolute top-[16px] right-[44px] z-10 p-0 !w-[37px] !min-w-[37px] !h-[35px] !rounded-full text-black">
                            <IoIosSearch className="text-[18px] text-[#5e5c5c]" />
                          </Button>
                        </div>
                        <Table rowKey="idOrder" columns={columns} dataSource={orderUser}  pagination={pagination}
          loading={loading}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Orders;
