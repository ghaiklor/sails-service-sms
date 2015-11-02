# sails-service-sms

![Build Status](https://img.shields.io/travis/ghaiklor/sails-service-sms.svg)
![Coverage](https://img.shields.io/coveralls/ghaiklor/sails-service-sms.svg)

![Downloads](https://img.shields.io/npm/dm/sails-service-sms.svg)
![Downloads](https://img.shields.io/npm/dt/sails-service-sms.svg)
![npm version](https://img.shields.io/npm/v/sails-service-sms.svg)
![License](https://img.shields.io/npm/l/sails-service-sms.svg)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![dependencies](https://img.shields.io/david/ghaiklor/sails-service-sms.svg)
![dev dependencies](https://img.shields.io/david/dev/ghaiklor/sails-service-sms.svg)

Service for Sails framework with SMS features.

## List of supported SMS services

- Twilio ([Docs](http://twilio.github.io/twilio-node/))

## Getting Started

Install this module.

```shell
npm install sails-service-sms
```

Then require it in your service and create sms instance.

```javascript
// api/services/SmsService.js
import SmsService from 'sails-service-sms';

export default SmsService('twilio', {
  sender: '<TWILIO_NUMBER>',
  provider: {
    accountSid: '',
    authToken: ''
  }
});

// api/controllers/SMSController.js
export default {
  send: function(req, res) {
    SmsService
      .send({
        recipient: ['ANOTHER', 'NUMBERS'],
        message: 'You can override message'
      })
      .then(res.ok)
      .catch(res.negotiate);
  }
};
```

## Configuration

When you instantiate new instance via `SmsService(type, config)` you can provide configuration object with next keys:

- `config.provider` - {Object} Options that will go to each of SDKs
- `config.sender` - {String} Number of sender
- `config.recipient` - {Array} Array of strings with phone numbers of recipients
- `config.message` - {String} Default message to send (you can override it in `send()`)

## API

Each of SMS instances has only one method:

### send([config])

Sends SMS and returns Promise.

`config` - Configuration object for sending SMS:

  - `config.sender` - {String} Sender's number
  - `config.recipient` - {Array} Phone numbers to which need to send (mixed up with pre-defined recipients).
  - `config.message` - {String} Message body text

## Examples

### TwilioSMS

```javascript
let twilio = SMSService('twilio', {
  sender: '+123456789',
  recipient: [],
  message: 'Hey, there!',
  provider: {
    accountSid: '<ACCOUNT_SID>',
    authToken: '<AUTH_TOKEN>'
  }
});

twilio
  .send({
    recipient: ['+0987654321'],
    message: 'You can override here predefined config'
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
