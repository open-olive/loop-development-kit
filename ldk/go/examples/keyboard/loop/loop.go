package loop

import (
	"bytes"
	"context"
	"html/template"
	"strconv"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
	"github.com/open-olive/sidekick-controller-examplego/bind"
)

const (
	backgroundColor = "#fff"
	highlightColor  = "#651fff"
	primaryColor    = "#666"
)

func Serve() error {
	l := ldk.NewLogger("loop-example")
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

	sidekick        ldk.Sidekick
	logger          *ldk.Logger
	style           ldk.Style
	whisperTemplate *template.Template
}

// NewLoop returns a pointer to a loop
func NewLoop(logger *ldk.Logger) (*Loop, error) {
	logger.Info("assets", "assetNames", bind.AssetNames())

	whisperTemplateBytes, err := bind.Asset("assets/templates/whisper.md")
	if err != nil {
		return nil, err
	}

	whisperTemplate, err := template.New("whisper").Parse(string(whisperTemplateBytes))
	if err != nil {
		return nil, err
	}

	return &Loop{
		logger: logger,
		style: ldk.Style{
			BackgroundColor: backgroundColor,
			HighlightColor:  highlightColor,
			PrimaryColor:    primaryColor,
		},
		whisperTemplate: whisperTemplate,
	}, nil
}

// LoopStart is called by the host when the plugin is started to provide access to the host process
func (c *Loop) LoopStart(sidekick ldk.Sidekick) error {
	c.logger.Info("Starting example controller loop")
	c.ctx, c.cancel = context.WithCancel(context.Background())

	c.sidekick = sidekick

	// set defaults
	if hasKey, err := c.sidekick.Storage().StorageHasKey("counter"); !hasKey {
		if err != nil {
			c.logger.Error("error retrieving counter from storage", "error", err.Error())
		}

		err = c.sidekick.Storage().StorageWrite("counter", "0")
		if err != nil {
			c.logger.Error("error writing counter default to storage", "error", err.Error())
		}
	}

	// Keyboard Listener 1
	return sidekick.Keyboard().ListenText(c.ctx, func(text string, err error) {
		c.logger.Info("controller loop callback called")
		if err != nil {
			c.logger.Error("received error from callback", err)
			return
		}
		err = c.emitExampleWhisper(text)
		if err != nil {
			c.logger.Error("failed to emit example whisper", err)
		}
	})
}

// LoopStop is called by the host when the plugin is stopped
func (c *Loop) LoopStop() error {
	c.logger.Info("controller LoopStop called")
	c.cancel()

	return nil
}

func (c *Loop) emitExampleWhisper(text string) error {
	type template struct {
		Text    string
		Counter string
	}

	counter, err := c.sidekick.Storage().StorageRead("counter")
	if err != nil {
		return err
	}

	var markdownBytes bytes.Buffer
	if err := c.whisperTemplate.Execute(&markdownBytes, template{
		Text:    text,
		Counter: counter,
	}); err != nil {
		c.logger.Error("failed to create markdown", "error", err)
		return err
	}

	err = c.sidekick.Whisper().WhisperMarkdown(ldk.WhisperMarkdown{
		WhisperMeta: ldk.WhisperMeta{
			Icon:  "bathtub",
			Label: "Example Controller Go",
			Style: c.style,
		},
		Markdown: markdownBytes.String(),
	})
	if err != nil {
		c.logger.Error("failed to emit whisper", "error", err)
		return err
	}
	c.logger.Info("Sent message", "markdown", markdownBytes.String())
	if i, err := strconv.Atoi(counter); err != nil {
		c.logger.Error("failed to read counter value as integer", "error", err, "counter", counter)
	} else {
		err = c.sidekick.Storage().StorageWrite("counter", strconv.Itoa(i+1))
		if err != nil {
			c.logger.Error("error writing counter default to storage", "error", err.Error())
		}
	}

	return nil
}
