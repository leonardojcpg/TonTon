const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/controllers.js");

// route to register user
router.post("/register", UserController.register)
// route to login user
router.post("/login", UserController.login)

module.exports = router;
