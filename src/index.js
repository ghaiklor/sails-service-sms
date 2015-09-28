import TwilioSms from './TwilioSms';

const sms = {
  twilio: require('./TwilioSms')
};

/**
 * Create instance of SMS service
 * @param {String} type
 * @param {Object} [config]
 * @returns {*}
 */
export default function (type, config) {
  if (sms[type.toLowerCase()] instanceof Function) {
    return new sms[type.toLowerCase()](config);
  } else {
    throw new Error('Unrecognized type -> ' + type);
  }
}
