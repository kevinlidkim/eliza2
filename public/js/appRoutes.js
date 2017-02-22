angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'views/signup.html',
			controller: 'MainController'
		})

		.when('/hw0.html', {
			templateUrl: 'hw0.html'
		})

		.when('/eliza', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/eliza/DOCTOR', {
			templateUrl: 'views/doctor.html',
			controller: 'MainController'
		})

		.when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'MainController'
		})

		.when('/hw1.yml', {
			templateUrl: 'hw1.yml'
		})

		.otherwise({
      redirectTo: '/'
    });

	$locationProvider.html5Mode(true);



}])
