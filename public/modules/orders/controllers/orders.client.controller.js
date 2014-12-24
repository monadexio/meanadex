'use strict';

// Orders controller
angular.module('orders').controller('OrdersController', [
  '$scope', '$stateParams', '$location', 'Authentication', 'Orders',
  '$filter', 'DashboardUtils',
  function($scope, $stateParams, $location, Authentication, Orders,
           $filter, DashboardUtils) {

    $scope.authentication = Authentication;

    // Find a list of Orders
    $scope.find = function() {
      $scope.orders = Orders.query();
    };

    // Find existing Order
    $scope.findOne = function() {
      $scope.order = Orders.get({
        orderId: $stateParams.orderId
      });
    };
  }
]);
