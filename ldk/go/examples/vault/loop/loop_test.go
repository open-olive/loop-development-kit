package loop_test

import (
	"context"
	"github.com/google/go-cmp/cmp"
	loop "github.com/open-olive/loop-development-kit/ldk/go/examples/vault/loop"
	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
	ldktest "github.com/open-olive/loop-development-kit/ldk/go/v2/ldk-test"
	"reflect"
	"sync"
	"testing"
	"time"
)

func TestLoop(t *testing.T) {
	mockVaultMutex := sync.RWMutex{}
	mockVault := make(map[string]string)

	sidekick := &ldktest.Sidekick{
		VaultService: &ldktest.VaultService{
			Deletef: func(ctx context.Context, s string) error {
				mockVaultMutex.Lock()
				defer mockVaultMutex.Unlock()

				delete(mockVault, s)
				return nil
			},
			Existsf: func(ctx context.Context, s string) (bool, error) {
				mockVaultMutex.RLock()
				defer mockVaultMutex.RUnlock()

				_, exists := mockVault[s]
				return exists, nil
			},
			Readf: func(ctx context.Context, s string) (string, error) {
				mockVaultMutex.RLock()
				defer mockVaultMutex.RUnlock()

				value := mockVault[s]
				return value, nil
			},
			Writef: func(ctx context.Context, s string, s2 string) error {
				mockVaultMutex.Lock()
				defer mockVaultMutex.Unlock()

				mockVault[s] = s2
				return nil
			},
		},
	}

	l := ldk.NewLogger("loop-example")
	c, err := loop.NewLoop(l)
	if err != nil {
		t.Fatal(err)
	}
	if err := c.LoopStart(sidekick); err != nil {
		t.Fatal(err)
	}

	defer func() {
		if err := c.LoopStop(); err != nil {
			t.Fatal(err)
		}
	}()

	expectedMockVault := map[string]string{
		"testStatus":   "true",
		"myExampleKey": "bananas",
	}

	// wait for mockVault to match expected output
	timeout := time.NewTimer(time.Second)
	ticker := time.NewTicker(time.Millisecond * 50)
loop:
	for {
		select {
		case <-timeout.C:
			if got := mockVault; !cmp.Equal(mockVault, expectedMockVault) {
				t.Fatalf("timeout waiting for vault to match:\n%s", cmp.Diff(got, expectedMockVault))
			}
			break loop
		case <-ticker.C:
			if reflect.DeepEqual(mockVault, expectedMockVault) {
				break loop
			}
		}
	}
}
