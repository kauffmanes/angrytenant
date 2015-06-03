angular.module('components')

	.factory('User', ['$resource', function ($resource) {

		return $resource('api/users/:id', { id : '@_id' }, {

			create : {
				method  : 'POST'
			},

			query : {
				method  : 'GET',
				isArray : true
			}
			
		});

	}]);