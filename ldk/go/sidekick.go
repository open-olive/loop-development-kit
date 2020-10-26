package ldk

// Sidekick is an interface that defines what methods plugins can expect from the host
type Sidekick interface {
	Clipboard() ClipboardService
	Storage() StorageService
	Whisper() WhisperService
	Keyboard() KeyboardService
	Process() ProcessService
	Filesystem() FilesystemService
	Window() WindowService
}
