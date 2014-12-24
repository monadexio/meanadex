'use strict';

angular.module('designer').directive('mdTshirtDesignPanel', [
  function() {
    return {
      restrict: 'E',
      templateUrl: 'main/modules/designer/views/design-panel.client.view.html',
      link: function(scope, element) {
      }
    };
  }
]);
