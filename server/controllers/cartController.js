const { getConnection, sql } = require('../config/db');
// const sql = require("mssql");
// const { dbConfig } = require("../config/db");

const addToCart = async (req, res) => {
  const { idProduct, quantity } = req.body;
  const idCustomer = req.user.idCustomer;

  try {
    // const pool = await poolPromise;
    const pool = await getConnection();

    // Kiểm tra thông tin đầu vào
    if (!idProduct || !quantity)
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    if (quantity <= 0)
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    if (isNaN(quantity))
      return res.status(400).json({ message: "Quantity must be a number" });
    if (isNaN(idProduct))
      return res.status(400).json({ message: "Product ID must be a number" });
    if (idProduct <= 0)
      return res
        .status(400)
        .json({ message: "Product ID must be greater than 0" });
    if (idCustomer <= 0)
      return res
        .status(400)
        .json({ message: "Customer ID must be greater than 0" });
    // Kiểm tra xem sản phẩm có tồn tại không

    // Kiểm tra sản phẩm có tồn tại và còn hàng không
    const productResult = await pool
      .request()
      .input("idProduct", sql.Int, idProduct)
      .query(
        "SELECT stockProduct, newPrice FROM Products WHERE idProduct = @idProduct"
      );

    const product = productResult.recordset[0];
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stockProduct < quantity)
      return res.status(400).json({ message: "Not enough stock" });

    // Kiểm tra giỏ hàng của người dùng
    let cartResult = await pool
      .request()
      .input("idCustomer", sql.Int, idCustomer)
      .query("SELECT idCart FROM Cart WHERE idCustomer = @idCustomer");

    let idCart = cartResult.recordset[0]?.idCart;
    if (!idCart) {
      // Tạo giỏ hàng mới nếu chưa có
      const newCart = await pool
        .request()
        .input("idCustomer", sql.Int, idCustomer)
        .query(
          "INSERT INTO Cart (idCustomer, createdAt, updatedAt) OUTPUT INSERTED.idCart VALUES (@idCustomer, GETDATE(), GETDATE())"
        );
      idCart = newCart.recordset[0].idCart;
    }

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const cartItemResult = await pool
      .request()
      .input("idCart", sql.Int, idCart)
      .input("idProduct", sql.Int, idProduct)
      .query(
        "SELECT idCartItem, quantity FROM CartItems WHERE idCart = @idCart AND idProduct = @idProduct"
      );

    if (cartItemResult.recordset.length > 0) {
      // Nếu sản phẩm đã có, cập nhật số lượng
      const newQuantity =
        parseInt(cartItemResult.recordset[0].quantity, 10) +
        parseInt(quantity, 10);
      if (product.stockProduct < newQuantity)
        return res.status(400).json({ message: "Not enough stock" });

      await pool
        .request()
        .input("idCartItem", sql.Int, cartItemResult.recordset[0].idCartItem)
        .input("quantity", sql.Int, newQuantity)
        .query(
          "UPDATE CartItems SET quantity = @quantity, updatedAt = GETDATE() WHERE idCartItem = @idCartItem"
        );
    } else {
      // Nếu sản phẩm chưa có, thêm mới
      await pool
        .request()
        .input("idCart", sql.Int, idCart)
        .input("idProduct", sql.Int, idProduct)
        .input("quantity", sql.Int, quantity)
        .input("priceAtAdd", sql.Decimal(10, 2), product.newPrice)
        .query(
          "INSERT INTO CartItems (idCart, idProduct, quantity, priceAtAdd, createdAt, updatedAt) VALUES (@idCart, @idProduct, @quantity, @priceAtAdd, GETDATE(), GETDATE())"
        );
    }

    res.json({ message: "Product added to cart" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getCart = async (req, res) => {
  const idCustomer = req.user.idCustomer;

  //   console.log('Headers:', req.headers);
  try {
    // const pool = await poolPromise;
    const pool = await getConnection();
    const cartResult = await pool
      .request()
      .input("idCustomer", sql.Int, idCustomer).query(`
                SELECT ci.idCartItem, ci.idProduct, ci.quantity, ci.priceAtAdd, p.nameProdcut,p.tilteProdcut,p.imgProduct, p.newPrice, (ci.quantity * ci.priceAtAdd) AS ThanhTien
                FROM Cart c
                JOIN CartItems ci ON c.idCart = ci.idCart
                JOIN Products p ON ci.idProduct = p.idProduct
                WHERE c.idCustomer = @idCustomer
            `);

         const cartItems = cartResult.recordset
    const tongTien = cartItems.reduce((sumTongTien, item) => sumTongTien + item.ThanhTien, 0);
    const tongSP = cartItems.reduce((sumSP, item) => sumSP + item.quantity, 0);


    res.json({ cartItems, tongTien, tongSP });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateCartItem = async (req, res) => {
  const { idCartItem, quantity } = req.body;
  const idCustomer = req.user.idCustomer;

  try {
    // const pool = await poolPromise;
    const pool = await getConnection();
    // Kiểm tra thông tin đầu vào
    if (!idCartItem || !quantity)
      return res
        .status(400)
        .json({ message: "Cart item ID and quantity are required" });
    if (quantity <= 0)
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 0" });
    if (isNaN(quantity))
      return res.status(400).json({ message: "Quantity must be a number" });
    if (isNaN(idCartItem))
      return res.status(400).json({ message: "Cart item ID must be a number" });
    if (isNaN(idCustomer))
      return res.status(400).json({ message: "Customer ID must be a number" });
    if (idCartItem <= 0)
      return res
        .status(400)
        .json({ message: "Cart item ID must be greater than 0" });
    if (idCustomer <= 0)
      return res
        .status(400)
        .json({ message: "Customer ID must be greater than 0" });
    // Kiểm tra xem sản phẩm có tồn tại không
    // Kiểm tra sản phẩm có tồn tại và còn hàng không

    // Kiểm tra sản phẩm trong giỏ hàng
    const cartItemResult = await pool
      .request()
      .input("idCartItem", sql.Int, idCartItem)
      .input("idCustomer", sql.Int, idCustomer).query(`
                SELECT ci.idCartItem, ci.quantity, ci.idProduct, p.stockProduct
                FROM CartItems ci
                JOIN Cart c ON ci.idCart = c.idCart
                JOIN Products p ON ci.idProduct = p.idProduct
                WHERE ci.idCartItem = @idCartItem AND c.idCustomer = @idCustomer
            `);

    const cartItem = cartItemResult.recordset[0];
    if (!cartItem)
      return res.status(404).json({ message: "Cart item not found" });
    if (cartItem.stockProduct < quantity)
      return res.status(400).json({ message: "Not enough stock" });

    // Cập nhật số lượng
    await pool
      .request()
      .input("idCartItem", sql.Int, idCartItem)
      .input("quantity", sql.Int, quantity)
      .query(
        "UPDATE CartItems SET quantity = @quantity, updatedAt = GETDATE() WHERE idCartItem = @idCartItem"
      );

    res.json({ message: "Cart item updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const removeCartItem = async (req, res) => {
  const { idCartItem } = req.body;
  const idCustomer = req.user.idCustomer;

  try {
    // const pool = await poolPromise;
    const pool = await getConnection();
    // Kiểm tra thông tin đầu vào
    if (!idCartItem)
      return res.status(400).json({ message: "Cart item ID is required" });
    if (isNaN(idCartItem))
      return res.status(400).json({ message: "Cart item ID must be a number" });
    if (isNaN(idCustomer))
      return res.status(400).json({ message: "Customer ID must be a number" });
    if (idCartItem <= 0)
      return res
        .status(400)
        .json({ message: "Cart item ID must be greater than 0" });
    if (idCustomer <= 0)
      return res
        .status(400)
        .json({ message: "Customer ID must be greater than 0" });
    // Kiểm tra xem sản phẩm có tồn tại không
    // Kiểm tra sản phẩm có tồn tại và còn hàng không

    // Kiểm tra sản phẩm trong giỏ hàng 
    const cartItemResult = await pool
      .request()
      .input("idCartItem", sql.Int, idCartItem)
      .input("idCustomer", sql.Int, idCustomer).query(`
                SELECT ci.idCartItem
                FROM CartItems ci
                JOIN Cart c ON ci.idCart = c.idCart
                WHERE ci.idCartItem = @idCartItem AND c.idCustomer = @idCustomer
            `);

    if (cartItemResult.recordset.length === 0)
      return res.status(404).json({ message: "Cart item not found" });

    // Xóa sản phẩm
    await pool
      .request()
      .input("idCartItem", sql.Int, idCartItem)
      .query("DELETE FROM CartItems WHERE idCartItem = @idCartItem");

    res.json({ message: "Cart item removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { addToCart, getCart, updateCartItem, removeCartItem };
