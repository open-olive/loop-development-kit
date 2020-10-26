package ldk

type WhisperContentMarkdown struct {
	Icon  string `json:"icon"`
	Label string `json:"label"`

	Markdown string `json:"markdown"`

	Style Style `json:"style"`
}

// Type returns the type of the whisper content
func (c *WhisperContentMarkdown) Type() WhisperContentType {
	return WhisperContentTypeMarkdown
}
