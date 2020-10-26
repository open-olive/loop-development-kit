package ldk

type WhisperContentConfirm struct {
	Icon  string `json:"icon"`
	Label string `json:"label"`

	Markdown string `json:"markdown"`

	RejectLabel  string `json:"rejectLabel"`
	ResolveLabel string `json:"resolveLabel"`

	Style Style `json:"style"`
}

// Type returns the type of the whisper content
func (c *WhisperContentConfirm) Type() WhisperContentType {
	return WhisperContentTypeConfirm
}
