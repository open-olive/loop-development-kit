REPO := github.com/open-olive/loop-development-kit/ldk/go/examples/search-searchbar
PKG := examplego

GIT_COMMIT := $(shell git rev-list -1 HEAD)
GIT_BRANCH := $(if $(shell echo $$BRANCH_NAME),$(shell echo $$BRANCH_NAME),$(shell git rev-parse --abbrev-ref HEAD))
VERSION := $(if $(shell echo $$VERSION),$(shell echo $$VERSION),"0.0.0-localdev-unset")
GOPATH := $(shell go env GOPATH)

install:
# The following command is needed to allow go get to clone from private bitbucket repos
	@ git config --global url."git@bitbucket.org:".insteadOf "https://bitbucket.org/"
	go mod download
	go mod tidy

assets:
	@ echo "Compiling assets"
	@ go get github.com/go-bindata/go-bindata/...
	@ $(GOPATH)/bin/go-bindata -o bind/assets.go -pkg bind assets/...
	@ go mod tidy

build/darwin-amd64/plugin:
	go build \
	     -ldflags "-X ${REPO}/loop.GitBranch=${GIT_BRANCH} -X ${REPO}/loop.GitCommit=${GIT_COMMIT} -X ${REPO}/loop.Version=${VERSION}" \
	     -o build/darwin-amd64/plugin ./

build/windows-amd64/plugin:
	GOOS=windows go build  \
	     -ldflags "-X ${REPO}/loop.GitBranch=${GIT_BRANCH} -X ${REPO}/loop.GitCommit=${GIT_COMMIT} -X ${REPO}/loop.Version=${VERSION}" \
	     -o build/windows-amd64/plugin.exe ./

clean:
	rm -rf ./build

build: clean build/darwin-amd64/plugin build/windows-amd64/plugin

# TODO: remove before merging to master
deploy-local: build
	cp build/darwin-amd64/plugin ~/Library/Application\ Support/Olive\ Helps/loops/1/plugin

test:
	go test -v ./...

test-race:
	go test -v -race ./...

bench:
	go test -v -bench=. ./...

golangci: 
	go get github.com/golangci/golangci-lint/cmd/golangci-lint@v1.30.0
	go mod tidy
	golangci-lint run

.PHONY: install assets build clean lint test test-race bench golangci
