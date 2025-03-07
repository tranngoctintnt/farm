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
import Header from "../../components/Header";

const Home = () => {
  return (
    <>
    {/* <Header/> */}
      <HomeBanner />

      <section className="py-9 h-[624px]">
        <div className="my-job ">
          <div className="title-myjob flex justify-center">
            <h2 className="mt-[69px] text-[49px] text-[#998675] font-americana">
              “NGHỀ CHÚNG TÔI...
            </h2>
          </div>

          <div className="content-myjob flex">
            <div className="col-1 !w-[33.333%] relative">
              <img
                className="absolute left-0"
                src="/thuhoach.png"
                alt="thu-hoach-nho"
              />
            </div>
            <div className="col-2 !w-[33.333%] mt-[20px] ml-[30px]">
              <div className="description-myjob">
                <p className="text-[22px] text-[#6B693B] mt-[38px]">
                  Gieo trồng không chỉ là cây trái, mà là niềm tin vào đất mẹ và
                  thực phẩm sạch.
                </p>
                <p className="text-[22px] text-[#6B693B] mt-[38px]">
                  Mỗi hạt giống nảy mầm là một cam kết, mỗi mùa vụ là một hành
                  trình trao đi sự tươi lành.
                </p>

                <p className="text-[22px] text-[#6B693B] mt-[38px]">
                  Trồng bằng tình yêu, chăm bằng sự tận tâm, để mỗi bữa ăn không
                  chỉ ngon mà còn trọn vẹn thiên nhiên.
                </p>

                <p className="text-[22px] text-[#6B693B] mt-[38px]">
                  Gieo mầm hôm nay, gặt hái sức khỏe mai sau!”
                </p>
              </div>
            </div>
            <div className="col-3 !w-[33.333%] relative">
              <img
                className="absolute right-0 top-[24%]"
                src="/thuhoachsung.png"
                alt="thu-hoach-sung"
              />
            </div>
          </div>
        </div>
      </section>

      <HomeCatSlier />

      <section className="pb-[168px] bg-white">
        <div className="deal relative">
          <div className="content-deal flex flex-col items-center justify-between">
            <h2 className="text-[49px] text-[#998675]">Deal “hời” hôm nay</h2>
            <h2 className="mr-[450px] mt-[65px] text-[#534741] text-[49px] uppercase font-americana">
              ƯU ĐÃI GIÁ
            </h2>
            <div className="info flex items-center justify-center">
              <h1 className="head-sung text-[100px] font-salute uppercase text-[#A94927]">
                SUNG{" "}
              </h1>
              <img className="" src="/sung-other.png" alt="" />
              <h1 className="head-sung text-[100px] font-salute uppercase text-[#A94927]">
                MỸ{" "}
              </h1>
            </div>
            <h1 className="discout text-[90px] ml-[425px] font-americana text-[#534741s]">
              50%
            </h1>

            <div className="mt-[50px] flex items-center gap-8">
              <Link className="transition" to="/">
                <Button className="!bg-[#D86500] !w-[156px] !text-white !px-[25px] !py-[8px] !rounded-[20px]">
                  MUA NGAY
                </Button>
              </Link>

              <Link className="transition" to="/">
                <Button className="!text-[#D86500] !w-[156px] !rounded-[20px] !border !border-solid">
                  ƯU ĐÃI
                </Button>
              </Link>

              <Link className="transition" to="/">
                <Button className="!text-[#D86500] !w-[156px] !rounded-[20px] !border !border-solid">
                  SPECIAL
                </Button>
              </Link>
            </div>
          </div>

          <div className="img-deal absolute left-0 w-[500px] top-[52%]">
            <img src="/deal-sung.png" alt="deal" />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="product-list container flex flex-col items-center gap-6">
          <div className="title-product flex items-center justify-center">
            <h2 className="text-[40px] uppercase text-[#6B693B] font-americana">
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

      <section className="py-8 mt-[150px]">
        <div className="info-stf h-[1100px] relative">
          <div className="container">
            <div className="!w-[50%] content-stf ml-[350px] flex flex-col items-start bg-info">
              <h3 className="uppercase mt-[20px] text-[34px] text-[#9DC76F]">
                Nông trại xanh
              </h3>
              <h2 className="title-info uppercase text-[66px] text-white">
                Suối Tiên Farm
              </h2>
              <h3 className="uppercase text-[34px] text-[#9DC76F]">
                Giữa lòng huyền thoại Suối Tiên
              </h3>

              <p className="text-[21px] text-white">
                Nông trại giữa công viên giải trí? Nghe lạ nhưng Suối Tiên Farm
                chính là điểm chạm giữa thiên nhiên thuần khiết và trải nghiệm
                độc đáo!
              </p>

              <p className="text-[21px] text-white mt-[20px]">
                Suối Tiên Farm là một phần của hành trình Suối Tiên <br /> hướng
                đến du lịch bền vững – gìn giữ bản sắc, <br /> nhưng vẫn chất và
                khác biệt!
              </p>

              <p className="text-[50px] text-white mt-[20px]">01</p>
              <p className="text-[21px] text-white">Nông nghiệp kiểu mới</p>

              <p className="text-[50px] text-white mt-[20px]">02</p>
              <p className="text-[21px] text-white">
                Ăn lành - Chill chất - Detox cơ thể
              </p>

              <p className="text-[50px] text-white mt-[20px]">03</p>
              <p className="text-[21px] text-white">
                Check-in xanh giữa thế giới huyền thoại
              </p>

              <Link className="transition mt-[68px]" to="/">
                <Button className="!text-[22px] uppercase !rounded-[30px] !bg-[#9DC76F] !py-2 !px-8 !text-white">
                  Xem Thêm
                </Button>
              </Link>
            </div>

            <div className="img-info absolute top-[-39%] right-0">
              <img src="/img-info.png" alt="bg nho" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="frui flex items-center relative justify-center">
          <div className="col w-[25%]">
            <img
              className="absolute top-[-11%] w-[380px] left-0"
              src="/bg-luu.png"
              alt="bg luu"
            />
          </div>
          <div className="col w-[50%]">
            <h2 className="title-frui uppercase text-[64px] pb-10 text-[#6B693B] font-americana">
              Các loại trái
            </h2>

            <BannerBoxV2 image={"/nho.png"} />
            <BannerBoxV2 image={"/sung1_1.png"} />
            <BannerBoxV2 image={"/hong-socola.png"} />

            <div className="frui-button flex mt-[60px] items-center justify-center gap-6">
              <Link className="transition" to="/">
                <Button className="uppercase !px-8 !w-[156px] !rounded-[20px] !bg-[#6B693B] !text-white">
                  Mua ngay
                </Button>
              </Link>
              <Link className="transition" to="/">
                <Button className="uppercase !px-8 !w-[156px] !border !border-solid !border-[#6B693B] !rounded-[20px] !text-[#6B693B]">
                  Menu
                </Button>
              </Link>
              <Link className="transition" to="/">
                <Button className="uppercase !px-8 !w-[156px] !border !border-solid !border-[#6B693B] !rounded-[20px] !text-[#6B693B]">
                  Tìm hiểu
                </Button>
              </Link>
            </div>
          </div>
          <div className="col w-[25%]">
            <img
              className="absolute right-0 w-[380px]"
              src="/bg-sung.png"
              alt="bg sung"
            />
          </div>
        </div>
      </section>

      <FarmTable />

      {/* <AdsBannerSlider items={3}/> */}

      <section className="py-[40px] khonggian ">
        <div className="bg-kgian relative flex flex-col pb-[300px]">
          <h2 className="uppercase text-center text-[50px] text-[#6B693B] font-americana">
            Dạo quanh <br /> không gian xanh mát
          </h2>
          <img src="/bg-khonggianxanh.png" alt="khong gian xanh" />
          <div className="mt-[40px] w-full top-[33%] absolute feed-list">
            <FeedFarm items={3} />
          </div>
        </div>
     

      </section>
      <div className="m-auto flex flex-col gap-8 relative pb-[100px]">
          <div className="mt-[40px] container flex justify-center gap-10">
            <div className="fist-blog w-[60%]">
              <FirstBlog />
            </div>

            <div className="fist-blog w-[40%]">
              <SecBlog />
            </div>
          </div>
          <BlogItem />
          <div className="w-[420px] absolute top-[65%] opacity-50">
            <img src="/khonggianxanh.png" alt="khong gian xanh" />
          </div>
        </div>
      <Footer/>

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
