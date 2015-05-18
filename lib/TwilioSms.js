var Promise = require('bluebird');
var twilio = require('twilio');

/**
 * Create new Twilio SMS
 * @constructor
 */
function TwilioSms(config) {
  if (!(config || config.accountSid || config.authToken)) {
    throw new Error('You must provide accountSid and authToken');
  }

  this._config = config || {};
  this.setAccountSid(this._config.accountSid);
  this.setAuthToken(this._config.authToken);
  this._createClient();
}

/**
 * Send message
 * @returns {Promise}
 */
TwilioSms.prototype.send = function () {
  return new Promise(function (resolve, reject) {
    this._getClient().messages.create({
      from: this._config.sender,
      to: this._config.recipient,
      body: this._config.message
    }, function (error, message) {
      return error ? reject(error) : resolve(message);
    });
  }.bind(this));
};

/**
 * Get twilio client
 * @returns {*}
 * @private
 */
TwilioSms.prototype._getClient = function () {
  return this._client;
};

/**
 * Set Twilio client
 * @returns {TwilioSms}
 * @private
 */
TwilioSms.prototype._createClient = function () {
  this._client = twilio(this.getAccountSid(), this.getAuthToken());
  return this;
};

/**
 * Get twilio auth token
 * @returns {String}
 */
TwilioSms.prototype.getAuthToken = function () {
  return this.authToken;
};

/**
 * Set twilio auth token
 * @param {String} token
 * @returns {TwilioSms}
 */
TwilioSms.prototype.setAuthToken = function (token) {
  this.authToken = token;
  return this;
};

/**
 * Get account sid
 * @returns {String}
 */
TwilioSms.prototype.getAccountSid = function () {
  return this.accountSid;
};

/**
 * Set account sid
 * @param {String} sid
 * @returns {TwilioSms}
 */
TwilioSms.prototype.setAccountSid = function (sid) {
  this.accountSid = sid;
  return this;
};

module.exports = TwilioSms;
