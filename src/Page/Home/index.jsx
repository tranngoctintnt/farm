import React from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCatSlier from "../../components/CatSlider";
import { CgMail } from "react-icons/cg";
import { Button } from "@mui/material";
import AdsBannerSlider from "../../components/AdsBannerSlider";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProductSlider from "../../components/ProductSlider";
import BlogItem from "../../components/BlogItem";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import HomeBannerV2 from "../../components/HomSliderV2";
import BannerBoxV2 from "../../components/BannerBoxV2";

const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <HomeSlider />

      <HomeCatSlier />

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

      <Footer/>
    </>
  );
};
export default Home;
