const express = require("express");
const router = express.Router();
const db = require("../Database/database.js");
const bcrypt = require("bcrypt");

// Rota para registrar um novo usuário
router.post("/register", async (req, res) => {
  try {
    const { email, password, relationship } = req.body;
    
    // Verifique se o usuário já existe no banco de dados (opcional)
    const userExists = db.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    if (userExists.length > 0) {
      return res.status(400).json({ error: "This email is already in use." });
    }
    // Hash a senha antes de armazená-la no banco de dados (opcional)
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insira o usuário no banco de dados
    const sql =
      "INSERT INTO usuarios (email, senha, relationship) VALUES (?, ?, ?)";
    db.query(sql, [email, hashedPassword, relationship]);
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Error registering user." });
  }
});

// Outras rotas e manipulação de consultas SQL aqui

module.exports = router;
