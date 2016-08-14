var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/adhubapp');
var db = mongoose.connection;

// Users schema
var userSchema= mongoose.Schema({
	username:{
		type: String,
		index: true
	},
	password:{
		type:String
	},
	email: {
		type: String
	},
	firstName:{
		type: String
	},
	lastName:{
		type: String
	},
	
});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser, caLLback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.passcode, salt, function(err, hash) {
	        newUser.passcode = hash;
					newUser.save(caLLback)
	    });
	});
}
