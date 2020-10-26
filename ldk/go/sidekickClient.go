package ldk

// SidekickClient is used by the controller plugin to facilitate plugin initiated communication with the host
type SidekickClient struct {
	clipboard  ClipboardService
	storage    StorageService
	whisper    WhisperService
	keyboard   KeyboardService
	process    ProcessService
	filesystem FilesystemService
	window     WindowService
}

// Clipboard is used by controller plugins to send whispers to sidekick
func (m *SidekickClient) Clipboard() ClipboardService {
	return m.clipboard
}

// Storage is used by controller plugins to send whispers to sidekick
func (m *SidekickClient) Storage() StorageService {
	return m.storage
}

// Whisper is used by controller plugins to send whispers to sidekick
func (m *SidekickClient) Whisper() WhisperService {
	return m.whisper
}

// Keyboard is used by controller plugins to send keyboard events to sidekick
func (m *SidekickClient) Keyboard() KeyboardService {
	return m.keyboard
}

// Filesystem is used by controller plugins to send process events to sidekick
func (m *SidekickClient) Process() ProcessService {
	return m.process
}

// Filesystem is used by controller plugins to send keyboard events to sidekick
func (m *SidekickClient) Filesystem() FilesystemService {
	return m.filesystem
}

func (m *SidekickClient) Window() WindowService {
	return m.window
}
