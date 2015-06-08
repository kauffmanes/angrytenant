angular.module('at')

	.controller('UnitController', ['$scope', '$stateParams', 'Auth', 'Unit', function ($scope, $stateParams, Auth, Unit) {
		
		//Gets the logged in user
		Auth.getUser().then(function (res) {

			$scope.landlord = res.data;
			$scope.queryUnits();

		});

		$scope.queryUnits = function () {

			//Queries for all units by landlord
			Unit.query({ email : $scope.landlord.email }).$promise.then(function (res) {

				$scope.unit = _.findWhere(res, { _id : $stateParams.id });
				console.log($scope.unit);
			
			});

		};

	}]);