package ldk

import (
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type WhisperContentList struct {
	Label string `json:"label"`

	Elements map[string]WhisperContentListElement `json:"elements"`
}

// Type returns the type of the whisper content
func (c *WhisperContentList) Type() WhisperContentType {
	return WhisperContentTypeList
}

func (c *WhisperContentList) ToProto() (*proto.WhisperListRequest, error) {
	elements := make(map[string]*proto.WhisperListElement, len(c.Elements))
	for key := range c.Elements {
		element, err := c.Elements[key].ToProto()
		if err != nil {
			return nil, err
		}
		elements[key] = element
	}

	return &proto.WhisperListRequest{
		Meta: &proto.WhisperMeta{
			Label: c.Label,
		},
		Elements: elements,
	}, nil
}

func WhisperContentListFromProto(req *proto.WhisperListRequest) (*WhisperContentList, error) {
	elements := make(map[string]WhisperContentListElement, len(req.Elements))
	for key := range req.Elements {
		element, err := whisperContentListElementFromProto(req.Elements[key])
		if err != nil {
			return nil, err
		}
		elements[key] = element
	}

	return &WhisperContentList{
		Label:    req.Meta.Label,
		Elements: elements,
	}, nil
}
