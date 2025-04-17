const { poolPromise } = require("../config/db"); // Pool kết nối SQL Server
const sql = require("mssql");

const cartModel = {
  // Lấy idCart của khách hàng
  async getCart(idCustomer) {
    // console.log(idCustomer);
    const pool = await poolPromise;
    // console.log(pool);

    const result = await pool
      .request()
      .input("idCustomer", idCustomer) // Thêm tham số idCustomer
      .query("SELECT idCart FROM Cart WHERE idCustomer = @idCustomer");
    // console.log(result);

    return result.recordset[0]?.idCart; // Trả về idCart hoặc undefined nếu không tìm thấy
  },

  // Tạo giỏ hàng mới cho khách hàng
  async createCart(idCustomer) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("idCustomer", idCustomer) // Thêm tham số idCustomer
      .query(
        "INSERT INTO Cart (idCustomer, createdAt) OUTPUT INSERTED.idCart VALUES (@idCustomer, GETDATE())"
      );
    return result.recordset[0].idCart; // Trả về idCart của bản ghi vừa tạo
  },

  // Thêm sản phẩm vào giỏ hàng
  async addToCart(idCart, idProduct, quantity, priceAtAdd) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("idCart", idCart) // Thêm tham số idCart
      .input("idProduct", idProduct) // Thêm tham số idProduct
      .input("quantity", quantity) // Thêm tham số quantity
      .input("priceAtAdd", priceAtAdd) // Thêm tham số priceAtAdd
      .query(
        "INSERT INTO CartItems (idCart, idProduct, quantity, priceAtAdd, createdAt) VALUES (@idCart, @idProduct, @quantity, @priceAtAdd, GETDATE())"
      );
  },

  // Lấy danh sách sản phẩm trong giỏ hàng (dùng khi thanh toán)
  async getCartItems(idCart) {
    const pool = await poolPromise;
    const result = await pool.request().input("idCart", idCart) // Thêm tham số idCart
      .query(`
        SELECT ci.idProduct, ci.quantity, ci.priceAtAdd, p.stockProduct 
        FROM CartItems ci 
        JOIN Products p ON ci.idProduct = p.idProduct 
        WHERE ci.idCart = @idCart
      `);
    return result.recordset; // Trả về danh sách sản phẩm trong giỏ hàng
  },

  // Lấy chi tiết giỏ hàng (bao gồm thông tin sản phẩm, dùng khi xem giỏ hàng)
  async getCartItemsWithDetails(idCart) {
    const pool = await poolPromise;
    const result = await pool.request().input("idCart", idCart) // Thêm tham số idCart
      .query(`
        		SELECT 
    ci.idProduct, 
    idCart, 
    SUM(quantity) AS totalQuantity, 
    MAX(priceAtAdd) AS priceAtAdd, 
    MAX(p.nameProdcut) AS nameProduct,
    MAX(p.imgProduct) AS imgProduct, 
    MAX(p.tilteProdcut) AS titleProduct, 
    MAX(newPrice) AS newPrice, 
    MAX(stockProduct) AS stockProduct
FROM CartItems ci JOIN Products p ON ci.idProduct = p.idProduct
 WHERE ci.idCart = @idCart
GROUP BY ci.idProduct, idCart
      `);
      // console.log(result);
    return result.recordset; // Trả về danh sách sản phẩm với thông tin chi tiết
  },

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  async updateCartItem(idCart, idProduct, quantity) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("quantity", quantity) // Thêm tham số quantity
      .input("idCart", idCart) // Thêm tham số idCart
      .input("idProduct", idProduct) // Thêm tham số idProduct
      .query(`
        UPDATE CartItems 
        SET quantity = @quantity, updatedAt = GETDATE() 
        WHERE idCart = @idCart AND idProduct = @idProduct
      `);
    return result.rowsAffected[0] > 0; // Trả về true nếu có bản ghi được cập nhật
  },

  // Xóa sản phẩm khỏi giỏ hàng
  async removeCartItem(idCart, idProduct) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("idCart", idCart) // Thêm tham số idCart
      .input("idProduct", idProduct) // Thêm tham số idProduct
      .query(
        "DELETE FROM CartItems WHERE idCart = @idCart AND idProduct = @idProduct"
      );
    return result.rowsAffected[0] > 0; // Trả về true nếu có bản ghi bị xóa
  },

  // Xóa toàn bộ sản phẩm trong giỏ hàng (sau khi thanh toán)
  async clearCartItems(idCart) {
    const pool = await poolPromise;
    await pool
      .request()
      .input("idCart", idCart) // Thêm tham số idCart
      .query("DELETE FROM CartItems WHERE idCart = @idCart");
  },
};

module.exports = cartModel; // Xuất model để sử dụng trong controller
