const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const usermodel = require('../Model/user');
const path = require('path');
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/register.html'));
});
router.post('/', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 🔍 Check if values are actually provided
        if (!username || !email || !password) {
            return res.status(400).send("All fields are required");
        }

        // 🧂 Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 📦 Save user to DB
        const newUser = new usermodel({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.sendFile(path.join(__dirname, '../view/login.html'));
        //res.send("User registered successfully");
        console.log('registered succesfully');
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).send("Registration failed");
    }
});

module.exports = router;
