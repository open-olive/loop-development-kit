package ldk

// SidekickClient is used by the controller plugin to facilitate plugin initiated communication with the host
type SidekickClient struct {
	clipboard  ClipboardService
	storage    StorageService
	whisper    WhisperService
	keyboard   KeyboardService
	process    ProcessService
	cursor     CursorService
	filesystem FilesystemService
	ui         UIService
	network    NetworkService
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

// Process is used by controller plugins to send process events to sidekick
func (m *SidekickClient) Process() ProcessService {
	return m.process
}

// Cursor is used by te controller plugin to send cursor events to sidekick
func (m *SidekickClient) Cursor() CursorService {
	return m.cursor
}

// Filesystem is used by controller plugins to send keyboard events to sidekick
func (m *SidekickClient) Filesystem() FilesystemService {
	return m.filesystem
}

// UI is used by loops
func (m *SidekickClient) UI() UIService {
	return m.ui
}

// Network is used by loops to send/receive HTTP requests
func (m *SidekickClient) Network() NetworkService {
	return m.network
}
