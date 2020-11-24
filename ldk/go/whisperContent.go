package ldk

// WhisperContentType defines the type of whisper content
type WhisperContentType string

const (
	// WhisperContentTypeConfirm is the content type used by a confirm whisper
	WhisperContentTypeConfirm WhisperContentType = "confirm"

	// WhisperContentTypeForm is the content type used by a form whisper
	WhisperContentTypeForm WhisperContentType = "form"

	// WhisperContentTypeMarkdown is the content type used by a markdown whisper
	WhisperContentTypeMarkdown WhisperContentType = "markdown"

	// WhisperContentTypeList is the content type used by a list whisper
	WhisperContentTypeList WhisperContentType = "list"
)

// WhisperContent is an interface for the different types of whisper content
type WhisperContent interface {
	Type() WhisperContentType
}
