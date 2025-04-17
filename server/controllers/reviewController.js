const { getConnection, sql } = require("../config/db");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
// const timezone = require('dayjs/plugin/timezone');

const getAllReviews = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
            SELECT idReview, idCustomer, idProduct, rating, reviewText, 
                   isVerified, isActive, createdAt, updatedAt 
            FROM CustomerReviews
            WHERE isActive = 1
        `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

const getAllReviewsForAdmin = async (req, res) => {
 
  try {
    const pool = await getConnection();
    const result = await pool.request().query(`
              	   SELECT idReview, r.idCustomer, c.fullName, c.avatar, r.idProduct, p.nameProdcut,p.imgProduct, rating, reviewText, 
                       isVerified, r.isActive, r.createdAt, r.updatedAt 
                FROM CustomerReviews r
                JOIN Products p ON r.idProduct = p.idProduct
                JOIN Customers c ON r.idCustomer = c.idCustomer
            Order by createdAt DESC
        `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};

const editStatusReviewById = async (req, res) => {
  // console.log(req.body);
  // console.log(req.params.id);
  
  try {

      const { isActive } = req.body;

      const pool = await getConnection();

      const result = await pool.request()
          .input('id', sql.Int, req.params.id)
          .input('isActive', sql.Bit, isActive)
          .query('UPDATE CustomerReviews SET isActive = @isActive, updatedAt = GETDATE() WHERE idReview = @id');        

          
      if (result.rowsAffected[0] === 0) {
          return res.status(404).json({ success: false, message: 'Customer Review not found' });
      }
      
      res.json({
          success: true,
          message: 'Customer Review updated successfully'
      });
  } catch (error) {
      res.status(500).json({ success: false, message: error.message });
  }
};

const getReviewById = async (req, res) => {
  // console.log(req.params.id);
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idProduct", sql.Int, req.params.id).query(`
                 SELECT idReview, r.idCustomer, c.fullName, c.avatar, r.idProduct, rating, reviewText, 
                       isVerified, r.isActive, r.createdAt, r.updatedAt 
                FROM CustomerReviews r
                JOIN Products p ON r.idProduct = p.idProduct
                JOIN Customers c ON r.idCustomer = c.idCustomer
                WHERE r.idProduct = @idProduct AND r.isActive = 1
            `);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: "Error fetching review", error });
  }
};

const createReview = async (req, res) => {
  const { idCustomer, idProduct, rating, reviewText } = req.body;
  
  if (!idCustomer || !idProduct || !rating) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {

    const pool = await getConnection();
    // console.log(req.body);
    // const date = new Date();
    // const offset = 7; // GMT+7
    // const newDate = date.setHours(date.getHours() + offset);
    // // console.log(newDate);
    // const newformatDate = dayjs(newDate).utc().format("HH:mm DD-MM-YYYY");
    // console.log(newformatDate);
    const result = await pool
      .request()
      .input("idCustomer", sql.Int, idCustomer)
      .input("idProduct", sql.Int, idProduct)
      .input("rating", sql.Int, rating)
      .input("reviewText", sql.NVarChar, reviewText || "")
      .input("isVerified", sql.Bit, false)
      .input("isActive", sql.Bit, true).query(`
                INSERT INTO CustomerReviews (idCustomer, idProduct, rating, reviewText, 
                                   isVerified, isActive, createdAt, updatedAt)
                OUTPUT INSERTED.*
                VALUES (@idCustomer, @idProduct, @rating, @reviewText, 
                        @isVerified, @isActive, GETDATE(), GETDATE())
            `);
    res.status(201).json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
};

const updateReview = async (req, res) => {
  const { rating, reviewText, isVerified, isActive } = req.body;

  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idReview", sql.Int, req.params.id)
      .input("rating", sql.Int, rating)
      .input("reviewText", sql.NVarChar, reviewText)
      .input("isVerified", sql.Bit, isVerified)
      .input("isActive", sql.Bit, isActive)
      .input("updatedAt", sql.DateTime, new Date()).query(`
                UPDATE CustomerReviews
                SET rating = @rating,
                    reviewText = @reviewText,
                    isVerified = @isVerified,
                    isActive = @isActive,
                    updatedAt = @updatedAt
                OUTPUT INSERTED.*
                WHERE idReview = @idReview
            `);

    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
};

const deleteReview = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("idReview", sql.Int, req.params.id).query(`
                UPDATE CustomerReviews
                SET isActive = 0,
                    updatedAt = GETDATE()
                WHERE idReview = @idReview
            `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
  getAllReviewsForAdmin,
  editStatusReviewById
};
