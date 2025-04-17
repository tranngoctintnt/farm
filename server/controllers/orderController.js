const { getConnection, sql } = require('../config/db');
const { sendOrderConfirmationEmail } = require('../utils/sendEmail');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

const checkout = async (req, res) => {
    // console.log(req.user);
  const idCustomer = req.user.idCustomer;

  const idAddress = req.body.idAddress;
  // console.log(req.body);
  let transaction;
  let pool;
  try {
    // const pool = await poolPromise;
    pool = await getConnection();

    transaction = new sql.Transaction(pool);
    await transaction.begin();
    // console.log('Transaction started');
    const request = transaction.request();
    // Kiểm tra thông tin đầu vào
    if (!idCustomer)
      return res.status(400).json({ message: "Customer ID is required" });

    // Lấy name, email của khách hàng
    const customerResult = await request
      .input("idCustomer", sql.Int, idCustomer)
      .query("SELECT * FROM Customers WHERE idCustomer = @idCustomer");

    if (customerResult.recordset.length === 0) {
      await transaction.rollback();
      return res.status(404).json({ message: "Customer not found" });
    }
    // console.log(customerResult.recordset[0]);
    const nameOrder = customerResult.recordset[0].fullName;
    const customerEmail = customerResult.recordset[0].email;
    if (!customerEmail) {
      await transaction.rollback();
      return res.status(400).json({ message: "Customer email not found" });
    }
      
    // Kiểm tra địa chỉ mặc định
    const addressResult = await transaction .request()
      .input("idCustomer", sql.Int, idCustomer)
      .input("idAddress", sql.Int, idAddress)
      .query(
        "SELECT * FROM CustomerAddresses WHERE idCustomer = @idCustomer AND idAddress = @idAddress"
      );
    if (addressResult.recordset.length === 0) {
      return res
        .status(400)
        .json({ message: "Please set a default address before checkout" });
    }

    // console.log(getName,getPhone, convertAdd);

    // Lấy giỏ hàng của người dùng
    const cartResult = await transaction
      .request()
      .input("idCustomer", sql.Int, idCustomer)
      .query("SELECT idCart FROM Cart WHERE idCustomer = @idCustomer");
    // console.log(cartResult);

    const idCart = cartResult.recordset[0]?.idCart;
      if (!idCart) {
        await transaction.rollback();
        return res.status(400).json({ message: "Cart is empty" });
      }
      // if (!idCart) {
      // return res.status(400).json({ message: "Cart is empty" });

    // Lấy các sản phẩm trong giỏ hàng
    const cartItemsResult = await transaction
      .request()
      .input("idCart", sql.Int, idCart).query(`
                SELECT ci.idProduct, p.nameProdcut, ci.quantity, ci.priceAtAdd, p.stockProduct
                FROM CartItems ci
                JOIN Products p ON ci.idProduct = p.idProduct
                WHERE ci.idCart = @idCart
            `);

    const cartItems = cartItemsResult.recordset;
    // console.log(cartItems);

    if (cartItems.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ message: "Cart is empty" });
    }
    // if (cartItems.length === 0)
    //   return res.status(400).json({ message: "Cart is empty" });

    // Kiểm tra tồn kho
    for (const item of cartItems) {
      if (item.stockProduct < item.quantity) {
        return res
          .status(400)
          .json({
            message: `Not enough stock for product ID ${item.idProduct}`,
          });
      }
    }
    const address = addressResult.recordset[0];

    const customerName = address.fullName;
    const customerPhone = address.phone;
    const phoneRegex = /^[0-9]{9,10}$/;


    if (!phoneRegex.test(customerPhone)) {
      await transaction.rollback();
      return res.status(400).json({ message: "Số điện thoại không hợp lệ" });
    }
    const shippingAddress = `${address.streetAddress} - ${address.city} - ${address.stateProvince} - ${address.country}`;
    // console.log(customerName, customerPhone, shippingAddress);

    // Tính tổng tiền
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.priceAtAdd,
      0
    );

    // Tạo đơn hàng mới với orderStatus = "Pending" và paymentMethod = "Thanh Toán Khi Nhận Hàng"
    const orderResult = await transaction
      .request()
      .input("idCustomer", sql.Int, idCustomer)
      .input("customerName", sql.NVarChar, customerName)
      .input("customerPhone", sql.NVarChar, customerPhone)
      .input("shippingAddress", sql.NVarChar, shippingAddress)
      .input("paymentMethod", sql.NVarChar, "Thanh Toán Khi Nhận Hàng")
      .input("idAddress", sql.Int, idAddress)
      .input("totalAmount", sql.Decimal(10, 2), totalAmount).query(`
                INSERT INTO Orders (idCustomer, orderDate,customerName,customerPhone,shippingAddress, totalAmount, orderStatus, paymentMethod, createAt, updateAt, idAddress)
                OUTPUT INSERTED.idOrder, INSERTED.orderDate,
  INSERTED.paymentMethod
                VALUES (@idCustomer, GETDATE(), @customerName, @customerPhone, @shippingAddress, @totalAmount, 'Pending', @paymentMethod, GETDATE(), GETDATE(),@idAddress)
            `);

    const idOrder = orderResult.recordset[0].idOrder;
    const dateOrder = orderResult.recordset[0].orderDate;
    // const vietnamTime = dayjs(new Date(dateOrder));
    const newformatDateOrder = dayjs(dateOrder).utc().format("HH:mm DD/MM/YYYY");;
    // console.log(newformatDateOrder);

    const payment = orderResult.recordset[0].paymentMethod;

    // console.log(idOrder);
    // Thêm chi tiết đơn hàng
    for (const item of cartItems) {
      const subtotal = item.quantity * item.priceAtAdd;
      await transaction
        .request()
        .input("idOrder", sql.Int, idOrder)
        .input("idProduct", sql.Int, item.idProduct)
        .input("quantity", sql.Int, item.quantity)
        .input("unitPrice", sql.Decimal(10, 2), item.priceAtAdd)
        .input("subtotal", sql.Decimal(10, 2), subtotal).query(`
                    INSERT INTO OrderDetails (idOrder, idProduct, quantity, unitPrice, subtotal)
                    VALUES (@idOrder, @idProduct, @quantity, @unitPrice, @subtotal)
                `);

      // Cập nhật tồn kho
      await transaction
        .request()
        .input("idProduct", sql.Int, item.idProduct)
        .input("quantity", sql.Int, item.quantity)
        .query(
          "UPDATE Products SET stockProduct = stockProduct - @quantity WHERE idProduct = @idProduct"
        );
    }

    // Xóa giỏ hàng
    await transaction
      .request()
      .input("idCart", sql.Int, idCart)
      .query("DELETE FROM CartItems WHERE idCart = @idCart");
    await transaction
      .request()
      .input("idCart", sql.Int, idCart)
      .query("DELETE FROM Cart WHERE idCart = @idCart");
