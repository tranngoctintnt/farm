const {poolPromise} = require('../config/db'); // Pool kết nối SQL Server

const orderModel = {
  // Tạo đơn hàng mới
  async createOrder(idCustomer, idAddress, customerData, totalAmount, paymentMethod) {
    const pool = await poolPromise;
    const { fullName, email, phone } = customerData;

    // Lấy địa chỉ giao hàng từ bảng CustomerAddresses
    const addressResult = await pool.request()
      .input('idAddress', idAddress) // Thêm tham số idAddress
      .query(`
        SELECT CONCAT(streetAddress, ', ', city, ', ', stateProvince, ', ', country) AS shippingAddress 
        FROM CustomerAddresses 
        WHERE idAddress = @idAddress
      `);
    const shippingAddress = addressResult.recordset[0]?.shippingAddress;

    // Tạo bản ghi mới trong bảng Orders
    const result = await pool.request()
      .input('idCustomer', idCustomer) // Thêm tham số idCustomer
      .input('idAddress', idAddress) // Thêm tham số idAddress
      .input('customerName', fullName) // Thêm tham số customerName
      .input('customerEmail', email) // Thêm tham số customerEmail
      .input('customerPhone', phone) // Thêm tham số customerPhone
      .input('shippingAddress', shippingAddress) // Thêm tham số shippingAddress
      .input('totalAmount', totalAmount) // Thêm tham số totalAmount
      .input('paymentMethod', paymentMethod) // Thêm tham số paymentMethod
      .query(`
        INSERT INTO Orders (
          idCustomer, idAddress, customerName, customerEmail, customerPhone, 
          shippingAddress, orderStatus, totalAmount, paymentMethod, createdAt
        ) 
        OUTPUT INSERTED.idOrder 
        VALUES (@idCustomer, @idAddress, @customerName, @customerEmail, @customerPhone, 
                @shippingAddress, 'pending', @totalAmount, @paymentMethod, GETDATE())
      `);
    return result.recordset[0].idOrder; // Trả về idOrder của bản ghi vừa tạo
  },

  // Tạo chi tiết đơn hàng (OrderDetails) từ danh sách sản phẩm trong giỏ hàng
  async createOrderDetails(idOrder, cartItems) {
    const pool = await poolPromise;
    const request = pool.request();
    for (const item of cartItems) {
      // Thêm từng sản phẩm vào bảng OrderDetails
      await request
        .input('idOrder', idOrder) // Thêm tham số idOrder
        .input('idProduct', item.idProduct) // Thêm tham số idProduct
        .input('quantity', item.quantity) // Thêm tham số quantity
        .input('unitPrice', item.priceAtAdd) // Thêm tham số unitPrice
        .input('subtotal', item.quantity * item.priceAtAdd) // Thêm tham số subtotal
        .query(`
          INSERT INTO OrderDetails (idOrder, idProduct, quantity, unitPrice, subtotal) 
          VALUES (@idOrder, @idProduct, @quantity, @unitPrice, @subtotal)
        `);
    }
  },

  // Lấy lịch sử đơn hàng của khách hàng
  async getOrderHistory(idCustomer) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('idCustomer', idCustomer) // Thêm tham số idCustomer
      .query(`
        SELECT o.idOrder, o.orderStatus, o.totalAmount, o.paymentMethod, o.createdAt,
               STRING_AGG(
                 CONCAT(od.idProduct, ':', od.quantity, ':', od.unitPrice, ':', od.subtotal),
                 ';'
               ) AS orderDetails
        FROM Orders o
        LEFT JOIN OrderDetails od ON o.idOrder = od.idOrder
        WHERE o.idCustomer = @idCustomer
        GROUP BY o.idOrder, o.orderStatus, o.totalAmount, o.paymentMethod, o.createdAt
        ORDER BY o.createdAt DESC
      `);

    // Parse dữ liệu orderDetails thành mảng các object
    return result.recordset.map(order => ({
      idOrder: order.idOrder,
      orderStatus: order.orderStatus,
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      createdAt: order.createdAt,
      orderDetails: order.orderDetails
        ? order.orderDetails.split(';').map(detail => {
            const [idProduct, quantity, unitPrice, subtotal] = detail.split(':');
            return { idProduct, quantity: parseInt(quantity), unitPrice: parseFloat(unitPrice), subtotal: parseFloat(subtotal) };
          })
        : []
    }));
  }
};

module.exports = orderModel; // Xuất model để sử dụng trong controller