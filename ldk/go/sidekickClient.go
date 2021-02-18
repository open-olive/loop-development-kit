package ldk

// SidekickClient is used by Loops to interact with the host computer through Sidekick
type SidekickClient struct {
	clipboard  ClipboardService
	vault      VaultService
	whisper    WhisperService
	keyboard   KeyboardService
	process    ProcessService
	cursor     CursorService
	filesystem FilesystemService
	window     WindowService
	ui         UIService
	network    NetworkService
}

// Clipboard is used interact with the clipboard
func (m *SidekickClient) Clipboard() ClipboardService {
	return m.clipboard
}

// The Vault is used to store and retrieve sensitive data
func (m *SidekickClient) Vault() VaultService {
	return m.vault
}

// Whisper is used to send whispers to Sidekick
func (m *SidekickClient) Whisper() WhisperService {
	return m.whisper
}

// Keyboard is used to listen for keyboard events like keystrokes and hot-keys
func (m *SidekickClient) Keyboard() KeyboardService {
	return m.keyboard
}

// Process is used to list processes and listen for new user processes
func (m *SidekickClient) Process() ProcessService {
	return m.process
}

// Cursor is used to listen for the cursor position and related events
func (m *SidekickClient) Cursor() CursorService {
	return m.cursor
}

// Filesystem is used to interact with the host computer's filesystem
func (m *SidekickClient) Filesystem() FilesystemService {
	return m.filesystem
}

// UI is used to listen for user interface events occurring in Sidekick, like search bar entry
func (m *SidekickClient) UI() UIService {
	return m.ui
}

// Network is used to send/receive HTTP requests
func (m *SidekickClient) Network() NetworkService {
	return m.network
}

// Window is used to listen for the active window, and other window related events
func (m *SidekickClient) Window() WindowService {
	return m.window
}
