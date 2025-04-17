import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../Event/style.css";

gsap.registerPlugin(ScrollTrigger);

function OffersSection() {
//   useEffect(() => {
//     gsap.utils.toArray('.offer-card').forEach((card, index) => {
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
//   }, []);

  const offers = [
    {
      title: 'Combo nông sản sạch 30%',
      desc: 'Nhận ngay combo rau củ quả tươi sạch với ưu đãi giảm 30% khi đặt hàng hôm nay!',
      image: '/assets/images/offer1.jpg',
      cta: 'Mua ngay'
    },
    {
      title: 'Tour du lịch nông trại',
      desc: 'Giảm 20% cho tour trải nghiệm nông trại, bao gồm hái trái cây và thưởng thức đặc sản.',
      image: '/assets/images/offer2.jpg',
      cta: 'Đặt vé'
    }
  ];

  return (
    <section id="offers" className="py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl md:text-5xl font-bold text-center section-title">Ưu đãi đặc biệt</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {offers.map((offer, index) => (
            <div key={index} className="offer-card">
              <img src={offer.image} alt={offer.title} className="offer-image w-full h-48 object-cover mb-4" />
              <h4 className="text-2xl font-semibold mb-4 text-gray-800">{offer.title}</h4>
              <p className="text-gray-600 leading-relaxed mb-6">{offer.desc}</p>
              <a href="#register" className="cta-button">{offer.cta}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OffersSection;