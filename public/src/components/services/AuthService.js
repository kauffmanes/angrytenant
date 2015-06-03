angular.module('components')

	.factory('Auth', ['$http', '$q', 'AuthToken', function ($http, $q, AuthToken) {

		var authFactory = {};

		//handle login
		authFactory.login = function (email, password) {
			return $http.post('/api/login', {
				email : email,
				password : password
			}).success(function (data) {
				AuthToken.setToken(data.token);
				return data;
			});
		};

		//handle logout
		authFactory.logout = function () {
			AuthToken.setToken();
		};

		//check if user is logged in
		authFactory.isLoggedIn = function () {
			if (AuthToken.getToken()) {
				return true;
			} else {
				return false;
			}
		};

		authFactory.getUser = function () {
			if (AuthToken.getToken()) {
				return $http.get('/api/me');
			} else {
				return $q.reject({ message : 'User has no token.' });
			}
		};

		return authFactory;

	}])

	.factory('AuthToken', ['$window', function ($window) {

		var authTokenFactory = {};

		//get the token
		authTokenFactory.getToken = function () {
			return $window.localStorage.getItem('token');
		};

		//set the token or clear the token
		authTokenFactory.setToken = function (token) {

			if (token) {
				$window.localStorage.setItem('token', token);
			} else {
				$window.localStorage.removeItem('token');
			}
		};

		return authTokenFactory;

	}])

	.factory('AuthInterceptor', ['$q', '$location', 'AuthToken', function ($q, $location, AuthToken) {
		
		var interceptorFactory = {};

		interceptorFactory.request = function (config) {
			var token = AuthToken.getToken();

			if (token) {
				config.headers['x-access-token'] = token;
			}

			return config;
		};

		interceptorFactory.responseError = function (response) {

			if (response.status == 403) {
				AuthToken.setToken();
				$location.path('login');
			}

			return $q.reject(response);
		};

		return interceptorFactory;

	}]);