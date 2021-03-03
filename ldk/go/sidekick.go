package ldk

// Sidekick is an interface that defines what methods plugins can expect from the host
type Sidekick interface {
	Clipboard() ClipboardService
	Vault() VaultService
	Whisper() WhisperService
	Keyboard() KeyboardService
	Process() ProcessService
	Cursor() CursorService
	Filesystem() FilesystemService
	Window() WindowService
	UI() UIService
	Network() NetworkService
}
