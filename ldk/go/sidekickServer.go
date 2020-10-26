package ldk

// SidekickServer is used by the controller plugin host to receive plugin initiated communication
type SidekickServer struct {
	// This is the real implementation
	Impl Sidekick

	Metadata             Metadata
	StorageDocumentation *StorageDocumentation
}

// Storage is used by controller plugins to send whispers to sidekick
func (m *SidekickServer) Storage() StorageService {
	return m.Impl.Storage()
}

// Whisper is used by controller plugins to send whispers to sidekick
func (m *SidekickServer) Whisper() WhisperService {
	return m.Impl.Whisper()
}
