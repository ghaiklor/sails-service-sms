var assert = require('chai').assert;
var BaseSms = require('../lib/BaseSms');

describe('BaseSms', function () {
  it('Should properly export', function () {
    assert.isFunction(BaseSms);
    assert.isFunction(BaseSms.prototype.get);
    assert.isFunction(BaseSms.prototype.set);
    assert.isFunction(BaseSms.prototype.getProvider);
    assert.isFunction(BaseSms.prototype.setProvider);
    assert.isFunction(BaseSms.prototype.send);
  });

  it('Should properly make objects configurable', function () {
    var sms = new BaseSms();

    assert.notOk(sms.get('foo'));
    assert.instanceOf(sms.set('foo', 'bar'), BaseSms);
    assert.instanceOf(sms.set('obj', {foo: 'bar'}), BaseSms);
    assert.deepEqual(sms.get(), {foo: 'bar', obj: {foo: 'bar'}});
    assert.deepEqual(sms.get('obj'), {foo: 'bar'});
    assert.equal(sms.get('obj.foo'), 'bar');
    assert.equal(sms.get('foo'), 'bar');
  });

  it('Should properly create sms with pre-defined config', function () {
    var sms = new BaseSms({
      foo: 'bar',
      obj: {
        foo: 'bar'
      }
    });

    assert.equal(sms.get('foo'), 'bar');
    assert.equal(sms.get('obj.foo'), 'bar');
    assert.deepEqual(sms.get('obj'), {foo: 'bar'});
    assert.notOk(sms.get('NOT_EXISTS'));
  });

  it('Should properly get/set provider', function () {
    var sms = new BaseSms();

    assert.notOk(sms.getProvider());
    assert.instanceOf(sms.setProvider('NOTIFICATION'), BaseSms);
    assert.equal(sms.getProvider(), 'NOTIFICATION');
  });
});
