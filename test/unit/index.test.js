import { assert } from 'chai';
import SmsService from '../../src/index';
import TwilioSms from '../../src/TwilioSms';

describe('SmsService', () => {
  it('Should properly export', () => {
    assert.isFunction(SmsService);
  });

  it('Should properly create twilio instance', () => {
    assert.instanceOf(SmsService('twilio', {provider: {accountSid: 'test', authToken: 'test'}}), TwilioSms);
  });

  it('Should properly throw exception on create unrecognized', () => {
    assert.throw(() => SmsService('NOT_EXISTS'), Error);
  });
});
