package ldk

type WhisperContentForm struct {
	Label string `json:"label"`

	Markdown string                             `json:"markdown"`
	Inputs   map[string]WhisperContentFormInput `json:"inputs"`

	CancelLabel string `json:"cancelLabel"`
	SubmitLabel string `json:"submitLabel"`
}

// Type returns the type of the whisper content
func (c *WhisperContentForm) Type() WhisperContentType {
	return WhisperContentTypeForm
}
