import { useState, useCallback } from 'react';
import { submitContactForm } from '../../api';
import "../Policy/style.css";
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    partnershipType: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ và tên';
    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
    if (!formData.message.trim()) newErrors.message = 'Vui lòng nhập tin nhắn';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await submitContactForm(formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', company: '', partnershipType: '', message: '' });
      setErrors({});
      setTimeout(() => setFormStatus(null), 3000);
    } catch (error) {
      setFormStatus('error');
    }
  }, [formData, validateForm]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  }, [errors]);

  return (
    <section id="contact" className="py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl md:text-5xl font-bold text-center section-title">Liên hệ hợp tác</h3>
        <div className="max-w-lg mx-auto mt-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input w-full p-4 ${errors.name ? 'border-red-500' : ''}`}
              />
              <span className="tooltip top-0 right-0 mt-2 mr-2">Nhập họ và tên đầy đủ</span>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div className="relative">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input w-full p-4 ${errors.email ? 'border-red-500' : ''}`}
              />
              <span className="tooltip top-0 right-0 mt-2 mr-2">Sử dụng email liên hệ chính thức</span>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="relative">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Tên doanh nghiệp</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="form-input w-full p-4"
              />
              <span className="tooltip top-0 right-0 mt-2 mr-2">Tên công ty hoặc tổ chức (nếu có)</span>
            </div>
            <div className="relative">
              <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-700 mb-1">Loại hợp tác</label>
              <select
                id="partnershipType"
                name="partnershipType"
                value={formData.partnershipType}
                onChange={handleChange}
                className="form-select w-full p-4"
              >
                <option value="">Chọn loại hợp tác</option>
                <option value="cung-cap">Cung cấp nông sản</option>
                <option value="phan-phoi">Phân phối sản phẩm</option>
                <option value="su-kien">Tổ chức sự kiện</option>
                <option value="khac">Khác</option>
              </select>
              <span className="tooltip top-0 right-0 mt-2 mr-2">Chọn lĩnh vực hợp tác phù hợp</span>
            </div>
            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Tin nhắn</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`form-input w-full p-4 ${errors.message ? 'border-red-500' : ''}`}
                rows="5"
              ></textarea>
              <span className="tooltip top-0 right-0 mt-2 mr-2">Mô tả chi tiết nhu cầu hợp tác</span>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            <button type="submit" className="cta-button w-full">Gửi thông tin</button>
          </form>
          {formStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
              Thông tin đã được gửi thành công! Chúng tôi sẽ liên hệ sớm.
            </div>
          )}
          {formStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg text-center">
              Đã xảy ra lỗi. Vui lòng thử lại sau.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ContactSection;