package ldk

import (
	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type WhisperContentListElementAlign string

const (
	WhisperContentListElementAlignLeft   WhisperContentListElementAlign = "left"
	WhisperContentListElementAlignCenter WhisperContentListElementAlign = "center"
	WhisperContentListElementAlignRight  WhisperContentListElementAlign = "right"
)

func (a WhisperContentListElementAlign) ToProto() (proto.WhisperListElement_Align, error) {
	switch a {
	case WhisperContentListElementAlignLeft:
		return proto.WhisperListElement_ALIGN_LEFT, nil
	case WhisperContentListElementAlignCenter:
		return proto.WhisperListElement_ALIGN_CENTER, nil
	case WhisperContentListElementAlignRight:
		return proto.WhisperListElement_ALIGN_RIGHT, nil
	default:
		return proto.WhisperListElement_ALIGN_LEFT, nil
	}
}

func WhisperContentListElementAlignFromProto(a proto.WhisperListElement_Align) (WhisperContentListElementAlign, error) {
	switch a {
	case proto.WhisperListElement_ALIGN_LEFT:
		return WhisperContentListElementAlignLeft, nil
	case proto.WhisperListElement_ALIGN_CENTER:
		return WhisperContentListElementAlignCenter, nil
	case proto.WhisperListElement_ALIGN_RIGHT:
		return WhisperContentListElementAlignRight, nil
	default:
		return WhisperContentListElementAlignLeft, nil
	}
}
