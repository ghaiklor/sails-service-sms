import { assert } from 'chai';
import sinon from 'sinon';
import TwilioSms from '../../src/TwilioSms';

const CONFIG = {
  sender: 'ghaiklor',
  recipient: ['other', 'number'],
  message: 'Default message',
  provider: {
    accountSid: 'test',
    authToken: 'test'
  }
};

describe('TwilioSms', () => {
  it('Should properly export', () => {
    assert.isFunction(TwilioSms);
  });

  it('Should properly send sms with pre-defined config', done => {
    let sms = new TwilioSms(CONFIG);

    sinon.stub(sms.getProvider().messages, 'create', (config, cb) => cb(null, 'RESULT'));

    sms
      .send()
      .then(result => {
        assert.isArray(result);
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

  it('Should properly send sms with new config', done => {
    let sms = new TwilioSms(CONFIG);

    sinon.stub(sms.getProvider().messages, 'create', (config, cb) => cb(null, 'RESULT'));

    sms
      .send({
        sender: 'other_ghaiklor',
        recipient: ['another', 'numbers'],
        message: 'And another message'
      })
      .then(result => {
        assert.isArray(result);
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

  it('Should properly throw error on sending', done => {
    let sms = new TwilioSms(CONFIG);

    sinon.stub(sms.getProvider().messages, 'create', (config, cb) => cb(new Error('Some error occurred')));

    sms
      .send()
      .then(done)
      .catch(error => {
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
