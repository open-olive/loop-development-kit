package ldk

import "github.com/open-olive/loop-development-kit/ldk/go/proto"

type WhisperContentDisambiguation struct {
	Label    string                                         `json:"label"`
	Markdown string                                         `json:"markdown"`
	Elements map[string]WhisperContentDisambiguationElement `json:"elements"`
}

// Type returns the type of the whisper content
func (c *WhisperContentDisambiguation) Type() WhisperContentType {
	return WhisperContentTypeDisambiguation
}

func (c *WhisperContentDisambiguation) ToProto() (*proto.WhisperDisambiguationRequest, error) {
	elements := make(map[string]*proto.WhisperDisambiguationElement, len(c.Elements))
	for key := range c.Elements {
		element, err := c.Elements[key].ToProto()
		if err != nil {
			return nil, err
		}
		elements[key] = element
	}

	return &proto.WhisperDisambiguationRequest{
		Meta: &proto.WhisperMeta{
			Label: c.Label,
		},
		Markdown: c.Markdown,
		Elements: elements,
	}, nil
}

func WhisperContentDisambiguationFromProto(req *proto.WhisperDisambiguationRequest) (*WhisperContentDisambiguation, error) {
	elements := make(map[string]WhisperContentDisambiguationElement, len(req.Elements))
	for key := range req.Elements {
		element, err := whisperContentDisambiguationElementFromProto(req.Elements[key])
		if err != nil {
			return nil, err
		}
		elements[key] = element
	}

	return &WhisperContentDisambiguation{
		Label:    req.Meta.Label,
		Markdown: req.Markdown,
		Elements: elements,
	}, nil
}
