var app=angular.module('UserListModule',[])
  app.factory('UserListService', function ($http, $q) {
    return {
      fetchUserList: function () {
        const token = localStorage.getItem('user');
        if (token) {
          return $http.get('https://api.github.com/users', {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }).then(function (response) {
            localStorage.setItem('userList', JSON.stringify(response.data));
            return response.data;
          }).catch(function (error) {
            console.error('Error fetching user list:', error);
            return $q.reject(error);
          });
        } else {
          return $q.reject('No token found');
        }
      }
    };
  })
  .controller('UserListController', ['$scope', 'UserListService', function ($scope, UserListService) {
    UserListService.fetchUserList().then(function (userList) {
      $scope.userList = userList;
    }).catch(function (error) {
      console.error('Error fetching user list:', error);
    });
  }]);

