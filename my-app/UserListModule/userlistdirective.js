
app
.directive('customUserList', function () {
  return {
    restrict: 'E',
    templateUrl: 'UserListModule/userlist.html',
    controller: 'UserListController',
    link: function (scope, element, attrs) {
    }
  };
});
