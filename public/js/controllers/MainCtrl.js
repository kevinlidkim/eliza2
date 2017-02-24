angular.module('MainCtrl', []).controller('MainController', ['$scope', 'MainService', function($scope, MainService) {

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
      key: $scope.verify_input
    }

    MainService.verify_user(obj);
  }
  
}]);

