package loop

import (
	"context"
	"fmt"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

const (
	backgroundColor = "#fff"
	highlightColor  = "#651fff"
	primaryColor    = "#666"
)

func Serve() error {
	l := ldk.NewLogger("example-storage")
	loop, err := NewLoop(l)
	if err != nil {
		return err
	}
	ldk.ServeLoopPlugin(l, loop)
	return nil
}

// Loop is a structure for generating SideKick whispers
type Loop struct {
	ctx    context.Context
	cancel context.CancelFunc

	sidekick ldk.Sidekick
	logger   *ldk.Logger
	style    ldk.Style
}

// NewLoop returns a pointer to a loop
func NewLoop(logger *ldk.Logger) (*Loop, error) {
	return &Loop{
		logger: logger,
		style: ldk.Style{
			BackgroundColor: backgroundColor,
			HighlightColor:  highlightColor,
			PrimaryColor:    primaryColor,
		},
	}, nil
}

// LoopStart is called by the host when the plugin is started to provide access to the host process
func (c *Loop) LoopStart(sidekick ldk.Sidekick) error {
	c.logger.Info("Starting example controller loop")
	c.ctx, c.cancel = context.WithCancel(context.Background())
	c.sidekick = sidekick

	go c.run()

	return nil
}

func (c *Loop) run() {
	key := "myExampleKey"

	// check if key exists in storage
	exists, err := c.sidekick.Storage().Exists(c.ctx, key)
	if err != nil {
		c.logger.Error("failed to check if storage key exists", "error", err)
	}
	c.logger.Trace("checked if key exists", "key", key, "exists", exists)

	// if the key does exist, delete it to create a clean slate
	if exists {
		err := c.sidekick.Storage().Delete(c.ctx, key)
		if err != nil {
			c.logger.Error("failed to delete storage key", "error", err)
		}
		c.logger.Trace("deleted storage value", "key", key)
	}

	// write something silly to storage
	value := "bananas"
	err = c.sidekick.Storage().Write(c.ctx, key, value)
	if err != nil {
		c.logger.Error("failed to write storage key", "error", err)
	}
	c.logger.Trace("wrote storage value", "key", key, "value", value)

	// read the value back from storage
	returnedValue, err := c.sidekick.Storage().Read(c.ctx, key)
	if err != nil {
		c.logger.Error("failed to read storage key", "error", err)
	}
	c.logger.Trace("read storage value", "key", key, "returnedValue", returnedValue)

	// update storage with true or false depending on if the value that was written matches the returnedValue
	statusKey := "testStatus"
	status := fmt.Sprintf("%t", value == returnedValue)
	err = c.sidekick.Storage().Write(c.ctx, statusKey, status)
	if err != nil {
		c.logger.Error("failed to write storage key", "error", err)
	}
	c.logger.Trace("wrote storage value", "statusKey", statusKey, "status", status)
}

// LoopStop is called by the host when the plugin is stopped
func (c *Loop) LoopStop() error {
	c.logger.Info("controller LoopStop called")
	c.cancel()

	return nil
}
