package ldk

// StorageService is an interface that defines what methods plugins can expect from the host
type StorageService interface {
	StorageDelete(string) error
	StorageDeleteAll() error
	StorageHasKey(string) (bool, error)
	StorageKeys() ([]string, error)
	StorageRead(string) (string, error)
	StorageReadAll() (map[string]string, error)
	StorageWrite(string, string) error
}
