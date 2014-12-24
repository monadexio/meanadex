'use strict';

angular.module('images').directive('mdImageUpload', [
  'mdCanvasService',
  function(mdCanvasService){
    return {
      restrict: 'E',
      scope: {
        uploader: '=',
        currentQueueItem: '=',
        onImageUpload: '&',
        displayUpload: '='
      },
      templateUrl: 'modules/images/views/image-upload.client.view.html',
      link: function(scope, element, attrs) {
      }
    };
  }
]);
