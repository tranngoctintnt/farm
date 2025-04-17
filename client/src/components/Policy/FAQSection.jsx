import { useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import "../Policy/style.css";

gsap.registerPlugin(ScrollTrigger);

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

//   useEffect(() => {
//     gsap.utils.toArray('.accordion-header').forEach((header, index) => {
//       gsap.from(header, {
//         scrollTrigger: {
//           trigger: header,
//           start: 'top 85%',
//         },
//         opacity: 0,
//         y: 30,
//         duration: 0.6,
//         delay: index * 0.2
//       });
//     });
//   }, []);

  const faqs = [
    {
      question: 'Ai có thể trở thành đối tác của Suối Tiên Farm?',
      answer: 'Bất kỳ cá nhân, doanh nghiệp, hoặc tổ chức nào có mong muốn hợp tác trong lĩnh vực nông sản sạch, du lịch bền vững, hoặc sự kiện.'
    },
    {
      question: 'Thời gian xét duyệt đối tác là bao lâu?',
      answer: 'Quá trình đánh giá thường mất từ 3-7 ngày làm việc, tùy thuộc vào thông tin bạn cung cấp.'
    },
    {
      question: 'Hợp tác với Suối Tiên Farm có chi phí ban đầu không?',
      answer: 'Không, chúng tôi không thu phí đăng ký. Các điều khoản tài chính sẽ được thảo luận rõ ràng trong hợp đồng.'
    },
    {
      question: 'Tôi nhận được hỗ trợ gì khi trở thành đối tác?',
      answer: 'Bạn sẽ nhận được hỗ trợ marketing, đào tạo, phân phối ưu tiên, và chính sách lợi nhuận hấp dẫn.'
    }
  ];

  return (
    <section id="faq" className="py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl md:text-5xl font-bold text-center section-title">Câu hỏi thường gặp</h3>
        <div className="max-w-3xl mx-auto mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <div
                className="accordion-header"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h4 className="text-lg font-semibold text-gray-800">{faq.question}</h4>
                <span className="text-gray-500">{openIndex === index ? '−' : '+'}</span>
              </div>
              {openIndex === index && (
                <div className="accordion-content">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;