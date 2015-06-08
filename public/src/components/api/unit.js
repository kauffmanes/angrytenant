angular.module('components')

	.factory('Unit', ['$resource', function ($resource) {

		return $resource('api/units/:field/:id/:subDocument', { id : '@_id' }, {

			create : {
				method  : 'POST'
			},

			query : {
				method : 'GET',
				isArray : true
			},

			save : {
				method : 'POST',
				params : {
					field       : 'id',
					subDocument : 'tenants'
				}
			}
			
		});

	}]);