angular.module('components')

	.factory('Ticket', ['$resource', function ($resource) {

		return $resource('api/tickets/:field/:id/:subDocument', { id : '@_id' }, {

			create : {
				method  : 'POST'
			}
			
		});

	}]);