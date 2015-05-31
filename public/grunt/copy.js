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
	}
};