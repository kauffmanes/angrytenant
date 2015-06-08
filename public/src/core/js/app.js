angular.module('at', ['ui.router', 'components', 'ngResource', 'ui.bootstrap'])

	.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

		$urlRouterProvider.otherwise('/dashboard');

		$stateProvider.state('dashboard', {
			url         : '/dashboard',
			templateUrl : 'core/html/dashboard.html',
			controller  : 'DashboardController' 
		});

		//Page not found
		$stateProvider.state('404', {
			url         : '/404',
			templateUrl : 'core/html/404.html'
		});

		//Login page - choose existing user or not
		$stateProvider.state('login', {
			url         : '/login',
			templateUrl : 'core/html/login.html'
		});

		//New user page
		$stateProvider.state('create-user', {
			url         : '/create-user',
			templateUrl : 'core/html/create_user.html',
			controller  : 'CreateUserController'
		});

		$stateProvider.state('existing-login', {
			url         : '/existing-login',
			templateUrl : 'core/html/existing_login.html',
			controller  : 'ExistingUserLoginController'
		});

		$stateProvider.state('submit-ticket', {
			url         : '/submit-ticket',
			templateUrl : 'core/html/submit_ticket.html',
			controller  : 'SubmitTicketController'
		});

		$stateProvider.state('view-tenant-ticket', {
			url         : '/view-tenant-ticket',
			templateUrl : 'core/html/view_tenant_ticket.html',
			controller  : 'ViewTenantTicketController'
		});

		$stateProvider.state('add-unit', {
			url         : '/add-unit',
			templateUrl : 'core/html/add_unit.html',
			controller  : 'AddUnitController'
		});

		$stateProvider.state('view-units', {
			url         : '/view-units',
			templateUrl : 'core/html/view_units.html',
			controller  : 'ViewUnitsController'
		});

		$stateProvider.state('view-unit', {
			url         : '/view-units/:id',
			templateUrl : 'core/html/unit.html',
			controller  : 'UnitController'
		});

		$stateProvider.state('join-property', {
			url         : '/join-property',
			templateUrl : 'core/html/join_property.html',
			controller  : 'JoinPropertyController'
		});
		
	})

	.config(function ($httpProvider) {

		$httpProvider.interceptors.push('AuthInterceptor');
	
	})

	.run(function ($rootScope, $location, $state, Auth) {


		$rootScope.$on('$stateChangeStart', function () {
			
			if (Auth.isLoggedIn() == false) {
				$location.path('login');
			}

		});

		$rootScope.logout = function () {
			Auth.logout();
			$state.go('login');
		};

	});