// Commit transaction
await transaction.commit();
// console.log('Transaction committed');

// Gửi email xác nhận đơn hàng
await sendOrderConfirmationEmail(
  customerEmail,
  nameOrder,
  customerName,
  customerPhone,
  shippingAddress,
  newformatDateOrder,
  payment,
  idOrder,
  cartItems, // Truyền danh sách sản phẩm từ giỏ hàng
  totalAmount
);
    res.json({ message: "Checkout successful", orderId: idOrder });
  } catch (err) {
    console.error('Error during checkout:', err);
    if (transaction) {
      try {
        await transaction.rollback();
        // console.log('Transaction rolled back');
      } catch (rollbackErr) {
        console.error('Rollback failed:', rollbackErr);
      }
    }
    res.status(500).json({ message: "Server error", error: err.message });
  } 
};

const getOrdersById = async (req, res) => {
  const idOrder = req.params.id;
  // console.log(idOrder);

  try {
    // const pool = await poolPromise;
    const pool = await getConnection();
    // Lấy danh sách đơn hàng của người dùng

    const ordersResult = await pool
      .request()
      .input("idOrder", sql.Int, idOrder).query(`
                SELECT o.idOrder, o.orderDate, o.totalAmount, o.orderStatus,ad.addressType, o.shippingAddress, o.customerName, o.customerPhone,
                       od.idProduct, od.quantity, od.unitPrice, od.subtotal, p.nameProdcut, p.imgProduct
                FROM Orders o
                 LEFT JOIN CustomerAddresses ad ON o.idAddress = ad.idAddress
                LEFT JOIN OrderDetails od ON o.idOrder = od.idOrder
                LEFT JOIN Products p ON od.idProduct = p.idProduct
                WHERE o.idOrder = @idOrder
            `);
//             const dateOrder = orderResult.recordset[0].orderDate;
// console.log(dateOrder);
// const newformatDateOrder = dayjs(dateOrder).utc().format("HH:mm DD/MM/YYYY");;

    const orders = ordersResult.recordset.reduce((acc, row) => {
      const order = acc.find((o) => o.idOrder === row.idOrder);
      // const dateOrder = orderResult.recordset[0].orderDate;
      // const newformatDateOrder = dayjs(dateOrder).utc().format("HH:mm DD/MM/YYYY");
      if (!order) {
        // Định dạng orderDate cho mỗi row
    const dateOrder = row.orderDate; // Giả sử orderDate nằm trong row
    const newformatDateOrder = dayjs(dateOrder).utc().format("HH:mm DD/MM/YYYY");
        acc.push({
          idOrder: row.idOrder,
          orderDate: newformatDateOrder,
          shippingAddress: row.shippingAddress,
          customerName: row.customerName,
          customerPhone: row.customerPhone,
          totalAmount: row.totalAmount,
          orderStatus: row.orderStatus,
          addressType: row.addressType,
          paymentMethod: row.paymentMethod,
          items: row.idProduct
            ? [
                {
                  idProduct: row.idProduct,
                  nameProdcut: row.nameProdcut,
                  quantity: row.quantity,
                  unitPrice: row.unitPrice,
                  subtotal: row.subtotal,
                  imgProduct: row.imgProduct,
                },
              ]
            : [],
        });
      } else if (row.idProduct) {
        order.items.push({
          idProduct: row.idProduct,
          nameProdcut: row.nameProdcut,
          quantity: row.quantity,
          unitPrice: row.unitPrice,
          subtotal: row.subtotal,
          imgProduct: row.imgProduct,

        });
      }
      return acc;
    }, []);

    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getOrders = async (req, res) => {
  const idCustomer = req.user.idCustomer;
// console.log(idCustomer);
  try {
    // const pool = await poolPromise;
    const pool = await getConnection();
    // Lấy danh sách đơn hàng của người dùng

    const ordersResult = await pool
      .request()
      .input("idCustomer", sql.Int, idCustomer).query(`
                SELECT o.idOrder, o.orderDate, o.totalAmount, o.orderStatus,ad.addressType, o.shippingAddress, o.customerName, o.customerPhone,
                       od.idProduct, od.quantity, od.unitPrice, od.subtotal, p.nameProdcut, p.imgProduct
                FROM Orders o
                LEFT JOIN CustomerAddresses ad ON o.idAddress = ad.idAddress
                LEFT JOIN OrderDetails od ON o.idOrder = od.idOrder
                LEFT JOIN Products p ON od.idProduct = p.idProduct
                WHERE o.idCustomer = @idCustomer
            `);
//             const dateOrder = orderResult.recordset[0].orderDate;
// console.log(dateOrder);
// const newformatDateOrder = dayjs(dateOrder).utc().format("HH:mm DD/MM/YYYY");;

    const orders = ordersResult.recordset.reduce((acc, row) => {
      const order = acc.find((o) => o.idOrder === row.idOrder);
      // const dateOrder = orderResult.recordset[0].orderDate;
      // const newformatDateOrder = dayjs(dateOrder).utc().format("HH:mm DD/MM/YYYY");
      if (!order) {
        // Định dạng orderDate cho mỗi row
    const dateOrder = row.orderDate; // Giả sử orderDate nằm trong row
    const newformatDateOrder = dayjs(dateOrder).utc().format("HH:mm DD/MM/YYYY");
        acc.push({
          idOrder: row.idOrder,
          orderDate: newformatDateOrder,
          shippingAddress: row.shippingAddress,
          customerName: row.customerName,
          customerPhone: row.customerPhone,
          totalAmount: row.totalAmount,
          orderStatus: row.orderStatus,
          addressType: row.addressType,
          paymentMethod: row.paymentMethod,
          items: row.idProduct
            ? [
                {
                  idProduct: row.idProduct,
                  nameProdcut: row.nameProdcut,
                  quantity: row.quantity,
                  unitPrice: row.unitPrice,
                  subtotal: row.subtotal,
                  imgProduct: row.imgProduct,
                },
              ]
            : [],
        });
      } else if (row.idProduct) {
        order.items.push({
          idProduct: row.idProduct,
          nameProdcut: row.nameProdcut,
          quantity: row.quantity,
          unitPrice: row.unitPrice,
          subtotal: row.subtotal,
          imgProduct: row.imgProduct,

        });
      }
      return acc;
    }, []);

    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
const getOrdersOfCustomerForAdmin = async (req, res) => {
  const idCustomer = req.params.id;
// console.log(idCustomer);
  try {
    // const pool = await poolPromise;
    const pool = await getConnection();
    // Lấy danh sách đơn hàng của người dùng

    const ordersResult = await pool
      .request()
      .input("idCustomer", sql.Int, idCustomer).query(`
                SELECT o.idOrder, o.orderDate, o.totalAmount, o.orderStatus,ad.addressType, o.shippingAddress, o.customerName, o.customerPhone,
                       od.idProduct, od.quantity, od.unitPrice, od.subtotal, p.nameProdcut, p.imgProduct
                FROM Orders o
                LEFT JOIN CustomerAddresses ad ON o.idAddress = ad.idAddress
                LEFT JOIN OrderDetails od ON o.idOrder = od.idOrder
                LEFT JOIN Products p ON od.idProduct = p.idProduct
                WHERE o.idCustomer = @idCustomer
            `);
//             const dateOrder = orderResult.recordset[0].orderDate;
// console.log(dateOrder);
// const newformatDateOrder = dayjs(dateOrder).utc().format("HH:mm DD/MM/YYYY");;

    const orders = ordersResult.recordset.reduce((acc, row) => {
      const order = acc.find((o) => o.idOrder === row.idOrder);
      // const dateOrder = orderResult.recordset[0].orderDate;
      // const newformatDateOrder = dayjs(dateOrder).utc().format("HH:mm DD/MM/YYYY");
      if (!order) {
        // Định dạng orderDate cho mỗi row
    const dateOrder = row.orderDate; // Giả sử orderDate nằm trong row
    const newformatDateOrder = dayjs(dateOrder).utc().format("HH:mm DD/MM/YYYY");
        acc.push({
          idOrder: row.idOrder,
          orderDate: newformatDateOrder,
          shippingAddress: row.shippingAddress,
          customerName: row.customerName,
          customerPhone: row.customerPhone,
          totalAmount: row.totalAmount,
          orderStatus: row.orderStatus,
          addressType: row.addressType,
          paymentMethod: row.paymentMethod,
          items: row.idProduct
            ? [
                {
                  idProduct: row.idProduct,
                  nameProdcut: row.nameProdcut,
                  quantity: row.quantity,
                  unitPrice: row.unitPrice,
                  subtotal: row.subtotal,
                  imgProduct: row.imgProduct,
                },
              ]
            : [],
        });
      } else if (row.idProduct) {
        order.items.push({
          idProduct: row.idProduct,
          nameProdcut: row.nameProdcut,
          quantity: row.quantity,
          unitPrice: row.unitPrice,
          subtotal: row.subtotal,
          imgProduct: row.imgProduct,

        });
      }
      return acc;
    }, []);

    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const cancelOrder = async (req, res) => {
  const { idOrder } = req.body;
  const idCustomer = req.user.idCustomer;
// console.log(idCustomer, idOrder);
  try {
    // const pool = await poolPromise;
    const pool = await getConnection();
    // Kiểm tra thông tin đầu vào
    if (!idOrder)
      return res.status(400).json({ message: "Order ID is required" });
    if (isNaN(idOrder))
      return res.status(400).json({ message: "Order ID must be a number" });
    if (isNaN(idCustomer))
      return res.status(400).json({ message: "Customer ID must be a number" });
    if (idOrder <= 0)
      return res
        .status(400)
        .json({ message: "Order ID must be greater than 0" });
    if (idCustomer <= 0)
      return res
        .status(400)
        .json({ message: "Customer ID must be greater than 0" });
    // Kiểm tra xem đơn hàng có tồn tại không

    // Kiểm tra đơn hàng có tồn tại và thuộc về người dùng không
    const orderResult = await pool
      .request()
      .input("idOrder", sql.Int, idOrder)
      .input("idCustomer", sql.Int, idCustomer)
      .query(
        "SELECT orderStatus FROM Orders WHERE idOrder = @idOrder AND idCustomer = @idCustomer"
      );

    const order = orderResult.recordset[0];
    if (!order) return res.status(404).json({ message: "Order not found" });
// console.log(order.orderStatus);
    // Kiểm tra trạng thái đơn hàng
    if (order.orderStatus !== "Pending") {
      return res
        .status(400)
        .json({ message: "Cannot cancel order: Order status is not Pending" });
    }

    // Cập nhật trạng thái đơn hàng thành "Cancelled"
    await pool
      .request()
      .input("idOrder", sql.Int, idOrder)
      .query(
        "UPDATE Orders SET orderStatus = 'Cancelled', updateAt = GETDATE() WHERE idOrder = @idOrder"
      );

    // Lấy chi tiết đơn hàng để cập nhật tồn kho
    const orderDetailsResult = await pool
      .request()
      .input("idOrder", sql.Int, idOrder)
      .query(
        "SELECT idProduct, quantity FROM OrderDetails WHERE idOrder = @idOrder"
      );

    const orderDetails = orderDetailsResult.recordset;

    // Cập nhật lại tồn kho
    for (const item of orderDetails) {
      await pool
        .request()
        .input("idProduct", sql.Int, item.idProduct)
        .input("quantity", sql.Int, item.quantity)
        .query(
          "UPDATE Products SET stockProduct = stockProduct + @quantity WHERE idProduct = @idProduct"
        );
    }

    

    res.json({ message: "Order cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  // console.log(req.body);
  const { idOrder, newStatus } = req.body;
  // console.log(idOrder, newStatus);
  // const idCustomer = req.user.idCustomer;

  // Danh sách trạng thái hợp lệ
  const validStatuses = [
    "Pending",
    "Confirm",
    "Delivered",
    "Success",
    "Failed",
    "Cancelled",
  ];
  if (!validStatuses.includes(newStatus)) {
    return res.status(400).json({ message: "Invalid order status" });
  }

  try {
    // const pool = await poolPromise;
    const pool = await getConnection();
    // Kiểm tra thông tin đầu vào
    if (!idOrder)
      return res.status(400).json({ message: "Order ID is required" });
    if (isNaN(idOrder))
      return res.status(400).json({ message: "Order ID must be a number" });
    // if (isNaN(idCustomer)) return res.status(400).json({ message: 'Customer ID must be a number' });
    if (idOrder <= 0)
      return res
        .status(400)
        .json({ message: "Order ID must be greater than 0" });
    // if (idCustomer <= 0) return res.status(400).json({ message: 'Customer ID must be greater than 0' });
    // Kiểm tra xem đơn hàng có tồn tại không
    // Kiểm tra trạng thái đơn hàng

    // Kiểm tra đơn hàng có tồn tại và thuộc về người dùng không
    const orderResult = await pool
      .request()
      .input("idOrder", sql.Int, idOrder)
      // .input('idCustomer', sql.Int, idCustomer)
      .query("SELECT orderStatus FROM Orders WHERE idOrder = @idOrder");

    const order = orderResult.recordset[0];
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Không cho phép thay đổi trạng thái nếu đơn hàng đã bị hủy
    if (order.orderStatus === "Cancelled") {
      return res
        .status(400)
        .json({ message: "Cannot update status: Order is already cancelled" });
    }

    // Cập nhật trạng thái đơn hàng
    await pool
      .request()
      .input("idOrder", sql.Int, idOrder)
      .input("newStatus", sql.VarChar, newStatus)
      .query(
        "UPDATE Orders SET orderStatus = @newStatus, updateAt = GETDATE() WHERE idOrder = @idOrder"
      );
   

    // Nếu trạng thái mới là "Cancelled", cập nhật lại tồn kho
    if (newStatus === "Cancelled" || newStatus === "Failed") {
      const orderDetailsResult = await pool
        .request()
        .input("idOrder", sql.Int, idOrder)
        .query(
          "SELECT idProduct, quantity FROM OrderDetails WHERE idOrder = @idOrder"
        );

      const orderDetails = orderDetailsResult.recordset;

      for (const item of orderDetails) {
        await pool
          .request()
          .input("idProduct", sql.Int, item.idProduct)
          .input("quantity", sql.Int, item.quantity)
          .query(
            "UPDATE Products SET stockProduct = stockProduct + @quantity WHERE idProduct = @idProduct"
          );
      }
    }

    res.json({ message: "Order status updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getOrderForAdmin = async (req, res) => {
  const idAdmin = req.user.idAdminUser;
  // console.log(idAdmin);
  // Kiểm tra xem người dùng có phải là admin không
  if (!idAdmin) {
    return res.status(403).json({ message: "Access denied" });
  }
 
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
      SELECT o.idOrder, o.orderDate, o.totalAmount, o.orderStatus,o.paymentMethod,ad.addressType, o.shippingAddress, o.customerName, o.customerPhone,
             od.idProduct, od.quantity, od.unitPrice, od.subtotal, p.nameProdcut, p.imgProduct
      FROM Orders o
      LEFT JOIN CustomerAddresses ad ON o.idAddress = ad.idAddress
      LEFT JOIN OrderDetails od ON o.idOrder = od.idOrder
      LEFT JOIN Products p ON od.idProduct = p.idProduct
       order by o.orderDate desc
    `); 
    const orders = result.recordset.reduce((acc, row) => {
      const order = acc.find((o) => o.idOrder === row.idOrder);
      const dateOrder = row.orderDate; // Giả sử orderDate nằm trong row
      const newformatDateOrder = dayjs(dateOrder).utc().format("HH:mm DD/MM/YYYY");
      if (!order) {
        acc.push({
          idOrder: row.idOrder,
          orderDate: newformatDateOrder,
          shippingAddress: row.shippingAddress,
          customerName: row.customerName,
          customerPhone: row.customerPhone,
          totalAmount: row.totalAmount,
          orderStatus: row.orderStatus,
          addressType: row.addressType,
          paymentMethod: row.paymentMethod,
          items: row.idProduct
            ? [
                {
                  idProduct: row.idProduct,
                  nameProdcut: row.nameProdcut,
                  quantity: row.quantity,
                  unitPrice: row.unitPrice,
                  subtotal: row.subtotal,
                  imgProduct: row.imgProduct,
                },
              ]
            : [],
        });
      } else if (row.idProduct) {
        order.items.push({
          idProduct: row.idProduct,
          nameProdcut: row.nameProdcut,
          quantity: row.quantity,
          unitPrice: row.unitPrice,
          subtotal: row.subtotal,
          imgProduct: row.imgProduct,

        });
      }
      return acc;
    }, []);
    res.json( orders );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    
  }
}

module.exports = { checkout, getOrders, cancelOrder,getOrderForAdmin,getOrdersById,getOrdersOfCustomerForAdmin, updateOrderStatus };
