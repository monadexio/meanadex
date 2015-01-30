angular.module('auth').controller('AuthConnectController', [
  '$stateParams', '$state', '$log', 'Oauth2', '$window', 'LastLocation',
  'localStorageService', 'currentUser',
  function ($stateParams, $state, $log, Oauth2, $window, LastLocation,
    localStorageService, currentUser) {
    'use strict';

    // First, check for the edge case where the API returns an error code
    // back to us. This should only happen when it fails to properly parse
    // our redirect_uri and thus just sends the error back to referrer, but
    // we should still catch it.
    if (!!$stateParams.error) {
      $log.debug('Error received, redirecting to auth.error.');
      $state.go('auth.error', $stateParams);
      return;
    }

    var service = $stateParams.service;
    var state = currentUser._id;

    // Store the last path...
    localStorageService.set('lastPath', LastLocation.get());

    // We're not an error, let's fire the authorization.
    Oauth2.authorize(service, state);
  }
]);
