package main

import "github.com/open-olive/sidekick-controller-examplego/loop"

func main() {
	if err := loop.Serve(); err != nil {
		panic(err)
	}
}
