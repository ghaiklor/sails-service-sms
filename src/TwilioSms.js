import _ from 'lodash';
import Promise from 'bluebird';
import twilio from 'twilio';
import BaseSms from './BaseSms';

export default class TwilioSms extends BaseSms {
  constructor(config) {
    super(config);

    this.setProvider(twilio(this.get('provider.accountSid'), this.get('provider.authToken')));
  }

  /**
   * Send message
   * @param {Object} [_config] Additional configuration
   * @returns {Promise}
   */
  send(_config) {
    let config = _.merge({}, _.omit(this.get(), 'provider'), _config);
    let promises = [];

    for (let i = 0; i < config.recipient.length; i++) {
      promises.push(new Promise((resolve, reject) => {
        this.getProvider().messages.create({
          from: config.sender,
          to: config.recipient[i],
          body: config.message
        }, (error, message) => error ? reject(error) : resolve(message));
      }));
    }

    return Promise.all(promises);
  }
}
