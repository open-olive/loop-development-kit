package ldk

import "context"

// StorageService is an interface that defines what methods plugins can expect from the host
type StorageService interface {
	StorageDelete(context.Context, string) error
	StorageDeleteAll(context.Context) error
	StorageHasKey(context.Context, string) (bool, error)
	StorageKeys(context.Context) ([]string, error)
	StorageRead(context.Context, string) (string, error)
	StorageReadAll(context.Context) (map[string]string, error)
	StorageWrite(context.Context, string, string) error
}
