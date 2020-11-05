package ldk

import (
	"fmt"
	"time"

	"github.com/golang/protobuf/ptypes"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

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

type WhisperContentForm struct {
	Icon  string `json:"icon"` // Material Icon name https://material.io/resources/icons/
	Label string `json:"label"`

	Markdown string                             `json:"markdown"`
	Inputs   map[string]WhisperContentFormInput `json:"inputs"`

	CancelLabel string `json:"cancelLabel"`
	SubmitLabel string `json:"submitLabel"`

	Style Style `json:"style"`
}

// Type returns the type of the whisper content
func (c *WhisperContentForm) Type() WhisperContentType {
	return WhisperContentTypeForm
}

type WhisperContentFormInput interface {
	Type() WhisperContentFormType
	ToProto() (*proto.WhisperFormInput, error)
}

type WhisperContentFormOutput interface {
	Type() WhisperContentFormType
	ToProto() (*proto.WhisperFormOutput, error)
}

func whisperContentFormOutputFromProto(p *proto.WhisperFormOutput) (WhisperContentFormOutput, error) {
	switch inputContainer := p.OutputOneof.(type) {
	case *proto.WhisperFormOutput_Checkbox_:
		return &WhisperContentFormOutputCheckbox{
			Value: inputContainer.Checkbox.Value,
		}, nil
	case *proto.WhisperFormOutput_Email_:
		return &WhisperContentFormOutputEmail{
			Value: inputContainer.Email.Value,
		}, nil
	case *proto.WhisperFormOutput_Markdown_:
		return &WhisperContentFormOutputMarkdown{
			Value: inputContainer.Markdown.Value,
		}, nil
	case *proto.WhisperFormOutput_Number_:
		return &WhisperContentFormOutputNumber{
			Value: inputContainer.Number.Value,
		}, nil
	case *proto.WhisperFormOutput_Password_:
		return &WhisperContentFormOutputPassword{
			Value: inputContainer.Password.Value,
		}, nil
	case *proto.WhisperFormOutput_Radio_:
		return &WhisperContentFormOutputRadio{
			Value: inputContainer.Radio.Value,
		}, nil
	case *proto.WhisperFormOutput_Select_:
		return &WhisperContentFormOutputSelect{
			Value: inputContainer.Select.Value,
		}, nil
	case *proto.WhisperFormOutput_Tel_:
		return &WhisperContentFormOutputTel{
			Value: inputContainer.Tel.Value,
		}, nil
	case *proto.WhisperFormOutput_Text_:
		return &WhisperContentFormOutputText{
			Value: inputContainer.Text.Value,
		}, nil
	case *proto.WhisperFormOutput_Time_:
		value, err := ptypes.Timestamp(inputContainer.Time.Value)
		if err != nil {
			return nil, fmt.Errorf("failed to convert timestamp %w", err)
		}

		return &WhisperContentFormOutputTime{
			Value: value,
		}, nil
	default:
		return nil, fmt.Errorf("input had unexpected type %T", inputContainer)
	}
}

// WhisperContentFormInputCheckbox defines a checkbox field in a form
type WhisperContentFormInputCheckbox struct {
	Label    string     `json:"label"`
	Tooltip  string     `json:"tooltip"`
	Value    bool       `json:"value"`
	OnChange func(bool) `json:"-"`
	Order    uint32     `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputCheckbox) Type() WhisperContentFormType {
	return WhisperContentFormTypeCheckbox
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputCheckbox) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Checkbox_{
			Checkbox: &proto.WhisperFormInput_Checkbox{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Value:   fc.Value,
			},
		},
	}, nil
}

type WhisperContentFormOutputCheckbox struct {
	Value bool `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputCheckbox) Type() WhisperContentFormType {
	return WhisperContentFormTypeCheckbox
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputCheckbox) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Checkbox_{
			Checkbox: &proto.WhisperFormOutput_Checkbox{
				Value: fc.Value,
			},
		},
	}, nil
}

