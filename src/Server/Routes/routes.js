const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/controllers.js");
const authenticateToken = require("../Middlewares/authenticatedToken.js");

// route to register user
router.post("/register", UserController.register)
// route to login user
router.post("/login", UserController.login)

// route to dashboard protected by authentication
router.get("/", authenticateToken, (req, res) => {
    const user = req.user;

    res.json({ message: `Welcome to the dashboard, ${user.username}`})
})

module.exports = router;
