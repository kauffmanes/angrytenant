angular.module('components')

	.factory('UserService', ['$resource', function ($resource) {

		return $resource('api/users/:id', { id : '@_id' }, {

			create : {
				method  : 'POST'
			}
			
		});

	}]);