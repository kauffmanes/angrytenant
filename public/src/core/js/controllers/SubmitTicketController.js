angular.module('at')

	.controller('SubmitTicketController', ['$scope', '$stateParams', 'Unit', 'Auth', function ($scope, $stateParams, Unit, Auth) {

		$scope.categories = ['Utilities', 'Structure', 'Outside', 'Appliances', 'Other'];

		$scope.priorities = ['Emergency', 'High', 'Medium', 'Low'];

		$scope.submit = function () {

			Unit.submitTicket(_.extend($scope.formData, { id :  })).$promise.then(function (res) {
				console.log(res);
			}, function (err) {
				alert(err.message);
			});
		};

	}]);