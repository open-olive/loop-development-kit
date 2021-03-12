package ldk

import "context"

// KeyboardService is an interface that defines what methods plugins can expect from the host
type KeyboardService interface {
	ListenHotkey(context.Context, Hotkey, ListenHotkeyHandler) error
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
	return h.Modifiers.hasOneMatchingBitInEachMask(v.Modifiers, []KeyModifier{
		KeyModifierCommandAlt | KeyModifierCommandAltLeft | KeyModifierCommandAltRight,
		KeyModifierControl | KeyModifierControlLeft | KeyModifierControlRight,
		KeyModifierMeta | KeyModifierMetaLeft | KeyModifierMetaRight,
		KeyModifierShift | KeyModifierShiftLeft | KeyModifierShiftRight,
	})
}

func (k KeyModifier) hasOneMatchingBitInEachMask(v KeyModifier, masks []KeyModifier) bool {
	result := false
	for _, mask := range masks {
		match := k&v&mask != 0
		result = result || match
	}
	return result
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

// ListenHotkeyHandler will return `true` if the hotkey/combination was pressed
type ListenHotkeyHandler func(scanned bool, err error)
type ListenTextHandler func(string, error)
type ListenCharacterHandler func(rune, error)
