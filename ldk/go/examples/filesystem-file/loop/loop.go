package loop

import (
	"bytes"
	"context"
	"fmt"
	"html/template"
	"os"
	"time"

	"github.com/dustin/go-humanize"
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
	defer logger.Info("new loop created")

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

	fi, err := sidekick.Filesystem().File(c.ctx, "./go.mod")
	if err != nil {
		c.logger.Error("error reading file info", "error", err)
		return err
	}
	return c.emitExampleWhisper(fi)
}

// LoopStop is called by the host when the plugin is stopped
func (c *Loop) LoopStop() error {
	c.logger.Info("controller LoopStop called")
	c.cancel()

	return nil
}

func (c *Loop) emitExampleWhisper(f ldk.FileInfo) error {
	type template struct {
		Name    string
		Size    string
		Mode    string
		Updated string
		IsDir   string
	}

	var t template
	if f.IsDir {
		t = template{
			Name:    f.Name,
			Mode:    os.FileMode(f.Mode).String(),
			Updated: f.Updated.Format(time.Stamp),
			IsDir:   fmt.Sprintf("%t", f.IsDir),
		}
	} else {
		t = template{
			Name:    f.Name,
			Size:    humanize.Bytes(uint64(f.Size)),
			Mode:    os.FileMode(f.Mode).String(),
			Updated: f.Updated.Format(time.Stamp),
			IsDir:   fmt.Sprintf("%t", f.IsDir),
		}
	}

	var markdownBytes bytes.Buffer
	if err := c.whisperTemplate.Execute(&markdownBytes, t); err != nil {
		c.logger.Error("failed to create markdown", "error", err)
		return err
	}

	err := c.sidekick.Whisper().Markdown(c.ctx, &ldk.WhisperContentMarkdown{
		Icon:     "bathtub",
		Label:    "Example Controller Go",
		Markdown: markdownBytes.String(),
		Style:    c.style,
	})
	if err != nil {
		c.logger.Error("failed to emit whisper", "error", err)
		return err
	}
	c.logger.Info("Sent message", "markdown", markdownBytes.String())

	return nil
}
