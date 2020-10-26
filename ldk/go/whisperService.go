package ldk

import "context"

// WhisperService is an interface that defines what methods plugins can expect from the host
type WhisperService interface {
	Confirm(context.Context, *WhisperContentConfirm) (bool, error)
	Form(context.Context, *WhisperContentForm) (bool, map[string]WhisperContentFormOutput, error)
	Markdown(context.Context, *WhisperContentMarkdown) error
}
