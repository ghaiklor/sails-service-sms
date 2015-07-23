var assert = require('chai').assert;
var sinon = require('sinon');
var TwilioSms = require('../lib/TwilioSms');

var CONFIG = {
  sender: 'ghaiklor',
  recipient: ['other', 'number'],
  message: 'Default message',
  provider: {
    accountSid: 'test',
    authToken: 'test'
  }
};

describe('TwilioSms', function () {
  it('Should properly export', function () {
    assert.isFunction(TwilioSms);
  });

  it('Should properly send sms with pre-defined config', function (done) {
    var sms = new TwilioSms(CONFIG);

    sinon.stub(sms.getProvider().messages, 'create', function (config, cb) {
      cb(null, 'RESULT');
    });

    sms
      .send()
      .then(function (result) {
        assert.equal(result, 'RESULT');
        assert.ok(sms.getProvider().messages.create.calledTwice);
        assert.deepPropertyVal(sms.getProvider().messages.create.getCall(0).args[0], 'from', 'ghaiklor');
        assert.deepPropertyVal(sms.getProvider().messages.create.getCall(0).args[0], 'to', 'other');
        assert.deepPropertyVal(sms.getProvider().messages.create.getCall(1).args[0], 'to', 'number');
        assert.deepPropertyVal(sms.getProvider().messages.create.getCall(0).args[0], 'body', 'Default message');
        assert.isFunction(sms.getProvider().messages.create.getCall(0).args[1]);

        sms.getProvider().messages.create.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly send sms with new config', function (done) {
    var sms = new TwilioSms(CONFIG);

    sinon.stub(sms.getProvider().messages, 'create', function (config, cb) {
      cb(null, 'RESULT');
    });

    sms
      .send({
        sender: 'other_ghaiklor',
        recipient: ['another', 'numbers'],
        message: 'And another message'
      })
      .then(function (result) {
        assert.equal(result, 'RESULT');
        assert.ok(sms.getProvider().messages.create.calledTwice);
        assert.deepPropertyVal(sms.getProvider().messages.create.getCall(0).args[0], 'from', 'other_ghaiklor');
        assert.deepPropertyVal(sms.getProvider().messages.create.getCall(0).args[0], 'to', 'another');
        assert.deepPropertyVal(sms.getProvider().messages.create.getCall(1).args[0], 'to', 'numbers');
        assert.deepPropertyVal(sms.getProvider().messages.create.getCall(0).args[0], 'body', 'And another message');
        assert.isFunction(sms.getProvider().messages.create.getCall(0).args[1]);

        sms.getProvider().messages.create.restore();

        done();
      })
      .catch(done);
  });

  it('Should properly throw error on sending', function (done) {
    var sms = new TwilioSms(CONFIG);

    sinon.stub(sms.getProvider().messages, 'create', function (config, cb) {
      cb(new Error('Some error occurred'));
    });

    sms
      .send()
      .then(done)
      .catch(function (error) {
        assert.instanceOf(error, Error);
        assert.ok(sms.getProvider().messages.create.calledTwice);
        assert.deepPropertyVal(sms.getProvider().messages.create.getCall(0).args[0], 'from', 'ghaiklor');
        assert.deepPropertyVal(sms.getProvider().messages.create.getCall(0).args[0], 'to', 'other');
        assert.deepPropertyVal(sms.getProvider().messages.create.getCall(1).args[0], 'to', 'number');
        assert.deepPropertyVal(sms.getProvider().messages.create.getCall(0).args[0], 'body', 'Default message');
        assert.isFunction(sms.getProvider().messages.create.getCall(0).args[1]);

        sms.getProvider().messages.create.restore();

        done();
      });
  });
});
