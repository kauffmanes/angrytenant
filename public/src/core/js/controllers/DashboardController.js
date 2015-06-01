angular.module('at')

	.controller('DashboardController', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {

		$scope.logout = function () {
			Auth.logout();
			$state.go('login');
		};

	}]);