angular.module('components')

	.factory('Unit', ['$resource', function ($resource) {

		return $resource('api/units/:id', { id : '@_id' }, {

			create : {
				method  : 'POST'
			},

			query : {
				method : 'GET',
				isArray : true
			}
			
		});

	}]);