package ldk_test

import (
	"fmt"
	"reflect"
	"runtime"
	"testing"

	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
)

func TestKeyModifiers(t *testing.T) {
	type keyFunc func(ldk.KeyModifier) bool
	funcs := []keyFunc{
		ldk.KeyModifier.AltLeft,
		ldk.KeyModifier.AltRight,
		ldk.KeyModifier.Alt,
		ldk.KeyModifier.ControlLeft,
		ldk.KeyModifier.ControlRight,
		ldk.KeyModifier.Control,
		ldk.KeyModifier.MetaLeft,
		ldk.KeyModifier.MetaRight,
		ldk.KeyModifier.Meta,
		ldk.KeyModifier.ShiftLeft,
		ldk.KeyModifier.ShiftRight,
		ldk.KeyModifier.Shift,
	}
	tests := []struct {
		name string
		bit  int
	}{
		{name: "alt left", bit: 1 << 0},
		{name: "alt right", bit: 1 << 1},
		{name: "alt", bit: 1 << 2},
		{name: "control left", bit: 1 << 3},
		{name: "control right", bit: 1 << 4},
		{name: "control", bit: 1 << 5},
		{name: "meta left", bit: 1 << 6},
		{name: "meta right", bit: 1 << 7},
		{name: "meta", bit: 1 << 8},
		{name: "shift left", bit: 1 << 9},
		{name: "shift right", bit: 1 << 10},
		{name: "shift", bit: 1 << 11},
	}

	for _, test := range tests {
		test := test // grab new lexical scope
		t.Run(test.name, func(t *testing.T) {
			for i := 0; i <= 11; i++ {
				bit := 1 << i
				for j, fn := range funcs {
					fnName := runtime.FuncForPC(reflect.ValueOf(fn).Pointer()).Name()
					if i == j {
						// t.Logf("testing %d -> %s", bit, fnName)
						if !fn(ldk.KeyModifier(bit)) {
							t.Errorf("%s not detected for %d", test.name, bit)
						}
					} else {
						if fn(ldk.KeyModifier(bit)) {
							t.Errorf("%s should not be detected for %d (%s)", test.name, bit, fnName)
						}
					}
				}
			}
		})
	}
}

func TestHotKeyMatch(t *testing.T) {
	tests := []struct {
		actual    ldk.Hotkey
		requested ldk.Hotkey
		expected  bool
		name      string
	}{
		{
			name:      "alt vs alt+shift",
			actual:    ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAlt | ldk.KeyModifierCommandAltLeft},
			requested: ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAlt | ldk.KeyModifierShift},
			expected:  false,
		},
		{
			name:      "do not permit if missing",
			actual:    ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAlt | ldk.KeyModifierCommandAltLeft},
			requested: ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAlt | ldk.KeyModifierShift},
			expected:  false,
		},
		{
			name:      "do not permit if superset is pressed",
			actual:    ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAlt | ldk.KeyModifierCommandAltLeft | ldk.KeyModifierShift | ldk.KeyModifierShiftLeft},
			requested: ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAlt},
			expected:  false,
		},
		{
			name:      "altright vs altleft",
			actual:    ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAlt | ldk.KeyModifierCommandAltLeft},
			requested: ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAltRight},
			expected:  false,
		},
		{
			name:      "altleft vs alteither",
			actual:    ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAlt | ldk.KeyModifierCommandAltLeft},
			requested: ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAlt},
			expected:  true,
		},
		{
			name:      "altleft vs altright",
			actual:    ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAlt | ldk.KeyModifierCommandAltRight},
			requested: ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAltLeft},
			expected:  false,
		},
		{
			name:      "alt vs left alt",
			actual:    ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAltLeft | ldk.KeyModifierCommandAlt},
			requested: ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAltLeft},
			expected:  true,
		},
		{
			actual:    ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAltRight | ldk.KeyModifierCommandAlt},
			requested: ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAltLeft},
			expected:  false,
		},
		{
			actual:    ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierCommandAlt},
			requested: ldk.Hotkey{Key: 'b', Modifiers: ldk.KeyModifierCommandAlt},
			expected:  false,
		},
	}
	for idx, test := range tests {
		test := test
		t.Run(fmt.Sprintf("%v %v", test.name, idx), func(t *testing.T) {
			if test.requested.Match(test.actual) != test.expected {
				t.Errorf("Received Error on Keycombination actual %#v vs. requested %#v, it should have returned %#v", test.actual, test.requested, test.expected)
			}
		})
	}
}
