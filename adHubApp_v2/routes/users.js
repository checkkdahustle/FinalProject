var express = require('express');
var router = express.Router();

// register
router.get('/register', function(req, res){
	res.render('register');
});

// login
router.get('/login', function(req, res){
	res.render('login');
});

// register users
router.post('/register', function(req, res){
	// var fullName= req.body.fname + ' ' + req.body.lname;
	var fname= req.body.fname;
	var lname= req.body.lname;
	var email= req.body.lname;
	var dob= req.body.dob;
	var gender= req.body.gender;
	var username= req.body.username;
	var passcode= req.body.passcode;
	var passcode2= req.body.passcode2;
	// console.log(fullName);


});

module.exports = router;
