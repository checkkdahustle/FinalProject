var fs = require('fs');
var path = require('path');


// register
router.get('/register', function(req, res){
	res.render('register');
});

// login
router.get('/login', function(req, res){
	res.render('login');
});
