const express = require('express');
const CategoryController = require('../controllers/CategoryController');

const router = express.Router();

router.get('/getAllCategories', CategoryController.getAllCategories);
router.get('/getCategoryById/:id', CategoryController.getCategoryById);
router.post('/createCategory', CategoryController.createCategory);
router.put('/updateCategory/:id', CategoryController.updateCategory);
router.delete('/deleteCategory/:id', CategoryController.deleteCategory);

module.exports = router;
