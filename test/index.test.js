var assert = require('chai').assert;
var SmsService = require('../');

describe('SmsService', function () {
  it('Should properly export', function () {
    assert.isObject(SmsService);
    assert.isFunction(SmsService.create);
    assert.isFunction(SmsService.Twilio);
  });
});
