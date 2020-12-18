package ldk

import (
	"os"
	"path/filepath"

	"github.com/open-olive/go-plugin"
)

// ServeLoopPlugin serves a specific loop plugin.
func ServeLoopPlugin(logger *Logger, loop Loop) error {
	currentDirectory, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		return err
	}

	plugin.Serve(&plugin.ServeConfig{
		ConnectionConfig: plugin.ConnectionConfig{
			Network:       "unix",
			UnixSocketDir: currentDirectory,
		},
		Logger:          logger.Logger(),
		HandshakeConfig: Handshake,
		Plugins: map[string]plugin.Plugin{
			"loop": &LoopPlugin{
				Impl: loop,
			},
		},
		GRPCServer: plugin.DefaultGRPCServer,
	})

	return nil
}
