'use strict';

//Setting up route
angular.module('orders').config([
  '$stateProvider',
  function($stateProvider) {
    // Orders state routing
    $stateProvider.
      state('createOrder', {
        url: '/orders/create?campaign',
        templateUrl: 'main/modules/orders/views/create-order.client.view.html',
        controller: 'CreateOrderController'
      }).
      state('finishOrder', {
        url: '/orders/:orderId',
        templateUrl: 'main/modules/orders/views/finish-order.client.view.html',
        controller: 'OrdersController'
      });
  }
]);
