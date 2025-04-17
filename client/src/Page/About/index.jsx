import React from "react";
import "../About/style.css";
const About = () => {
    const fadeIns = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    fadeIns.forEach(element => observer.observe(element));
  return (
    <div>
      {/* Section: Giới thiệu */}
      <section id="about" className=" bg-white fade-in">
        <div className="bg-hero text-white min-h-screen flex flex-col">
          <div
            id="home"
            className="flex-1 flex items-center justify-center text-center container mx-auto px-6"
          >
            <div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
                NÔNG TRẠI XANH – GIỮA LÒNG HUYỀN THOẠI SUỐI TIÊN

              </h1>
              <p className="text-xl md:text-2xl mb-10 font-medium">
              Nông trại giữa công viên giải trí
              </p>
              <a
                href="#experiences"
                className="cta-button bg-orange-400 text-white px-10 py-4 rounded-full text-xl font-semibold"
              >
                XEM THÊM
              </a>
            </div>
          </div>
        </div>
        <div className="container mx-auto py-10 px-6 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-6 leading-tight">
              Suối Tiện Farm mang đến sự giao thoa giữa thiên nhiên trong lành
              và trải nghiệm độc đáo không nơi nào có!
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Một hành trình hướng tới du lịch{" "}
              <em className="text-green-600 font-medium">bền vững</em> – giữ gìn{" "}
              <em className="text-green-600 font-medium">bản sắc</em>,{" "}
              <em className="text-green-600 font-medium">hiện đại</em> và{" "}
              <em className="text-green-600 font-medium">khác biệt</em>!
            </p>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?q=80&w=1470&auto=format&fit=crop"
              alt="Nông trại"
              className="rounded-2xl shadow-2xl hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </section>

      {/* Section: Trải nghiệm */}
      <section id="experiences" className="py-24 bg-gray-50 fade-in">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-16 text-center">
            Trải nghiệm tại Suối Tiện Farm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="card bg-white p-8 rounded-2xl shadow-lg border border-green-100">
              <i className="fas fa-leaf text-5xl text-green-600 mb-6"></i>
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                01 Nông nghiệp kiểu mới
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Tham gia trồng trọt, hái quả, và trải nghiệm cuộc sống nông dân
                thực thụ giữa không gian xanh mát.
              </p>
            </div>
            <div className="card bg-white p-8 rounded-2xl shadow-lg border border-green-100">
              <i className="fas fa-apple-alt text-5xl text-orange-400 mb-6"></i>
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                02 Ăn lành – Chill chất – Detox cơ thể
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Thưởng thức thực phẩm sạch, thư giãn với không khí trong lành,
                giúp cơ thể bạn được thanh lọc.
              </p>
            </div>
            <div className="card bg-white p-8 rounded-2xl shadow-lg border border-green-100">
              <i className="fas fa-camera text-5xl text-green-600 mb-6"></i>
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                03 Check-in xanh giữa thế giới huyên thoại
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Chụp ảnh sống ảo với khung cảnh thiên nhiên tuyệt đẹp, lưu giữ
                khoảnh khắc đáng nhớ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Đánh giá khách hàng */}
      <section id="testimonials" className="py-24 bg-white fade-in">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-16 text-center">
            Khách hàng nói gì về chúng tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="card bg-gray-50 p-8 rounded-2xl shadow-lg border border-green-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
                  alt="Khách hàng 1"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-green-700">
                    Nguyễn An
                  </h4>
                  <p className="text-gray-500">Khách hàng</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Suối Tiện Farm thật tuyệt vời! Gia đình tôi đã có một ngày tràn
                ngập niềm vui, không khí trong lành và đồ ăn thì siêu ngon!"
              </p>
            </div>
            <div className="card bg-gray-50 p-8 rounded-2xl shadow-lg border border-green-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop"
                  alt="Khách hàng 2"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-green-700">
                    Trần Hùng
                  </h4>
                  <p className="text-gray-500">Khách hàng</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Tôi thích cách họ kết hợp giữa trải nghiệm nông nghiệp và không
                gian thư giãn. Rất đáng để ghé thăm!"
              </p>
            </div>
            <div className="card bg-gray-50 p-8 rounded-2xl shadow-lg border border-green-100">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop"
                  alt="Khách hàng 3"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-green-700">
                    Lê Minh
                  </h4>
                  <p className="text-gray-500">Khách hàng</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Cảnh đẹp, hoạt động thú vị, đặc biệt là khu vực check-in. Tôi
                đã có rất nhiều bức ảnh đẹp!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Hình ảnh thực tế */}
      <section id="gallery" className="py-24 bg-gray-50 fade-in">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-16 text-center">
            Khám phá Suối Tiện Farm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://stcd02265632633.cloud.edgevnpay.vn/website-vnpay-public/fill/2023/12/0tureutaw1r1701857641215.jpg"
                alt="Hình ảnh nông trại 1"
                className="w-full h-64 object-cover gallery-img"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://image.plo.vn/w1000/Uploaded/2025/rykxqqskxq/2023_07_30/du-lich-nong-trai-xanh-6-4687.jpg.webp"
                alt="Hình ảnh nông trại 2"
                className="w-full h-64 object-cover gallery-img"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=1470&auto=format&fit=crop"
                alt="Hình ảnh nông trại 3"
                className="w-full h-64 object-cover gallery-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section: CTA */}
      {/* <section className="py-24 bg-gradient-to-r from-green-400 to-green-600 text-white text-center fade-in">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
            Khám phá ngay hôm nay!
          </h2>
          <p className="text-xl md:text-2xl mb-10 font-medium">
            Tham gia trải nghiệm tại Suối Tiện Farm và cảm nhận thiên nhiên!
          </p>
          <a
            href="#contact"
            className="cta-button bg-orange-400 text-white px-10 py-4 rounded-full text-xl font-semibold"
          >
            ĐẶT CHỖ NGAY
          </a>
        </div>
      </section> */}
    </div>
  );
};

export default About;
