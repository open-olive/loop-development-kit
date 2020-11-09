package ldk

import (
	"errors"
	"fmt"
	"unicode/utf8"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// KeyboardServer is used by the controller plugin host to receive plugin initiated communication
// This runs on Sidekick
type KeyboardServer struct {
	Authority Authority
	Impl      KeyboardService
}

// KeyboardHotkeyStream registers a hotkey and receive streamed messages when it is pressed
func (k *KeyboardServer) KeyboardHotkeyStream(req *proto.KeyboardHotkeyStreamRequest, stream proto.Keyboard_KeyboardHotkeyStreamServer) error {
	session := NewSessionFromProto(req.Session)
	if err := k.Authority.ValidateSession(session); err != nil {
		return err
	}

	handler := func(scanned bool, err error) {
		var errText string
		if err != nil {
			errText = err.Error()
		}

		if err := stream.Send(&proto.KeyboardHotkeyStreamResponse{
			Scanned: scanned,
			Error:   errText,
		}); err != nil {
			// TODO: Fix this when we refactor to sidekick
			fmt.Println("error => ", err.Error())
		}
	}

	key := req.GetHotkey().GetKey()
	if utf8.RuneCount([]byte(key)) != 1 {
		return errors.New("Only one character is allowed when specifing a key.  Key length was greater than 1")
	}
	r, _ := utf8.DecodeRune([]byte(key))
	hotkey := Hotkey{
		r,
		KeyModifier(req.GetHotkey().GetModifiers()),
	}
	go func() {
		err := k.Impl.ListenHotkey(stream.Context(), hotkey, handler)
		// TODO: move this to a real logger once we move this into sidekick
		if err != nil {
			fmt.Println("error => ", err.Error())
		}
	}()
	<-stream.Context().Done()
	return nil
}

// KeyboardScancodeStream streams each scancode as it is pressed
func (k *KeyboardServer) KeyboardScancodeStream(req *proto.KeyboardScancodeStreamRequest, stream proto.Keyboard_KeyboardScancodeStreamServer) error {
	session := NewSessionFromProto(req.Session)
	if err := k.Authority.ValidateSession(session); err != nil {
		return err
	}

	handler := func(event ScancodeEvent, err error) {
		var errText string
		if err != nil {
			errText = err.Error()
		}

		if err := stream.Send(&proto.KeyboardScancodeStreamResponse{
			Scancode: int32(event.Scancode),
			Pressed:  event.Pressed,
			Error:    errText,
		}); err != nil {
			// TODO: Fix this when we refactor to sidekick
			fmt.Println("error => ", err.Error())
		}
	}

	return k.Impl.ListenScancode(stream.Context(), handler)
}

// KeyboardTextStream streams chunks of text when the user finishes typing them
func (k *KeyboardServer) KeyboardTextStream(req *proto.KeyboardTextStreamRequest, stream proto.Keyboard_KeyboardTextStreamServer) error {
	session := NewSessionFromProto(req.Session)
	if err := k.Authority.ValidateSession(session); err != nil {
		return err
	}

	handler := func(s string, err error) {
		var errText string
		if err != nil {
			errText = err.Error()
		}

		if err := stream.Send(&proto.KeyboardTextStreamResponse{
			Text:  s,
			Error: errText,
		}); err != nil {
			// TODO: Fix this when we refactor to sidekick
			fmt.Println("ldk.KeyboardServer.KeyboardTextStream: error => ", err.Error())
		}
	}

	go func() {
		err := k.Impl.ListenText(stream.Context(), handler)
		// TODO: Fix this when we refactor to sidekick
		if err != nil {
			fmt.Println("ldk.KeyboardServer.KeyboardTextStream -> ListenText: error => ", err.Error())
		}
	}()
	<-stream.Context().Done()
	return nil
}

// KeyboardCharacterStream streams characters as the are typed
func (k *KeyboardServer) KeyboardCharacterStream(req *proto.KeyboardCharacterStreamRequest, stream proto.Keyboard_KeyboardCharacterStreamServer) error {
	session := NewSessionFromProto(req.Session)
	if err := k.Authority.ValidateSession(session); err != nil {
		return err
	}

	handler := func(r rune, err error) {
		var errText string
		if err != nil {
			errText = err.Error()
		}

		if err := stream.Send(&proto.KeyboardCharacterStreamResponse{
			Text:  string(r),
			Error: errText,
		}); err != nil {
			// TODO: Fix this when we refactor to sidekick
			fmt.Println("error => ", err.Error())
		}

	}
	go func() {
		err := k.Impl.ListenCharacter(stream.Context(), handler)
		// TODO: Fix this when we refactor to sidekick
		if err != nil {
			fmt.Println("ldk.KeyboardServer.KeyboardCharacterStream -> ListenText: error => ", err.Error())
		}
	}()
	<-stream.Context().Done()
	return nil
}
