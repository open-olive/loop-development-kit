package main

import (
	loop "github.com/open-olive/loop-development-kit/ldk/go/examples/whisper-confirm/loop"
)

func main() {
	if err := loop.Serve(); err != nil {
		panic(err)
	}
}
