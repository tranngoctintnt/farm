import React from "react";
import HomeBanner from "../../components/HomeBanner";

import "swiper/css";
import "swiper/css/navigation";
import HomeCatSlier from "../../components/CatSlider";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ProductItems from "../../components/ProductItems";
import ProductSlider from "../../components/ProductSlider";
import BannerBoxV2 from "../../components/BannerBoxV2";
import FarmTable from "../../components/FarmTable";
import FeedFarm from "../../components/FeedFarm";
import AdsBannerSlider from "../../components/AdsBannerSlider";
import BlogItem from "../../components/BlogItem";
import FirstBlog from "../../components/FirstBlog";
import SecBlog from "../../components/SecBlog";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <>
      {/* <Header/> */}
      <HomeBanner />

      <section className="py-9 lg:py-0 lg:pb-[5rem]">
        <div className="my-job relative">
          <div className="title-myjob flex items-center justify-center">
            <h2 className="lg:mt-[0rem] md:mt-[3rem] lg:text-[3.063rem] md:text-[2rem] text-[#998675] font-americana">
              “NGHỀ CHÚNG TÔI...
            </h2>
          </div>

          <div className="content-myjob 2xl:pb-[3rem] lg:pb-0 flex ">
            <div className="col-1 !w-[30%] ">
              <img
                className=" 2xl:w-[36.875rem] lg:w-[22rem] md:w-[14rem] absolute left-0 2xl:top-[10%] lg:top-[34%] md:top-[47%] lg:bottom-0"
                src="/thuhoach.png"
                alt="thu-hoach-nho"
              />
            </div>
            <div className="col-2 !w-[40%] lg:mt-[1.25rem] lg:ml-[1.875rem] md:m-0">
              <div className="description-myjob">
                <p className="2xl:text-[1.2rem] lg:text-[1rem] md:text-[0.875rem] text-[#6B693B] 2xl:mt-[2.375rem]">
                  Gieo trồng không chỉ là cây trái, mà là niềm tin vào đất mẹ và
                  thực phẩm sạch.
                </p>
                <p className="2xl:text-[1.2rem] lg:text-[1rem] md:text-[0.875rem] text-[#6B693B] 2xl:mt-[2.375rem] lg:mt-[1rem]">
                  Mỗi hạt giống nảy mầm là một cam kết, mỗi mùa vụ là một hành
                  trình trao đi sự tươi lành.
                </p>

                <p className="2xl:text-[1.2rem] lg:text-[1rem] md:text-[0.875rem] text-[#6B693B] 2xl:mt-[2.375rem] lg:mt-[1rem]">
                  Trồng bằng tình yêu, chăm bằng sự tận tâm, để mỗi bữa ăn không
                  chỉ ngon mà còn trọn vẹn thiên nhiên.
                </p>

                <p className="2xl:text-[1.2rem] lg:text-[1rem] md:text-[0.875rem] text-[#6B693B] 2xl:mt-[2.375rem] lg:mt-[1rem]">
                  Gieo mầm hôm nay, gặt hái sức khỏe mai sau!”
                </p>
              </div>
            </div>
            <div className="col-3 !w-[30%] ">
              <img
                className="absolute 2xl:w-[28rem] lg:w-[16rem] md:w-[13rem] right-0 lg:top-[42%] md:top-[47%]"
                src="/thuhoachsung.png"
                alt="thu-hoach-sung"
              />
            </div>
          </div>
        </div>
      </section>

      <HomeCatSlier />

      <section className=" bg-white">
        <div className="deal lg:pb-[10.5rem] md:pb-[3rem] lg:pt-0 md:pt-[2rem] relative">
          <div className="content-deal flex flex-col items-center justify-between">
            <h2 className="2xl:text-[3.063rem] lg:text-[2.5rem] md:text-[2.063rem] text-[#998675]">
              Deal “hời” hôm nay
            </h2>
            <h2 className="lg:mr-[28.125rem] md:mr-[20rem] 2xl:mt-[4.063rem] lg:mt-[2rem] md:text-[1.663rem] text-[#534741] 2xl:text-[3.063rem] lg:text-[2.5rem] uppercase font-americana">
              ƯU ĐÃI GIÁ
            </h2>
            <div className="info flex items-center justify-center">
              <h1 className="head-sung 2xl:text-[6.25rem] lg:text-[5rem] md:text-[3.263rem] font-salute uppercase text-[#A94927]">
                SUNG
              </h1>
              <img className="lg:w-full md:w-[5.125rem]" src="/sung-other.png" alt="" />
              <h1 className="head-sung 2xl:text-[6.25rem] lg:text-[5rem] md:text-[3.263rem] font-salute uppercase text-[#A94927]">
                MỸ
              </h1>
            </div>
            <h1 className="discout 2xl:text-[5.625rem] lg:text-[4rem] md:text-[3rem] lg:ml-[26.563rem] md:ml-[13rem] font-americana text-[#534741]">
              50%
            </h1>

            <div className="2xl:mt-[3.125rem] lg:mt[2.5rem] flex items-center gap-8">
              <Link className="transition" to="/">
                <Button className="!bg-[#D86500] lg:!w-[9.75rem] md:w-[6rem] !text-white lg!px-[1.563rem] lg!py-[0.5rem] !rounded-[1.25rem]">
                  MUA NGAY
                </Button>
              </Link>

              <Link className="transition" to="/">
                <Button className="!text-[#D86500] lg:!w-[9.75rem] md:w-[6rem] !rounded-[1.25rem] !border !border-solid">
                  ƯU ĐÃI
                </Button>
              </Link>

              <Link className="transition" to="/">
                <Button className="!text-[#D86500] lg:!w-[9.75rem] md:w-[6rem] !rounded-[1.25rem] !border !border-solid">
                  SPECIAL
                </Button>
              </Link>
            </div>
          </div>

          <div className="img-deal absolute left-0 2xl:w-[31.25rem] lg:w-[20.188rem] md:w-[12.5rem] lg:top-[52%] md:top-[18%]">
            <img src="/deal-sung.png" alt="deal" />
          </div>
        </div>
      </section>

      <section className="2xl:py-16 lg:pt-4">
        <div className="product-list container flex flex-col items-center gap-6">
          <div className="title-product flex items-center justify-center">
            <h2 className="2xl:text-[2.5rem] lg:text-[1.8rem] md:text-[1.4rem] uppercase text-[#6B693B] font-americana">
              Sạch ngon chuẩn gu - Mua ngay chẳng ngại
            </h2>
          </div>

          <ProductSlider items={4} />

          <Link className="transition" to="/">
            <Button className="upercase !text-[16px] !py-0 !text-[#D86500] !pr-8 !rounded-none hover:bg-white !border-solid !border-b-2">
              Xem thêm trái cây tươi
            </Button>
          </Link>
        </div>
      </section>

      <section
        className="py-8 mt-[1.375rem]"
      >
        <div className="info-stf 2xl:h-[68.75rem] lg:h-[37.75rem] relative">
          <div className="container">
            <div className="2xl:!w-[50%] 2xl:pt-0 lg:pt-[2.5rem] lg:!w-[79%] content-stf 2xl:ml-[21.875rem] lg:ml-[0] flex flex-col items-start bg-info">
              <h3 className="uppercase mt-[1.25rem] 2xl:text-[2.125rem] lg:text-[1.163rem] text-[#9DC76F]">
                Nông trại xanh
              </h3>
              <h2 className="title-info uppercase 2xl:text-[4.125rem] lg:text-[2rem] text-white">
                Suối Tiên Farm
              </h2>
              <h3 className="uppercase 2xl:text-[2.125rem] lg:text-[1.163rem] text-[#9DC76F]">
                Giữa lòng huyền thoại Suối Tiên
              </h3>

              <p className="2xl:text-[1.313rem] lg:text-[1rem] text-white">
                Nông trại giữa công viên giải trí? Nghe lạ nhưng Suối Tiên Farm
                chính là điểm chạm giữa thiên nhiên thuần khiết và trải nghiệm
                độc đáo!
              </p>

              <p className="2xl:text-[1.313rem] lg:text-[1rem] text-white 2xl:mt-[1.25rem] lg:mt-[0.5rem]">
                Suối Tiên Farm là một phần của hành trình Suối Tiên hướng
                đến du lịch bền vững – gìn giữ bản sắc, nhưng vẫn chất và
                khác biệt!
              </p>

              <p className="2xl:text-[3.125rem] lg:text-[1.488rem] text-white 2xl:mt-[1.25rem] lg:mt-[0.5rem]">01</p>
              <p className="text-[0.9rem] text-white">Nông nghiệp kiểu mới</p>

              <p className="2xl:text-[3.125rem] lg:text-[1.488rem] text-white 2xl:mt-[1.25rem] lg:mt-[0.5rem]">02</p>
              <p className="text-[0.9rem] text-white">
                Ăn lành - Chill chất - Detox cơ thể
              </p>

              <p className="2xl:text-[3.125rem] lg:text-[1.488rem] text-white 2xl:mt-[1.25rem] lg:mt-[0.5rem]">03</p>
              <p className="text-[0.9rem] text-white">
                Check-in xanh giữa thế giới huyền thoại
              </p>

              <Link className="transition 2xl:mt-[6.6rem] lg:mt-[2.6rem]" to="/">
                <Button className="!text-[1.375rem] uppercase !rounded-[1.875rem] !bg-[#9DC76F] !py-2 !px-8 !text-white">
                  Xem Thêm
                </Button>
              </Link>
            </div>

            <div className="img-info absolute top-[-39%] right-0">
              <img className="2xl:w-full lg:w-[12rem] md:w-[8.563rem]" src="/img-info.png" alt="bg nho" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="frui flex items-center relative justify-center">
          <div className="col w-[25%]">
            <img
              className="absolute top-[-11%] 2xl:w-[23.75rem] lg:w-[12.75rem] md:w-[9.563rem] left-0"
              src="/bg-luu.png"
              alt="bg luu"
            />
          </div>
          <div className="col lg:w-[50%] md:w-[70%]">
            <h2 className="title-frui uppercase 2xl:text-[4rem] lg:text-[2.5rem] md:text-[2rem] 2xl:pb-10 lg:pb-[1rem] text-[#6B693B] font-americana">
              Các loại trái
            </h2>

            <BannerBoxV2 image={"/nho.png"} />
            <BannerBoxV2 image={"/sung1_1.png"} />
            <BannerBoxV2 image={"/hong-socola.png"} />

            <div className="frui-button flex mt-[3.75rem] items-center justify-center gap-6">
              <Link className="transition" to="/">
                <Button className="uppercase !px-8 !w-[9.75rem] !rounded-[1.25rem] !bg-[#6B693B] !text-white">
                  Mua ngay
                </Button>
              </Link>
              <Link className="transition" to="/">
                <Button className="uppercase !px-8 !w-[9.75rem] !border !border-solid !border-[#6B693B] !rounded-[1.25rem] !text-[#6B693B]">
                  Menu
                </Button>
              </Link>
              <Link className="transition" to="/">
                <Button className="uppercase !px-8 !w-[9.75rem] !border !border-solid !border-[#6B693B] !rounded-[1.25rem] !text-[#6B693B]">
                  Tìm hiểu
                </Button>
              </Link>
            </div>
          </div>
          <div className="col w-[25%]">
            <img
              className="absolute right-0 2xl:w-[23.75rem] lg:w-[15.375rem] md:w-[9.563rem]"
              src="/bg-sung.png"
              alt="bg sung"
            />
          </div>
        </div>
      </section>

      <FarmTable />

      {/* <AdsBannerSlider items={3}/> */}

      <section className="lg:py-[2.5rem] md:pb-[15.5rem] khonggian ">
        <div className="bg-kgian relative flex flex-col 2xl:pb-[18.75rem] lg:pb-[11.75rem]">
          <h2 className="uppercase text-center 2xl:text-[3.125rem] md:text-[2rem] text-[#6B693B] font-americana">
            Dạo quanh <br /> không gian xanh mát
          </h2>
          <img src="/bg-khonggianxanh.png" alt="khong gian xanh" />
          <div className="2xl:mt-[2.5rem] lg:mt-0 w-full top-[33%] absolute feed-list">
            <FeedFarm items={3} />
          </div>
        </div>
      </section>
      <div className="m-auto flex flex-col 2xl:pt-[3.5rem] lg:pt-0 2xl:gap-8 lg:gap-4 relative 2xl:pb-[6.25rem] lg:pb-[2.375rem]">
        <div className="mt-[2.5rem]] container flex justify-center gap-10">
          <div className="fist-blog w-[60%]">
            <FirstBlog />
          </div>

          <div className="fist-blog w-[40%]">
            <SecBlog />
          </div>
        </div>
        <BlogItem />
        <div className="2xl:w-[26.25rem] lg:w-[16.25rem] md:w-[9.375rem] absolute 2xl:top-[65%] lg:top-[69%] opacity-50">
          <img src="/khonggianxanh.png" alt="khong gian xanh" />
        </div>
      </div>
      <Footer />

      {/* <HomeCatSlier />

      <section className="py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftSec">
              <h2 className="text-[22px] font-[600]">Popular Products</h2>
              <p></p>
            </div>

            <div className="rightSec">
              <Box
                sx={{
                  maxWidth: { xs: 320, sm: 480 },
                  bgcolor: "background.paper",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="Sung" />
                  <Tab label="Lựu" />
                  <Tab label="Nho" />
                  <Tab label="Ổi" />
                  <Tab label="Item Five" />
                  <Tab label="Item Six" />
                  <Tab label="Item Seven" />
                </Tabs>
              </Box>
            </div>
          </div>

          <ProductSlider items={5} />
        </div>
      </section>

      <section className="py-6">
        <div className="container flex gap-5">
          <div className="leftBanner w-[70%] ">
            <HomeBannerV2/>
          </div>

          <div className="rightBanner w-[30%] flex items-center gap-5 flex-col justify-between">
            <BannerBoxV2 info="left" image={'/boxbanner1.png'}/>
            <BannerBoxV2 info="right" image={'/banner2.jpg'}/>

          </div>
        </div>
      </section>

      <section className="py-3">
        <div className="container">
          <h2 className="text-[22px] font-[600]">Lastest Products</h2>
          <ProductSlider items={6} />
        </div>
      </section>
      
      <section className="py-3">
        <div className="container">
          <h2 className="text-[22px] font-[600]">Futured Products</h2>
          <ProductSlider items={6} />
        </div>
      </section>
      <AdsBannerSlider items={4} />


      <section className="py-6 pb-8 pt-3 blogSection">
        <div className="container gap-4">
          <h2 className="text-[20px] font-[600] mb-4">From The Blog</h2>
          <Swiper
            // install Swiper modules
            modules={[Navigation]}
            spaceBetween={10}
            slidesPerView={3}
            navigation={true}
            className="blogSlider"
          >
            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>

            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>

            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>

            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>

            <SwiperSlide>
              <BlogItem />
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      <section className="letter mb-4 w-full h-auto py-[60px] relative">
        <div className="container">
          <div className=" w-full p-4 flex">
            <div className="col_1 w-[50%]">
              <h3 className="text-[40px] text-white font-[700]">
                Join our newsletter and get...
              </h3>
              <p className="text-white text-[15px] opacity-70">
                Join our email subscription now to get updates on
                <br />
                promotions and coupons.
              </p>

              <form
                className="mt-4 bg-white rounded-sm h-[60px] py-3 relative w-[80%]"
                action=""
              >
                <CgMail className="absolute text-[25px] opacity-30 top-[17px] left-[10px]" />

                <input
                  className="bg-white w-full border-0 h-[100%] outline-none pl-[40px] pr-[200px]"
                  type="email"
                  name=""
                  id=""
                  placeholder="Enter your email..."
                />

                <Button className="!absolute !bg-[#6d4aae] !text-white !font-[600] !py-3 !px-5 right-2 top-[6px]">
                  <Link to='/'>Subscribe</Link>
                </Button>
              </form>
            </div>
            <div className="col_2 w-[50%]">
              <img
                className="absolute w-[500px] bottom-0 right-0"
                src="./public/letter.png"
                alt="letter"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer/> */}
    </>
  );
};
export default Home;
