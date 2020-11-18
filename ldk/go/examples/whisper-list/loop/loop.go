package loop

import (
	"context"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

func Serve() error {
	l := ldk.NewLogger("example-whisper-list")
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
	c.logger.Info("loopStart called")
	c.ctx, c.cancel = context.WithCancel(context.Background())
	c.sidekick = sidekick

	go func() {
		err := c.sidekick.Whisper().List(c.ctx, &ldk.WhisperContentList{
			Icon:  "bathtub",
			Label: "Example Controller Go",
			Elements: map[string]ldk.WhisperContentListElement{
				"headerAlert": &ldk.WhisperContentListElementAlert{
					Body:      "This is an alert in the header! It should be highlighted green.",
					Highlight: ldk.WhisperContentListElementAlertHighlightGreen,
					Order:     0,
				},
				"myKey1": &ldk.WhisperContentListElementPair{
					Key:   "Key 1",
					Order: 1,
					Value: "This key is always shown and not highlighted.",
				},
				"myKey2": &ldk.WhisperContentListElementPair{
					Highlight: ldk.WhisperContentListElementPairHighlightYellow,
					Key:       "Key 2",
					Order:     2,
					Value:     "This key is always shown and highlighted yellow.",
				},
				"myKey3": &ldk.WhisperContentListElementPair{
					Extra:     true,
					Highlight: ldk.WhisperContentListElementPairHighlightYellow,
					Key:       "Key 3",
					Order:     3,
					Value:     "This key is hidden.",
				},
				"footerAlert": &ldk.WhisperContentListElementAlert{
					Extra:     true,
					Body:      "This is an alert in the footer! It is hidden by default. It should be highlighted red.",
					Highlight: ldk.WhisperContentListElementAlertHighlightRed,
					Order:     4,
				},
			},
		})
		if err != nil {
			c.logger.Error("failed to emit whisper", "error", err)
		}
	}()

	return nil
}

// LoopStop is called by the host when the plugin is stopped
func (c *Loop) LoopStop() error {
	c.logger.Info("loopStop called")
	c.cancel()

	return nil
}
