import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { PiTrashLight } from "react-icons/pi";
import { Button, message, Space, Table,Modal,Switch } from "antd";
import axios from "axios";
import api from "../../api";
import BASE_URL from "../../config";


const { confirm } = Modal;

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
    const [switchLoading, setSwitchLoading] = useState(false); // Local loading state
  
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 4,
    total: 0,
  });

  const [searchText, setSearchText] = useState("");

  const handleSwitchChange = async (idProduct,checked) => {
    // console.log(idProduct,checked);
    setSwitchLoading(true);
    try {
      const response = await api.put(
        `/statusProduct/${idProduct}`,
        { isActive: checked },
        { withCredentials: true }
      );
      
    
      setProducts((prevData) =>
        prevData.map((product) =>
          product.idProduct === idProduct
            ? { ...product, isActiveProduct: checked } // Update the isActive status
            : product
        )
      );
      // );
      // console.log("Status updated:", response.data);
      message.success("Product status updated successfully");
    } catch (error) {
      console.error("Failed to update status:", error);
      message.error("Failed to update status");
    } finally {
      setSwitchLoading(false);
    }

   
  };
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.nameProdcut.toLowerCase().includes(searchText.toLowerCase())
  );
 
  // Lấy danh sách sản phẩm từ API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await api.get("/product");
        setProducts(response.data.data);
        setPagination({
            ...pagination,
            current: response.data.page,
            total: response.data.total,
          });
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  const showDeleteConfirm = (idProduct) => {
    confirm({
      title: "Are you sure you want to delete this product?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteProduct(idProduct); // Gọi hàm xóa khi nhấn "Yes"
      },
      onCancel() {
        // console.log("Cancel delete");
      },
    });
  };
  const deleteProduct = async (idProduct) => {
    setLoading(true);
    try {
      const response = await api.delete(
        `/product/${idProduct}`,
        {
          withCredentials: true,
        }
      );
      setProducts((prevData) =>
        prevData.filter((user) => user.idProduct !== idProduct)
      );
      setPagination((prev) => ({
        ...prev,
        total: prev.total - 1,
      }));
      message.success(response.data.message);
      // console.log(`Deleted product with id: ${idProduct}`);
    } catch (error) {
      console.error("Failed to delete product:", error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  const columns = [
    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <Space size="small">
          <div className="flex items-center gap-5">
            <div className="img w-[85px] min-w-[85px] p-2 h-[85px] overflow-hidden group">
              <Link to={`/product/product-edit/${record.idProduct}`}>
                <img
                  src={`${BASE_URL}${record.imgProduct}`}
                  className="w-full h-full rounded-md group-hover:scale-105 transition-all"
                  alt={record.nameProdcut}
                />
              </Link>
            </div>

            <div className="info flex flex-col">
              <h3 className="font-[500] text-[16px] hover:text-primary">
                <Link to={`/product/product-edit/${record.idProduct}`}>{record.nameProdcut}</Link>
              </h3>
              <h4>
                {record.tilteProdcut}
              </h4>
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: "Category",
      dataIndex: "nameCategory",
      key: "nameCategory",
    },
    {
      title: "Price",
      key: "price",
      render: (_, record) => (
        <Space size="small">
          <div className="flex gap-1 flex-col">
            <span className="oldPrice line-through leading-3 text-gray-500 text-[14px] font-[500]">
              {record.oldPrice.toLocaleString("vi-VN")} <span>VND</span>
            </span>
            <span className="price text-primary text-[14px]  font-[600]">
              {record.newPrice.toLocaleString("vi-VN")} <span>VND</span>
            </span>
          </div>
        </Space>
      ),
    },
    {
      title: "Sales",
      dataIndex: "sale", // Nếu không có dữ liệu "sale", để mặc định null hoặc thêm vào API
      render: (sale) => sale || "0", // Giá trị mặc định nếu không có
    },
    {
      title: "Stock",
      dataIndex: "stockProduct",
      render: (stockProduct) => stockProduct.toLocaleString("vi-VN")
    },
    {
      title: "Active",
      key: "isActiveProduct",
      render: (_,record) => (
        // console.log(record),
        <Switch
          checked={record.isActiveProduct}
          onChange={(checked) => handleSwitchChange(record.idProduct, checked)}
          loading={switchLoading} // optional: hiển thị loading khi đang cập nhật
          // Disable during requests
        />
      ),
      sorter: (a, b) => Number(a.isActiveProduct) - Number(b.isActiveProduct),
    },  
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <Button
            className="hover:!border-primary hover:!text-primary"
            onClick={() =>
              navigate(`/product/product-edit/${record.idProduct}`, { state: record })
            }
          >
            <FiEdit />
          </Button>
          <Button
            className="hover:!border-primary hover:!text-primary"
            onClick={() => showDeleteConfirm(record.idProduct)}
          >
            <PiTrashLight />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="card border my-4 hadow-md sm:rounded-lg bg-white">
      <div className="flex items-center justify-between px-5 py-5">
        <h2 className="text-[22px]">Products</h2>
        <NavLink
          className={({ isActive }) =>
            isActive ? "activeClassName" : undefined
          }
          end
          to="/product/upload"
        >
          <Button className="!bg-[#D86500] !text-white !capitalize !py-2 !px-4">
            Add Product
          </Button>
        </NavLink>
      </div>

      <div className="searchBox w-[600px] px-8  flex items-center relative p-2">
        <input
          value={searchText}
          onChange={handleSearch}
          type="text"
          placeholder="Search for product..."
          className="w-full text-[18px] px-6 rounded-[6px]  !bg-[#f1f1f1] h-12 focus:outline-none bg-inherit "
        />
        <Button className="!absolute top-[16px] right-[44px] z-10 p-0 !w-[37px] !min-w-[37px] !h-[35px] !rounded-full text-black">
          <IoSearchSharp className="text-[18px] text-[#5e5c5c]" />
        </Button>
      </div>
      <div className="relative px-5 overflow-x-auto mt-5 pb-5">
        <Table
          pagination={pagination}
          columns={columns}
          dataSource={filteredProducts} // Dữ liệu từ API
          rowKey="idProduct" // Khóa duy nhất cho mỗi dòng
          size="middle"
          loading={loading} // Hiển thị loading khi đang lấy dữ liệu
        />
      </div>
    </div>
  );
};

export default ProductList;
