package main

import (
	loop "github.com/open-olive/loop-development-kit-go/example/whisper-markdown/loop"
)

func main() {
	if err := loop.Serve(); err != nil {
		panic(err)
	}
}
