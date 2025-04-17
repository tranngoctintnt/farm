import React, { useCallback, useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import ProductItems from "../../components/ProductItems";
import { IoGrid } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import SliderProductList from "../../components/SliderProductList";
import ProductItemListView from "../../components/ProductItemViewList";
import { Alert, Button, Dropdown, Pagination } from "antd";
import { DownOutlined } from "@ant-design/icons";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { useSearchParams } from "react-router-dom";
const ProductList = ({ data, categories }) => {
  
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false); // Trạng thái hiển thị sidebar trên mobile
  const [loading, setLoading] = useState(false);

  const [filteredProducts, setFilteredProducts] = useState(data);
  const [sortType, setSortType] = useState(null); // Loại sắp xếp
  const [itemView, setIsItemView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize] = useState(6); // Số sản phẩm mỗi trang (có thể tùy chỉnh)
  const [searchParams] = useSearchParams(); // Thêm useSearchParams
  // const productListRef = useRef(null); // Ref cho phần tử chứa danh sách
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);

  // Tạo map từ idCategory sang tên category
  // console.log(categories);
  // const idCategory = searchParams.get("category"); // Lấy idCategory từ URL

  // console.log("Data:", data);
  // console.log("Categories:", categories);
  // console.log("idCategory from URL:", idCategory);
  const categoryMap = categories.reduce((acc, cat) => {
    acc[cat.idCategory] = cat;
    return acc;
  }, {});

  // Xử lý lọc products với hiệu ứng loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      // Lọc theo category
      let result =
        selectedCategories.length > 0 
          ? data.filter(
              (product) =>
                selectedCategories.includes(product.idCate) &&
                categoryMap[product.idCate]
            )
          : [...data];

      // const idCategory = searchParams.get("category");
      // let result = [...data];
  
      // if (idCategory) {
      //   result = data.filter((product) => product.idCate === idCategory);
      //   // Chỉ cập nhật selectedCategories nếu cần thiết (sẽ xử lý vòng lặp ở bước sau)
      // } else if (selectedCategories.length > 0) {
      //   result = data.filter(
      //     (product) =>
      //       selectedCategories.includes(product.idCate) &&
      //       categoryMap[product.idCate]
      //   );
      // }

      // console.log(result);
      // Sắp xếp theo sortType
      switch (sortType) {
        case "a-z":
          result.sort((a, b) => a.nameProdcut.localeCompare(b.nameProdcut));
          break;
        case "z-a":
          result.sort((a, b) => b.nameProdcut.localeCompare(a.nameProdcut));
          break;
        case "price-low-high":
          result.sort((a, b) => a.newPrice - b.newPrice);
          break;
        case "price-high-low":
          result.sort((a, b) => b.newPrice - a.newPrice);
          break;
        default:
          break;
      }
      setFilteredProducts(result);
      setLoading(false);
    }, 500); // Delay 500ms để thấy hiệu ứng loading

    return () => clearTimeout(timer);
  }, [ selectedCategories, data, sortType, categoryMap]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 500, behavior: "smooth" });
  }, []);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Delay 500ms để thấy hiệu ứng loading
    return () => clearTimeout(timer);
  }, [filteredProducts]);
  // console.log(filteredProducts);
  if (!data || !Array.isArray(data)) {
    return (
      <Alert
        message="Cảnh báo"
        description="Sản phẩm hiện không có sẵn."
        type="warning"
        showIcon
        className="mb-4 w-full bg-[]ff3cd text-[#856404]"
        closable
      />
    );
  }
  // // console.log(data);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const handleCategoryChange = (checkedValues) => {
    setSelectedCategories(checkedValues);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi bộ lọc
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setCurrentPage(1); // Reset về trang 1 khi xóa bộ lọc
  };

  const handleSort = ({ key }) => {
    setSortType(key);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi sắp xếp
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  //   // if (productListRef.current) {
  //   //   productListRef.current.scrollIntoView({ behavior: 'smooth' }); // Cuộn đến đầu danh sách
  //   // }
  //   window.scrollTo({ top: 500, behavior: "smooth" }); // Cuộn lên đầu trang mượt mà
  // };

  // Đếm số lượng product cho mỗi category
  const categoryCounts = data.reduce((acc, product) => {
    acc[product.idCate] = (acc[product.idCate] || 0) + 1;
    return acc;
  }, {});
  // Kiểm tra xem có product nào với category không tồn tại không
  // const hasInvalidCategories = data.some(product => !categoryMap[product.idCate]);

  // Sử dụng items thay vì children cho Menu
  const sortMenuItems = {
    items: [
      { key: "a-z", label: "Tên: A đến Z" },
      { key: "z-a", label: "Tên: Z đến A" },
      { key: "price-low-high", label: "Giá: Thấp đến Cao" },
      { key: "price-high-low", label: "Giá: Cao đến Thấp" },
    ],
    onClick: handleSort,
  };

  // Tính toán sản phẩm hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredProducts.length / pageSize);
  return (
    <section className="w-full bg-[#f9f9f9] ">
      <SliderProductList />

      <div className="container mx-auto flex flex-col lg:flex-row lg:gap-6 px-4 lg:px-0">
        {/* Sidebar */}
        <div className="sidebarWrapper w-full lg:w-[300px] py-5 hidden lg:block">
          <SideBar
            categories={categories}
            categoryCounts={categoryCounts}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Toggle Sidebar on Mobile */}
        <Button
          onClick={() => setShowSidebar(!showSidebar)}
          className="lg:hidden mb-3 w-[120px] bg-[#D86500] text-white"
        >
          Bộ lọc
        </Button>

        {/* Sidebar ở dạng overlay khi trên mobile */}
        {/* {showSidebar && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40">
            <div className="absolute left-0 top-0 w-[80%] max-w-sm h-full bg-white shadow-lg p-4">
              <SideBar
                categories={categories}
                categoryCounts={categoryCounts}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                onClearAll={handleClearAll}
              />
              <Button
                onClick={() => setShowSidebar(false)}
                className="mt-4 w-full bg-red-500 text-white"
              >
                Đóng
              </Button>
            </div>
          </div>
        )} */}
        {showSidebar && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-40 transition-opacity duration-300"
            onClick={() => setShowSidebar(false)}
          >
            <div
              className="absolute left-0 top-0 w-[80%] max-w-sm h-full bg-white shadow-lg p-4 transform transition-transform duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              <SideBar
                categories={categories}
                categoryCounts={categoryCounts}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                onClearAll={handleClearAll}
              />
              <Button
                onClick={() => setShowSidebar(false)}
                className="mt-4 w-full bg-red-500 text-white"
              >
                Đóng
              </Button>
            </div>
          </div>
        )}

        {/* Right Content */}
        <div className="rightContent w-full lg:py-5">
          {/* Top Control Bar */}
          <div className="bg-[#f1f1f1] p-3 w-full mb-3 rounded-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* View Mode Buttons */}
            <div className="col1 flex items-center gap-2 flex-wrap">
              <Button
                className={`!w-[2.5rem] p-0 !h-[2.5rem] hidden !min-w-[2.5rem] ${
                  itemView === "list" && "active"
                } !rounded-full`}
                onClick={() => setIsItemView("list")}
              >
                <LuMenu className="text-[1rem] text-[#525050]" />
              </Button>
              <Button
                className={`!w-[2.5rem] p-0 !h-[2.5rem] !min-w-[2.5rem] !rounded-full ${
                  itemView === "grid" && "active"
                }`}
                onClick={() => setIsItemView("grid")}
              >
                <IoGrid className="text-[1rem] text-[#525050]" />
              </Button>
              <span className="text-sm text-[rgba(0,0,0,0.7)] pl-2">
                {`Tổng cộng có ${filteredProducts.length} sản phẩm`}
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="col2 ml-auto">
              <Dropdown menu={sortMenuItems}>
                <Button className="!bg-[#f1f1f1] !text-[#525050] !border-0 !rounded-md flex items-center gap-2">
                  Sắp xếp theo <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>

          {/* Product List */}

          <ProductGrid
            products={paginatedProducts}
            viewMode={itemView}
            categoryMap={categoryMap}
          />

          {/* Pagination */}
          <div className="flex items-center justify-center mt-10">
            <Pagination
              current={currentPage}
              total={filteredProducts.length}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductList;
