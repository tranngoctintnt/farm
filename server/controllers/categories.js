const express = require('express');
const { getConnection, sql } = require('../config/db');

const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


app.use(express.json());
// const { dbConfig} = require("../config/db");

// Initialize connection pool once
let poolPromise = getConnection()
    .then(pool => {
        // console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit if connection fails
    });

// Middleware for JSON parsing
app.use(express.json());

// Create Category
const createCategory = async (req, res) => {
    try {
    const { nameCategory } = req.body;
    // console.log(req.body);

    // console.log(req.file);
    let imgCate;
        if (req.file) {
          const datetime = new Date().toISOString().replace(/[-:.T]/g, "").slice(0, 14);
          const originalName = path.parse(req.file.originalname).name;
          const ext = path.extname(req.file.originalname);
          const newFilename = `newCate_${datetime}_${originalName}${ext}`;
          const newPath = path.join("public", newFilename);
          fs.renameSync(req.file.path, newPath);
          imgCate = `/${newFilename}`;
        }

    if (!nameCategory) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const pool = await poolPromise;
    const result = await pool.request()
      .input('nameCategory', sql.NVarChar, nameCategory)
      .input('imgCate', sql.NVarChar, imgCate)
      .query('INSERT INTO Categories (nameCategory, imgCate, createdAt, updatedAt) VALUES (@nameCategory, @imgCate, GETDATE(), GETDATE()); SELECT SCOPE_IDENTITY() as id');

    //   console.log(result);
    res.status(201).json({
      success: true,
      data: {
        idCategory: result.recordset[0].id,
        nameCategory,
        imgCate,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Read All Categories
const getAllCategories = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query('SELECT * FROM Categories');

        if (result.recordset.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: 'No categories found' 
            });
        }

        res.json({
            success: true,
            data: result.recordset
        });
    } catch (error) {
        console.error('Error in getAllCategories:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Read Single Category
const getCategoryById = async (req, res) => {
    // console.log(req.body);
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('SELECT * FROM Categories WHERE idCategory = @id');
        
        if (result.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        
        res.json({
            success: true,
            data: result.recordset[0]
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Category
const editCategoryById = async (req, res) => {
    try {

        const { nameCategory,imgCatePreview } = req.body;
        const pool = await getConnection();
let imgCate = imgCatePreview;
        if (req.file) {
            const id = req.params.id;
            const datetime = new Date().toISOString().replace(/[-:.T]/g, "").slice(0, 14);
            const originalName = path.parse(req.file.originalname).name;
            const ext = path.extname(req.file.originalname);
            const newFilename = `updateCate_${id}_${datetime}_${originalName}${ext}`;
            const newPath = path.join("public", newFilename);
            
            fs.renameSync(req.file.path, newPath);
            imgCate = `/${newFilename}`; // Không bị lỗi vì đã khai báo bằng `let`
          }
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .input('nameCategory', sql.NVarChar, nameCategory)
            .input('imgCate', sql.NVarChar, imgCate)
            .query('UPDATE Categories SET nameCategory = @nameCategory, imgCate = @imgCate, updatedAt = GETDATE() WHERE idCategory = @id');
        

            
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        
        res.json({
            success: true,
            message: 'Category updated successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const editStatusCategoryById = async (req, res) => {
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
            .input('isActiveCate', sql.Bit, isActive)
            .query('UPDATE Categories SET isActiveCate = @isActiveCate, updatedAt = GETDATE() WHERE idCategory = @id');        

            
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        
        res.json({
            success: true,
            message: 'Category updated successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Category
const deleteCategoryById = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Categories WHERE idCategory = @id');
        
        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        
        res.json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Search Categories
const searchCategory = async (req, res) => {
    try {
        const { q } = req.query; // query parameter 'q' for search term
        const pool = await getConnection();
        const result = await pool.request()
            .input('searchTerm', sql.NVarChar, `%${q}%`)
            .query('SELECT * FROM Categories WHERE nameCategory LIKE @searchTerm');
        
        res.json({
            success: true,
            data: result.recordset
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {createCategory,getAllCategories,getCategoryById,editCategoryById,editStatusCategoryById,deleteCategoryById,searchCategory};