# Logging

To make it easier to integrate with Sidekick's logger, a `Logger` class is provided to you in this library.

Example usage:

```javascript
const { Logger } = require('ldk');

const logger = new Logger('my-plugin-name');

// ...

logger.info('Some message');
// {"@timestamp":"2020-07-30T14:58:21.057000Z","@pid":1234,"@level":"INFO","@module":"my-plugin-name","@message":"Some message"}

logger.info('Another message', 'someKey', 'someValue', 'anotherKey', 'anotherValue');
// {"@timestamp":"2020-07-30T14:58:21.057000Z","@pid":1234,"@level":"INFO","@module":"my-plugin-name","@message":"Another message","anotherKey":"anotherValue","someKey":"someValue"}

const logger2 = logger.with('persistentKey', 'persistentValue');
logger2.info('Yet another message', 'yetAnotherKey', 'yetAnotherValue');
// {"@timestamp":"2020-07-30T14:58:21.057000Z","@pid":1234,"@level":"INFO","@module":"my-plugin-name","@message":"Yet another message","persistentKey":"persistentValue","yetAnotherKey":"yetAnotherValue"}
```

The logger is generally modeled off of [hclog](https://github.com/hashicorp/go-hclog).

So the `trace`/`debug`/`info`/`warn`/`error` methods expect a message as the first arg, with key/value pairs for the rest of the args.
