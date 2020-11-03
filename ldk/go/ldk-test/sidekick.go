package ldktest

import (
	"context"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

type Sidekick struct {
	ClipboardService  ldk.ClipboardService
	StorageService    ldk.StorageService
	WhisperService    ldk.WhisperService
	KeyboardService   ldk.KeyboardService
	CursorService     ldk.CursorService
	FilesystemService ldk.FilesystemService
	ProcessService    ldk.ProcessService
	UIService         ldk.UIService
}

func (s *Sidekick) Clipboard() ldk.ClipboardService   { return s.ClipboardService }
func (s *Sidekick) Storage() ldk.StorageService       { return s.StorageService }
func (s *Sidekick) Whisper() ldk.WhisperService       { return s.WhisperService }
func (s *Sidekick) Keyboard() ldk.KeyboardService     { return s.KeyboardService }
func (s *Sidekick) Cursor() ldk.CursorService         { return s.CursorService }
func (s *Sidekick) Filesystem() ldk.FilesystemService { return s.FilesystemService }
func (s *Sidekick) Process() ldk.ProcessService       { return s.ProcessService }
func (s *Sidekick) UI() ldk.UIService                 { return s.UIService }

type ClipboardService struct {
	Readf   func() (string, error)
	Listenf func(context.Context, ldk.ReadListenHandler) error
	Writef  func(string) error
}

func (c *ClipboardService) Read() (string, error) { return c.Readf() }
func (c *ClipboardService) Listen(ctx context.Context, cb ldk.ReadListenHandler) error {
	return c.Listenf(ctx, cb)
}
func (c *ClipboardService) Write(s string) error { return c.Writef(s) }

type CursorService struct {
	PositionF       func() (ldk.CursorPosition, error)
	ListenPositionF func(ctx context.Context, cb ldk.ListenPositionHandler) error
}

func (c *CursorService) Position() (ldk.CursorPosition, error) { return c.PositionF() }
func (c *CursorService) ListenPosition(ctx context.Context, handler ldk.ListenPositionHandler) error {
	return c.ListenPositionF(ctx, handler)
}

type StorageService struct {
	StorageDeletef    func(string) error
	StorageDeleteAllf func() error
	StorageHasKeyf    func(string) (bool, error)
	StorageKeysf      func() ([]string, error)
	StorageReadf      func(string) (string, error)
	StorageReadAllf   func() (map[string]string, error)
	StorageWritef     func(string, string) error
}

func (s *StorageService) StorageDelete(str string) error             { return s.StorageDeletef(str) }
func (s *StorageService) StorageDeleteAll() error                    { return s.StorageDeleteAllf() }
func (s *StorageService) StorageHasKey(str string) (bool, error)     { return s.StorageHasKeyf(str) }
func (s *StorageService) StorageKeys() ([]string, error)             { return s.StorageKeysf() }
func (s *StorageService) StorageRead(str string) (string, error)     { return s.StorageReadf(str) }
func (s *StorageService) StorageReadAll() (map[string]string, error) { return s.StorageReadAllf() }
func (s *StorageService) StorageWrite(s1 string, s2 string) error    { return s.StorageWritef(s1, s2) }

type WhisperService struct {
	Confirmf  func(context.Context, *ldk.WhisperContentConfirm) (bool, error)
	Formf     func(context.Context, *ldk.WhisperContentForm) (bool, map[string]ldk.WhisperContentFormOutput, error)
	Markdownf func(context.Context, *ldk.WhisperContentMarkdown) error
}

func (w *WhisperService) Confirm(ctx context.Context, content *ldk.WhisperContentConfirm) (bool, error) {
	return w.Confirmf(ctx, content)
}
func (w *WhisperService) Form(ctx context.Context, content *ldk.WhisperContentForm) (bool, map[string]ldk.WhisperContentFormOutput, error) {
	return w.Formf(ctx, content)
}
func (w *WhisperService) Markdown(ctx context.Context, content *ldk.WhisperContentMarkdown) error {
	return w.Markdownf(ctx, content)
}

type KeyboardService struct {
	ListenHotkeyf    func(context.Context, ldk.Hotkey, ldk.ListenHotkeyHandler) error
	ListenScancodef  func(context.Context, ldk.ListenScancodeHandler) error
	ListenTextf      func(context.Context, ldk.ListenTextHandler) error
	ListenCharacterf func(context.Context, ldk.ListenCharacterHandler) error
}

func (k *KeyboardService) ListenHotkey(ctx context.Context, hotkey ldk.Hotkey, handler ldk.ListenHotkeyHandler) error {
	return k.ListenHotkeyf(ctx, hotkey, handler)
}
func (k *KeyboardService) ListenScancode(ctx context.Context, handler ldk.ListenScancodeHandler) error {
	return k.ListenScancodef(ctx, handler)
}
func (k *KeyboardService) ListenText(ctx context.Context, handler ldk.ListenTextHandler) error {
	return k.ListenTextf(ctx, handler)
}
func (k *KeyboardService) ListenCharacter(ctx context.Context, handler ldk.ListenCharacterHandler) error {
	return k.ListenCharacterf(ctx, handler)
}

type FilesystemService struct {
	Dirf        func(string) ([]ldk.FileInfo, error)
	ListenDirf  func(context.Context, string, ldk.ListenDirHandler) error
	Filef       func(string) (ldk.FileInfo, error)
	ListenFilef func(context.Context, string, ldk.ListenFileHandler) error
}

func (f *FilesystemService) Dir(dir string) ([]ldk.FileInfo, error) { return f.Dirf(dir) }
func (f *FilesystemService) ListenDir(ctx context.Context, dir string, handler ldk.ListenDirHandler) error {
	return f.ListenDirf(ctx, dir, handler)
}
func (f *FilesystemService) File(name string) (ldk.FileInfo, error) { return f.Filef(name) }
func (f *FilesystemService) ListenFile(ctx context.Context, file string, handler ldk.ListenFileHandler) error {
	return f.ListenFilef(ctx, file, handler)
}

type UIService struct {
	ListenSearchbarf    func(context.Context, ldk.ListenSearchHandler) error
	ListenGlobalSearchf func(context.Context, ldk.ListenSearchHandler) error
}

func (u *UIService) ListenSearchbar(ctx context.Context, cb ldk.ListenSearchHandler) error {
	return u.ListenSearchbarf(ctx, cb)
}
func (u *UIService) ListenGlobalSearch(ctx context.Context, cb ldk.ListenSearchHandler) error {
	return u.ListenGlobalSearchf(ctx, cb)
}
