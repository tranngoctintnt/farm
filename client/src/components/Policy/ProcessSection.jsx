import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../Policy/style.css";

gsap.registerPlugin(ScrollTrigger);

function ProcessSection() {
//   useEffect(() => {
//     gsap.utils.toArray('.policy-card').forEach((card, index) => {
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

  const processes = [
    {
      step: '1. Đăng ký',
      desc: 'Gửi thông tin qua form liên hệ để bắt đầu hành trình trở thành đối tác.'
    },
    {
      step: '2. Đánh giá',
      desc: 'Chúng tôi xem xét năng lực và nhu cầu để đảm bảo sự phù hợp đôi bên.'
    },
    {
      step: '3. Ký hợp đồng',
      desc: 'Hoàn tất thỏa thuận và cùng nhau phát triển tương lai xanh.'
    }
  ];

  return (
    <section id="process" className="py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl md:text-5xl font-bold text-center section-title">Quy trình hợp tác</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {processes.map((item, index) => (
            <div key={index} className="policy-card text-center">
              <h4 className="text-2xl font-semibold mb-4 text-gray-800">{item.step}</h4>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;