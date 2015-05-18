var TwilioSms = require('./TwilioSms');

module.exports = {
  create: function (type, options) {
    switch (type) {
      case 'twilio':
        return new TwilioSms(options);
      default:
        throw new Error('Unrecognized type -> ' + type);
    }
  },

  Twilio: TwilioSms
};
