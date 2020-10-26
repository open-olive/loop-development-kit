package bind

import (
	"time"
)

// Vars injected via ldflags by bundler
// Some defaults set for `go run` executions
var (
	BuiltAt string = time.Now().String()
)
