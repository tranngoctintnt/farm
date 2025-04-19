import React, { useEffect, useMemo, useState } from "react";
import HomeBanner from "../../components/HomeBanner";

import "swiper/css";
import "swiper/css/navigation";
import HomeCatSlier from "../../components/CatSlider";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ProductSlider from "../../components/ProductSlider";
import BannerBoxV2 from "../../components/BannerBoxV2";
import FarmTable from "../../components/FarmTable";
import FeedFarm from "../../components/FeedFarm";
import BlogItem from "../../components/BlogItem";
import FirstBlog from "../../components/FirstBlog";
import SecBlog from "../../components/SecBlog";
// import axios from "axios";
import LoadingComponent from "../../components/Loading";
import { useProduct } from "../../Context/ProductContext";
import { useCart } from "../../Context/CartContext";
import { useAuthUser } from "../../Context/AuthContextUser";
import Cookies from "js-cookie";
const Home = () => {
  const { products, loading: productLoading } = useProduct();
  const { fetchCart, hasFetchedCart } = useCart();
  const { user, loading: authLoading } = useAuthUser();
  // useEffect(() => {
  //   if (products.length === 0) {
  //     fetchProducts();
  //   }
  // }, [fetchProducts, products]);
  useEffect(() => {
    if (user && !authLoading && !hasFetchedCart) {
      fetchCart();
    }
  }, [user, authLoading, fetchCart, hasFetchedCart]);
  const memoizedProducts = useMemo(() => products, [products]);
  if (productLoading || products.length === 0) {
    return <LoadingComponent />;
  }

  // console.log(Cookies.get("access_token"));
  // console.log(accessToken);
  // console.log(accessToken);

  return (
    <>
      <HomeBanner />

      <section className="py-9 max-md:py-0 max-md:pt-9 lg:py-0">
        <div className="my-job relative lg:pb-[60px]">
          <div className="title-myjob flex items-center justify-center">
            <h2 className="lg:mt-[3rem] xl:mt-0 md:mt-[1rem] lg:text-[3.063rem] md:text-[2rem] max-md:text-[1.6rem] text-[#998675] font-americana">
              “NGHỀ CHÚNG TÔI...
            </h2>
          </div>

          <div className="content-myjob 2xl:pb-[3rem] lg:pb-0 flex ">
            <div className="col-1 w-[30%] max-md:hidden">
              <img
                className=" 2xl:w-[36.875rem] lg:w-[21rem] md:w-[15rem] absolute left-0 2xl:top-[10%] xl:top-[30%] lg:top-[40%] md:top-[42%] lg:bottom-0"
                src="/thuhoach.png"
                alt="thu-hoach-nho"
              />
            </div>
            <div className="col-2 w-[40%] lg:mt-[1.25rem] max-md:container max-md:px-10 max-sm:px-6 m-auto lg:ml-[1.875rem] md:m-0">
              <div className="description-myjob leading-8 max-sm:pb-4">
                <p className="2xl:text-[1.2rem] !leading-7 lg:text-[1rem] md:text-[0.875rem] max-sm:text-[0.875rem] text-[#6B693B] 2xl:mt-[2.375rem]">
                  Gieo trồng không chỉ là cây trái, mà là niềm tin vào đất mẹ và
                  thực phẩm sạch.
                </p>
                <p className="2xl:text-[1.2rem] !leading-7 lg:text-[1rem] md:text-[0.875rem] max-sm:text-[0.875rem] text-[#6B693B] 2xl:mt-[2.375rem] lg:mt-[1rem]">
                  Mỗi hạt giống nảy mầm là một cam kết, mỗi mùa vụ là một hành
                  trình trao đi sự tươi lành.
                </p>

                <p className="2xl:text-[1.2rem] !leading-7 lg:text-[1rem] md:text-[0.875rem] max-sm:text-[0.875rem] text-[#6B693B] 2xl:mt-[2.375rem] lg:mt-[1rem]">
                  Trồng bằng tình yêu, chăm bằng sự tận tâm, để mỗi bữa ăn không
                  chỉ ngon mà còn trọn vẹn thiên nhiên.
                </p>

                <p className="2xl:text-[1.2rem] !leading-7 lg:text-[1rem] md:text-[0.875rem] max-sm:text-[0.875rem] text-[#6B693B] 2xl:mt-[2.375rem] lg:mt-[1rem]">
                  Gieo mầm hôm nay, gặt hái sức khỏe mai sau!”
                </p>
              </div>
            </div>
            <div className="col-3 w-[30%] max-md:hidden">
              <img
                className="absolute 2xl:w-[28rem] lg:w-[20rem] md:w-[14rem] right-0 lg:top-[42%] md:top-[40%]"
                src="/thuhoachsung.png"
                alt="thu-hoach-sung"
              />
            </div>
          </div>
        </div>
        <HomeCatSlier />
      </section>

      <section className="bg-white">
        <div className="deal relative py-6 sm:py-8 md:py-10 lg:py-12 xl:py-14 2xl:py-16">
          <div className="content-deal flex flex-col items-center justify-center text-center">
            <h2 className="text-[#998675] text-lg max-md:text-[2.25rem] sm:text-xl md:text-2xl lg:text-[2.5rem] xl:text-[2.8rem] 2xl:text-[3.063rem]">
              Deal “hời” hôm nay
            </h2>
            <h2 className="text-[#534741] uppercase font-americana mt-2 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-10 2xl:mt-[4.063rem] text-[1.7rem] sm:text-lg md:text-[1.663rem] lg:text-[2.5rem] xl:text-[2.8rem] 2xl:text-[3.063rem]">
              ƯU ĐÃI GIÁ
            </h2>
            <div className="info flex items-center justify-center gap-1 sm:gap-2 md:gap-3 mt-2 sm:mt-4 md:mt-6">
              <h1 className="font-salute uppercase text-[#A94927] text-5xl sm:text-3xl md:text-[3.263rem] lg:text-[5rem] xl:text-[5.5rem] 2xl:text-[6.25rem]">
                SUNG
              </h1>
              <img
                className="w-10 sm:w-12 md:w-20 lg:w-24 xl:w-28 2xl:w-[5.125rem]"
                src="/sung-other.png"
                alt="sung icon"
              />
              <h1 className="font-salute uppercase text-[#A94927] text-5xl sm:text-3xl md:text-[3.263rem] lg:text-[5rem] xl:text-[5.5rem] 2xl:text-[6.25rem]">
                MỸ
              </h1>
            </div>
            <h1 className="font-americana text-[#534741] mt-2 sm:mt-4 md:mt-6 lg:mt-8 xl:mt-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[5.625rem]">
              50%
            </h1>

            <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 2xl:mt-[3.125rem] flex flex-col sm:flex-row items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
              <Link href="/productList" className="transition w-full sm:w-auto">
                <button className="bg-[#D86500] text-white px-3 py-1 sm:px-4 sm:py-2 md:px-0 md:py-3 lg:px-[1.563rem] xl:px-6 2xl:px-[1.563rem] lg:py-[0.5rem] rounded-[1.25rem] w-full sm:w-[6rem] md:w-[7rem] lg:w-[9.75rem] xl:w-[10rem] 2xl:w-[9.75rem]">
                  MUA NGAY
                </button>
              </Link>
              <Link href="/event" className="transition w-full sm:w-auto">
                <button className="text-[#D86500] border border-solid border-[#D86500] px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-[1.563rem] xl:px-6 2xl:px-[1.563rem] lg:py-[0.5rem] rounded-[1.25rem] w-full sm:w-[6rem] md:w-[7rem] lg:w-[9.75rem] xl:w-[10rem] 2xl:w-[9.75rem]">
                  ƯU ĐÃI
                </button>
              </Link>
              <Link href="/event" className="transition w-full sm:w-auto">
                <button className="text-[#D86500] border border-solid border-[#D86500] px-3 py-1 sm:px-4 sm:py-2 md:px-6 md:py-3 lg:px-[1.563rem] xl:px-6 2xl:px-[1.563rem] lg:py-[0.5rem] rounded-[1.25rem] w-full sm:w-[6rem] md:w-[7rem] lg:w-[9.75rem] xl:w-[10rem] 2xl:w-[9.75rem]">
                  SPECIAL
                </button>
              </Link>
            </div>
          </div>

          <div className="img-deal absolute left-0 top-[70%] -translate-y-1/2 w-44 sm:w-32 md:w-52 lg:w-64 xl:w-72 2xl:w-[31.25rem]">
            <img src="/deal-sung.png" alt="deal" className="w-full h-auto" />
          </div>
        </div>
      </section>

      <section className="2xl:py-16 lg:pt-4">
        <div className="product-list w-full container flex flex-col items-center gap-6">
          <div className="title-product flex items-center mt-3 justify-center">
            <h2 className="2xl:text-[2.5rem] lg:text-[1.8rem] md:text-[1.4rem] max-md:text-[22px] text-center uppercase text-[#6B693B] font-americana">
              Sạch ngon chuẩn gu - Mua ngay chẳng ngại
            </h2>
          </div>

          <ProductSlider items={3} data={memoizedProducts} />

          <Link className="transition" to="/productList">
            <Button className="upercase !text-[16px] !py-0 !text-[#D86500] !pr-8 !rounded-none hover:bg-white !border-solid !border-b-2">
              Xem thêm trái cây tươi
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-6 relative">
        <div className="info-stf relative bg-gradient-to-br from-[#1A3C34] to-[#2E5B4F] rounded-xl overflow-hidden min-h-[28rem] sm:min-h-[32rem] md:min-h-[40rem] lg:min-h-[48rem] xl:min-h-[56rem] 2xl:min-h-[68.75rem]">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-14 xl:px-16 2xl:px-24">
            <div className="content-stf relative z-10 flex flex-col items-start w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:w-[50%] py-2 sm:py-10 md:py-12 lg:py-14 xl:pt-16 2xl:pt-28">
              <h3 className="uppercase leading-6  mb-3 text-[#9DC76F] text-sm sm:text-base md:text-lg lg:text-2xl xl:text-[1.8rem] 2xl:text-[2.125rem] font-semibold tracking-wider">
                Nông trại xanh
              </h3>
              <h2 className="title-info leading-6 max-sm:mb-0 mb-3 uppercase text-white text-3xl sm:text-4xl md:text-[2rem] lg:text-3xl xl:text-[3.8rem] 2xl:text-[4.125rem] font-extrabold sm:mt-3 md:mt-0 lg:mt-1 xl:mt-6 2xl:mt-10 tracking-tight">
                Suối Tiên Farm
              </h2>
              <h3 className="uppercase lg:!leading-9 text-[#9DC76F] text-sm sm:text-base md:text-lg lg:text-xl xl:text-[1.8rem] 2xl:mt-5 2xl:text-[2.125rem] font-semibold tracking-wider mt-1 sm:mt-2">
                Giữa lòng huyền thoại Suối Tiên
              </h3>

              <p className="text-white lg:!leading-9 text-sm sm:text-base md:text-[1rem] lg:text-[1.1rem] xl:text-[1.2rem] 2xl:text-[1.313rem] mt-4 sm:mt-5 md:mt-2 lg:mt-2 xl:mt-6 opacity-90">
                Nông trại giữa công viên giải trí? Suối Tiên Farm mang đến sự
                giao thoa giữa thiên nhiên trong lành và trải nghiệm độc đáo
                không nơi nào có!
              </p>
              <p className="text-white lg:!leading-9  text-sm sm:text-base md:text-[1rem] lg:text-[1.1rem] xl:text-[1.2rem] 2xl:text-[1.313rem] mt-3 sm:mt-4 md:mt-2 lg:mt-6 xl:mt-6 opacity-90">
                Một hành trình hướng tới du lịch bền vững – giữ gìn bản sắc,
                hiện đại và khác biệt!
              </p>

              <div className="space-y-4 max-sm:space-y-2 sm:space-y-2 md:space-y-6 lg:space-y-6 sm:mt-8 md:mt-4 lg:mt-6 2xl:mt-14 xl:mt-10">
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                  <p className="text-white text-xl sm:text-2xl md:text-[1.8rem] lg:text-[2rem] xl:text-[2.5rem] 2xl:text-[3.125rem] font-bold">
                    01
                  </p>
                  <p className="text-white text-xs sm:text-sm md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1rem] font-medium">
                    Nông nghiệp kiểu mới
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                  <p className="text-white text-xl sm:text-2xl md:text-[1.8rem] lg:text-[2rem] xl:text-[2.5rem] 2xl:text-[3.125rem] font-bold">
                    02
                  </p>
                  <p className="text-white text-xs sm:text-sm md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1rem] font-medium">
                    Ăn lành - Chill chất - Detox cơ thể
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                  <p className="text-white text-xl sm:text-2xl md:text-[1.8rem] lg:text-[2rem] xl:text-[2.5rem] 2xl:text-[3.125rem] font-bold">
                    03
                  </p>
                  <p className="text-white text-xs sm:text-sm md:text-[0.9rem] lg:text-[1rem] xl:text-[1.1rem] 2xl:text-[1rem] font-medium">
                    Check-in xanh giữa thế giới huyền thoại
                  </p>
                </div>
              </div>

              <Link
                to="/about"
                className="mt-6 sm:mt-3 md:mt-6 lg:mt-8 xl:mt-14 2xl:mt-16 transition-all duration-300"
              >
                <Button className="!text-sm sm:!text-base md:!text-lg lg:!text-[1.375rem] xl:!text-[1.5rem] 2xl:!text-[1.375rem] uppercase !rounded-full !bg-[#9DC76F] !py-2 sm:!py-3 md:!py-4 !px-6 sm:!px-8 md:!px-10 lg:!px-12 !text-white !font-semibold hover:!bg-[#7DAF54] hover:scale-105 transform transition-all duration-300 shadow-md">
                  Xem Thêm
                </Button>
              </Link>
            </div>

            {/* <div className="img-info absolute max-md:hidden right-0 w-full sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[35%] 2xl:w-[30%] h-full opacity-20 sm:opacity-30 md:opacity-40 lg:opacity-100">
        <img
          className="w-full h-full object-cover object-right"
          src="/img-info.png"
          alt="Suối Tiên Farm"
        />
      </div> */}
          </div>
        </div>

        <div className="img-ntrai absolute xl:right-[5%] xl:bottom-0 max-sm:hidden md:bottom-[3%] lg:right-0">
          <img src="/public/Artboard 1.png" className="w-full" alt="" />
        </div>
      </section>

      <section className="py-6 sm:py-4 md:py-4 lg:py-4 xl:py-6 2xl:py-8">
        <div className="frui relative flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-16">
          {/* Hình ảnh bên trái */}
          <div className="col lg:w-full absolute top-0 md:w-full flex max-[768px]:hidden justify-center md:justify-start">
            <img
              className="w-32 sm:w-40 md:w-[9.563rem] lg:w-[12.75rem] xl:w-[14rem] 2xl:w-[18rem] h-auto object-cover md:absolute md:top-0 md:left-0"
              src="/bg-luu.png"
              alt="bg luu"
            />
          </div>

          {/* Nội dung chính */}
          <div className="col w-full md:w-[70%] lg:w-[50%] max-sm:w-[85%] flex flex-col items-center text-center">
            <h2 className="title-frui uppercase text-[#6B693B] font-americana text-2xl sm:text-[1.8rem] md:text-2xl lg:text-[2.5rem] xl:text-[3.5rem] 2xl:text-[4rem] pb-4 sm:pb-6 md:pb-8 lg:pb-[1rem] xl:pb-10 2xl:pb-10">
              Các loại trái
            </h2>

            {/* BannerBoxV2 */}
            <div className=" w-full">
              {memoizedProducts.slice(0, 3).map((product, index) => (
                <BannerBoxV2 key={index} data={product} />
              ))}
            </div>

            {/* Button group */}
            <div className="frui-button flex sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-10 lg:mt-[3.75rem]">
              <Link to="/" className="transition w-full sm:w-auto">
                <Button className="uppercase lg:!px-6 sm:!px-7 md:!px-8 !py-2 sm:!py-2.5 md:!py-3 !w-full sm:!w-[8rem] md:!w-[9.75rem] !min-w-[100px] !rounded-[1.25rem] !bg-[#6B693B] !text-white !font-semibold hover:!bg-[#5A5732] transition-all duration-300">
                  Mua ngay
                </Button>
              </Link>
              <Link to="/" className="transition w-full sm:w-auto">
                <Button className="uppercase !px-6 sm:!px-7 md:!px-8 !py-2 sm:!py-2.5 md:!py-3 !w-full sm:!w-[8rem] md:!w-[9.75rem] !min-w-[100px] !rounded-[1.25rem] !border !border-solid !border-[#6B693B] !text-[#6B693B] !font-semibold hover:!bg-[#6B693B] hover:!text-white transition-all duration-300">
                  Menu
                </Button>
              </Link>
              <Link to="/" className="transition w-full sm:w-auto">
                <Button className="uppercase lg:!px-6 sm:!px-7 md:!px-8 !py-2 sm:!py-2.5 md:!py-3 !w-full sm:!w-[8rem] md:!w-[9.75rem] !min-w-[100px] !rounded-[1.25rem] !border !border-solid !border-[#6B693B] !text-[#6B693B] !font-semibold hover:!bg-[#6B693B] hover:!text-white transition-all duration-300">
                  Tìm hiểu
                </Button>
              </Link>
            </div>
          </div>

          {/* Hình ảnh bên phải */}
          <div className="col lg:w-full md:w-full max-[768px]:hidden absolute flex justify-center md:justify-end">
            <img
              className="w-32 sm:w-40 md:w-[9.563rem] lg:w-[15.375rem] xl:w-[18rem] 2xl:w-[23.75rem] h-auto object-cover md:absolute md:top-0 md:right-0"
              src="/bg-sung.png"
              alt="bg sung"
            />
          </div>
        </div>
      </section>

      <FarmTable />

      <section className="khonggian py-6 max-md:pb-0 sm:py-8 md:py-2 lg:py-12 xl:py-14 2xl:pt-16 2xl:pb-0">
        <div className="bg-kgian relative flex flex-col items-center sm:pb-12 md:pb-[15.5rem] lg:pb-[11.75rem] xl:pb-16 2xl:pb-0">
          {/* Tiêu đề */}
          <h2 className="uppercase text-center max-md:mb-3 text-[#6B693B] font-americana text-xl sm:text-2xl md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] 2xl:text-[3.125rem]">
            Dạo quanh <br className="max-md:hidden" /> <br /> không gian xanh
            mát
          </h2>

          {/* Hình nền */}
          <div className="w-full max-md:hidden mt-4 sm:mt-6 md:mt-8 lg:mt-10 xl:mt-12 2xl:mt-14">
            <img
              src="/bg-khonggianxanh.png"
              alt="Không gian xanh"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* FeedFarm */}
          <div className="w-full max-md:static absolute top-[25%] sm:top-[28%] md:top-[30%] lg:top-[33%] xl:top-[35%] 2xl:top-[33%] z-10">
            <FeedFarm items={3} />
          </div>
        </div>
      </section>

      <div className="relative container mx-auto px-4 xl:px-16 flex flex-col items-center gap-4 sm:gap-6 md:gap-3 lg:gap-2 xl:gap-3 2xl:gap-4 pt-3 sm:pt-8 md:pt-0 lg:pt-12 xl:pt-14 2xl:pt-[2.5rem] pb-10 sm:pb-12 md:pb-14 lg:pb-[2.375rem] xl:pb-[4rem] 2xl:pb-[6.25rem]">
        {/* Blog Section */}
        <div className="w-full flex max-sm:flex-col lg:flex-row justify-center gap-6 sm:gap-8 md:gap-10 mt-6 sm:mt-8 md:mt-10 lg:mt-[2.5rem]">
          <div className="first-blog w-full lg:w-[60%]">
            <FirstBlog />
          </div>
          <div className="second-blog w-full lg:w-[40%]">
            <SecBlog />
          </div>
        </div>

        {/* BlogItem */}
        <div className="w-full sm:mt-8 md:mt-0">
          <BlogItem />
        </div>

        {/* Hình ảnh trang trí */}
        <div className="absolute bottom-0 right-0 w-28 sm:w-36 md:w-[9.375rem] lg:w-[16.25rem] xl:w-[20rem] 2xl:w-[26.25rem] opacity-30 sm:opacity-40 md:opacity-50 lg:opacity-50 z-0">
          <img
            src="/khonggianxanh.png"
            alt="Không gian xanh"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </>
  );
};
export default Home;
