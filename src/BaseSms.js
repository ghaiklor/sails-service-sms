var _ = require('lodash');

/**
 * Create base instance for SMS
 * @param {Object} [_config]
 * @constructor
 */
function BaseSms(_config) {
  this._config = {};

  _.forOwn(_config, function (value, key) {
    this.set(key, value);
  }.bind(this));
}

/**
 * Get configuration value
 * @param {String} [path]
 * @returns {*}
 */
BaseSms.prototype.get = function (path) {
  return typeof path === 'undefined' ? this._config : _.get(this._config, path);
};

/**
 * Set configuration value
 * @param {String} path
 * @param {*} value
 * @returns {BaseSms}
 */
BaseSms.prototype.set = function (path, value) {
  _.set(this._config, path, value);
  return this;
};

/**
 * Get provider for sending notifications
 * @returns {*}
 */
BaseSms.prototype.getProvider = function () {
  return this._provider;
};

/**
 * Set new provider to this pusher
 * @param {*} provider
 * @returns {BaseSms}
 */
BaseSms.prototype.setProvider = function (provider) {
  this._provider = provider;
  return this;
};

BaseSms.prototype.send = _;

module.exports = BaseSms;
