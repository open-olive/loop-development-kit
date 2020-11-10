package ldktest

import "context"

type StorageService struct {
	StorageDeletef    func(context.Context, string) error
	StorageDeleteAllf func(context.Context) error
	StorageHasKeyf    func(context.Context, string) (bool, error)
	StorageKeysf      func(context.Context) ([]string, error)
	StorageReadf      func(context.Context, string) (string, error)
	StorageReadAllf   func(context.Context) (map[string]string, error)
	StorageWritef     func(context.Context, string, string) error
}

func (s *StorageService) StorageDelete(ctx context.Context, str string) error {
	return s.StorageDeletef(ctx, str)
}

func (s *StorageService) StorageDeleteAll(ctx context.Context) error {
	return s.StorageDeleteAllf(ctx)
}

func (s *StorageService) StorageHasKey(ctx context.Context, str string) (bool, error) {
	return s.StorageHasKeyf(ctx, str)
}

func (s *StorageService) StorageKeys(ctx context.Context) ([]string, error) {
	return s.StorageKeysf(ctx)
}

func (s *StorageService) StorageRead(ctx context.Context, str string) (string, error) {
	return s.StorageReadf(ctx, str)
}

func (s *StorageService) StorageReadAll(ctx context.Context) (map[string]string, error) {
	return s.StorageReadAllf(ctx)
}

func (s *StorageService) StorageWrite(ctx context.Context, s1 string, s2 string) error {
	return s.StorageWritef(ctx, s1, s2)
}
