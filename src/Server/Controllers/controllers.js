const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../Database/database.js");

const secretKey = process.env.SECRET_KEY;

const UserController = {
  async register(req, res) {
    const { email, password, relationship } = req.body;

    try {
      // Verifique se o usuário já existe no banco de dados
      const userExists = await db.query("SELECT * FROM users WHERE email = ?", [email]);

      if (userExists.length > 0) {
        return res.status(400).json({ error: "This email is already in use." });
      }

      // Hash a senha antes de armazená-la no banco de dados
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insira o usuário no banco de dados
      await db.query("INSERT INTO users (email, password, relationship) VALUES (?, ?)", [email, hashedPassword, relationship]);

      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error("Error registering user:", error);
      return res.status(500).json({ error: "Error registering user." });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      // find user by email
      const user = await db.query("SELECT * FROM users WHERE email = ?", [email]);

      if (user.length === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      // verifying hashedPassword
      const passwordMatch = await bcrypt.compare(password, user[0].password);

      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password." });
      }

      // users JWT
      const token = jwt.sign({ userId: user[0].id }, secretKey, { expiresIn: "1h" });

      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ error: "Error logging in." });
    }
  },
};

module.exports = UserController;
