import React from 'react';

const SocialFeed = () => {
  const posts = [
    {
      image: 'https://image.plo.vn/Uploaded/2025/rykxqqskxq/2023_07_30/anh-thumb-929.jpg',
      alt: 'Social Post 1',
      description: 'Khách tham quan chia sẻ khoảnh khắc hái Sung Mỹ tại Suối Tiên Farm!',
    },
    {
      image: 'https://lh7-us.googleusercontent.com/7ynqjvwr6GuhzbH7AJVTbb6yeuIn75DZoMSPfY7TsAsMeUTVnKpdGn4OjryDYPXoL1fOZx8T3vU6go1r13Cjs0pc54Nzb3M_DBVsju2-GrBk-iFEi6-E9cgWV-xhPE50rnCmIMNFPfq3PWsMybnq-r0',
      alt: 'Social Post 2',
      description: 'Cùng xem highlights từ Lễ Hội Trái Cây năm ngoái!',
    },
    {
      image: 'https://suoitien.com/halink-content/uploads/Nag9O1694233405.jpg',
      alt: 'Social Post 3',
      description: 'Workshop Tiết Học Xanh nhận được nhiều yêu thích!',
    },
  ];

  return (
    <section className="py-16 bg-white" role="region" aria-label="Social Media Feed">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#071f1a]">Cộng Đồng Suối Tiên Farm</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div key={index} className="bg-gray-100 rounded-xl p-4" role="article">
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-48 object-cover rounded-lg mb-4 lazy"
                loading="lazy"
              />
              <p className="text-gray-600">{post.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(SocialFeed);