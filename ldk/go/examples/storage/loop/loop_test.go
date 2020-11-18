package loop_test

import (
	"context"
	"github.com/google/go-cmp/cmp"
	ldk "github.com/open-olive/loop-development-kit/ldk/go"
	loop "github.com/open-olive/loop-development-kit/ldk/go/examples/storage/loop"
	ldktest "github.com/open-olive/loop-development-kit/ldk/go/ldk-test"
	"reflect"
	"sync"
	"testing"
	"time"
)

func TestLoop(t *testing.T) {
	mockStorageMutex := sync.RWMutex{}
	mockStorage := make(map[string]string)

	sidekick := &ldktest.Sidekick{
		StorageService: &ldktest.StorageService{
			Deletef: func(ctx context.Context, s string) error {
				mockStorageMutex.Lock()
				defer mockStorageMutex.Unlock()

				delete(mockStorage, s)
				return nil
			},
			Existsf: func(ctx context.Context, s string) (bool, error) {
				mockStorageMutex.RLock()
				defer mockStorageMutex.RUnlock()

				_, exists := mockStorage[s]
				return exists, nil
			},
			Readf: func(ctx context.Context, s string) (string, error) {
				mockStorageMutex.RLock()
				defer mockStorageMutex.RUnlock()

				value := mockStorage[s]
				return value, nil
			},
			Writef: func(ctx context.Context, s string, s2 string) error {
				mockStorageMutex.Lock()
				defer mockStorageMutex.Unlock()

				mockStorage[s] = s2
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

	expectedMockStorage := map[string]string{
		"testStatus":   "true",
		"myExampleKey": "bananas",
	}

	// wait for mockStorage to match expected output
	timeout := time.NewTimer(time.Second)
	ticker := time.NewTicker(time.Millisecond * 50)
loop:
	for {
		select {
		case <-timeout.C:
			if got := mockStorage; !cmp.Equal(mockStorage, expectedMockStorage) {
				t.Fatalf("timeout waiting for storage to match:\n%s", cmp.Diff(got, expectedMockStorage))
			}
			break loop
		case <-ticker.C:
			if reflect.DeepEqual(mockStorage, expectedMockStorage) {
				break loop
			}
		}
	}
}
