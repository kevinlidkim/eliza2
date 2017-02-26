angular.module('UserCtrl', []).controller('UserController', ['$scope', '$location', 'moment', 'MainService', 'UserService', function($scope, $location, moment, MainService, UserService) {

  $scope.msg_input = "";
  $scope.msg_history = [];

  $scope.user = "";


  var load_eliza_data = function() {
    $scope.user = UserService.get_user();
    $scope.date = moment().format("MMMM Do YYYY, h:mm:ss a");
  }

  load_eliza_data();

  $scope.send_text = function() {
    if ($scope.msg_input != "") {
      var obj = {
        human: $scope.msg_input
      }
      $scope.msg_history.push($scope.msg_input);
      MainService.send_text(obj)
        .then(function(data) {
          $scope.msg_history.push(data.eliza);
          $scope.msg_input = "";
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

