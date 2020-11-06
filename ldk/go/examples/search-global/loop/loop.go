package loop

import (
	"context"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

const (
	backgroundColor = "#fff"
	highlightColor  = "#651fff"
	primaryColor    = "#666"
)

// Serve creates the new loop and tells the LDK to serve it
func Serve() error {
	l := ldk.NewLogger("example-search-global")
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
func (l *Loop) LoopStart(sidekick ldk.Sidekick) error {
	l.logger.Info("starting loop")
	l.ctx, l.cancel = context.WithCancel(context.Background())
	l.sidekick = sidekick

	return sidekick.UI().ListenGlobalSearch(l.ctx, func(text string, err error) {
		l.logger.Info("loop callback called")
		if err != nil {
			l.logger.Error("received error from callback", err)
			return
		}

		go func() {
			err = l.sidekick.Whisper().Markdown(l.ctx, &ldk.WhisperContentMarkdown{
				Icon:     "bathtub",
				Label:    "Example Go Loop",
				Markdown: "Text from the global search bar: " + text,
				Style:    l.style,
			})
			if err != nil {
				l.logger.Error("failed to emit whisper", "error", err)
				return
			}
		}()
	})
}

// LoopStop is called by the host when the plugin is stopped
func (l *Loop) LoopStop() error {
	l.logger.Info("LoopStop called")
	l.cancel()

	return nil
}
