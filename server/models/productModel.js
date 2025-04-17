const {poolPromise} = require('../config/db'); // Pool kết nối SQL Server

const productModel = {
  // Lấy số lượng tồn kho của sản phẩm
  async getStock(idProduct) {
    const pool = await poolPromise; // Lấy pool kết nối
    const result = await pool.request()
      .input('idProduct', idProduct) // Thêm tham số idProduct
      .query('SELECT stockProduct FROM Products WHERE idProduct = @idProduct');
    return result.recordset[0]?.stockProduct; // Trả về stockProduct hoặc undefined nếu không tìm thấy
  },

  // Cập nhật số lượng tồn kho sau khi đặt hàng
  async updateStock(idProduct, quantity) {
    const pool = await poolPromise;
    await pool.request()
      .input('quantity', quantity) // Thêm tham số quantity
      .input('idProduct', idProduct) // Thêm tham số idProduct
      .query('UPDATE Products SET stockProduct = stockProduct - @quantity WHERE idProduct = @idProduct');
  },

  // Lấy giá sản phẩm tại thời điểm hiện tại
  async getPrice(idProduct) {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('idProduct', idProduct) // Thêm tham số idProduct
      .query('SELECT newPrice FROM Products WHERE idProduct = @idProduct');
    return result.recordset[0]?.newPrice; // Trả về newPrice hoặc undefined nếu không tìm thấy
  }
};

module.exports = productModel; // Xuất model để sử dụng trong controller