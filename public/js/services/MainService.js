angular.module('MainServ', []).factory('MainService', ['$q', '$timeout', '$http', function($q, $timeout, $http) {

  return {

    submit_name : function(obj) {
      return $http.post('/eliza', obj)
        .then(function(data) {
          // console.log(data);
          return data.data.obj;
        })
        .catch(function(err) {
          console.log(err);
        })
    },

    send_text : function(obj) {
      return $http.post('/eliza/DOCTOR', obj)
        .then(function(data) {
          // console.log(data);
          return data.data;
        })
        .catch(function(err) {
          console.log(err);
        })
    },

    signup : function(obj) {
      return $http.post('/adduser', obj)
        .then(function(data) {
          console.log(data);
        })
        .catch(function(err) {
          console.log(err);
        })
    },

    verify_user : function(obj) {
      return $http.post('/verify', obj)
        .then(function(data) {
          console.log(data);
        })
        .catch(function(err) {
          console.log(err);
        })
    }
    
  }

}]);

