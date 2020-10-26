# Logging

To make it easier to integrate with Sidekick's logger, a `Logger` struct (and `NewLogger` func) is provided to you in this library.

Example usage:

```go
import (
    ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

var logger = ldk.NewLogger("my-plugin-name")

...

logger.Info("Some message")
// {"@timestamp":"2020-07-30T14:58:21.057Z","@pid":1234,"@level":"INFO","@module":"my-plugin-name","@message":"Some message"}

logger.Info("Another message", "someKey", "someValue", "anotherKey", "anotherValue")
// {"@timestamp":"2020-07-30T14:58:21.057Z","@pid":1234,"@level":"INFO","@module":"my-plugin-name","@message":"Another message","anotherKey":"anotherValue","someKey":"someValue"}

var logger2 = logger.With("persistentKey", "persistentValue")
logger2.Info("Yet another message", "yetAnotherKey", "yetAnotherValue")
// {"@timestamp":"2020-07-30T14:58:21.057Z","@pid":1234,"@level":"INFO","@module":"my-plugin-name","@message":"Yet another message","persistentKey":"persistentValue","yetAnotherKey":"yetAnotherValue"}
```
