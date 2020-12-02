package loop

import (
	"context"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

func Serve() error {
	l := ldk.NewLogger("example-whisper-confirm")
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

	go c.run()

	return nil
}

func (c *Loop) run() {
	isConfirmed, err := c.sidekick.Whisper().Confirm(c.ctx, &ldk.WhisperContentConfirm{
		Label:        "Example Controller Go",
		Markdown:     "Do you like bananas?",
		RejectLabel:  "Nope",
		ResolveLabel: "Yep",
	})
	if err != nil {
		c.logger.Error("failed to emit whisper", "error", err)
		return
	}
	c.logger.Debug("got response from confirm whisper", "isConfirmed", isConfirmed)

	err = c.sidekick.Whisper().Markdown(c.ctx, &ldk.WhisperContentMarkdown{
		Label: "Example Controller Go",
		Markdown: func() string {
			if isConfirmed {
				return "That's great!"
			}
			return "That's too bad."
		}(),
	})
	if err != nil {
		c.logger.Error("failed to emit whisper", "error", err)
		return
	}
}

// LoopStop is called by the host when the plugin is stopped
func (c *Loop) LoopStop() error {
	c.logger.Info("controller LoopStop called")
	c.cancel()

	return nil
}
