package ldktest

import "context"

type VaultService struct {
	Deletef func(context.Context, string) error
	Existsf func(context.Context, string) (bool, error)
	Readf   func(context.Context, string) (string, error)
	Writef  func(context.Context, string, string) error
}

func (s *VaultService) Delete(ctx context.Context, str string) error {
	return s.Deletef(ctx, str)
}

func (s *VaultService) Exists(ctx context.Context, str string) (bool, error) {
	return s.Existsf(ctx, str)
}

func (s *VaultService) Read(ctx context.Context, str string) (string, error) {
	return s.Readf(ctx, str)
}

func (s *VaultService) Write(ctx context.Context, s1 string, s2 string) error {
	return s.Writef(ctx, s1, s2)
}
