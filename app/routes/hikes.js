var express = require('express');
var router = express.Router();

router.get('/hikes', (req, res, next) => {
    res.render('hikes', { title: 'My Hiking Blog' });
    next();
});

module.exports = router;