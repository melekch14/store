const db = require('../config/config_db');

class Products {
  static getAllProducts(callback) {
    db.query('SELECT * FROM products', callback);
  }

  static getProductById(id, callback) {
    db.query('SELECT * FROM products WHERE product_id = ?', [id], callback);
  }

  static createProduct(data, callback) {
    db.query('INSERT INTO products SET ?', data, callback);
  }

  static updateProduct(id, data, callback) {
    db.query('UPDATE products SET ? WHERE product_id = ?', [data, id], callback);
  }

  static deleteProduct(id, callback) {
    db.query('DELETE FROM products WHERE product_id = ?', [id], callback);
  }
}

module.exports = Products;
