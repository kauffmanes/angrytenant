angular.module('at')

	.controller('CreateUserController', ['$scope', '$state', '$q', 'UserService', 'AlertService',
		function ($scope, $state, $q, UserService, AlertService) {

		//Form Data
		$scope.formData = {};

		$scope.disabled = true;

		$scope.validate = function () {

			if ($scope.formData.password !== $scope.confirm) {

				$scope.disabled = true;
				$scope.error = 'Your passwords do not match';

			} else if ($scope.formData.password.length < 6) {

				$scope.disabled = true;
				$scope.error = 'Your password must be at least 6 characters.';

			} else {

				$scope.disabled = false;
				$scope.error = '';

			}
		};

		//Creates a new user
		$scope.createUser = function () {

			UserService.create($scope.formData).$promise.then(function (res) {
				$state.go('dashboard');
				console.log(res);
			}, function (err) {
				alert(err.data.message);
			});

		};

	}]);