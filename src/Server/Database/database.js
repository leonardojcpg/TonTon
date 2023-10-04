const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tonton",
});

const dbPromise = db.promise();
module.exports = dbPromise;



// creating pool connection
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "tonton",
})

module.exports = pool.promise();