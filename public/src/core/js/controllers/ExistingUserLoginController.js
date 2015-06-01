angular.module('at')

	.controller('ExistingUserLoginController', ['$scope', '$state', 'LoginService', function ($scope, $state, LoginService) {

		$scope.formData = {};

		$scope.errors = '';

		$scope.login = function () {

			LoginService.login($scope.formData).$promise.then(function (res) {
				$state.go('dashboard');
				console.log(res);
			}, function (err) {

				$scope.errors = err.data.message;

			});
		};

	}]);