const db = require('../config/config_db');

class OrderItem {
  static getAllOrderItems(callback) {
    db.query('SELECT * FROM order_items', callback);
  }

  static getOrderItemById(id, callback) {
    db.query('SELECT * FROM order_items WHERE order_item_id = ?', [id], callback);
  }

  static createOrderItem(data, callback) {
    db.query('INSERT INTO order_items SET ?', data, callback);
  }

  static updateOrderItem(id, data, callback) {
    db.query('UPDATE order_items SET ? WHERE order_item_id = ?', [data, id], callback);
  }

  static deleteOrderItem(id, callback) {
    db.query('DELETE FROM order_items WHERE order_item_id = ?', [id], callback);
  }
}

module.exports = OrderItem;
