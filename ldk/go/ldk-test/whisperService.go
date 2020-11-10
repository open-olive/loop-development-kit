package ldktest

import (
	"context"
	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

type WhisperService struct {
	Confirmf  func(context.Context, *ldk.WhisperContentConfirm) (bool, error)
	Formf     func(context.Context, *ldk.WhisperContentForm) (bool, map[string]ldk.WhisperContentFormOutput, error)
	Markdownf func(context.Context, *ldk.WhisperContentMarkdown) error
}

func (w *WhisperService) Confirm(ctx context.Context, content *ldk.WhisperContentConfirm) (bool, error) {
	return w.Confirmf(ctx, content)
}

func (w *WhisperService) Form(ctx context.Context, content *ldk.WhisperContentForm) (bool, map[string]ldk.WhisperContentFormOutput, error) {
	return w.Formf(ctx, content)
}

func (w *WhisperService) Markdown(ctx context.Context, content *ldk.WhisperContentMarkdown) error {
	return w.Markdownf(ctx, content)
}
