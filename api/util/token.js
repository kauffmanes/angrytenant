var jwt = require('jsonwebtoken')
var superSecret = 'ThisIsAVerySecretiveSecret';
var tokenUtil = {
    sign : function(userData, extra) {
	return jwt.sign(userData, superSecret, extra); 
    },
    verify: function(token) {
	try {
		return jwt.verify(token, superSecret);
	} catch(err) {
		console.log(err);
	}
    }
};

module.exports = tokenUtil;
