var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


// Users schema
var userSchema= mongoose.Schema({
	username:{
		type: String,
		index: true
	},
	passcode:{
		type:String
	},
	email: {
		type: String
	},
	fname:{
		type: String
	},
	lname:{
		type: String
	},

});

var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser, caLLback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.passcode, salt, function(err, hash) {
	        newUser.passcode = hash;
					newUser.save(caLLback);
	    });
	});
}
