package ldk

// SidekickServer is used by the controller plugin host to receive plugin initiated communication
type SidekickServer struct {
	// This is the real implementation
	Impl Sidekick

	Metadata             Metadata
}

// The Vault is used to store and retrieve sensitive data
func (m *SidekickServer) Vault() VaultService {
	return m.Impl.Vault()
}

// Whisper is used to send whispers to Sidekick
func (m *SidekickServer) Whisper() WhisperService {
	return m.Impl.Whisper()
}
