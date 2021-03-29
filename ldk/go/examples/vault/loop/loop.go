package loop

import (
	"context"
	"fmt"

	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
)

func Serve() error {
	l := ldk.NewLogger("example-loop-vault")
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
}

// NewLoop returns a pointer to a loop
func NewLoop(logger *ldk.Logger) (*Loop, error) {
	return &Loop{
		logger: logger,
	}, nil
}

// LoopStart is called by the host when the plugin is started to provide access to the host process
func (c *Loop) LoopStart(sidekick ldk.Sidekick) error {
	c.logger.Info("Starting example Loop")
	c.ctx, c.cancel = context.WithCancel(context.Background())
	c.sidekick = sidekick

	go c.run()

	return nil
}

func (c *Loop) run() {
	key := "myExampleKey"

	// check if key exists in vault
	exists, err := c.sidekick.Vault().Exists(c.ctx, key)
	if err != nil {
		c.logger.Error("failed to check if vault key exists", "error", err)
	}
	c.logger.Trace("checked if key exists", "key", key, "exists", exists)

	// if the key does exist, delete it to create a clean slate
	if exists {
		err := c.sidekick.Vault().Delete(c.ctx, key)
		if err != nil {
			c.logger.Error("failed to delete vault key", "error", err)
		}
		c.logger.Trace("deleted vault value", "key", key)
	}

	// write something silly to vault
	value := "bananas"
	err = c.sidekick.Vault().Write(c.ctx, key, value)
	if err != nil {
		c.logger.Error("failed to write vault key", "error", err)
	}
	c.logger.Trace("wrote vault value", "key", key, "value", value)

	// read the value back from vault
	returnedValue, err := c.sidekick.Vault().Read(c.ctx, key)
	if err != nil {
		c.logger.Error("failed to read vault key", "error", err)
	}
	c.logger.Trace("read vault value", "key", key, "returnedValue", returnedValue)

	// update vault with true or false depending on if the value that was written matches the returnedValue
	statusKey := "testStatus"
	status := fmt.Sprintf("%t", value == returnedValue)
	err = c.sidekick.Vault().Write(c.ctx, statusKey, status)
	if err != nil {
		c.logger.Error("failed to write vault key", "error", err)
	}
	c.logger.Trace("wrote vault value", "statusKey", statusKey, "status", status)
}

// LoopStop is called by the host when the plugin is stopped
func (c *Loop) LoopStop() error {
	c.logger.Info("LoopStop called")
	c.cancel()

	return nil
}
