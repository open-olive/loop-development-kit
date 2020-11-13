package main

import "github.com/open-olive/loop-development-kit/ldk/go/examples/keyboard-hotkey/loop"

func main() {
	if err := loop.Serve(); err != nil {
		panic(err)
	}
}
