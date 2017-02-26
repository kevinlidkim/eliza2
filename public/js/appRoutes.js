angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			redirectTo: '/eliza',
      access: {restricted: true}
		})

		.when('/eliza', {
			templateUrl: 'views/home.html',
			controller: 'UserController',
			access: {restricted: true}
		})

		.when('/eliza/DOCTOR', {
			templateUrl: 'views/doctor.html',
			controller: 'UserController',
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
      redirectTo: '/eliza'
    });

	$locationProvider.html5Mode(true);



}])

.run(function ($rootScope, $location, $route, UserService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      UserService.get_user_status()
        .then(function() {
          if (next.access.restricted && UserService.is_auth() === false) {
            $location.path('/login');
            $route.reload();
          }
        });
  });
});
