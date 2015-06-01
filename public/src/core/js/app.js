angular.module('at', ['ui.router', 'components', 'ngResource', 'ui.bootstrap'])

	.config(function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/dashboard');

		$stateProvider.state('dashboard', {
			url         : '/dashboard',
			templateUrl : 'core/html/dashboard.html'
			//controller  : 'HomeController' 
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

	});