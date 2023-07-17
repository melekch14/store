const Category = require('../models/Category');

class CategoryController {
    static getAllCategories(req, res) {
        Category.getAllCategories((err, Categories) => {
          if (err) {
            console.error('Error getting Categories:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }
          res.json(Categories);
        });
      }
    
      static getCategoryById(req, res) {
        const id = req.params.id;
        Category.getCategoryById(id, (err, Category) => {
          if (err) {
            console.error(`Error getting Category with id ${id}:`, err);
            return res.status(500).json({ error: 'Internal server error' });
          }
          if (!Category) {
            return res.status(404).json({ error: 'Category not found' });
          }
          res.json(Category);
        });
      }
    
      static createCategory(req, res) {
        const CategoryData = req.body;
        Category.createCategory(CategoryData, (err, result) => {
          if (err) {
            console.error('Error creating Category:', err);
            return res.status(500).json({ error: 'Internal server error' });
          }
          res.status(201).json({ message: 'Category created successfully', CategoryId: result.insertId });
        });
      }
    
      static updateCategory(req, res) {
        const id = req.params.id;
        const CategoryData = req.body;
        Category.updateCategory(id, CategoryData, (err) => {
          if (err) {
            console.error(`Error updating Category with id ${id}:`, err);
            return res.status(500).json({ error: 'Internal server error' });
          }
          res.json({ message: 'Category updated successfully' });
        });
      }
    
      static deleteCategory(req, res) {
        const id = req.params.id;
        Category.deleteCategory(id, (err) => {
          if (err) {
            console.error(`Error deleting Category with id ${id}:`, err);
            return res.status(500).json({ error: 'Internal server error' });
          }
          res.json({ message: 'Category deleted successfully' });
        });
      }
}

module.exports = CategoryController;
