angular.module('at', ['ui.router', 'components'])

	.config(function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/home');

		$stateProvider.state('home', {
			url         : '/home',
			templateUrl : 'core/html/home.html'
			//controller  : 'HomeController' 
		});

		$stateProvider.state('404', {
			url         : '/404',
			templateUrl : 'core/html/404.html'
		});

		$stateProvider.state('login', {
			url         : '/login',
			templateUrl : 'core/html/login.html',
			controller  : 'LoginController'
		});

		$stateProvider.state('create-user', {
			url         : '/create-user',
			templateUrl : 'core/html/create_user.html',
			controller  : 'CreateUserController'
		});

	});