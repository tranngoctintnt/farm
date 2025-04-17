import React, { useEffect } from 'react';

const EventTimeline = () => {
  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   gsap.from(".animate-slide-in", {
  //     duration: 1.5,
  //     opacity: 0,
  //     y: 50,
  //     stagger: 0.3,
  //     ease: "power3.out",
  //     scrollTrigger: {
  //       trigger: ".animate-slide-in",
  //       start: "top 80%",
  //     },
  //   });
  // }, []);

  const events = [
    {
      title: 'Lễ Hội Trái Cây Nam Bộ 2025',
      date: '1/6/2025 - 7/6/2025',
      description: 'Chợ trái cây giảm 30%, hội thi tạo hình trái cây giải thưởng 500 triệu đồng, và show diễn văn hóa Nam Bộ.',
      link: '/',
      reverse: false,
    },
    {
      title: 'Hái Sung Mỹ Tận Vườn',
      date: 'Hàng tuần',
      description: 'Tự tay hái Sung Mỹ VietGap tại vườn 20.000 m², kết hợp tham quan nông nghiệp xanh.',
      link: '/',
      reverse: true,
    },
    {
      title: 'Workshop Nông Nghiệp Sáng Tạo',
      date: 'Mỗi cuối tuần',
      description: 'Tiết Học Xanh, trồng cây hữu cơ, và kỹ thuật canh tác bền vững cùng chuyên gia.',
      link: '/',
      reverse: false,
    },
  ];

  return (
    <section id="events" className="py-16 gradient-bg text-white" role="region" aria-label="Event Timeline">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Lịch Trình Sự Kiện</h2>
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#f4c430]"></div>
          {events.map((event, index) => (
            <div
              key={index}
              className={`flex items-center mb-12 animate-slide-in ${event.reverse ? 'flex-row-reverse' : ''}`}
              role="article"
            >
              <div className={`w-1/2 ${event.reverse ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
                <h3 className="text-2xl font-semibold">{event.title}</h3>
                <p className="text-gray-200">{event.date}</p>
              </div>
              <div className={`w-1/2 ${event.reverse ? 'pr-8' : 'pl-8'}`}>
                <div className="timeline-dot w-6 h-6 bg-white rounded-full absolute left-1/2 transform -translate-x-1/2"></div>
                <div className="glass-card p-6 rounded-xl">
                  <p className="mb-4">{event.description}</p>
                  <a href={event.link} className="text-[#f4c430] hover:underline font-semibold" aria-label={`Tìm Hiểu ${event.title}`}>
                    Tìm Hiểu Thêm
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(EventTimeline);