package loop

import (
	"context"
	"html/template"
	"io/ioutil"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
	"github.com/open-olive/loop-development-kit/ldk/go/examples/filesystem-file/bind"
)

func Serve() error {
	l := ldk.NewLogger("example-filesystem-file")
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
		logger:          logger,
		whisperTemplate: whisperTemplate,
	}, nil
}

// LoopStart is called by the host when the plugin is started to provide access to the host process
func (c *Loop) LoopStart(sidekick ldk.Sidekick) error {
	c.logger.Info("Starting example controller loop")
	c.ctx, c.cancel = context.WithCancel(context.Background())

	c.sidekick = sidekick

	go func() {
		c.logger.Error("AAAAAAAAAAAAAAAAAAAAAAAA")
		file, err := sidekick.Filesystem().Open(c.ctx, "./go.mod")
		if err != nil {
			c.logger.Error("error reading file info", "error", err)
			return
		}
		defer file.Close()
		c.logger.Error("BBBBBBBBBBBBBBBBBBBBB")

		b, err := ioutil.ReadAll(file)
		if err != nil {
			c.logger.Error("error reading file", "error", err)
			return
		}
		c.logger.Error("CCCCCCCCCCCCCCCCCCCCCCCCC")

		logFile, err := sidekick.Filesystem().Create(c.ctx, "/Users/scottkipfer/olive/sidekick/read.txt")
		if err != nil {
			c.logger.Error("error creating file info", "error", err)
			return
		}
		defer logFile.Close()
		c.logger.Error("DDDDDDDDDDDDDDDDDDd")

		_, err = logFile.Write(b)
		if err != nil {
			c.logger.Error("error writing file info", "error", err)
			return
		}
		c.logger.Error("EEEEEEEEEEEEEEEEEEEEEEEEEEEE")

	}()

	return nil
}

// LoopStop is called by the host when the plugin is stopped
func (c *Loop) LoopStop() error {
	c.logger.Info("controller LoopStop called")
	c.cancel()

	return nil
}
