const mysql = require("mysql2");

// creating pool connection
const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
})

module.exports = pool.promise();