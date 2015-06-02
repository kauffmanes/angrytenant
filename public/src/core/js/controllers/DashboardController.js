angular.module('at')

	.controller('DashboardController', ['$scope', '$state', 'Auth', 'UserService',
		function ($scope, $state, Auth, UserService) {

		$scope.users = [];

		$scope.getUsers = function () {

			UserService.query().$promise.then(function (res) {

				$scope.users = res;

			});
		};

		$scope.getUsers();
	}]);