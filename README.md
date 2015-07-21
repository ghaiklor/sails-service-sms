# sails-service-sms

![Build Status](https://img.shields.io/travis/ghaiklor/sails-service-sms.svg) ![Coverage](https://img.shields.io/coveralls/ghaiklor/sails-service-sms.svg) ![Downloads](https://img.shields.io/npm/dm/sails-service-sms.svg) ![npm version](https://img.shields.io/npm/v/sails-service-sms.svg) ![dependencies](https://img.shields.io/david/ghaiklor/sails-service-sms.svg) ![dev dependencies](https://img.shields.io/david/dev/ghaiklor/sails-service-sms.svg) ![License](https://img.shields.io/npm/l/sails-service-sms.svg)

Service for Sails framework with SMS features.

## List of supported SMS services

- Twilio ([Docs](http://twilio.github.io/twilio-node/))

## Getting Started

Install this module.

```shell
npm install sails-service-sms
```

Then require it in your service.

```javascript
// api/services/SMSService.js
module.exports = require('sails-service-sms');
```

That's it, you can create SMS instances for your needs in your project.

```javascript
// api/controllers/SMSController.js
var twilio = SMSService.create('twilio', {
  provider: {
    accountSid: '<ACCOUNT_SID>',
    authToken: '<AUTH_TOKEN>'
  },
  message: {
    body: 'Hello, there!'
  }
});

module.exports = {
  send: function(req, res) {
    twilio
      .send(['TO_NUMBER_1', 'TO_NUMBER_2'])
      .then(res.ok)
      .catch(res.serverError);
  }
};
```

## Configuration

When you instantiate new instance via `SMSService.create()` you can provide configuration object with 3 keys:

- `config.provider` - {Object} Options that will go to each of SDKs
- `config.message` - {Object} Options that will go to each of messages (it has one interface for each of providers, see below)

## API

Each of SMS instances has only one method:

### send([recipient], [message], [config])

Sends SMS.

`recipient` - {Array} Phone numbers to which need to send (mixed up with pre-defined recipients).

`message` - {Object} Config for message:

  - `message.body` - Message body text

`config` - Additional configuration for message with specific platform. See appropriate documentation.

## Examples

### TwilioSMS

```javascript
var twilio = SMSService.create('twilio', {
  provider: {
    accountSid: '<ACCOUNT_SID>',
    authToken: '<AUTH_TOKEN>'
  },
  message: {
    body: 'Hey, there!'
  }
});

twilio
  .send(['NUMBER_1', 'NUMBER_2'], {
    body: 'You can override pre-defined'
  })
  .then(console.log.bind(console))
  .catch(console.error.bind(console));
```

## License

The MIT License (MIT)

Copyright (c) 2015 Eugene Obrezkov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
