const express = require('express');
const router = express.Router();
const usermodel = require('../Model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/login.html'));
});

const secret_key = process.env.JWT_SECRET; // Secret should ideally be in env variables

// Handle login logic
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await usermodel.findOne({ email });
    if (!user) return res.status(401).send("User not found");

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).send("Invalid password");

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email,username:user.username },
      secret_key,
      { expiresIn: '1h' }
    );
    // Set token in cookie
    res.cookie('token', token, { httpOnly: true });

    // Send response
    console.log("Login successful");
    res.sendFile(path.join(__dirname, '../view/main.html'));

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Login failed");
  }
});

module.exports = router;
