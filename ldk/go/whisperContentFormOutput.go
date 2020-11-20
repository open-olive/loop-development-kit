package ldk

import (
	"fmt"

	"github.com/golang/protobuf/ptypes"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

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
