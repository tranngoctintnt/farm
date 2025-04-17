import React from 'react';

const WhyChoose = () => {
//   useEffect(() => {
//     VanillaTilt.init(document.querySelectorAll(".card-tilt"), {
//       max: 10,
//       speed: 400,
//     });
//   }, []);

  return (
    <section className="py-16 bg-white" role="region" aria-label="Why Choose Suối Tiên Farm">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#071f1a]">Vì Sao Chọn Suối Tiên Farm?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-card p-6 rounded-xl text-center card-tilt" role="article">
            <img
              src="https://cdn.vietnambiz.vn/2020/3/2/vg-15831176957661073999454.jpg"
              alt="Du Lịch Xanh"
              className="w-16 h-16 mx-auto mb-4 lazy"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mb-2">Du Lịch Xanh Bền Vững</h3>
            <p className="text-gray-600">Trải nghiệm không gian xanh 20.000 m² với mô hình nông nghiệp hiện đại, thân thiện môi trường.</p>
          </div>
          <div className="glass-card p-6 rounded-xl text-center card-tilt" role="article">
            <img
              src="https://cdn.vietnambiz.vn/2020/3/2/vg-15831176957661073999454.jpg"
              alt="Sung Mỹ VietGap"
              className="w-16 h-16 mx-auto mb-4 lazy"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mb-2 ">Sung Mỹ VietGap Cao Cấp</h3>
            <p className="text-gray-600">Thưởng thức Sung Mỹ chất lượng cao, đạt chuẩn VietGap, trực tiếp từ vườn đến tay bạn.</p>
          </div>
          <div className="glass-card p-6 rounded-xl text-center card-tilt" role="article">
            <img
              src="https://cdn.vietnambiz.vn/2020/3/2/vg-15831176957661073999454.jpg"
              alt="Văn Hóa Độc Đáo"
              className="w-16 h-16 mx-auto mb-4 lazy"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mb-2 ">Văn Hóa Nam Bộ Đặc Sắc</h3>
            <p className="text-gray-600">Đắm mình trong các lễ hội, workshop, và hoạt động tái hiện văn hóa Nam Bộ sống động.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhyChoose);