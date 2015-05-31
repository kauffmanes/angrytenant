angular.module('components')

	.factory('UserService', ['$http', function ($http) {

		return {

			create : function (data) {
				return $http({
					method: 'POST',
					url : 'api/users',
					data : data,
					headers: { 'Content-Type': 'application/json' }
				});
			}
			
		};

	}]);