package ldk

import "context"

// StorageService is an interface that defines what methods plugins can expect from the host
type StorageService interface {
	Delete(context.Context, string) error
	Exists(context.Context, string) (bool, error)
	Read(context.Context, string) (string, error)
	Write(context.Context, string, string) error
}
