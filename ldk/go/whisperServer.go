package ldk

import (
	"context"

	"github.com/golang/protobuf/ptypes/empty"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

// WhisperServer is used by the controller plugin host to receive plugin initiated communication
type WhisperServer struct {
	Impl WhisperService
}

func (m *WhisperServer) WhisperMarkdown(ctx context.Context, req *proto.WhisperMarkdownRequest) (*empty.Empty, error) {
	var style Style
	if req.Meta.Style != nil {
		style = Style{
			BackgroundColor: req.Meta.Style.BackgroundColor,
			HighlightColor:  req.Meta.Style.HighlightColor,
			PrimaryColor:    req.Meta.Style.PrimaryColor,
		}
	}

	err := m.Impl.WhisperMarkdown(
		WhisperMarkdown{
			Markdown: req.Markdown,
			WhisperMeta: WhisperMeta{
				Icon:  req.Meta.Icon,
				Label: req.Meta.Label,
				Style: style,
			},
		},
	)
	if err != nil {
		return nil, err
	}

	return &empty.Empty{}, nil
}

func (m *WhisperServer) WhisperConfirm(ctx context.Context, req *proto.WhisperConfirmRequest) (*proto.WhisperConfirmResponse, error) {
	var style Style
	if req.Meta.Style != nil {
		style = Style{
			BackgroundColor: req.Meta.Style.BackgroundColor,
			HighlightColor:  req.Meta.Style.HighlightColor,
			PrimaryColor:    req.Meta.Style.PrimaryColor,
		}
	}

	resp, err := m.Impl.WhisperConfirm(
		WhisperConfirm{
			Markdown: req.Markdown,
			WhisperMeta: WhisperMeta{
				Icon:  req.Meta.Icon,
				Label: req.Meta.Label,
				Style: style,
			},
		},
	)
	if err != nil {
		return nil, err
	}

	return &proto.WhisperConfirmResponse{
		Response: resp,
	}, nil
}

func (m *WhisperServer) WhisperForm(request *proto.WhisperFormRequest, server proto.Whisper_WhisperFormServer) error {
	panic("implement me")
}
