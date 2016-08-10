var express = require('express');
var router = express.Router();

// access page
router.get('/granted', function(req, res){
	res.render('granted');
});

router.get('/deny', function(req, res){
	res.render('deny');
});

module.exports = router;
