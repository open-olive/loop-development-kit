package ldktest

import (
	"context"

	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
)

type KeyboardService struct {
	ListenHotkeyf    func(context.Context, ldk.Hotkey, ldk.ListenHotkeyHandler) error
	ListenTextf      func(context.Context, ldk.ListenTextHandler) error
	ListenCharacterf func(context.Context, ldk.ListenCharacterHandler) error
}

func (k *KeyboardService) ListenHotkey(ctx context.Context, hotkey ldk.Hotkey, handler ldk.ListenHotkeyHandler) error {
	return k.ListenHotkeyf(ctx, hotkey, handler)
}

func (k *KeyboardService) ListenText(ctx context.Context, handler ldk.ListenTextHandler) error {
	return k.ListenTextf(ctx, handler)
}

func (k *KeyboardService) ListenCharacter(ctx context.Context, handler ldk.ListenCharacterHandler) error {
	return k.ListenCharacterf(ctx, handler)
}
