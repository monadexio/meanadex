'use strict';
var mongoose = require('mongoose'),
    async = require('async'),
    logger = require('../logger.server.lib.js'),
    utils = require('../utils.server.lib.js'),
    Order = mongoose.model('Order'),
    Campaign = mongoose.model('Campaign'),
    _ = require('lodash');

module.exports = function(agenda, config) {
  var stripe = require('stripe')(config.stripe.clientSecret);

  function listAllOrders(campaign) {
    return function(callback) {
      var query = Order
                    .find({'campaign': campaign._id})
                    .sort('-created')
                    .populate('user', 'username')
                    .populate('campaign', 'name');
      query.lean().exec(function(err, campaignOrders) {
        if(err) {
          logger.log('error getting orders for campaign: ' + campaign._id);
        }

        callback(err, campaign, campaignOrders);
      });
    };
  }

  function createChargeObj(order, campaign, accessToken) {
    var customerId = order.payment.customerId;

    if(!accessToken) {
      // If no access token for designer, we will charge
      // customer the full amount, will have to manually
      // transfer money to the designer in some way
      // `amount` field says how much money will go to our
      // account.
      return {
        customer: customerId,
        amount: order.amount * 100,
        currency: order.currency,
        description: order.description
      };
    } else {
      // If we have access token for designer, we will charge
      // customer the same amount, but devided into two parts
      // now the `amount` field says how much money will go to
      // designer's account and `application_fee` field says
      // how much money will go to our account. No transfer is
      // needed.

      var tshirtPrice = campaign.tshirt.baseCost;
      var quantity = order.quantity;

      var tshirtCost = tshirtPrice * quantity;
      var designerProfit = order.amount - tshirtCost;
      return {
        customer: customerId,
        amount: designerProfit * 100,
        currency: order.currency,
        description: order.description,
        application_fee: tshirtCost
      };
    }
  }

  function charge(accessToken, chargeObj, callback) {
    // If we have designer's access token, use it
    // otherwise we collect all the money first.
    if(accessToken) {
      stripe.charges.create(
        chargeObj,
        accessToken,
        callback
      );
    } else {
      stripe.charges.create(
        chargeObj,
        callback
      );
    }
  }

  function maybeChargeOrder(order, chargeFlag, campaign, accessToken) {
    return function(callback) {
      var customerId = order.payment.customerId;

      // chargeFlag determines if charge or not.
      if(chargeFlag) {
        var chargeObj = createChargeObj(order, campaign, accessToken);
        charge(accessToken, chargeObj, function(err, charge) {
          if(err) {
            logger.error(
              'error charging order: ' + order._id + '; customer id: ' + customerId
            );
          } else {
            logger.info(
              'order: ' + order._id + ' with customer id: ' + customerId + ' charged.'
            );
          }

          callback(err, customerId);
        });
      } else {
        // if not charge, proceed.
        callback(undefined, customerId);
      }
    };
  }

  function deleteCustomer(err, customerId) {
    stripe.customers.del(
      customerId,
      function(err, confirmation) {
        if(err) {
          logger.error('error deleting customer: ' + customerId);
        } else {
          logger.info('customer: ' + customerId + ' deleted.');
        }
      }
    );
  }

  var getUserStripeToken = function(campaign, campaignOrders, callback) {
    utils.fetchStripeAccessToken(campaign.user, function(err, accessToken) {
      // even if we come across error here we still want to charge
      // set it as undefined
      callback(undefined, campaign, campaignOrders, accessToken);
    });
  };

  function maybeChargeOrders(campaign, campaignOrders, accessToken, callback) {
    var numOrders = campaignOrders.length;

    var goalReached = numOrders >= campaign.goal ? true : false;

    // TODO: Remind user if accessToken is not set, especially when goal is
    //       reached or almost reached.

    _.forEach(campaignOrders, function(order) {
      async.waterfall([
        maybeChargeOrder(order, goalReached, campaign, accessToken)
      ], deleteCustomer);
    });

    // always go through
    callback(undefined, campaign, goalReached);
  }

  var changeCampaignState = function(campaign, goalReached, callback) {
    campaign.state = goalReached ? 'tipped' : 'expired';
    campaign.save(function(err) {
      if(err) {
        logger.error('campaign ' + campaign._id + ' is tipped.');
      }

      callback(err);
    });
  };

  var logging = function(err, results) {
    if (err) {
      logger.error('error while trying to tip campaigns: ', err);
    }
  };

  agenda.define('check campaigns maturity', function(job, done) {
    logger.info('check campaigns maturity job started');
    Campaign.find({ended: {$lt: Date.now()}}).
      where('state').equals('not_tipped').
      exec(function(err, campaigns) {
      _.forEach(campaigns, function(campaign){
        async.waterfall([
          listAllOrders(campaign),
          getUserStripeToken,
          maybeChargeOrders,
          changeCampaignState
        ], logging);
      });
    });
  });

  var checkCampaignMaturity = agenda.create(
    'check campaigns maturity'
  );

  checkCampaignMaturity.repeatAt(config.job.campaignJob.frequency).save();
};
