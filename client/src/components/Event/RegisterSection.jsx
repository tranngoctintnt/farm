import { useState, useCallback } from 'react';
import "../Event/style.css";
import { submitEventRegistration } from '../../api';

function RegisterSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ và tên';
    if (!formData.email.trim()) newErrors.email = 'Vui lòng nhập email';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email không hợp lệ';
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Số điện thoại phải có 10 chữ số';
    if (!formData.eventType) newErrors.eventType = 'Vui lòng chọn sự kiện';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await submitEventRegistration(formData);
      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', eventType: '', message: '' });
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
    <section id="register" className="py-28 bg-[#f9f9f9]">
      <div className="container mx-auto px-4">
        <h3 className="text-4xl md:text-5xl font-bold text-center section-title">Đăng ký sự kiện</h3>
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input w-full p-4 ${errors.phone ? 'border-red-500' : ''}`}
                pattern="\d*"
                maxLength="10"
              />
              <span className="tooltip top-0 right-0 mt-2 mr-2">Nhập số điện thoại 10 chữ số</span>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            <div className="relative">
              <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">Sự kiện</label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                className={`form-select w-full p-4 ${errors.eventType ? 'border-red-500' : ''}`}
              >
                <option value="">Chọn sự kiện</option>
                <option value="ngay-hoi">Ngày hội nông sản</option>
                <option value="workshop">Workshop nông nghiệp</option>
                <option value="khac">Khác</option>
              </select>
              <span className="tooltip top-0 right-0 mt-2 mr-2">Chọn sự kiện bạn muốn tham gia</span>
              {errors.eventType && <p className="text-red-500 text-sm mt-1">{errors.eventType}</p>}
            </div>
            <div className="relative">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Tin nhắn</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-input w-full p-4"
                rows="5"
              ></textarea>
              <span className="tooltip top-0 right-0 mt-2 mr-2">Mô tả thêm yêu cầu của bạn</span>
            </div>
            <button type="submit" className="cta-button w-full">Gửi đăng ký</button>
          </form>
          {formStatus === 'success' && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
              Đăng ký thành công! Chúng tôi sẽ liên hệ sớm.
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

export default RegisterSection;