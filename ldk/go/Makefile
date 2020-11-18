GOPATH := $(shell go env GOPATH)

proto/ldk.pb.go:
	GO111MODULE=off go get -u github.com/golang/protobuf/protoc-gen-go
	protoc -I ../../proto/ ../../proto/*.proto --go_out=plugins=grpc:proto/

quality: proto/ldk.pb.go $(shell find . -name "*.go")
	@ echo "Running Go Vet"
	@ go vet ./...
	@ echo "Running Golint"
	@ cd ~ && go get -u "golang.org/x/lint/golint"
	@ go list ./... | grep -v ".*/bind" | xargs -L1 "$$GOPATH/bin/golint" -set_exit_status
	@ echo "Running StaticCheck"
	@ cd ~ && go get -u "honnef.co/go/tools/cmd/staticcheck"
	@ CGO_ENABLED=1 "$$GOPATH/bin/staticcheck" ./...
	@ echo "Running Gosec"
	@ cd ~ && go get -u "github.com/securego/gosec/cmd/gosec/..."
# excluding (G110: Potential DoS vulnerability via decompression bomb) because it doesn't apply to this type of application
	@ CGO_ENABLED=1 "$$GOPATH/bin/gosec" -exclude G110 ./...

proto:
	GO111MODULE=off go get -u github.com/golang/protobuf/protoc-gen-go
	protoc -I ../../proto/ ../../proto/*.proto -I $(GOPATH)/src --go_out=plugins=grpc:proto/
	rm proto/broker.pb.go
	rm proto/stdio.pb.go


test-examples:
	cd examples/clipboard && make test
	cd examples/filesystem-directory && make test
	cd examples/filesystem-file && make test
	cd examples/filesystem-listen-directory && make test
	cd examples/filesystem-listen-file && make test
	cd examples/keyboard && make test
	cd examples/keyboard-character && make test
	cd examples/keyboard-hotkey && make test
	cd examples/search-global && make test
	cd examples/search-searchbar && make test
	cd examples/whisper-confirm && make test
	cd examples/whisper-form && make test
	cd examples/whisper-list && make test
	cd examples/whisper-markdown && make test

test: test-examples
	go test -v ./...

test-race:
	go test -v -race ./...

bench:
	go test -v -bench=. ./...

golangci:
	go get github.com/golangci/golangci-lint/cmd/golangci-lint@v1.31.0
	go mod tidy
	golangci-lint run

.PHONY: proto test test-examples test-race bench golangci