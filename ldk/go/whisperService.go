package ldk

type WhisperMeta struct {
	Icon  string `json:"icon"` // Material Icon name https://material.io/resources/icons/
	Label string `json:"label"`
	Style Style  `json:"style"`
}

// WhisperMsg is the information output of a loop
type WhisperMarkdown struct {
	WhisperMeta
	Markdown string `json:"markdown"`
}

// Style contains fields for specifying whisper style
type Style struct {
	BackgroundColor string `json:"backgroundColor"`
	HighlightColor  string `json:"highlightColor"`
	PrimaryColor    string `json:"primaryColor"`
}

type WhisperConfirm struct {
	WhisperMeta
	Markdown     string `json:"markdown"`
	RejectLabel  string `json:"rejectLabel"`
	ResolveLabel string `json:"resolveLabel"`
}

//type WhisperFormInput interface {
//	isWhisperFormInput()
//	toProto() *proto.WhisperFormInput
//}
//
//type WhisperFormShared struct {
//	Label   string
//	Tooltip string
//}
//
//type WhisperFormInputCheckbox struct {
//	WhisperFormShared
//	Value bool
//}
//
//func (*WhisperFormInputCheckbox) isWhisperFormInput() {}
//
//func (w *WhisperFormInputCheckbox) toProto() *proto.WhisperFormInput {
//
//	return &proto.WhisperFormInput{
//		InputOneof: &proto.WhisperFormInput_Checkbox_{Checkbox: &proto.WhisperFormInput_Checkbox{
//			Label:   w.Label,
//			Tooltip: w.Tooltip,
//			Value:   w.Value,
//		}},
//	}
//}
//
//type WhisperFormEvent struct {
//	Action
//}
//
//type WhisperFormHandler func(WhisperFormEvent, error)
//
//type WhisperForm struct {
//	WhisperMeta
//	Markdown    string                      `json:"markdown"`
//	SubmitLabel string                      `json:"submitLabel"`
//	CancelLabel string                      `json:"cancelLabel"`
//	Inputs      map[string]WhisperFormInput `json:"inputs"`
//}

// WhisperService is an interface that defines what methods plugins can expect from the host
type WhisperService interface {
	WhisperMarkdown(markdown WhisperMarkdown) error
	WhisperConfirm(msg WhisperConfirm) (bool, error)
}
