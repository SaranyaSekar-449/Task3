
var app = angular.module('TokenModule', [])
.controller('TokenController', function ($scope, AuthService, $location) {
  $scope.login = function () {
    AuthService.authenticate($scope.token).then(function (success) {
      if (success) {
        alert('Token is valid. You can now fetch users.');
        $location.path('/fetch-users');
      } else {
        alert('Invalid token. Please try again.');
      }
    });
  };
});
