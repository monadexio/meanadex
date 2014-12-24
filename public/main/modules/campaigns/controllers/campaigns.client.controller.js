'use strict';

// Campaigns controller
angular.module('campaigns').controller('CampaignsController', [
  '$scope', '$stateParams', '$state', '$location', 'Authentication',
  'Campaigns', '$cookies', '$filter', '$timeout', '$http',
  function($scope, $stateParams, $state, $location, Authentication,
           Campaigns, $cookies, $filter, $timeout, $http) {
    $scope.authentication = Authentication;

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
