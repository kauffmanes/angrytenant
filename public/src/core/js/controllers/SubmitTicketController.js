angular.module('at')

	.controller('SubmitTicketController', ['$scope', function ($scope) {

		$scope.categories = ['Utilities', 'Structure', 'Outside', 'Appliances', 'Other'];

		$scope.priorities = ['Emergency', 'High', 'Medium', 'Low'];

		$scope.submit = function () {

			// Ticket.create($scope.formData).$promise.then(function (res) {
			// 	console.log(res);
			// }, function (err) {
			// 	alert(err.message);
			// });
		}

	}]);