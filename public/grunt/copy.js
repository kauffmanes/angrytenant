module.exports = {

	dev : {

		files: [{
			expand : true,
			cwd    : 'src',
			src    : ['**'],
			dest   : 'target/'
		}, {
			expand : true,
			src    : ['bower_components/**'],
			dest   : 'target/'
		}]
	},

	phonegap : {
		files: [{
			expand : true,
			cwd    : 'src',
			src    : ['**'],
			dest   : 'target/www'
		}, {
			expand : true,
			src    : ['bower_components/**'],
			dest   : 'target/www'
		}, {
			expand : true,
			src    : ['hooks', 'platforms', 'plugins', 'config.xml'],
			dest   : 'target'
		}]
	}
};