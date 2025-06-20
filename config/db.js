const mysql = require("mysql2"); // ✅ Use promise-based MySQL
require("dotenv").config(); // Load environment variables

// ✅ Create MySQL Connection Pool
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10, // Limit concurrent connections
  queueLimit: 0,
});

console.log("DB_USER:", process.env.DB_USER); // Debugging database connection
// ✅ Connect to MySQL
db.connect((err) => {
  if (err) {
      console.error("❌ MySQL Connection Failed:", err);
  } else {
      console.log("✅ Connected to MySQL Database");
  }
});



// ✅ SQL Query to Create `users` Table (For Login/Register)
const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NULL,
    phone VARCHAR(20) NULL,
    email VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    role ENUM('user', 'admin') NULL,
    gender ENUM('male', 'female', 'other') NULL,
    location VARCHAR(255) NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

`;

db.query(createUsersTable, (err) => {
  if (err) {
      console.error("❌ Error Creating Table:", err);
  } else {
      console.log("✅ Table 'users' Ready");
  }
});





module.exports = db;
