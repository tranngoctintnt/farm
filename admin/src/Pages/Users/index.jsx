import React, { useCallback, useEffect, useState } from "react";
import { Button, Flex, Table, Space, Tag, Modal, message } from "antd";
import { FiEdit } from "react-icons/fi";
import { PiTrashLight } from "react-icons/pi";
import "../Users/style.css";
import axios from "axios";
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { IoSearchSharp } from "react-icons/io5";
import debounce from "lodash/debounce";
import Loading from "../../Components/Loading";
import api from "../../api";
const { confirm } = Modal;
message.config({
  top: 10, // Cách đỉnh màn hình 10px
  right:10,
  duration: 2, // Hiển thị trong 2 giây
  maxCount: 1, // Chỉ hiển thị 1 thông báo cùng lúc
});

const ListAccountAdmin = () => {

  const [open, setOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [adminUserData, setAdminUserData] = useState([]);
  
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 1,
    total: 0,
  });
  // useEffect(() => {
  //   fetchData();
  // }, []);

  const deleteUser = async (idAdminUser) => {
    setLoading(true);
    try {
      const response = await api.delete(`/admin-users/${idAdminUser}`, {
        withCredentials: true,
      });
      setAdminUserData((prevData) =>
        prevData.filter((user) => user.idAdminUser !== idAdminUser)
      );
      setPagination((prev) => ({
        ...prev,
        total: prev.total - 1,
      }));
      message.success(response.data.message);
      // console.log(`Deleted user with id: ${idAdminUser}`);
    } catch (error) {
      console.error("Failed to delete user:", error);
      const errorMessage = error.response?.data?.message || "An error occurred";
      if (error.response?.status === 403) {
        message.error("Only Super-Admins can delete users");
      } else if (error.response?.status === 404) {
        message.error("User not found");
      } else if (error.response?.status === 401) {
        Cookies.remove("access_token");
        window.location.href = "/auth/login-admin";
      } else {
        message.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (idAdminUser) => {
    confirm({
      title: "Are you sure you want to delete this user?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteUser(idAdminUser); // Gọi hàm xóa khi nhấn "Yes"
      },
      onCancel() {
        // console.log("Cancel delete");
      },
    });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      width: 300,
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),  },
    {
      title: "Email",
      dataIndex: "email",
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Role",
      dataIndex: "role",
      width: 200,
      sorter: (a, b) => a.role.localeCompare(b.role),
    },
  
    {
      title: "Status",
      dataIndex: "isActive",
      width: 200,
      render: (isActive) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
      sorter: (a, b) => Number(a.isActive) - Number(b.isActive),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="small">
          <NavLink to={`/account-admin/edit-account-admin/${record.idAdminUser}`}>
            <Button className="hover:!border-primary hover:!text-primary">
              <FiEdit />
            </Button>
          </NavLink>
          <Button onClick={() => showDeleteConfirm(record.idAdminUser)} className="hover:!border-primary hover:!text-primary">
            <PiTrashLight />
          </Button>
          
        </Space>
      ),
    },
  ];
 

  const fetchData = useCallback(async (search = "", page = 1) => {
    setLoading(true);
    try {
      const response = await api.get(
        "/admin/search",
        {
          params: {
            search: search,
            page: page,
            limit: pagination.pageSize,
          },
          withCredentials: true,
        } 
      );

      
      // const rawData = Array.isArray(response.data) ? response.data : [];
      // console.log(response.data);
      // console.log(rawData.data);

      setAdminUserData(response.data.data);
      setPagination({
        ...pagination,
        current: response.data.page,
        total: response.data.total,
      });
    } catch (error) {
      console.error("Failed to fetch admin users:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        Cookies.remove("access_token"); // Clean up if present
        window.location.href = "/auth/login-admin";
      }
    }
    finally {
      setLoading(false);
    }
  },[pagination.pageSize]);

  // const debouncedSearch = useCallback(
  //   debounce((searchValue) => {
  //     fetchData(searchValue, 1);
  //   }, 300), // 300ms delay
  //   []
  // );
  useEffect(() => {
    const debouncedFetch = debounce((search) => fetchData(search, 1), 300);
    debouncedFetch(searchText);
    return () => debouncedFetch.cancel();
  }, [searchText, fetchData]);

  // useEffect(() => {
  //   fetchData(searchText, 1); // Fetch với searchText, mặc định là "" khi mount
  // }, [searchText]); // Dependency là searchText


  // useEffect(() => {
  //   if (searchText !== null) {
  //     debouncedSearch(searchText);
  //   }
  // }, [searchText]);

  const handleTableChange = useCallback((pagination) => {
    fetchData(searchText, pagination.current);
    setPagination({
      ...pagination,
      current: pagination.current,
    });
  },[searchText, fetchData]);

  const start = useCallback(() => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  },[]);

 

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const onSelectChange = useCallback((newSelectedRowKeys) => {
    // console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  },[]);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    onClick: toggleDrawer(true),
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
 {/* {loading ? (<Loading/>) :
 
 (
<> */}

<div className="flex h-11 justify-between">
        <h2 className="text-[26px] font-[500]">Admin List</h2>
        <NavLink  className={({ isActive }) =>
            isActive ? 'activeClassName' : undefined
        } end to="/account-admin/add-account-admin">
          <Button className="!px-6 !py-2 hover:!border-primary !font-salute !text-white !bg-primary">
            Add New
          </Button>

        </NavLink>
      </div>

      <div className="searchBox w-[600px] px-8 mb-4  flex items-center relative p-2">
        <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
          type="text"
          placeholder="Search for account..."
          className="w-full text-[18px] px-6 rounded-[6px]  !bg-[#f1f1f1] h-12 focus:outline-none bg-inherit "
        />
        <Button  className="!absolute top-[16px] p-0 right-[44px] z-10 !w-[37px] !min-w-[37px] !h-[37px] !rounded-full text-black">
          <IoSearchSharp className="text-[18px] text-[#5e5c5c]" />
        </Button>
      </div>
      <Flex gap="middle" vertical>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          rowKey="idAdminUser"
          dataSource={adminUserData}
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </Flex>
      <div className="flex justify-between" open={open}>
        <div>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
        </div>

        <Button
          className="!px-5 !py-3 !bg-primary"
          type="primary"
          onClick={start}
          hidden={!hasSelected}
          loading={loading}
        >
          Delete
        </Button>
      </div>
</>

//  )
//  }
    
//     </>
  );
};

export default ListAccountAdmin;
