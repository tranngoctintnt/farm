import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../Policy/style.css";

gsap.registerPlugin(ScrollTrigger);

function BenefitsSection() {
//   useEffect(() => {
//     gsap.utils.toArray('.policy-card').forEach((card, index) => {
//       gsap.from(card, {
//         scrollTrigger: {
//           trigger: card,
//           start: 'top 85%',
//         },
//         // opacity: 0,
//         y: 60,
//         duration: 0.8,
//         delay: index * 0.2
//       });
//     });
//   }, []);

  const benefits = [
    {
      title: 'Chiến lược marketing đồng hành',
      desc: 'Tận hưởng hỗ trợ quảng bá với tài liệu chuyên nghiệp, chiến dịch truyền thông, và xây dựng thương hiệu.'
    },
    {
      title: 'Phân phối sản phẩm độc quyền',
      desc: 'Ưu tiên phân phối nông sản sạch và sản phẩm đặc trưng tại các kênh bán hàng chiến lược.'
    },
    {
      title: 'Đào tạo chuyên nghiệp',
      desc: 'Tham gia chương trình đào tạo nông nghiệp bền vững và kinh doanh từ đội ngũ chuyên gia.'
    },
    {
      title: 'Lợi nhuận bền vững',
      desc: 'Chính sách giá ưu đãi và chia sẻ lợi nhuận cạnh tranh cho hợp tác lâu dài.'
    }
  ];

  return (
    <section id="benefits" className="py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl md:text-5xl font-bold text-center section-title">Quyền lợi đối tác</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {benefits.map((item, index) => (
            <div key={index} className="policy-card">
              <h4 className="text-2xl font-semibold mb-4 text-gray-800">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BenefitsSection;