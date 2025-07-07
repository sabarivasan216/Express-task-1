var express = require('express');
var router = express.Router();

/* GET home page. */
const path = require('path');
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../view/index.html'));
});
module.exports = router;
