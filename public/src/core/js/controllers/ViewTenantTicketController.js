angular.module('at')

	.controller('ViewTenantTicketController', ['$scope', function ($scope) {

		$scope.tickets = [{
			subject : 'Flooding',
			priority : 'high',
		}, {
			subject : 'Broken',
			priority : 'low'
		}, {
			subject : 'Ahhhh',
			priority : 'medium'
		}, {
			subject : 'Nope',
			priority : 'emergency'
		}];

		$scope.style = function (value) {
			if (value == 'emergency') {
				return { 'background' : '#AA3939' };
			} else if (value == 'high') {
				return { 'background' : '#AA6039' };
			} else if (value == 'medium') {
				return { 'background' : '#AA9739' };
			} else if (value == 'low') {
				return { 'background' : '#789D34' };
			}
		};

	}]);