package main

import "github.com/open-olive/loop-development-kit/ldk/go/examples/filesystem-listen-directory/loop"

func main() {
	if err := loop.Serve(); err != nil {
		panic(err)
	}
}
