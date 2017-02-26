angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController',
			access: {restricted: true}
		})

		.when('/eliza', {
			templateUrl: 'views/home.html',
			controller: 'MainController',
			access: {restricted: true}
		})

		.when('/eliza/DOCTOR', {
			templateUrl: 'views/doctor.html',
			controller: 'MainController',
			access: {restricted: true}
		})

		.when('/signup', {
			templateUrl: 'views/signup.html',
			controller: 'MainController',
			access: {restricted: false}
		})

		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'MainController',
			access: {restricted: false}
		})

		.when('/hw1.yml', {
			templateUrl: 'hw1.yml',
			access: {restricted: false}
		})

		.when('/hw0.html', {
			templateUrl: 'hw0.html',
			access: {restricted: false}
		})

		.otherwise({
      redirectTo: '/'
    });

	$locationProvider.html5Mode(true);



}])

.run(function ($rootScope, $location, $route, UserService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      UserService.getUserStatus()
        .then(function() {
          if (next.access.restricted && UserService.isAuth() === false) {
            $location.path('/login');
            $route.reload();
          }
        });
  });
});
