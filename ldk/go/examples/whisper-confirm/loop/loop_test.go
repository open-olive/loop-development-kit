package loop_test

import (
	"context"
	"errors"
	"fmt"
	"testing"
	"time"

	"github.com/google/go-cmp/cmp"
	loop "github.com/open-olive/loop-development-kit/ldk/go/examples/whisper-confirm/loop"
	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
	ldktest "github.com/open-olive/loop-development-kit/ldk/go/v2/ldk-test"
)

func TestWhisperConfirmResolved(t *testing.T) {
	type confirmRequest struct {
		ctx context.Context
		w   *ldk.WhisperContentConfirm
	}
	type confirmResponse struct {
		resolved bool
		err      error
	}
	confirmRequestChan := make(chan confirmRequest)
	confirmResponseChan := make(chan confirmResponse)
	markdownRequestChan := make(chan *ldk.WhisperContentMarkdown)
	markdownResponseChan := make(chan error)

	sidekick := &ldktest.Sidekick{
		WhisperService: &ldktest.WhisperService{
			Confirmf: func(ctx context.Context, w *ldk.WhisperContentConfirm) (bool, error) {
				confirmRequestChan <- confirmRequest{ctx, w}
				res := <-confirmResponseChan
				return res.resolved, res.err
			},
			Markdownf: func(ctx context.Context, w *ldk.WhisperContentMarkdown) error {
				markdownRequestChan <- w
				err := <-markdownResponseChan
				return err
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

	// stage 1: get confirm whisper
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case req := <-confirmRequestChan:
			exp := &ldk.WhisperContentConfirm{
				Label:        "Example Controller Go",
				Markdown:     "Do you like bananas?",
				RejectLabel:  "Nope",
				ResolveLabel: "Yep",
			}
			if got := req.w; !cmp.Equal(got, exp) {
				return fmt.Errorf("unexpected markdown:\n%s", cmp.Diff(got, exp))
			}
			return nil
		}
	}()); err != nil {
		t.Errorf("stage 1 failed\n%v", err)
		return
	}

	// stage 2: send resolve response
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case confirmResponseChan <- confirmResponse{
			resolved: true,
			err:      nil,
		}:
			return nil
		}
	}()); err != nil {
		t.Errorf("stage 2 failed\n%v", err)
		return
	}

	// stage 3: get positive markdown whisper
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case req := <-markdownRequestChan:
			exp := &ldk.WhisperContentMarkdown{
				Label:    "Example Controller Go",
				Markdown: "That's great!",
			}
			if got := req; !cmp.Equal(got, exp) {
				return fmt.Errorf("unexpected markdown:\n%s", cmp.Diff(got, exp))
			}
			return nil
		}
	}()); err != nil {
		t.Errorf("stage 3 failed\n%v", err)
		return
	}

	// stage 4: send markdown response
	if err := func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case markdownResponseChan <- nil:
			return nil
		}
	}(); err != nil {
		t.Errorf("stage 4 failed\n%v", err)
		return
	}
}

func TestWhisperConfirmRejected(t *testing.T) {
	type confirmRequest struct {
		ctx context.Context
		w   *ldk.WhisperContentConfirm
	}
	type confirmResponse struct {
		resolved bool
		err      error
	}
	confirmRequestChan := make(chan confirmRequest)
	confirmResponseChan := make(chan confirmResponse)
	markdownRequestChan := make(chan *ldk.WhisperContentMarkdown)
	markdownResponseChan := make(chan error)

	sidekick := &ldktest.Sidekick{
		WhisperService: &ldktest.WhisperService{
			Confirmf: func(ctx context.Context, w *ldk.WhisperContentConfirm) (bool, error) {
				t.Logf("Confirmf request received")
				confirmRequestChan <- confirmRequest{ctx, w}
				t.Logf("Confirmf request relayed")
				res := <-confirmResponseChan
				t.Logf("Confirmf response relayed")
				defer t.Logf("Confirmf response sent")
				return res.resolved, res.err
			},
			Markdownf: func(ctx context.Context, w *ldk.WhisperContentMarkdown) error {
				t.Logf("Markdownf request received")
				markdownRequestChan <- w
				t.Logf("Markdownf request relayed")
				err := <-markdownResponseChan
				t.Logf("Markdownf response relayed")
				defer t.Logf("Markdownf response sent")
				return err
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

	defer func() {
		// wait a moment to ensure no unexpected whispers arrive
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
		case confirm := <-confirmRequestChan:
			t.Fatal("unexpected whisper: %w", confirm)
		case markdown := <-markdownRequestChan:
			t.Fatal("unexpected whisper: %w", markdown)
		}
	}()

	// stage 1: get confirm whisper
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case req := <-confirmRequestChan:
			exp := &ldk.WhisperContentConfirm{
				Label:        "Example Controller Go",
				Markdown:     "Do you like bananas?",
				RejectLabel:  "Nope",
				ResolveLabel: "Yep",
			}
			if got := req.w; !cmp.Equal(got, exp) {
				return fmt.Errorf("unexpected markdown:\n%s", cmp.Diff(got, exp))
			}
			return nil
		}
	}()); err != nil {
		t.Errorf("stage 1 failed\n%v", err)
		return
	}

	// stage 2: send reject response
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case confirmResponseChan <- confirmResponse{
			resolved: false,
			err:      nil,
		}:
			return nil
		}
	}()); err != nil {
		t.Errorf("stage 2 failed\n%v", err)
		return
	}

	// stage 3: get negative markdown whisper
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case req := <-markdownRequestChan:
			exp := &ldk.WhisperContentMarkdown{
				Label:    "Example Controller Go",
				Markdown: "That's too bad.",
			}
			if got := req; !cmp.Equal(got, exp) {
				return fmt.Errorf("unexpected markdown:\n%s", cmp.Diff(got, exp))
			}
			return nil
		}
	}()); err != nil {
		t.Errorf("stage 3 failed\n%v", err)
		return
	}

	// stage 4: send markdown response
	if err := func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case markdownResponseChan <- nil:
			return nil
		}
	}(); err != nil {
		t.Errorf("stage 4 failed\n%v", err)
		return
	}
}
