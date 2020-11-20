package ldk

type WhisperContentForm struct {
	Icon  string `json:"icon"` // Material Icon name https://material.io/resources/icons/
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
