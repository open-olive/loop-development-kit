package ldk

import (
	"context"
	"errors"
	"fmt"
	"io"

	"github.com/golang/protobuf/ptypes"
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// WhisperClient is used by the controller plugin to facilitate plugin initiated communication with the host
type WhisperClient struct {
	client  proto.WhisperClient
	session *Session
}

// WhisperMarkdown is used by loops to create markdown whispers
func (m *WhisperClient) Markdown(ctx context.Context, content *WhisperContentMarkdown) error {
	_, err := m.client.WhisperMarkdown(ctx, &proto.WhisperMarkdownRequest{
		Meta: &proto.WhisperMeta{
			Label: content.Label,
			Icon:  content.Icon,
		},
		Markdown: content.Markdown,
		Session:  m.session.ToProto(),
	})
	return err
}

// WhisperConfirm is used by loops to create confirm whispers
func (m *WhisperClient) Confirm(ctx context.Context, content *WhisperContentConfirm) (bool, error) {
	response, err := m.client.WhisperConfirm(ctx, &proto.WhisperConfirmRequest{
		Meta: &proto.WhisperMeta{
			Label: content.Label,
			Icon:  content.Icon,
		},
		Markdown:     content.Markdown,
		RejectLabel:  content.RejectLabel,
		ResolveLabel: content.ResolveLabel,
		Session:      m.session.ToProto(),
	})
	if err != nil {
		return false, err
	}

	if response == nil {
		return false, errors.New("no response")
	}

	return response.Response, nil
}

// WhisperForm is used by loops to create form whispers
func (m *WhisperClient) Form(ctx context.Context, content *WhisperContentForm) (bool, map[string]WhisperContentFormOutput, error) {
	inputs := make(map[string]*proto.WhisperFormInput, len(content.Inputs))
	for key, input := range content.Inputs {
		protoInput, err := input.ToProto()
		if err != nil {
			return false, nil, err
		}

		inputs[key] = protoInput
	}

	client, err := m.client.WhisperForm(ctx, &proto.WhisperFormRequest{
		Meta: &proto.WhisperMeta{
			Label: content.Label,
			Icon:  content.Icon,
		},
		Markdown:    content.Markdown,
		SubmitLabel: content.SubmitLabel,
		CancelLabel: content.CancelLabel,
		Inputs:      inputs,
		Session:     m.session.ToProto(),
	})
	if err != nil {
		return false, nil, err
	}

	for {
		resp, err := client.Recv()
		if err == io.EOF {
			return false, nil, errors.New("unexpected end of stream")
		}
		if err != nil {
			return false, nil, err
		}

		switch respContainer := resp.WhisperFormResponseOneof.(type) {
		case *proto.WhisperFormStreamResponse_Result:
			outputs := make(map[string]WhisperContentFormOutput, len(respContainer.Result.Outputs))
			for key, protoOutput := range respContainer.Result.Outputs {
				output, err := whisperContentFormOutputFromProto(protoOutput)
				if err != nil {
					return false, nil, err
				}
				outputs[key] = output
			}
			return respContainer.Result.Submitted, outputs, nil

		case *proto.WhisperFormStreamResponse_Update:
			genericInput := content.Inputs[respContainer.Update.Key]
			switch inputContainer := respContainer.Update.Output.OutputOneof.(type) {
			case *proto.WhisperFormOutput_Checkbox_:
				if input := genericInput.(*WhisperContentFormInputCheckbox); input.OnChange != nil {
					input.OnChange(inputContainer.Checkbox.Value)
				}
			case *proto.WhisperFormOutput_Email_:
				if input := genericInput.(*WhisperContentFormInputEmail); input.OnChange != nil {
					input.OnChange(inputContainer.Email.Value)
				}
			case *proto.WhisperFormOutput_Markdown_:
				if input := genericInput.(*WhisperContentFormInputMarkdown); input.OnChange != nil {
					input.OnChange(inputContainer.Markdown.Value)
				}
			case *proto.WhisperFormOutput_Number_:
				if input := genericInput.(*WhisperContentFormInputNumber); input.OnChange != nil {
					input.OnChange(inputContainer.Number.Value)
				}
			case *proto.WhisperFormOutput_Password_:
				if input := genericInput.(*WhisperContentFormInputPassword); input.OnChange != nil {
					input.OnChange(inputContainer.Password.Value)
				}
			case *proto.WhisperFormOutput_Radio_:
				if input := genericInput.(*WhisperContentFormInputRadio); input.OnChange != nil {
					input.OnChange(inputContainer.Radio.Value)
				}
			case *proto.WhisperFormOutput_Select_:
				if input := genericInput.(*WhisperContentFormInputSelect); input.OnChange != nil {
					input.OnChange(inputContainer.Select.Value)
				}
			case *proto.WhisperFormOutput_Tel_:
				if input := genericInput.(*WhisperContentFormInputTel); input.OnChange != nil {
					input.OnChange(inputContainer.Tel.Value)
				}
			case *proto.WhisperFormOutput_Text_:
				if input := genericInput.(*WhisperContentFormInputText); input.OnChange != nil {
					input.OnChange(inputContainer.Text.Value)
				}
			case *proto.WhisperFormOutput_Time_:
				if input := genericInput.(*WhisperContentFormInputTime); input.OnChange != nil {
					value, err := ptypes.Timestamp(inputContainer.Time.Value)
					if err != nil {
						return false, nil, err
					}

					input.OnChange(value)
				}
			default:
				return false, nil, errors.New("received unknown content type in response")
			}
		default:
			return false, nil, fmt.Errorf("content had unexpected type %T", respContainer)
		}
	}
}

// WhisperForm is used by loops to create form whispers
func (m *WhisperClient) List(ctx context.Context, content *WhisperContentList) error {
	req, err := content.ToProto()
	if err != nil {
		return fmt.Errorf("failed to encode content to proto: %w", err)
	}

	_, err = m.client.WhisperList(ctx, req)
	if err != nil {
		return err
	}

	return nil
}
