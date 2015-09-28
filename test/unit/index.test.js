var assert = require('chai').assert;
var SmsService = require('../../index');
var TwilioSms = SmsService.TwilioSms;

describe('SmsService', function () {
  it('Should properly export', function () {
    assert.isObject(SmsService);
    assert.isFunction(SmsService.create);
    assert.isFunction(SmsService.TwilioSms);
  });

  it('Should properly create twilio instance', function () {
    assert.instanceOf(SmsService.create('twilio', {provider: {accountSid: 'test', authToken: 'test'}}), TwilioSms);
  });

  it('Should properly throw exception on create unrecognized', function () {
    assert.throw(function () {
      SmsService.create('NOT_EXISTS');
    }, Error);
  });
});
