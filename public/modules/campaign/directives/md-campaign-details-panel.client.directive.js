'use strict';

angular.module('campaign').directive('mdCampaignDetailsPanel', [
  '$timeout', 'mdCampaignInfoAccumulatorService',
  function($timeout, mdCampaignInfoAccumulatorService){
    return {
      restrict: 'E',
      scope: {
        campaignLengths: '='
      },
      templateUrl: 'modules/campaign/views/campaign-details-panel.client.view.html',
      link: function(scope, element, attrs) {
        $timeout(function() {
          element.find('#campaignDetailNextStep').click(function(e) {
            var status = 'ok';

            var verifyEmptyFun = function(field, warningId) {
              if(!field) {
                element.find(warningId).removeClass('hide');
                status = 'not_ok';
              } else {
                element.find(warningId).addClass('hide');
              }
            };

            [ { field: scope.campaignTitle
              , warningId: '#titleWarning'
              }
            , { field: scope.campaignDescription
              , warningId: '#descriptionWarning'
              }
            , { field: scope.campaignUrl
              , warningId: '#urlWarning'
              }
            , { field: element.find('#tosCheckbox').prop('checked')
              , warningId: '#tosWarning'
              }
            ].forEach(function(obj) {
              verifyEmptyFun(obj.field, obj.warningId);
            });

            if(status === 'not_ok') {
              e.preventDefault();
            } else {
              mdCampaignInfoAccumulatorService.setTitle(scope.campaignTitle);
              mdCampaignInfoAccumulatorService.setDescription(scope.campaignDescription);
              mdCampaignInfoAccumulatorService.setUrl(scope.campaignUrl);
              mdCampaignInfoAccumulatorService.setLength(scope.currentCampaignLength);
            }
          });
        }, 0);
      }
    };
  }
]);
