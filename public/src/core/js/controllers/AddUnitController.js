angular.module('at')

	.controller('AddUnitController', ['$scope', '$q', '$state', 'Unit', function ($scope, $q, $state, Unit) {

		$scope.formData = {};

		$scope.submit = function () {
			Unit.create($scope.formData).$promise.then(function (res) {
				console.log(res);
				$state.go('dashboard');
			});
		};

	}]);