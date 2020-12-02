package ldk

type WhisperContentMarkdown struct {
	Label string `json:"label"`

	Markdown string `json:"markdown"`
}

// Type returns the type of the whisper content
func (c *WhisperContentMarkdown) Type() WhisperContentType {
	return WhisperContentTypeMarkdown
}
