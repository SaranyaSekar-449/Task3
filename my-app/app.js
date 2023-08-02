angular.module('myApp', ['ngRoute', 'TokenModule', 'UserListModule'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'TokenModule/token.html',
        controller: 'TokenController'
      })
      .when('/fetch-users', {
        templateUrl: 'UserListModule/userlist.html',
        controller: 'UserListController',
        resolve: {
          userList: function (UserListService) {
            return UserListService.fetchUserList();
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('MainController', function ($scope, AuthService, $location) {
    $scope.isTokenPresent = AuthService.isTokenPresent();
    $scope.isUserListFetched = false;

    $scope.fetchUserList = function () {
      if ($scope.isTokenPresent) {
        $scope.isUserListFetched = true;
        $location.path('/fetch-users');
      } else {
        alert('Please enter a valid token first.');
      }
    };
  })
  .factory('AuthService', function ($q) {
    return {
      isTokenPresent: function () {
        return localStorage.getItem('user') !== null;
      },
      authenticate: function (token) {
        var deferred = $q.defer();
        if (token) { // Check if the token is non-empty
          localStorage.setItem('user', token);
          deferred.resolve(true);
        } else {
          deferred.reject(false);
        }
        return deferred.promise;
      }
    };
  });
