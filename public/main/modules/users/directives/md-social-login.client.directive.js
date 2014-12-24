'use strict';

angular.module('users').directive('mdSocialLogin', [
  function(){
    return {
      restrict: 'E',
      templateUrl: 'main/modules/users/views/authentication/social-login.client.view.html'
    };
  }
]);
