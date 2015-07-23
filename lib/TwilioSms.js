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
 * Send message to the recipient
 * @returns {Promise}
 * @private
 */
TwilioSms.prototype._send = function (config) {
  return new Promise(function (resolve, reject) {
    this.getProvider().messages.create(config, function (error, message) {
      return error ? reject(error) : resolve(message);
    });
  }.bind(this));
};

/**
 * Send message
 * @param {Object} [_config] Additional configuration
 * @returns {Promise}
 */
TwilioSms.prototype.send = function (_config) {
  var config = _.merge({}, _.omit(this.get(), 'provider'), _config);
  var promises = [];

  for (var i = 0; i < config.recipient.length; i++) {
    promises.push(this._send({
      from: config.sender,
      to: config.recipient[i],
      body: config.message
    }));
  }

  return Promise.all(promises);
};

module.exports = TwilioSms;
