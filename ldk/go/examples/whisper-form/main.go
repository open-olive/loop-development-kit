package main

import (
	loop "github.com/open-olive/loop-development-kit/ldk/go/examples/whisper-form/loop"
)

func main() {
	if err := loop.Serve(); err != nil {
		panic(err)
	}
}
