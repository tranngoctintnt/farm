import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../Event/style.css";

gsap.registerPlugin(ScrollTrigger);

function EventsSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2025-05-01T09:00:00').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

//   useEffect(() => {
//     gsap.utils.toArray('.event-card').forEach((card, index) => {
//       gsap.from(card, {
//         scrollTrigger: {
//           trigger: card,
//           start: 'top 85%',
//         },
//         opacity: 0,
//         y: 60,
//         duration: 0.8,
//         delay: index * 0.2
//       });
//     });

//     gsap.utils.toArray('.countdown-item').forEach((item, index) => {
//       gsap.from(item, {
//         scrollTrigger: {
//           trigger: item,
//           start: 'top 85%',
//         },
//         scale: 0.8,
//         opacity: 0,
//         duration: 0.6,
//         delay: index * 0.1
//       });
//     });
//   }, []);

  const events = [
    {
      title: 'Ngày hội nông sản',
      date: '01/05/2025',
      desc: 'Tham gia trải nghiệm hái trái cây, thưởng thức nông sản sạch, và nhận quà đặc biệt.',
      image: '/assets/images/event1.jpg',
      cta: 'Đăng ký'
    },
    {
      title: 'Workshop nông nghiệp',
      date: '15/05/2025',
      desc: 'Học cách trồng rau sạch và kỹ thuật nông nghiệp bền vững từ chuyên gia.',
      image: '/assets/images/event2.jpg',
      cta: 'Tham gia'
    }
  ];

  return (
    <section id="events" className="py-28">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl md:text-5xl font-bold text-center section-title">Sự kiện sắp tới</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {events.map((event, index) => (
            <div key={index} className="event-card">
              <img src={event.image} alt={event.title} className="event-image w-full h-48 object-cover mb-4" />
              <h4 className="text-2xl font-semibold mb-4 text-gray-800">{event.title}</h4>
              <p className="text-gray-600 mb-2"><strong>Ngày:</strong> {event.date}</p>
              <p className="text-gray-600 leading-relaxed mb-4">{event.desc}</p>
              {index === 0 && (
                <div className="countdown mb-6">
                  <div className="countdown-item">
                    <span>{timeLeft.days}</span>
                    Ngày
                  </div>
                  <div className="countdown-item">
                    <span>{timeLeft.hours}</span>
                    Giờ
                  </div>
                  <div className="countdown-item">
                    <span>{timeLeft.minutes}</span>
                    Phút
                  </div>
                  <div className="countdown-item">
                    <span>{timeLeft.seconds}</span>
                    Giây
                  </div>
                </div>
              )}
              <a href="#register" className="cta-button">{event.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EventsSection;