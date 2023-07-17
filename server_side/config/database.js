require('dotenv').config();
const mysql = require('mysql2');

// Database connection configuration
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Database creation SQL statement
const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB_DATABASE}`;

// Table creation SQL statements
const createCategoriesTableQuery = `
CREATE TABLE IF NOT EXISTS categories (
  category_id INT PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(255) NOT NULL,
  parent_category_id INT,
  FOREIGN KEY (parent_category_id) REFERENCES categories(category_id)
);
`;

const createProductsTableQuery = `
CREATE TABLE IF NOT EXISTS products (
  product_id INT PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id INT,
  brand VARCHAR(255),
  image_url VARCHAR(255),
  stock_quantity INT,
  variant_name VARCHAR(255),
  variant_price DECIMAL(10, 2),
  keywords VARCHAR(255),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
`;

const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  address TEXT,
  phone_number VARCHAR(20),
  date_of_birth DATE,
  gender ENUM('Male', 'Female', 'Other')
);
`;

const createOrdersTableQuery = `
CREATE TABLE IF NOT EXISTS orders (
  order_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
`;

const createOrderItemsTableQuery = `
CREATE TABLE IF NOT EXISTS order_items (
  order_item_id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
`;

const createCartItemsTableQuery = `
CREATE TABLE IF NOT EXISTS cart_items (
  cart_item_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (product_id) REFERENCES products(product_id)
);
`;

// Function to check if tables exist in the database
const checkTablesExist = (callback) => {
    connection.query(`USE ${process.env.DB_DATABASE}`, (error) => {
        if (error) {
            callback(error);
            return;
        }

        const checkTableQuery = `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = '${process.env.DB_DATABASE}' AND (table_name = 'products' OR table_name = 'categories' OR table_name = 'users' OR table_name = 'orders' OR table_name = 'order_items' OR table_name = 'cart_items')`;

        connection.query(checkTableQuery, (error, results) => {
            if (error) {
                callback(error);
                return;
            }

            const count = results[0].count;
            const allTablesExist = count === 6;

            callback(null, allTablesExist);
        });
    });
};

// Connect to the MySQL server
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to the database server:', error);
        return;
    }

    // Create the database
    connection.query(createDatabaseQuery, (error) => {
        if (error) {
            console.error('Error creating the database:', error);
            return;
        }

        // Check if tables exist
        checkTablesExist((error, allTablesExist) => {
            if (error) {
                console.error('Error checking tables exist:', error);
                connection.end();
                return;
            }

            if (allTablesExist) {
                console.log('Tables already exist in the database.');
                connection.end();
                return;
            }

            // Switch to the created database
            connection.query(`USE ${process.env.DB_DATABASE}`, (error) => {
                if (error) {
                    console.error('Error switching to the database:', error);
                    connection.end();
                    return;
                }

                // Function to create a table and log a message
                const createTable = (query, tableName) => {
                    connection.query(query, (error) => {
                        if (error) {
                            console.error(`Error creating ${tableName} table:`, error);
                        } else {
                            console.log(`${tableName} table created successfully.`);
                        }
                    });
                };

                // Create tables and log messages
                createTable(createCategoriesTableQuery, 'Categories');
                createTable(createProductsTableQuery, 'Products');
                createTable(createUsersTableQuery, 'Users');
                createTable(createOrdersTableQuery, 'Orders');
                createTable(createOrderItemsTableQuery, 'Order_Items');
                createTable(createCartItemsTableQuery, 'Cart_Items');

                console.log('Tables created successfully.');

                connection.end(); // Close the database connection
            });
        });
    });
});
