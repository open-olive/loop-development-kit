package ldk

type WhisperContentFormType string

const (
	WhisperContentFormTypeCheckbox WhisperContentFormType = "checkbox"
	WhisperContentFormTypeEmail    WhisperContentFormType = "email"
	WhisperContentFormTypeMarkdown WhisperContentFormType = "markdown"
	WhisperContentFormTypeNumber   WhisperContentFormType = "number"
	WhisperContentFormTypePassword WhisperContentFormType = "password"
	WhisperContentFormTypeRadio    WhisperContentFormType = "radio"
	WhisperContentFormTypeSelect   WhisperContentFormType = "select"
	WhisperContentFormTypeTel      WhisperContentFormType = "tel"
	WhisperContentFormTypeText     WhisperContentFormType = "text"
	WhisperContentFormTypeTime     WhisperContentFormType = "time"
)
