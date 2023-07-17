const db = require('../config/config_db');

class User {
  static getAllUsers(callback) {
    db.query('SELECT * FROM users', callback);
  }

  static getUserById(id, callback) {
    db.query('SELECT * FROM users WHERE user_id = ?', [id], callback);
  }

  static createUser(data, callback) {
    db.query('INSERT INTO users SET ?', data, callback);
  }

  static updateUser(id, data, callback) {
    db.query('UPDATE users SET ? WHERE user_id = ?', [data, id], callback);
  }

  static deleteUser(id, callback) {
    db.query('DELETE FROM users WHERE user_id = ?', [id], callback);
  }
}

module.exports = User;
