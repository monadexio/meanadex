'use strict';

//Setting up route
angular.module('dashboard').config([
  '$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .when('/', '/front');

    // Dashboard state routing
    $stateProvider.
      state('dashboard', {
        url: '',
        templateUrl: 'dashboard/modules/dashboard/views/dashboard.client.view.html',
        controller: 'DashboardController'
      }).
      state('dashboard.front', {
        url: '/front',
        views: {
          'dashboardPanel': {
            templateUrl: 'dashboard/modules/dashboard/views/front.client.view.html',
            controller: 'DashboardController'
          }
        }}).
      state('dashboard.profile', {
        url: '/profile',
        views: {
          'dashboardPanel': {
            templateUrl: 'dashboard/modules/dashboard/views/profile.client.view.html',
            controller: 'DashboardController'
          }
        }}).
      state('dashboard.tshirts', {
        url: '/tshirts',
        views: {
          'dashboardPanel': {
            templateUrl: 'dashboard/modules/tshirts/views/list-tshirts.client.view.html',
            controller: 'TshirtsController'
          }
        }}).
      state('dashboard.tshirtCreate', {
        url: '/tshirts/create',
        views: {
          'dashboardPanel': {
            templateUrl: 'dashboard/modules/tshirts/views/create-tshirt.client.view.html',
            controller: 'TshirtsController'
          }
        }
      }).
      state('dashboard.tshirtDetail', {
        url: '/tshirts/:tshirtId',
        views: {
          'dashboardPanel': {
            templateUrl: 'dashboard/modules/tshirts/views/view-tshirt.client.view.html',
            controller: 'TshirtsController'
          }
        }
      }).
      state('dashboard.campaigns', {
        url: '/campaigns',
        views: {
          'dashboardPanel': {
            templateUrl: 'dashboard/modules/campaigns/views/list-campaigns.client.view.html',
            controller: 'CampaignsController'
          }
        }
      }).
      state('dashboard.orders', {
        url: '/orders',
        views: {
          'dashboardPanel': {
            templateUrl: 'dashboard/modules/orders/views/list-orders.client.view.html',
            controller: 'OrdersController'
          }
        }
      });
  }
]);
