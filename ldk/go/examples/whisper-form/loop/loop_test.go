package loop_test

import (
	"context"
	"errors"
	"fmt"
	"testing"
	"time"

	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	loop "github.com/open-olive/loop-development-kit/ldk/go/examples/whisper-form/loop"
	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
	ldktest "github.com/open-olive/loop-development-kit/ldk/go/v2/ldk-test"
)

func TestWhisperFormResolved(t *testing.T) {
	type formRequest struct {
		ctx context.Context
		w   *ldk.WhisperContentForm
	}
	type formResponse struct {
		submitted bool
		outputs   map[string]ldk.WhisperContentFormOutput
		err       error
	}
	formRequestChan := make(chan formRequest)
	formResponseChan := make(chan formResponse)
	markdownRequestChan := make(chan *ldk.WhisperContentMarkdown)
	markdownResponseChan := make(chan error)

	sidekick := &ldktest.Sidekick{
		WhisperService: &ldktest.WhisperService{
			Formf: func(ctx context.Context, w *ldk.WhisperContentForm) (bool, map[string]ldk.WhisperContentFormOutput, error) {
				formRequestChan <- formRequest{ctx, w}
				res := <-formResponseChan
				return res.submitted, res.outputs, res.err
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

	// stage 1: get form whisper
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case req := <-formRequestChan:
			exp := &ldk.WhisperContentForm{
				Label:       "Example Controller Go",
				Markdown:    "Tell us about yourself",
				CancelLabel: "Cancel",
				SubmitLabel: "Submit",
				Inputs: map[string]ldk.WhisperContentFormInput{
					"name": &ldk.WhisperContentFormInputText{
						Label:   "Full Name",
						Tooltip: "Your full name.",
						Order:   1,
					},
					"email": &ldk.WhisperContentFormInputText{
						Label:   "Email Address",
						Tooltip: "Your email address.",
						Order:   2,
					},
					"radio": &ldk.WhisperContentFormInputRadio{
						Label:   "Are you older than 60",
						Tooltip: "Age verification",
						Options: []string{"Yes", "No"},
						Value:   "No",
						Order:   3,
					},
					"select": &ldk.WhisperContentFormInputSelect{
						Label:   "Country of residence",
						Tooltip: "Your Country",
						Options: []string{"United States", "Russia", "Romania", "Canada"},
						Value:   "Romania",
						Order:   4,
					},
				},
			}
			if got := req.w; !cmp.Equal(got, exp,
				cmpopts.IgnoreFields(ldk.WhisperContentFormInputText{}, "OnChange"), // function will never match, needs to be ignored
			) {
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
		case formResponseChan <- formResponse{
			submitted: true,
			outputs: map[string]ldk.WhisperContentFormOutput{
				"name": &ldk.WhisperContentFormOutputText{
					Value: "Testy McTesterson",
				},
			},
			err: nil,
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
				Markdown: "Hello Testy McTesterson",
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

func TestWhisperFormRejected(t *testing.T) {
	type formRequest struct {
		ctx context.Context
		w   *ldk.WhisperContentForm
	}
	type formResponse struct {
		submitted bool
		outputs   map[string]ldk.WhisperContentFormOutput
		err       error
	}
	formRequestChan := make(chan formRequest)
	formResponseChan := make(chan formResponse)
	markdownRequestChan := make(chan *ldk.WhisperContentMarkdown)
	markdownResponseChan := make(chan error)

	sidekick := &ldktest.Sidekick{
		WhisperService: &ldktest.WhisperService{
			Formf: func(ctx context.Context, w *ldk.WhisperContentForm) (bool, map[string]ldk.WhisperContentFormOutput, error) {
				t.Logf("Formf request received")
				formRequestChan <- formRequest{ctx, w}
				t.Logf("Formf request relayed")
				res := <-formResponseChan
				t.Logf("Formf response relayed")
				defer t.Logf("Formf response sent")
				return res.submitted, res.outputs, res.err
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
		case form := <-formRequestChan:
			t.Fatal("unexpected whisper: %w", form)
		case markdown := <-markdownRequestChan:
			t.Fatal("unexpected whisper: %w", markdown)
		}
	}()

	// stage 1: get form whisper
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case req := <-formRequestChan:
			exp := &ldk.WhisperContentForm{
				Label:       "Example Controller Go",
				Markdown:    "Tell us about yourself",
				CancelLabel: "Cancel",
				SubmitLabel: "Submit",
				Inputs: map[string]ldk.WhisperContentFormInput{
					"name": &ldk.WhisperContentFormInputText{
						Label:   "Full Name",
						Tooltip: "Your full name.",
						Order:   1,
					},
					"email": &ldk.WhisperContentFormInputText{
						Label:   "Email Address",
						Tooltip: "Your email address.",
						Order:   2,
					},
					"radio": &ldk.WhisperContentFormInputRadio{
						Label:   "Are you older than 60",
						Tooltip: "Age verification",
						Options: []string{"Yes", "No"},
						Value:   "No",
						Order:   3,
					},
					"select": &ldk.WhisperContentFormInputSelect{
						Label:   "Country of residence",
						Tooltip: "Your Country",
						Options: []string{"United States", "Russia", "Romania", "Canada"},
						Value:   "Romania",
						Order:   4,
					},
				},
			}
			if got := req.w; !cmp.Equal(got, exp,
				cmpopts.IgnoreFields(ldk.WhisperContentFormInputText{}, "OnChange"), // function will never match, needs to be ignored
			) {
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
		case formResponseChan <- formResponse{
			submitted: false,
			outputs: map[string]ldk.WhisperContentFormOutput{
				"name": &ldk.WhisperContentFormOutputText{},
			},
			err: nil,
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
				Markdown: "It's rude to not tell us your name.",
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

func TestWhisperFormUpdateValid(t *testing.T) {
	type formRequest struct {
		ctx context.Context
		w   *ldk.WhisperContentForm
	}
	type formUpdate struct {
		outputs map[string]ldk.WhisperContentFormOutput
		err     error
	}
	formRequestChan := make(chan formRequest)
	formUpdateChan := make(chan formUpdate)
	markdownRequestChan := make(chan *ldk.WhisperContentMarkdown)
	markdownResponseChan := make(chan error)

	sidekick := &ldktest.Sidekick{
		WhisperService: &ldktest.WhisperService{
			Formf: func(ctx context.Context, w *ldk.WhisperContentForm) (bool, map[string]ldk.WhisperContentFormOutput, error) {
				t.Logf("Formf request received")
				formRequestChan <- formRequest{ctx, w}
				t.Logf("Formf request relayed")

				update := <-formUpdateChan

				t.Logf("Formf update received")
				for key, rawOutput := range update.outputs {
					output := rawOutput.(*ldk.WhisperContentFormOutputText)
					w.Inputs[key].(*ldk.WhisperContentFormInputText).OnChange(output.Value)
					t.Logf("Formf update onChange called")
				}

				defer t.Logf("Formf response sent")
				return false, nil, nil
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
		case form := <-formRequestChan:
			t.Fatal("unexpected whisper: %w", form)
		case markdown := <-markdownRequestChan:
			t.Fatal("unexpected whisper: %w", markdown)
		}
	}()

	// stage 1: get form whisper
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case req := <-formRequestChan:
			exp := &ldk.WhisperContentForm{
				Label:       "Example Controller Go",
				Markdown:    "Tell us about yourself",
				CancelLabel: "Cancel",
				SubmitLabel: "Submit",
				Inputs: map[string]ldk.WhisperContentFormInput{
					"name": &ldk.WhisperContentFormInputText{
						Label:   "Full Name",
						Tooltip: "Your full name.",
						Order:   1,
					},
					"email": &ldk.WhisperContentFormInputText{
						Label:   "Email Address",
						Tooltip: "Your email address.",
						Order:   2,
					},
					"radio": &ldk.WhisperContentFormInputRadio{
						Label:   "Are you older than 60",
						Tooltip: "Age verification",
						Options: []string{"Yes", "No"},
						Value:   "No",
						Order:   3,
					},
					"select": &ldk.WhisperContentFormInputSelect{
						Label:   "Country of residence",
						Tooltip: "Your Country",
						Options: []string{"United States", "Russia", "Romania", "Canada"},
						Value:   "Romania",
						Order:   4,
					},
				},
			}
			if got := req.w; !cmp.Equal(got, exp,
				cmpopts.IgnoreFields(ldk.WhisperContentFormInputText{}, "OnChange"), // function will never match, needs to be ignored
			) {
				return fmt.Errorf("unexpected markdown:\n%s", cmp.Diff(got, exp))
			}
			return nil
		}
	}()); err != nil {
		t.Errorf("stage 1 failed\n%v", err)
		return
	}

	// stage 2: send valid email value update
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case formUpdateChan <- formUpdate{
			outputs: map[string]ldk.WhisperContentFormOutput{
				"email": &ldk.WhisperContentFormOutputText{
					Value: "example@example.com",
				},
			},
			err: nil,
		}:
			return nil
		}
	}()); err != nil {
		t.Errorf("stage 2 failed\n%v", err)
		return
	}

	// stage 3: get valid email whisper
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case req := <-markdownRequestChan:
			exp := &ldk.WhisperContentMarkdown{
				Label:    "Example Controller Go",
				Markdown: "Valid Email Address: example@example.com",
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
}

func TestWhisperFormUpdateInvalid(t *testing.T) {
	type formRequest struct {
		ctx context.Context
		w   *ldk.WhisperContentForm
	}
	type formUpdate struct {
		outputs map[string]ldk.WhisperContentFormOutput
		err     error
	}
	formRequestChan := make(chan formRequest)
	formUpdateChan := make(chan formUpdate)
	markdownRequestChan := make(chan *ldk.WhisperContentMarkdown)
	markdownResponseChan := make(chan error)

	sidekick := &ldktest.Sidekick{
		WhisperService: &ldktest.WhisperService{
			Formf: func(ctx context.Context, w *ldk.WhisperContentForm) (bool, map[string]ldk.WhisperContentFormOutput, error) {
				t.Logf("Formf request received")
				formRequestChan <- formRequest{ctx, w}
				t.Logf("Formf request relayed")

				update := <-formUpdateChan

				t.Logf("Formf update received")
				for key, rawOutput := range update.outputs {
					output := rawOutput.(*ldk.WhisperContentFormOutputText)
					w.Inputs[key].(*ldk.WhisperContentFormInputText).OnChange(output.Value)
					t.Logf("Formf update onChange called")
				}

				defer t.Logf("Formf response sent")
				return false, nil, nil
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
		case form := <-formRequestChan:
			t.Fatal("unexpected whisper: %w", form)
		case markdown := <-markdownRequestChan:
			t.Fatal("unexpected whisper: %w", markdown)
		}
	}()

	// stage 1: get form whisper
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case req := <-formRequestChan:
			exp := &ldk.WhisperContentForm{
				Label:       "Example Controller Go",
				Markdown:    "Tell us about yourself",
				CancelLabel: "Cancel",
				SubmitLabel: "Submit",
				Inputs: map[string]ldk.WhisperContentFormInput{
					"name": &ldk.WhisperContentFormInputText{
						Label:   "Full Name",
						Tooltip: "Your full name.",
						Order:   1,
					},
					"email": &ldk.WhisperContentFormInputText{
						Label:   "Email Address",
						Tooltip: "Your email address.",
						Order:   2,
					},
					"radio": &ldk.WhisperContentFormInputRadio{
						Label:   "Are you older than 60",
						Tooltip: "Age verification",
						Options: []string{"Yes", "No"},
						Value:   "No",
						Order:   3,
					},
					"select": &ldk.WhisperContentFormInputSelect{
						Label:   "Country of residence",
						Tooltip: "Your Country",
						Options: []string{"United States", "Russia", "Romania", "Canada"},
						Value:   "Romania",
						Order:   4,
					},
				},
			}
			if got := req.w; !cmp.Equal(got, exp,
				cmpopts.IgnoreFields(ldk.WhisperContentFormInputText{}, "OnChange"), // function will never match, needs to be ignored
			) {
				return fmt.Errorf("unexpected markdown:\n%s", cmp.Diff(got, exp))
			}
			return nil
		}
	}()); err != nil {
		t.Errorf("stage 1 failed\n%v", err)
		return
	}

	// stage 2: send invalid email value update
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case formUpdateChan <- formUpdate{
			outputs: map[string]ldk.WhisperContentFormOutput{
				"email": &ldk.WhisperContentFormOutputText{
					Value: "INVALID!!!!",
				},
			},
			err: nil,
		}:
			return nil
		}
	}()); err != nil {
		t.Errorf("stage 2 failed\n%v", err)
		return
	}

	// stage 3: get invalid email whisper
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case req := <-markdownRequestChan:
			exp := &ldk.WhisperContentMarkdown{
				Label:    "Example Controller Go",
				Markdown: "Invalid Email Address: INVALID!!!!",
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
}
