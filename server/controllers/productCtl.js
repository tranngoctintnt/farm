const express = require("express");
const { getConnection, sql } = require('../config/db');

const app = express();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

app.use(express.json());
// const { dbConfig} = require("../config/db");

// Initialize connection pool once
// let poolPromise = sql
//   .connect(dbConfig)
//   .then((pool) => {
//     // console.log("Connected to SQL Server");
//     return pool;
//   })
//   .catch((err) => {
//     // console.error("Database connection failed:", err);
//     process.exit(1); // Exit if connection fails
//   });

// Middleware for JSON parsing
app.use(express.json());

// Create Product
const createProduct = async (req, res) => {
  try {
    const {
      nameProdcut,
      tilteProdcut,
      descripProdcut,
      oldPrice,
      newPrice,
      idCate,
      stockProduct,
    } = req.body;
    // console.log(req.body);
    // console.log(nameProdcut,tilteProdcut,descripProdcut,oldPrice,newPrice,idCate,stockProduct);

    // console.log("Request body:", req.body);
    // console.log("idCate:", idCate, "Type:", typeof idCate);


    // Ép kiểu idCate thành số nguyên
    const parsedIdCate = parseInt(idCate, 10);
    // console.log("idCate received:", idCate, "Parsed:", parsedIdCate);

    if (isNaN(parsedIdCate)) {
      return res.status(400).json({ success: false, message: "Invalid category ID" });
    }

    // console.log(req.file);
    // Xử lý nhiều hình ảnh
    let imgProduct = [];
    if (req.files && req.files.length > 0) {
      const datetime = new Date()
        .toISOString()
        .replace(/[-:.T]/g, "")
        .slice(0, 14);

      req.files.forEach((file) => {
        const originalName = path.parse(file.originalname).name;
        const ext = path.extname(file.originalname);
        const newFilename = `newProduct_${datetime}_${originalName}${ext}`;
        const newPath = path.join("public", newFilename);
        
        // Di chuyển file đến thư mục mới
        fs.renameSync(file.path, newPath);
        imgProduct.push(`/${newFilename}`);
      });
    }else {
      console.log("No images uploaded");
    }

    // Kiểm tra các trường bắt buộc
    if (!nameProdcut) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }

    if (!tilteProdcut) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    if (!descripProdcut) {
      return res
        .status(400)
        .json({ success: false, message: "Description is required" });
    }

    if (!oldPrice) {
      return res
        .status(400)
        .json({ success: false, message: "Old Price is required" });
    }

    if (!newPrice) {
      return res
        .status(400)
        .json({ success: false, message: "New price is required" });
    }

    if (!idCate) {
      return res
        .status(400)
        .json({ success: false, message: "Category is required" });
    }
    if (!stockProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Stock is required" });
    }
    const pool = await getConnection();

    // Kiểm tra danh mục có tồn tại không
    const checkCategory = await pool
    .request()
    .input("idCate", sql.Int, parsedIdCate)
    .query("SELECT idCategory FROM Categories WHERE idCategory = @idCate");

  if (checkCategory.recordset.length === 0) {
    return res.status(400).json({ success: false, message: "Invalid category ID" });
  }

  // Chuyển mảng imgProduct thành chuỗi JSON để lưu vào DB
  const imgProductJson = JSON.stringify(imgProduct);


  // Thêm sản phẩm vào cơ sở dữ liệu
    const result = await pool
      .request()
      .input("nameProdcut", sql.NVarChar, nameProdcut)
      .input("tilteProdcut", sql.NVarChar, tilteProdcut)
      .input("descripProdcut", sql.NVarChar, descripProdcut)
      .input("oldPrice", sql.Decimal(18,2), parseFloat(oldPrice))
      .input("newPrice", sql.Decimal(18,2), parseFloat(newPrice))
      .input("idCate", sql.Int, parsedIdCate)
      .input("stockProduct", sql.Int, parseInt(stockProduct))
      .input("imgProduct", sql.NVarChar, imgProductJson) // Lưu dưới dạng JSON
      .query(
        "INSERT INTO Products (nameProdcut, tilteProdcut, descripProdcut, oldPrice,newPrice,idCate,stockProduct,imgProduct,createdAt,updatedAt) VALUES (@nameProdcut,@tilteProdcut,@descripProdcut,@oldPrice,@newPrice,@idCate,@stockProduct,@imgProduct, GETDATE(), GETDATE()); SELECT SCOPE_IDENTITY() as id"
      );

      // console.log("Insert result:", result);
    // Trả về phản hồi
    res.status(201).json({
      success: true,
      data: {
        idProduct: result.recordset[0].id,
        nameProdcut,
        tilteProdcut,
        descripProdcut,
        oldPrice,
        newPrice,
        idCate,
        stockProduct,
        imgProduct, // Trả về mảng các đường dẫn ảnh
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("Error in createProduct:", error); // Log chi tiết lỗi
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get all Product for user
const getAllProductsForUser = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            // .query('SELECT * FROM Products WHERE isActiveProduct = 1');
            .query("SELECT * FROM Products p LEFT JOIN Categories c ON p.idCate = c.idCategory where c.isActiveCate = 1 and p.isActiveProduct = 1");

        if (result.recordset.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'No Products found' 
            });
        }

        res.json({
            success: true,
            data: result.recordset
        });
    } catch (error) {
        console.error('Error in getAllProducts:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Read All Product
const getAllProducts = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Products p LEFT JOIN Categories c ON p.idCate = c.idCategory");

    // Chuyển imgProduct từ JSON về mảng (nếu cần)
    const products = result.recordset.map(product => ({
      ...product,
      imgProduct: JSON.parse(product.imgProduct)[0] || "", // Lấy ảnh đầu tiên từ mảng
    }));

    if (result.recordset.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Product found",
      });
    }
    res.status(200).json({ success: true, data: products });

    // res.json({
    //   success: true,
    //   data: result.recordset,
    // });
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Read Single Product
const getProductById = async (req, res) => {
  // console.log(req.body);
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idProduct", sql.Int, req.params.id)
      .query("SELECT * FROM Products WHERE idProduct = @idProduct");

    if (result.recordset.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      data: result.recordset[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Product
const editProductById = async (req, res) => {
  try {
    const {
      nameProdcut,
      tilteProdcut,
      descripProdcut,
      oldPrice,
      newPrice,
      idCate,
      stockProduct,
      existingImages //// Thêm existingImages từ req.body
    } = req.body;
    
// Lấy danh sách ảnh cũ từ existingImages (nếu có)
const parsedExistingImages = existingImages ? JSON.parse(existingImages) : [];

// Xử lý ảnh mới từ req.files
    let newImages = [];
    if (req.files && req.files.length > 0) {
      const datetime = new Date().toISOString().replace(/[-:.T]/g, "").slice(0, 14);
      req.files.forEach((file) => {
        const originalName = path.parse(file.originalname).name;
        const ext = path.extname(file.originalname);
        const newFilename = `updateProduct_${datetime}_${originalName}${ext}`;
        const newPath = path.join("public", newFilename);
        fs.renameSync(file.path, newPath);
        newImages.push(`/${newFilename}`);
      });
    }
// Hợp nhất ảnh cũ và mới
const updatedImages = [...parsedExistingImages, ...newImages];
const imgProductJson = updatedImages.length > 0 ? JSON.stringify(updatedImages) : null;
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idProduct", sql.Int, req.params.id)
      .input("nameProdcut", sql.NVarChar, nameProdcut)
      .input("tilteProdcut", sql.NVarChar, tilteProdcut)
      .input("descripProdcut", sql.NVarChar, descripProdcut)
      .input("oldPrice", sql.Decimal(18, 2), parseFloat(oldPrice))
      .input("newPrice", sql.Decimal(18, 2), parseFloat(newPrice))
      .input("idCate", sql.Int, parseInt(idCate))
      .input("stockProduct", sql.Int, parseInt(stockProduct))
      .input("imgProduct", sql.NVarChar, imgProductJson)
      .query(`
        UPDATE Products
        SET nameProdcut = @nameProdcut,
            tilteProdcut = @tilteProdcut,
            descripProdcut = @descripProdcut,
            oldPrice = @oldPrice,
            newPrice = @newPrice,
            idCate = @idCate,
            stockProduct = @stockProduct,
            imgProduct = COALESCE(@imgProduct, imgProduct),
            updatedAt = GETDATE()
        WHERE idProduct = @idProduct
      `);

    res.status(200).json({ success: true, message: "Product updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const editStatusProductById = async (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);
  try {

      const { isActive } = req.body;

      const pool = await getConnection();
// let imgCate = imgCatePreview;
//         if (req.file) {
//             const id = req.params.id;
//             const datetime = new Date().toISOString().replace(/[-:.T]/g, "").slice(0, 14);
//             const originalName = path.parse(req.file.originalname).name;
//             const ext = path.extname(req.file.originalname);
//             const newFilename = `updateCate_${id}_${datetime}_${originalName}${ext}`;
//             const newPath = path.join("public", newFilename);
          
//             fs.renameSync(req.file.path, newPath);
//             imgCate = `/${newFilename}`; // Không bị lỗi vì đã khai báo bằng `let`
//           }
      const result = await pool.request()
          .input('id', sql.Int, req.params.id)
          .input('isActiveProduct', sql.Bit, isActive)
          .query('UPDATE Products SET isActiveProduct = @isActiveProduct, updatedAt = GETDATE() WHERE idProduct = @id');        

          // console.log(result.rowsAffected[0]);
      if (result.rowsAffected[0] === 0) {
          return res.status(404).json({ success: false, message: 'Product not found' });
      }
      
      res.json({
          success: true,
          message: 'Product updated successfully'
      });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Product
const deleteProductById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM Products WHERE idProduct = @id");

    if (result.rowsAffected[0] === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Search Categories
const searchProduct = async (req, res) => {
  try {
    const { q } = req.query; // query parameter 'q' for search term
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("searchTerm", sql.NVarChar, `%${q}%`)
      .query("SELECT * FROM Products WHERE nameProdcut LIKE @searchTerm");

    res.json({
      success: true,
      data: result.recordset,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  editProductById,
  deleteProductById,
  searchProduct,
  getAllProductsForUser,
  editStatusProductById,
};
