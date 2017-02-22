angular.module('MainServ', []).factory('MainService', ['$q', '$timeout', '$http', function($q, $timeout, $http) {

  return {

    submit_name : function(obj) {
      return $http.post('/eliza', obj)
        .then(function(data) {
          // console.log(data);
          return data.data.obj;
        })
    },

    send_text : function(obj) {
      return $http.post('/eliza/DOCTOR', obj)
        .then(function(data) {
          // console.log(data);
          return data.data;
        })
    },

    signup : function(obj) {
      return $http.post('/adduser', obj)
        .then(function(data) {
          console.log(data);
        })
    }
    
  }

}]);

