package ldk

import "context"

// WhisperService is an interface that defines what methods plugins can expect from the host
type WhisperService interface {
	// This function only returns once the whisper is closed, or when the context provided is cancelled.
	Confirm(context.Context, *WhisperContentConfirm) (bool, error)
	// This function only returns once the whisper is closed, or when the context provided is cancelled.
	Form(context.Context, *WhisperContentForm) (bool, map[string]WhisperContentFormOutput, error)
	// This function only returns once the whisper is closed, or when the context provided is cancelled.
	Markdown(context.Context, *WhisperContentMarkdown) error
}
