package ldktest

import (
	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

type Sidekick struct {
	ClipboardService  ldk.ClipboardService
	CursorService     ldk.CursorService
	FilesystemService ldk.FilesystemService
	KeyboardService   ldk.KeyboardService
	NetworkService    ldk.NetworkService
	ProcessService    ldk.ProcessService
	VaultService      ldk.VaultService
	UIService         ldk.UIService
	WhisperService    ldk.WhisperService
	WindowService     ldk.WindowService
}

func (s *Sidekick) Clipboard() ldk.ClipboardService   { return s.ClipboardService }
func (s *Sidekick) Cursor() ldk.CursorService         { return s.CursorService }
func (s *Sidekick) Filesystem() ldk.FilesystemService { return s.FilesystemService }
func (s *Sidekick) Keyboard() ldk.KeyboardService     { return s.KeyboardService }
func (s *Sidekick) Network() ldk.NetworkService       { return s.NetworkService }
func (s *Sidekick) Process() ldk.ProcessService       { return s.ProcessService }
func (s *Sidekick) Vault() ldk.VaultService           { return s.VaultService }
func (s *Sidekick) UI() ldk.UIService                 { return s.UIService }
func (s *Sidekick) Whisper() ldk.WhisperService       { return s.WhisperService }
func (s *Sidekick) Window() ldk.WindowService         { return s.WindowService }
