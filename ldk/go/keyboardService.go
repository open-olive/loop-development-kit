package ldk

import (
	"context"
	"fmt"
	"strconv"
)

// KeyboardService is an interface that defines what methods plugins can expect from the host
type KeyboardService interface {
	ListenHotkey(context.Context, Hotkey, ListenHotkeyHandler) error
	ListenScancode(context.Context, ListenScancodeHandler) error
	ListenText(context.Context, ListenTextHandler) error
	ListenCharacter(context.Context, ListenCharacterHandler) error
}

type Hotkey struct {
	Key       rune
	Modifiers KeyModifier
}

func (h Hotkey) Match(v Hotkey) bool {
	if h.Key != v.Key {
		return false
	}
	// You can't do a direct bitmask as Alt means Altleft or AltRight.  So checking all combinations is the only safe way to actually compare
	configured, incoming := h.Modifiers, v.Modifiers

	return (configured.AltLeft() == incoming.AltLeft() || configured.Alt() == incoming.Alt()) && (configured.AltRight() == incoming.AltRight() || configured.Alt() == incoming.Alt()) &&
		(configured.ControlLeft() == incoming.ControlLeft() || configured.Control() == incoming.Control()) && (configured.ControlRight() == incoming.ControlRight() || configured.Control() == incoming.Control()) &&
		(configured.MetaLeft() == incoming.MetaLeft() || configured.Meta() == incoming.Meta()) && (configured.MetaRight() == incoming.MetaRight() || configured.Meta() == incoming.Meta()) &&
		(configured.ShiftLeft() == incoming.ShiftLeft() || configured.Shift() == incoming.Shift()) && (configured.ShiftRight() == incoming.ShiftRight() || configured.Shift() == incoming.Shift())
}

type KeyModifier int

func (k KeyModifier) AltLeft() bool {
	return int(k)&KeyModifierCommandAltLeft == KeyModifierCommandAltLeft
}
func (k KeyModifier) AltRight() bool {
	return int(k)&KeyModifierCommandAltRight == KeyModifierCommandAltRight
}
func (k KeyModifier) Alt() bool { return int(k)&KeyModifierCommandAlt == KeyModifierCommandAlt }
func (k KeyModifier) ControlLeft() bool {
	return int(k)&KeyModifierControlLeft == KeyModifierControlLeft
}
func (k KeyModifier) ControlRight() bool {
	return int(k)&KeyModifierControlRight == KeyModifierControlRight
}
func (k KeyModifier) Control() bool    { return int(k)&KeyModifierControl == KeyModifierControl }
func (k KeyModifier) MetaLeft() bool   { return int(k)&KeyModifierMetaLeft == KeyModifierMetaLeft }
func (k KeyModifier) MetaRight() bool  { return int(k)&KeyModifierMetaRight == KeyModifierMetaRight }
func (k KeyModifier) Meta() bool       { return int(k)&KeyModifierMeta == KeyModifierMeta }
func (k KeyModifier) ShiftLeft() bool  { return int(k)&KeyModifierShiftLeft == KeyModifierShiftLeft }
func (k KeyModifier) ShiftRight() bool { return int(k)&KeyModifierShiftRight == KeyModifierShiftRight }
func (k KeyModifier) Shift() bool      { return int(k)&KeyModifierShift == KeyModifierShift }

// generate this base formatted code from: https://play.golang.org/p/CukMdzwdU0P
const (
	// Alt on Windows, Command on Mac
	KeyModifierCommandAltLeft  = 1 << 0  //  00000000000000000000000000000001 -> 1
	KeyModifierCommandAltRight = 1 << 1  //  00000000000000000000000000000010 -> 2
	KeyModifierCommandAlt      = 1 << 2  //  00000000000000000000000000000100 -> 4
	KeyModifierControlLeft     = 1 << 3  //  00000000000000000000000000001000 -> 8
	KeyModifierControlRight    = 1 << 4  //  00000000000000000000000000010000 -> 16
	KeyModifierControl         = 1 << 5  //  00000000000000000000000000100000 -> 32
	KeyModifierMetaLeft        = 1 << 6  //  00000000000000000000000001000000 -> 64
	KeyModifierMetaRight       = 1 << 7  //  00000000000000000000000010000000 -> 128
	KeyModifierMeta            = 1 << 8  //  00000000000000000000000100000000 -> 256
	KeyModifierShiftLeft       = 1 << 9  //  00000000000000000000001000000000 -> 512
	KeyModifierShiftRight      = 1 << 10 //  00000000000000000000010000000000 -> 1024
	KeyModifierShift           = 1 << 11 //  00000000000000000000100000000000 -> 2048
)

type ScancodeEvent struct {
	Scancode int
	Pressed  bool
}

// ListenHotkeyHandler will return `true` if the hotkey/combination was pressed
type ListenHotkeyHandler func(scanned bool, err error)
type ListenScancodeHandler func(ScancodeEvent, error)
type ListenTextHandler func(string, error)
type ListenCharacterHandler func(rune, error)
