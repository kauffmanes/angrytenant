angular.module('at')

	.controller('ExistingUserLoginController', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {

		$scope.formData = {};

		$scope.errors = '';

		$scope.login = function () {

			Auth.login($scope.formData.email, $scope.formData.password).then(function (res) {
				$state.go('dashboard');
			}, function (err) {

				$scope.errors = err.data.message;

			});
		};

	}]);