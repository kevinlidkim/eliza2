angular.module('UserCtrl', []).controller('UserController', ['$scope', '$location', 'MainService', 'UserService', function($scope, $location, MainService, UserService) {

  $scope.name_input = "";
  $scope.name = "";
  $scope.date = "";
  $scope.input = "";
  $scope.msg_history = [];

  $scope.user = "";

  // var inner_call = function() {
  //   console.log("CALL THIS ON PAGE LOAD");
  // }

  // inner_call();

  var load_eliza_data = function() {
    $scope.user = UserService.get_user();
    $scope.date = new Date();
  }

  load_eliza_data();

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

  $scope.is_logged_in = function() {
    return UserService.is_auth();
  }
  
}]);

