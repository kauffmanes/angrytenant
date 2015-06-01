angular.module('at')

	.controller('DashboardController', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {

		$scope.tabs = [
		    { title:'Dynamic Title 1', content:'Dynamic content 1' },
		    { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
		];

		$scope.logout = function () {
			Auth.logout();
			$state.go('login');
		};

	}]);