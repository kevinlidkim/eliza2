angular.module('MainCtrl', []).controller('MainController', ['$scope', '$location', 'MainService', 'UserService', function($scope, $location, MainService, UserService) {

  $scope.name_input = "";
  $scope.name = "";
  $scope.date = "";
  $scope.input = "";
  $scope.msg_history = [];

  $scope.username_input = "";
  $scope.password_input = "";
  $scope.email_input = "";
  $scope.verify_input = "";
  $scope.verify_email_input = "";

  $scope.login_username = "";
  $scope.login_password = "";

  // var inner_call = function() {
  //   console.log("CALL THIS ON PAGE LOAD");
  // }

  // inner_call();

  $scope.submit_name = function() {
    if ($scope.name_input != "") {
      var obj = {
        name: $scope.name_input
      }
      MainService.submit_name(obj)
        .then(function(data) {
          $scope.date = data.date;
          $scope.name = data.name;
        })
    }
  };

  $scope.reveal_name = function() {
    if ($scope.name != "") {
      return true;
    } else {
      return false;
    }
  }

  $scope.send_text = function() {
    if ($scope.input != "") {
      var obj = {
        human: $scope.input
      }
      $scope.msg_history.push($scope.input);
      MainService.send_text(obj)
        .then(function(data) {
          $scope.msg_history.push(data.eliza);
          $scope.input = "";
        })
    }
  }

  $scope.reveal_msg_history = function() {
    if ($scope.msg_history.length > 0) {
      return true;
    } else {
      return false;
    }
  }

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
        $location.path('/');
      })
  }

  $scope.logout = function() {
    UserService.logout()
      .then(function() {
        $location.path('/login');
      })
  }
  
}]);

