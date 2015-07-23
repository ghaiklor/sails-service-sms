var sms = {
  twilio: require('./TwilioSms')
};

module.exports = {
  /**
   * Create instance of SMS service
   * @param {String} type
   * @param {Object} config
   * @returns {*}
   */
  create: function (type, config) {
    if (sms[type.toLowerCase()] instanceof Function) {
      return new sms[type.toLowerCase()](config);
    } else {
      throw new Error('Unrecognized type');
    }
  },

  TwilioSms: sms.twilio
};