// WhisperContentFormInputEmail defines an email field in a form
type WhisperContentFormInputEmail struct {
	Label    string       `json:"label"`
	Tooltip  string       `json:"tooltip"`
	Value    string       `json:"value"`
	OnChange func(string) `json:"-"`
	Order    uint32       `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputEmail) Type() WhisperContentFormType {
	return WhisperContentFormTypeEmail
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputEmail) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Email_{
			Email: &proto.WhisperFormInput_Email{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Value:   fc.Value,
				Order:   fc.Order,
			},
		},
	}, nil
}

type WhisperContentFormOutputEmail struct {
	Value string `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputEmail) Type() WhisperContentFormType {
	return WhisperContentFormTypeEmail
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputEmail) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Email_{
			Email: &proto.WhisperFormOutput_Email{
				Value: fc.Value,
			},
		},
	}, nil
}

// WhisperContentFormInputMarkdown defines a markdown field in a form
type WhisperContentFormInputMarkdown struct {
	Label    string       `json:"label"`
	Tooltip  string       `json:"tooltip"`
	Value    string       `json:"value"`
	OnChange func(string) `json:"-"`
	Order    uint32       `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputMarkdown) Type() WhisperContentFormType {
	return WhisperContentFormTypeMarkdown
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputMarkdown) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Markdown_{
			Markdown: &proto.WhisperFormInput_Markdown{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Value:   fc.Value,
				Order:   fc.Order,
			},
		},
	}, nil
}

type WhisperContentFormOutputMarkdown struct {
	Value string `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputMarkdown) Type() WhisperContentFormType {
	return WhisperContentFormTypeMarkdown
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputMarkdown) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Markdown_{
			Markdown: &proto.WhisperFormOutput_Markdown{
				Value: fc.Value,
			},
		},
	}, nil
}

// WhisperContentFormInputNumber defines a number field in a form
type WhisperContentFormInputNumber struct {
	Label    string        `json:"label"`
	Tooltip  string        `json:"tooltip"`
	Min      float32       `json:"min"`
	Max      float32       `json:"max"`
	Value    float32       `json:"value"`
	OnChange func(float32) `json:"-"`
	Order    uint32        `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputNumber) Type() WhisperContentFormType {
	return WhisperContentFormTypeNumber
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputNumber) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Number_{
			Number: &proto.WhisperFormInput_Number{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Value:   fc.Value,
				Min:     fc.Min,
				Max:     fc.Max,
				Order:   fc.Order,
			},
		},
	}, nil
}

type WhisperContentFormOutputNumber struct {
	Value float32 `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputNumber) Type() WhisperContentFormType {
	return WhisperContentFormTypeNumber
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputNumber) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Number_{
			Number: &proto.WhisperFormOutput_Number{
				Value: fc.Value,
			},
		},
	}, nil
}

// WhisperContentFormInputPassword defines a password field in a form
type WhisperContentFormInputPassword struct {
	Label    string       `json:"label"`
	Tooltip  string       `json:"tooltip"`
	OnChange func(string) `json:"-"`
	Order    uint32       `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputPassword) Type() WhisperContentFormType {
	return WhisperContentFormTypePassword
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputPassword) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Password_{
			Password: &proto.WhisperFormInput_Password{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Order:   fc.Order,
			},
		},
	}, nil
}

type WhisperContentFormOutputPassword struct {
	Value string `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputPassword) Type() WhisperContentFormType {
	return WhisperContentFormTypePassword
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputPassword) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Password_{
			Password: &proto.WhisperFormOutput_Password{
				Value: fc.Value,
			},
		},
	}, nil
}

// WhisperContentFormInputRadio defines a radio button selection field in a form
type WhisperContentFormInputRadio struct {
	Label    string       `json:"label"`
	Tooltip  string       `json:"tooltip"`
	Options  []string     `json:"options"`
	OnChange func(string) `json:"-"`
	Order    uint32       `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputRadio) Type() WhisperContentFormType {
	return WhisperContentFormTypeRadio
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputRadio) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Radio_{
			Radio: &proto.WhisperFormInput_Radio{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Options: fc.Options,
				Order:   fc.Order,
			},
		},
	}, nil
}

type WhisperContentFormOutputRadio struct {
	Value string `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputRadio) Type() WhisperContentFormType {
	return WhisperContentFormTypeRadio
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputRadio) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Radio_{
			Radio: &proto.WhisperFormOutput_Radio{
				Value: fc.Value,
			},
		},
	}, nil
}

