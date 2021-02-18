package ldk

import "context"

// The VaultService provides Loop developers with a way to store and retrieve credentials and other small pieces of sensitive information.
type VaultService interface {
	Delete(context.Context, string) error
	Exists(context.Context, string) (bool, error)
	Read(context.Context, string) (string, error)
	Write(context.Context, string, string) error
}
