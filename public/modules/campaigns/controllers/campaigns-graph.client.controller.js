'use strict';

/* global moment */
/* global d3 */

// Campaigns controller
angular.module('campaigns').controller('CampaignsGraphController', [
  '$scope', 'Authentication', 'Campaigns',
  function($scope, Authentication, Campaigns) {
    $scope.authentication = Authentication;

    var findBetween = function(start, end) {
    };

    // date picker related
    $scope.today = Date.today();
    $scope.weekAgo = Date.today().addDays(-7);
    $scope.fromDate = $scope.weekAgo;
    $scope.toDate = $scope.today;

    // start is a moment/date
    var categorizeByDay = function(ts, start, times) {
      var format = 'DD/MM/YY';
      var map = {};
      for (var i = 0; i < times; i++) {
        var key = start.clone().add(i, 'days').format(format);
        map[key] =  0;
      }

      _.each(ts, function(t) {
        var date = t.format(format);
        map[date]++;
      });


      return _.map(_.pairs(map), function(m) {
        return [moment(m[0], format).format('x'), m[1]];
      });
    };

    $scope.loadCampaignData = function(fromDate, toDate, callback) {
      Campaigns.query(
        {
          startDate: $scope.fromDate,
          endDate: $scope.toDate
        },
        function(data) {
          var ts = _.map(data, function(d) {
                     var dd = moment(Date.parse(d.created_at));
                     return dd;
                   });


          callback(null, ts);
        },
        function(err) {
          callback(err);
        }
      );
    };

    Campaigns.query(
      {
        startDate: $scope.fromDate,
        endDate: $scope.toDate
      },
      function(data) {
        var ts = _.map(data, function(d) {
                   var dd = moment(Date.parse(d.created_at));
                   return dd;
                 });

        // Assume 8 days for now.
        var result = categorizeByDay(ts, moment($scope.weekAgo), 7);
        $scope.campaignGraphData = [
          {
            'key': 'Campaigns',
            values: result
          }
        ];
      }
    );

    $scope.xformat = function(){
      return function(d){
        return d3.time.format('%x')(new Date(d));
      };
    };

    $scope.xscale = function() {
      return d3.time.scale();
    };

    $scope.tooltipcontent = function() {
        return function(key, x, y, e, graph) {
            var newX = d3.time.format('%Y-%m-%d')(new Date(+e.point[0]));
            return '<p>' + y + ' &#64; ' + newX + '</p>';
        };
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.date = {
      fromOpened: false,
      toOpened: false
    };

    $scope.openFromDate = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.date.fromOpened = true;
    };

    $scope.openToDate = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.date.toOpened = true;
    };
  }
]);
