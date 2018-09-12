var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('hikes', { title: 'My Hiking Blog' });
    next();
});

module.exports = router;