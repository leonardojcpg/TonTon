// controlling routes comportments
const db = require("../Database/database.js");

// controller for the user register
exports.registerUser = async (req, res) => {
  try {
    // register user
    return res.status(200).json({ message: "User registered successfully" });
  } catch (error){
    console.error("Error registering user.", error)
    return res.status(500).json({error: "Error registering user." })
  }
};
