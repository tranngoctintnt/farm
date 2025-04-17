import React from 'react';

const EventGallery = () => {
  const galleryItems = [
    { src: 'https://images2.thanhnien.vn/528068263637045248/2023/5/25/screenshot-2023-05-25-at-115448-am-1684991376112699387507.png', alt: 'Lễ Hội Trái Cây', caption: 'Lễ Hội Trái Cây' },
    { src: 'https://suoitien.com/halink-content/uploads/4oV7P1725098532.jpg', alt: 'Hái Sung Mỹ', caption: 'Hái Sung Mỹ' },
    { src: 'https://live.staticflickr.com/65535/52365534038_ccfa280625_b.jpg', alt: 'Workshop', caption: 'Workshop Sáng Tạo' },
  ];

  return (
    <section
      className="py-16 bg-[#f9f9f9] parallax"
    //   style={{ backgroundImage: "url('https://suoitienfarm.com/images/gallery-bg.webp')" }}
      role="region"
      aria-label="Event Gallery"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#071f1a]">Thư Viện Sự Kiện</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <div key={index} className="relative overflow-hidden rounded-xl group" role="figure">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500 lazy"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition"></div>
              <p className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition">{item.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(EventGallery);