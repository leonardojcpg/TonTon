const express = require("express");
const mysql = require("mysql2");
const app = express();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

app.use(express.json());
const PORT = process.env.PORT;

//routes
app.post("/register", async (req, res) => {
  const { email, password, relationship } = req.body;
  try {
    // Check if the user already exists in the database
    const userExists = database.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (userExists.length > 0) {
      return res.status(400).json({ error: "This email is already in use." });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into database
    database.query(
      "INSERT INTO users (email, password, relationship) VALUES (?, ?, ?)",
      [email, hashedPassword, relationship]
    );

    const user = database.query("SELECT * FROM users WHERE email = ?", [email]);

    const token = jwt.sign({ userId: user.insertId }, secretKey, {
      expiresIn: "1h",
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Error registering user." });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // find user by email
    const user = database.query("SELECT * FROM users WHERE email = ?", [email]);

    if (user.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    // verifying hashedPassword
    const passwordMatch = await bcrypt.compare(password, user[0].password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password." });
    }

    // users JWT
    const token = jwt.sign({ userId: user[0].id }, secretKey, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ error: "Error logging in." });
  }
});

// creating database
const database = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

// function to database connection
const connectToDatabase = () => {
  database.connect((err) => {
    if (err) {
      console.log("Error trying to connect to database", err);
      return;
    } else {
      console.log("Connected to database");
    }
  });
};

connectToDatabase();

module.exports = database;

app.listen(PORT, () => {
  connectToDatabase();
  console.log(`funcionando na rota ${PORT}`);
});
