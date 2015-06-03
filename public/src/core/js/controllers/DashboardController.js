angular.module('at')

	.controller('DashboardController', ['$scope', '$state', 'Auth', 'User',
		function ($scope, $state, Auth, User) {

		$scope.users = [];

		$scope.getUsers = function () {

			User.query().$promise.then(function (res) {

				$scope.users = res;

			});
		};

		$scope.getUsers();
	}]);