// WhisperContentFormInputSelect defines a dropdown menu selection field in a form
type WhisperContentFormInputSelect struct {
	Label    string       `json:"label"`
	Tooltip  string       `json:"tooltip"`
	Options  []string     `json:"options"`
	OnChange func(string) `json:"-"`
	Order    uint32       `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputSelect) Type() WhisperContentFormType {
	return WhisperContentFormTypeSelect
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputSelect) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Select_{
			Select: &proto.WhisperFormInput_Select{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Options: fc.Options,
				Order:   fc.Order,
			},
		},
	}, nil
}

type WhisperContentFormOutputSelect struct {
	Value string `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputSelect) Type() WhisperContentFormType {
	return WhisperContentFormTypeSelect
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputSelect) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Select_{
			Select: &proto.WhisperFormOutput_Select{
				Value: fc.Value,
			},
		},
	}, nil
}

// WhisperContentFormInputTel defines a telephone field in a form
type WhisperContentFormInputTel struct {
	Label    string       `json:"label"`
	Tooltip  string       `json:"tooltip"`
	Pattern  string       `json:"pattern"`
	Value    string       `json:"value"`
	OnChange func(string) `json:"-"`
	Order    uint32       `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputTel) Type() WhisperContentFormType {
	return WhisperContentFormTypeTel
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputTel) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Tel_{
			Tel: &proto.WhisperFormInput_Tel{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Value:   fc.Value,
				Order:   fc.Order,
			},
		},
	}, nil
}

type WhisperContentFormOutputTel struct {
	Value string `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputTel) Type() WhisperContentFormType {
	return WhisperContentFormTypeTel
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputTel) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Tel_{
			Tel: &proto.WhisperFormOutput_Tel{
				Value: fc.Value,
			},
		},
	}, nil
}

// WhisperContentFormInputText defines a text field in a form
type WhisperContentFormInputText struct {
	Label    string       `json:"label"`
	Tooltip  string       `json:"tooltip"`
	Value    string       `json:"value"`
	OnChange func(string) `json:"-"`
	Order    uint32       `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputText) Type() WhisperContentFormType {
	return WhisperContentFormTypeText
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputText) ToProto() (*proto.WhisperFormInput, error) {
	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Text_{
			Text: &proto.WhisperFormInput_Text{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Value:   fc.Value,
				Order:   fc.Order,
			},
		},
	}, nil
}

type WhisperContentFormOutputText struct {
	Value string `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputText) Type() WhisperContentFormType {
	return WhisperContentFormTypeText
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputText) ToProto() (*proto.WhisperFormOutput, error) {
	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Text_{
			Text: &proto.WhisperFormOutput_Text{
				Value: fc.Value,
			},
		},
	}, nil
}

// WhisperContentFormInputTime defines a time field in a form
type WhisperContentFormInputTime struct {
	Label    string          `json:"label"`
	Tooltip  string          `json:"tooltip"`
	Value    time.Time       `json:"value"`
	OnChange func(time.Time) `json:"-"`
	Order    uint32          `json:"order"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormInputTime) Type() WhisperContentFormType {
	return WhisperContentFormTypeTime
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormInputTime) ToProto() (*proto.WhisperFormInput, error) {
	value, err := ptypes.TimestampProto(fc.Value)
	if err != nil {
		return nil, err
	}

	return &proto.WhisperFormInput{
		InputOneof: &proto.WhisperFormInput_Time_{
			Time: &proto.WhisperFormInput_Time{
				Label:   fc.Label,
				Tooltip: fc.Tooltip,
				Value:   value,
				Order:   fc.Order,
			},
		},
	}, nil
}

type WhisperContentFormOutputTime struct {
	Value time.Time `json:"value"`
}

// Type returns the type of field for this form element
func (fc *WhisperContentFormOutputTime) Type() WhisperContentFormType {
	return WhisperContentFormTypeTime
}

// ToProto returns a protobuf representation of the object
func (fc *WhisperContentFormOutputTime) ToProto() (*proto.WhisperFormOutput, error) {
	value, err := ptypes.TimestampProto(fc.Value)
	if err != nil {
		return nil, err
	}

	return &proto.WhisperFormOutput{
		OutputOneof: &proto.WhisperFormOutput_Time_{
			Time: &proto.WhisperFormOutput_Time{
				Value: value,
			},
		},
	}, nil
}
