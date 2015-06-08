angular.module('at')

	.controller('JoinPropertyController', ['$scope', 'Unit', function ($scope, Unit) {
		
		$scope.submit = function () {

			Unit.save({ _id : $scope.formData.unitId }).$promise.then(function (res) {
				console.log(res);
				$state.go('dashboard');
			}, function (err) {
				$scope.errors = err.data.message;
			});
		};

	}]);