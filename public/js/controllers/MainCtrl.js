angular.module('MainCtrl', []).controller('MainController', ['$scope', '$location', 'MainService', 'UserService', function($scope, $location, MainService, UserService) {

  $scope.username_input = "";
  $scope.password_input = "";
  $scope.email_input = "";
  $scope.verify_input = "";
  $scope.verify_email_input = "";

  $scope.login_username = "";
  $scope.login_password = "";

  $scope.empty_signup = function() {
    if ($scope.username_input != "" && $scope.password_input != "" && $scope.email_input != "") {
      return false;
    } else {
      return true;
    }
  }

  $scope.register = function() {
    var obj = {
      username: $scope.username_input,
      password: $scope.password_input,
      email: $scope.email_input
    }
    $scope.verify_email_input = $scope.email_input;
    $scope.username_input = "";
    $scope.password_input = "";
    $scope.email_input = "";

    MainService.signup(obj);
  }

  $scope.empty_verify = function() {
    if ($scope.verify_input != "" && $scope.verify_email_input != "") {
      return false;
    } else {
      return true;
    }
  }

  $scope.verify_user = function() {
    var obj = {
      email: $scope.verify_email_input,
      random_key: $scope.verify_input
    }
    $scope.verify_email_input = "";
    $scope.verify_input = "";
    MainService.verify_user(obj);
  }

  $scope.empty_login = function() {
    if ($scope.login_password != "" && $scope.login_password != "") {
      return false;
    } else {
      return true;
    }
  }

  $scope.login = function() {
    var obj = {
      username: $scope.login_username,
      password: $scope.login_password
    }
    $scope.login_username = "";
    $scope.login_password = "";
    UserService.login(obj)
      .then(function(data) {
        $location.path('/eliza');
      })
  }

  $scope.logout = function() {
    UserService.logout()
      .then(function() {
        $location.path('/login');
      })
  }

  $scope.is_logged_in = function() {
    return UserService.is_auth();
  }
  
}]);

