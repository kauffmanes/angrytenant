angular.module('at')

	.controller('DashboardController', ['$scope', '$state', 'Auth', 'User', 'Unit',
		function ($scope, $state, Auth, User, Unit) {

		$scope.units = [];

		//Gets the logged in user
		Auth.getUser().then(function (res) {

			$scope.landlord = res.data;
			$scope.queryUnits();

		});

		$scope.queryUnits = function () {

			//Queries for all units by landlord
			Unit.query({ email : $scope.landlord.email }).$promise.then(function (res) {

				$scope.units = res;
				console.log(res);
			
			});

		};

	}]);