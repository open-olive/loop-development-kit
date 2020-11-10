package main

import (
	loop "github.com/open-olive/loop-development-kit/ldk/go/examples/search-searchbar/loop"
)

func main() {
	if err := loop.Serve(); err != nil {
		panic(err)
	}
}
