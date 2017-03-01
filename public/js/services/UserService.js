angular.module('UserServ', []).factory('UserService', ['$q', '$timeout', '$http', function($q, $timeout, $http) {

  var user = null;
  var loggedIn = false;

  return {

    login : function(obj) {
      return $http.post('/login', obj)
        .then(function(data) {
          user = data.data.user;
          loggedIn = true;
          // console.log(data);
        })
        .catch(function(err) {
          console.log(err);
        })
    },

    logout : function() {
      return $http.get('/logout')
        .then(function(data) {
          user = null
          loggedIn = false;
          // console.log(data);
        })
        .catch(function(err) {
          console.log(err);
        })
    },

    is_auth : function() {
      if (loggedIn) {
        return true;
      } else {
        return false;
      }
    },

    get_user_status : function() {
      return $http.get('/status')
        .then(function(data) {
          // console.log(data);
          if (data.data.status) {
            loggedIn = true;
            user = data.data.user;
          } else {
            loggedIn = false;
            user = null;
          }
          // console.log(loggedIn);
        })
        .catch(function(data) {
          loggedIn = false;
        });
    },

    get_user : function() {
      return user;
    },

    list_conv : function() {
      return $http.get('/listconv')
        .then(function(data) {
          console.log(data);
          return data;
        })
        .catch(function(err) {
          console.log(err);
        })
    },

    get_conv : function(obj) {
      return $http.post('/getconv', obj)
        .then(function(data) {
          // console.log(data);
          return data;
        })
        .catch(function(err) {
          console.log(err);
        })
    },

    get_current_conv : function() {
      return $http.get('/get_current_conv')
        .then(function(data) {
          // console.log(data);
          return data;
        })
        .catch(function(err) {
          console.log(err);
        })
    }
    
  }

}]);

