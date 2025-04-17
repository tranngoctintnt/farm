const transporter = require('../config/emailConfig');

const sendOrderConfirmationEmail = async (customerEmail, nameOrder,customerName,customerPhone,shippingAddress, newformatDateOrder,
    payment, idOrder, cartItems, totalAmount) => {
  try {
    // console.log(newformatDateOrder);
    const mailOptions = {
      from: 'ngoctin10a11@gmail.com', // Email của bạn
      to: customerEmail,
      subject: `Suối Tiên Farm. Xác nhận đơn hàng #${idOrder}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="background-color: #28a745; color: white; padding: 10px; text-align: center; border-radius: 5px;">Xác nhận hóa đơn</h2>
          <p style="font-size: 16px;"><strong>Kính chào ${nameOrder},</strong></p>
          <p style="font-size: 16px;"><strong>Chúng tôi xin xác nhận rằng đơn hàng #${idOrder} của bạn đã được ghi nhận thành công với các thông tin như sau:</strong></p>
          <p style="font-size: 16px;"><strong>Tên khách hàng nhận hàng:</strong> ${customerName}</p>
          <p style="font-size: 16px;"><strong>Số điện thoại người nhận:</strong> ${customerPhone}</p>
          <p style="font-size: 16px;"><strong>Địa chỉ nhận hàng:</strong> ${shippingAddress}</p>
          <p style="font-size: 16px;"><strong>Ngày đặt hàng:</strong> ${newformatDateOrder}</p>
          <p style="font-size: 16px;"><strong>Phương thức thanh toán:</strong> ${payment}</p>

          <p style="font-size: 16px;"><strong>Trạng thái đơn hàng: Đang xử lý</p>
        <p style="font-size: 16px;">Dưới đây là chi tiết hóa đơn của bạn:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background-color: #f8f9fa;">
                <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Quantity</th>
                <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${cartItems
                .map(
                  (item) => `
                    <tr>
                      <td style="border: 1px solid #ddd; padding: 8px;">${item.nameProdcut}</td>
                      <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity}</td>
                      <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.priceAtAdd.toLocaleString("vi-VN")}</td>
                    </tr>
                  `
                )
                .join('')}
              <tr>
                <td colspan="2" style="border: 1px solid #ddd; padding: 8px; font-weight: bold; text-align: right;">Total</td>
                <td style="border: 1px solid #ddd; padding: 8px; font-weight: bold; text-align: right;">${totalAmount.toLocaleString("vi-VN")}</td>
              </tr>
            </tbody>
          </table>
          <p style="font-size: 16px;"><strong>Mã Hóa Đơn:</strong> #${idOrder}</p>

          <p style="font-size: 16px;"> <strong>💬 Nếu bạn cần hỗ trợ thêm, vui lòng liên hệ với chúng tôi qua email hoặc số hotline 0368724647.</strong></p>
          <p style="font-size: 16px;">🌿 Một lần nữa, cảm ơn bạn đã mua sắm tại <strong>Suối Tiên Farm!</strong></p>
          <p style="font-size: 16px;"><strong>Trân trọng,</strong></p>
          <p style="font-size: 16px;">Đội ngũ Suối Tiên Farm</p>
          <a href="https://suoitien.com" style="font-size: 16px;">suoitien.com</a>


                
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    // console.log(`Order confirmation email sent to ${customerEmail}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send order confirmation email');
  }
};

module.exports = { sendOrderConfirmationEmail };