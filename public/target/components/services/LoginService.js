angular.module('components')

	.factory('LoginService', ['$resource', function ($resource) {

		return $resource('api/login', { }, {

			login : {
				method  : 'POST'
			}
			
		});

	}]);