const express = require('express');
const router = express.Router();
const auth = require('../Middleware/auth');
const path = require('path');
router.get('/',auth, (req, res) => {
    res.sendFile(path.join(__dirname, '../view/main.html'));
});
// Send user info to frontend
router.get('/api/userinfo', auth, (req, res) => {
  res.json({username:req.user.username});
});

module.exports = router;