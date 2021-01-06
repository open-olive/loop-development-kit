package ldk

import (
	"github.com/hashicorp/go-plugin"
)

// ServeLoopPlugin serves a specific loop plugin.
func ServeLoopPlugin(logger *Logger, loop Loop) {
	plugin.Serve(&plugin.ServeConfig{
		Logger:          logger.Logger(),
		HandshakeConfig: Handshake,
		Plugins: map[string]plugin.Plugin{
			"loop": &LoopPlugin{
				Impl: loop,
				logger: logger,
			},
		},
		GRPCServer: plugin.DefaultGRPCServer,
	})
}
