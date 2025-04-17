import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../Policy/style.css";

gsap.registerPlugin(ScrollTrigger);

function TestimonialSection() {
//   useEffect(() => {
//     gsap.utils.toArray('.testimonial-card').forEach((card, index) => {
//       gsap.from(card, {
//         scrollTrigger: {
//           trigger: card,
//           start: 'top 85%',
//         },
//         opacity: 0,
//         y: 50,
//         duration: 0.8,
//         delay: index * 0.2
//       });
//     });
//   }, []);

  const testimonials = [
    {
      name: 'Nguyễn Minh Anh',
      role: 'Nhà phân phối',
      quote: 'Hợp tác với Suối Tiên Farm là quyết định đúng đắn. Sản phẩm chất lượng và hỗ trợ marketing tuyệt vời!',
      avatar: 'https://cdn-icons-png.flaticon.com/512/219/219986.png'
    },
    {
      name: 'Trần Văn Hùng',
      role: 'Chủ doanh nghiệp',
      quote: 'Suối Tiên Farm mang đến cơ hội kinh doanh bền vững với đội ngũ chuyên nghiệp và sản phẩm đáng tin cậy.',
      avatar: 'https://cdn-icons-png.flaticon.com/512/219/219986.png'
    }
  ];

  return (
    <section id="testimonials" className="py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl md:text-5xl font-bold text-center section-title">Đối tác nói gì?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {testimonials.map((item, index) => (
            <div key={index} className="testimonial-card">
              <div className="flex items-center mb-4">
                <img src={item.avatar} alt={item.name} className="testimonial-avatar mr-4" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-gray-500 text-sm">{item.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{item.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;