var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var User = require('../models/user');

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
	var email= req.body.email;
	var dob= req.body.dob;
	var gender= req.body.gender;
	var username= req.body.username;
	var passcode= req.body.passcode;
	var passcode2= req.body.passcode2;
	// console.log(fullName);

	// Validation
	// req.checkBody('fullName', 'Full Name is required').notEmpty();
	req.checkBody('fname', 'First Name required').notEmpty();
	req.checkBody('lname', 'Last Name required').notEmpty();
	req.checkBody('email', 'Email required').notEmpty();
	req.checkBody('email', 'Email not valid').isEmail();
	req.checkBody('username', 'Username required').notEmpty();
	req.checkBody('passcode', 'Password required').notEmpty();
	req.checkBody('passcode2', 'Password do not match').equals(req.body.passcode);


	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors:errors
		});
	} else {
		var newUser = new User({
			fname:fname,
			lname:lname,
			email:email,
			username:username,
			passcode:passcode
		});

		User.createUser(newUser, function (err, user) {
			if(err) throw err;
			console.log(user);
		});
		req.flash('good_msg', 'Registration Successful and you can now login');

		res.redirect('../users/login');
	}
});

// login - passport authenticate
passport.use(new localStrategy(
	function(username, passcode, done) {
		User.getUserByUsername(username, function (err, user) {
			if(err) throw err;
			if (!user) {
				return done(null, false, {message: 'Unknown User'});
			}
			User.comparePassword(passcode, user.passcode, function (err, isMatch) {
				if(err) throw err;
				if (isMatch) {
					return done(null, user);
				}else {
					return done(null, false, {message: 'Invalid Password'});
				}
			});
		});
	}));

	// middleware - sessions
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.getUserById(id, function(err, user) {
			done(err, user);
		});
	});

	router.post('/login',
	passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash: true}),
	function(req, res) {
		res.redirect('/');
	});

	module.exports = router;
