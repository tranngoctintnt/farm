import React, { useMemo, useState } from "react";
import { ProductZoom } from "../../components/ProductZoom";
import { Button } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Rating from "@mui/material/Rating";
import { ProductDetailComponent } from "../../components/ProductDetailComponent";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/Loading";
import DescriptionCollapse from "../../components/DescriptionCollapse";
import ReviewForm from "../../components/ReviewForm/reviewForm";
import { useAuthUser } from "../../Context/AuthContextUser";
import useProductDetails from "../../hook/useProductDetails";
import BASE_URL from "../../config";
dayjs.extend(utc);
dayjs.extend(timezone);
export const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  // const [productId, setProductId] = useState({});
  const { user } = useAuthUser();
  const { id } = useParams(); // Get the ID from the URL
  const { product, reviews, loading, error, fetchReviews } =
    useProductDetails(id);
   
  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!product || Object.keys(product).length === 0) {
    return <div>Product not found.</div>;
  }

 
  const tabs = [
    {
      id: 0,
      label: "Mô tả",
      content: <DescriptionCollapse html={product.data.descripProdcut} />,
    },
    {
      id: 2,
      label: "Review",
      content: (
        <div className="p-4 sm:p-5 mt-5 productReviewContainer w-full">
          <h2 className="text-[1.2rem] sm:text-[1.3rem] font-semibold">
            Đánh giá của khách hàng
          </h2>
          <div className="w-full max-h-[20rem] overflow-y-scroll mt-5 space-y-5 pr-2">
            {reviews.length === 0 ? (
              <p className="text-gray-500">Chưa có đánh giá nào</p>
            ) : (
              reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="w-full border-b border-[rgba(0,0,0,0.1)] pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  {/* ... */}
                  <div className="info flex-1 flex flex-col sm:flex-row gap-4">
                    <div className="img">
                      <img
                        src={`${BASE_URL}/${review.avatar}`}
                        alt="avatar"
                        className="w-[4rem] h-[4rem] sm:w-[4.5rem] sm:h-[4.5rem] rounded-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[1rem] font-semibold">
                        {review.fullName}
                      </h4>
                      <h5 className="text-[0.9rem] font-medium text-gray-500">
                        {dayjs
                          .utc(review.createdAt)
                          .format("HH:mm DD/MM/YYYY")}
                      </h5>
                      <p className="text-[0.95rem] leading-relaxed">
                        {review.reviewText}
                      </p>
                    </div>
                  </div>

                  <Rating
                    className="sm:pr-5"
                    name="half-rating"
                    defaultValue={review.rating}
                    precision={0.5}
                    readOnly
                  />
                </div>
              ))
            )}
          </div>
          <div className="reviewForm mt-10">
            <ReviewForm
              idProduct={product.data.idProduct}
              idCustomer={user?.id}
              onReviewSuccess={fetchReviews}
            />
          </div>
        </div>
      ),
    },
  ]
 ;
  // console.log("Product Details:", product.data);

  return (
    <section className="bg-[#f9f9f9] py-5 px-4 sm:px-5">
      {/* --- Hình ảnh và nội dung chi tiết sản phẩm --- */}
      <div className="container mx-auto flex flex-col lg:flex-row gap-6">
        <div className="productZoomContainer w-full lg:w-[40%] overflow-hidden">
          <ProductZoom data={product.data} />
        </div>

        <div className="productContent w-full lg:w-[60%] max-md: mb-4 px-0 lg:px-5">
          <ProductDetailComponent data={product.data} />
        </div>
      </div>

      <div className="container mx-auto bg-[#f7f2ff] border border-[rgba(0,0,0,.125)] mt-10 p-5 sm:p-[3rem] rounded-xl">
        <div className="flex flex-wrap gap-3 sm:gap-6 items-center justify-start">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`!text-[1rem] sm:!text-[1.1rem] transition-all !normal-case !text-[#000] !border !border-[rgba(0,0,0,.125)] !rounded-full cursor-pointer ${
                activeTab === tab.id && "!bg-[#6d4aae] !text-[#fff]"
              } !px-6 font-americana`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </section>
  );
};
