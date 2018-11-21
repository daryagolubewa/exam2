const express = require('express');
const router = express.Router();


router.get('/', function(req, res, next) {
    let trueHeader = true
    res.render('index', { trueHeader });
});


module.exports = router;
