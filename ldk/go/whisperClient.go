package ldk

import (
	"context"

	"github.com/open-olive/loop-development-kit-go/proto"
)

// WhisperClient is used by the controller plugin to facilitate plugin initiated communication with the host
type WhisperClient struct {
	client proto.WhisperClient
}

func getStyleMsg(whisper WhisperMeta) *proto.WhisperStyle {
	return &proto.WhisperStyle{
		BackgroundColor: whisper.Style.BackgroundColor,
		PrimaryColor:    whisper.Style.PrimaryColor,
		HighlightColor:  whisper.Style.HighlightColor,
	}
}

// WhisperNew is used by controller plugins to send whispers to sidekick
func (m *WhisperClient) WhisperMarkdown(whisper WhisperMarkdown) error {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	_, err := m.client.WhisperMarkdown(ctx, &proto.WhisperMarkdownRequest{
		Markdown: whisper.Markdown,
		Meta: &proto.WhisperMeta{
			Icon:  whisper.Icon,
			Label: whisper.Label,
			Style: getStyleMsg(whisper.WhisperMeta),
		},
	})
	return err
}

func (m *WhisperClient) WhisperConfirm(msg WhisperConfirm) (bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()

	resp, err := m.client.WhisperConfirm(ctx, &proto.WhisperConfirmRequest{
		Meta: &proto.WhisperMeta{
			Label: msg.Label,
			Icon:  msg.Icon,
			Style: getStyleMsg(msg.WhisperMeta),
		},
		Markdown:     "",
		RejectLabel:  "",
		ResolveLabel: "",
	})
	if err != nil {
		return false, err
	}
	return resp.GetResponse(), nil
}
