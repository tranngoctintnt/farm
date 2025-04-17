import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../Policy/style.css";

gsap.registerPlugin(ScrollTrigger);

function ResponsibilitiesSection() {
//   useEffect(() => {
//     gsap.utils.toArray('.list-item').forEach((item, index) => {
//       gsap.from(item, {
//         scrollTrigger: {
//           trigger: item,
//           start: 'top 85%',
//         },
//         opacity: 0,
//         x: -40,
//         duration: 0.6,
//         delay: index * 0.2
//       });
//     });
//   }, []);

  const responsibilities = [
    'Tuân thủ nghiêm ngặt tiêu chuẩn chất lượng nông sản sạch và quy trình sản xuất của Suối Tiên Farm.',
    'Thực hiện thanh toán đúng hạn và tuân thủ các điều khoản hợp đồng đã ký kết.',
    'Hỗ trợ tích cực trong các chiến dịch quảng bá và sự kiện cộng đồng do Suối Tiên Farm tổ chức.',
    'Đảm bảo vận chuyển, bảo quản sản phẩm đúng tiêu chuẩn để giữ độ tươi ngon.'
  ];

  return (
    <section id="responsibilities" className="py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl md:text-5xl font-bold text-center section-title">Trách nhiệm đối tác</h3>
        <div className="max-w-3xl mx-auto mt-12">
          <ul className="space-y-5">
            {responsibilities.map((item, index) => (
              <li key={index} className="list-item text-gray-600 text-lg">{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ResponsibilitiesSection;