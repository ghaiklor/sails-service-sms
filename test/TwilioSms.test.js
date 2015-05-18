var assert = require('chai').assert;
var TwilioSms = require('../lib/TwilioSms');

describe('TwilioSms', function () {
  it('Should properly export', function () {
    assert.isFunction(TwilioSms);
  });
});
