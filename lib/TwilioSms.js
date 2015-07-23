var util = require('util');
var _ = require('lodash');
var Promise = require('bluebird');
var twilio = require('twilio');
var BaseSms = require('./BaseSms');

util.inherits(TwilioSms, BaseSms);

/**
 * Create new Twilio SMS
 * @constructor
 */
function TwilioSms() {
  BaseSms.apply(this, arguments);

  this.setProvider(twilio(this.get('provider.accountSid'), this.get('provider.authToken')));
}

/**
 * Send message
 * @param {Object} [_config] Additional configuration
 * @returns {Promise}
 */
TwilioSms.prototype.send = function (_config) {
  var config = _.merge({}, _.omit(this.get(), 'provider'), _config);

  return new Promise(function (resolve, reject) {
    this.getProvider().messages.create({
      from: config.sender,
      to: config.recipient,
      body: config.message
    }, function (error, message) {
      return error ? reject(error) : resolve(message);
    });
  }.bind(this));
};

module.exports = TwilioSms;
