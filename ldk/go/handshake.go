package ldk

import (
	"github.com/hashicorp/go-plugin"
)

// Handshake is a collection of information used to
// initialize communication between plugin and host
var Handshake = plugin.HandshakeConfig{
	ProtocolVersion:  1,
	MagicCookieKey:   "BASIC_PLUGIN",
	MagicCookieValue: "hello",
}
