package loop

import (
	"context"
	"fmt"
	"regexp"

	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
)

func Serve() error {
	l := ldk.NewLogger("example-whisper-form")
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
	isSubmitted, outputs, err := c.sidekick.Whisper().Form(c.ctx, &ldk.WhisperContentForm{
		Label:       "Example Controller Go",
		Markdown:    "Tell us about yourself",
		CancelLabel: "Cancel",
		SubmitLabel: "Submit",
		Inputs: map[string]ldk.WhisperContentFormInput{
			"name": &ldk.WhisperContentFormInputText{
				Label:   "Full Name",
				Tooltip: "Your full name.",
				Order:   1,
			},
			"email": &ldk.WhisperContentFormInputText{
				Label:   "Email Address",
				Tooltip: "Your email address.",
				Order:   2,
				OnChange: func(email string) {
					match, err := regexp.MatchString("^\\S+@\\S+$", email)
					if err != nil || !match {
						err = c.sidekick.Whisper().Markdown(c.ctx, &ldk.WhisperContentMarkdown{
							Label:    "Example Controller Go",
							Markdown: "Invalid Email Address: " + email,
						})
						if err != nil {
							c.logger.Error("failed to emit whisper", "error", err)
							return
						}
					} else {
						err = c.sidekick.Whisper().Markdown(c.ctx, &ldk.WhisperContentMarkdown{
							Label:    "Example Controller Go",
							Markdown: "Valid Email Address: " + email,
						})
						if err != nil {
							c.logger.Error("failed to emit whisper", "error", err)
							return
						}
					}
				},
			},
		},
	})
	if err != nil {
		c.logger.Error("failed to emit whisper", "error", err)
		return
	}
	c.logger.Debug("got response from confirm whisper", "isSubmitted", isSubmitted)

	var name string
	if nameOutput := outputs["name"]; nameOutput.Type() == ldk.WhisperContentFormTypeText {
		name = nameOutput.(*ldk.WhisperContentFormOutputText).Value
	}

	err = c.sidekick.Whisper().Markdown(c.ctx, &ldk.WhisperContentMarkdown{
		Label: "Example Controller Go",
		Markdown: func() string {
			if isSubmitted {
				return fmt.Sprintf("Hello %s", name)
			}
			return "It's rude to not tell us your name."
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
