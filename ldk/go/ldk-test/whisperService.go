package ldktest

import (
	"context"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

type WhisperService struct {
	Confirmf  func(context.Context, *ldk.WhisperContentConfirm) (bool, error)
	Formf     func(context.Context, *ldk.WhisperContentForm) (bool, map[string]ldk.WhisperContentFormOutput, error)
	Listf     func(context.Context, *ldk.WhisperContentList) error
	Markdownf func(context.Context, *ldk.WhisperContentMarkdown) error
	Disambiguationf func(context.Context, *ldk.WhisperContentDisambiguation) (bool, error)
}

func (w *WhisperService) Confirm(ctx context.Context, content *ldk.WhisperContentConfirm) (bool, error) {
	return w.Confirmf(ctx, content)
}

func (w *WhisperService) Form(ctx context.Context, content *ldk.WhisperContentForm) (bool, map[string]ldk.WhisperContentFormOutput, error) {
	return w.Formf(ctx, content)
}

func (w *WhisperService) List(ctx context.Context, content *ldk.WhisperContentList) error {
	return w.Listf(ctx, content)
}

func (w *WhisperService) Markdown(ctx context.Context, content *ldk.WhisperContentMarkdown) error {
	return w.Markdownf(ctx, content)
}

func (w *WhisperService) Disambiguation(ctx context.Context, content *ldk.WhisperContentDisambiguation) (bool, error) {
	return w.Disambiguationf(ctx, content)
}
