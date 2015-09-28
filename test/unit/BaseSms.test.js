import { assert } from 'chai';
import BaseSms from '../../src/BaseSms';

describe('BaseSms', () => {
  it('Should properly export', () => {
    assert.isFunction(BaseSms);
  });

  it('Should properly make objects configurable', () => {
    let sms = new BaseSms();

    assert.notOk(sms.get('foo'));
    assert.instanceOf(sms.set('foo', 'bar'), BaseSms);
    assert.instanceOf(sms.set('obj', {foo: 'bar'}), BaseSms);
    assert.deepEqual(sms.get(), {foo: 'bar', obj: {foo: 'bar'}});
    assert.deepEqual(sms.get('obj'), {foo: 'bar'});
    assert.equal(sms.get('obj.foo'), 'bar');
    assert.equal(sms.get('foo'), 'bar');
  });

  it('Should properly create sms with pre-defined config', () => {
    let sms = new BaseSms({
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

  it('Should properly get/set provider', () => {
    let sms = new BaseSms();

    assert.notOk(sms.getProvider());
    assert.instanceOf(sms.setProvider('NOTIFICATION'), BaseSms);
    assert.equal(sms.getProvider(), 'NOTIFICATION');
  });
});
