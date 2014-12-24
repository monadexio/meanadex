'use strict';

// Campaigns controller
angular.module('campaigns').controller('CampaignsController', [
  '$scope', '$stateParams', '$state', '$location', 'Authentication',
  'Campaigns', '$cookies', '$filter', 'DashboardUtils', '$timeout', '$http',
  function($scope, $stateParams, $state, $location, Authentication,
           Campaigns, $cookies, $filter, DashboardUtils, $timeout, $http) {
    $scope.authentication = Authentication;

    // Remove existing Campaign
    $scope.remove = function( campaign ) {
      if ( campaign ) {
        campaign.$remove();

        for (var i in $scope.campaigns ) {
          if ($scope.campaigns [i] === campaign ) {
            $scope.campaigns.splice(i, 1);
          }
        }
      } else {
        $scope.campaign.$remove(function() {
          $location.path('campaigns');
        });
      }
    };

    // Update existing Campaign
    $scope.update = function(campaign0) {
      var campaign = campaign0 || $scope.campaign;

      campaign.$update(
        function() {
          // perhaps show successfully updated message
        },
        function(errorResponse) {
          $scope.error = errorResponse.data.message;
        }
      );
    };

    // Find a list of Campaigns
    $scope.find = function() {
      $scope.campaigns = Campaigns.query();
    };

    // Find existing Campaign for a particular user
    $scope.findOne = function() {
      $scope.campaign = Campaigns.get(
        {
          campaignId: $stateParams.campaignId
        },
        function(data) {
        },
        function(err) {
          $location.path('/campaign_not_found');
        }
      );
    };

    $scope.reserveCampaign = function(campaign) {
      var campaignJson = JSON.stringify(campaign);
      $state.go('createOrder', {
        campaign: campaignJson
      }, {location: false, inherit: false});
    };
  }
]);
