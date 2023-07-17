const Product = require('../models/Product');

class ProductController {
  static getAllProducts(req, res) {
    Product.getAllProducts((err, products) => {
      if (err) {
        console.error('Error getting products:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json(products);
    });
  }

  static getProductById(req, res) {
    const id = req.params.id;
    Product.getProductById(id, (err, product) => {
      if (err) {
        console.error(`Error getting product with id ${id}:`, err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    });
  }

  static createProduct(req, res) {
    const productData = req.body;
    Product.createProduct(productData, (err, result) => {
      if (err) {
        console.error('Error creating product:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
    });
  }

  static updateProduct(req, res) {
    const id = req.params.id;
    const productData = req.body;
    Product.updateProduct(id, productData, (err) => {
      if (err) {
        console.error(`Error updating product with id ${id}:`, err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ message: 'Product updated successfully' });
    });
  }

  static deleteProduct(req, res) {
    const id = req.params.id;
    Product.deleteProduct(id, (err) => {
      if (err) {
        console.error(`Error deleting product with id ${id}:`, err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      res.json({ message: 'Product deleted successfully' });
    });
  }
}

module.exports = ProductController;
