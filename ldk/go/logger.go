package ldk

import (
	"github.com/hashicorp/go-hclog"
)

// Logger is a logger implementation, which wraps an hclog Logger.
type Logger struct {
	l hclog.Logger
}

// NewLogger returns a configured logger.
func NewLogger(name string) *Logger {
	l := hclog.New(&hclog.LoggerOptions{
		// We always want a JSON output (for Sidekick to more easily parse)
		JSONFormat: true,
		// We want all logging to be accepted (so Sidekick can do the filtering)
		Level: hclog.Trace,
		Name:  name,
	})

	return &Logger{
		l: l,
	}
}

// With creates a sublogger that will always have the given key/value pairs.
func (l *Logger) With(args ...interface{}) *Logger {
	return &Logger{
		l: l.l.With(args...),
	}
}

// Trace emits the message and args at TRACE level.
func (l *Logger) Trace(msg string, args ...interface{}) {
	l.l.Trace(msg, args...)
}

// Debug emits the message and args at DEBUG level.
func (l *Logger) Debug(msg string, args ...interface{}) {
	l.l.Debug(msg, args...)
}

// Info emits the message and args at INFO level.
func (l *Logger) Info(msg string, args ...interface{}) {
	l.l.Info(msg, args...)
}

// Warn emits the message and args at WARN level.
func (l *Logger) Warn(msg string, args ...interface{}) {
	l.l.Warn(msg, args...)
}

// Error emits the message and args at ERROR level.
func (l *Logger) Error(msg string, args ...interface{}) {
	l.l.Error(msg, args...)
}

// Logger returns the underlying logger.
func (l *Logger) Logger() hclog.Logger {
	return l.l
}
