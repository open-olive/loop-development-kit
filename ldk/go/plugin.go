package ldk

import (
	"os"

	"github.com/open-olive/go-plugin"
)

// ServeLoopPlugin serves a specific loop plugin.
func ServeLoopPlugin(logger *Logger, loop Loop) error {
	plugin.Serve(&plugin.ServeConfig{
		ConnectionConfig: plugin.ConnectionConfig{
			Network: os.Getenv("OH_NETWORK"),
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
