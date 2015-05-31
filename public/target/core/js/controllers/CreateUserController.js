angular.module('at')

	.controller('CreateUserController', ['$scope', 'UserService', function ($scope, UserService) {

		//Form Data
		$scope.formData = {};

		//Creates a new user
		$scope.createUser = function () {

			UserService.create($scope.formData).then(function (res) {
				$state.go('home');
			});

		};

	}]);