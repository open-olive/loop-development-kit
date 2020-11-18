package loop

import (
	"context"
	"time"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

func Serve() error {
	l := ldk.NewLogger("example-clipboard")
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
	c.logger.Info("Starting example controller loop")
	c.ctx, c.cancel = context.WithCancel(context.Background())

	c.sidekick = sidekick

	return sidekick.Clipboard().Listen(c.ctx, func(text string, err error) {
		ctx, _ := context.WithTimeout(c.ctx, 5*time.Second)
		c.logger.Info("controller loop callback called")
		if err != nil {
			c.logger.Error("received error from callback", err)
			return
		}

		go func() {
			err = c.sidekick.Whisper().Markdown(ctx, &ldk.WhisperContentMarkdown{
				Icon:     "bathtub",
				Label:    "Example Controller Go",
				Markdown: "Text from the clipboard: " + text,
			})
			if err != nil {
				c.logger.Error("failed to emit whisper", "error", err)
			}
		}()
	})
}

// LoopStop is called by the host when the plugin is stopped
func (c *Loop) LoopStop() error {
	c.logger.Info("controller LoopStop called")
	c.cancel()

	return nil
}
