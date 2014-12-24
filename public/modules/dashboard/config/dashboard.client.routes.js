'use strict';

//Setting up route
angular.module('dashboard').config([
  '$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .when('/dashboard', '/dashboard/front');

    // Dashboard state routing
    $stateProvider.
      state('dashboard', {
        url: '/dashboard',
        templateUrl: 'modules/dashboard/views/dashboard.client.view.html',
        controller: 'DashboardController'
      }).
      state('dashboard.front', {
        url: '/front',
        views: {
          'dashboardPanel': {
            templateUrl: 'modules/dashboard/views/front.client.view.html',
            controller: 'DashboardController'
          }
        }}).
      state('dashboard.profile', {
        url: '/profile',
        views: {
          'dashboardPanel': {
            templateUrl: 'modules/dashboard/views/profile.client.view.html',
            controller: 'DashboardController'
          }
        }}).
      state('dashboard.orders', {
        url: '/orders',
        views: {
          'dashboardPanel': {
            templateUrl: 'modules/orders/views/list-orders.client.view.html',
            controller: 'OrdersController'
          }
        }
      });
  }
]);
