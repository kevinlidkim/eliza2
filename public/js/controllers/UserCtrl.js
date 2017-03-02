angular.module('UserCtrl', []).controller('UserController', ['$scope', '$location', 'moment', 'MainService', 'UserService', function($scope, $location, moment, MainService, UserService) {

  $scope.msg_input = "";
  $scope.msg_history = [];

  $scope.user = "";
  $scope.can_continue = true;
  $scope.list_conv_history = [];
  $scope.get_conv_id = "";

  $scope.send_text = function() {
    if (!$scope.can_continue) {
      return;
    }
    if ($scope.msg_input != "") {
      var obj = {
        human: $scope.msg_input,
        date: $scope.date
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

  $scope.reveal_list_conv_history = function() {
    if ($scope.list_conv_history.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  $scope.list_conv = function() {
    UserService.list_conv()
      .then(function(data) {
        // console.log(data.data.data);
        console.log(data);
        $scope.list_conv_history = data.conversations;
      })
  }

  $scope.get_conv = function() {
    var obj = {
      id: $scope.get_conv_id
    };
    UserService.get_conv(obj)
      .then(function(data) {
        console.log(data.data);
        $scope.msg_history = data.data.conversation;
        $scope.can_continue = data.data.can_continue;
        $scope.get_conv_id = "";
      })
  }

  $scope.can_edit_conv = function() {
    return $scope.can_continue;
  }

  var load_eliza_data = function() {
    $scope.user = UserService.get_user();
    $scope.date = moment().format("MMMM Do YYYY, h:mm:ss a");
    UserService.get_current_conv()
      .then(function(data) {
        if (data.data.current_conv_id != "") {
          $scope.get_conv_id = data.data.current_conv_id;
          // $scope.get_conv();
        }
      })
    
  }

  load_eliza_data();
  
}]);

