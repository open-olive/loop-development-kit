package ldk

import (
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type WhisperContentListElementStyle string

const (
	WhisperContentListElementStyleNone    WhisperContentListElementStyle = "none"
	WhisperContentListElementStyleError   WhisperContentListElementStyle = "error"
	WhisperContentListElementStyleSuccess WhisperContentListElementStyle = "success"
	WhisperContentListElementStyleWarning WhisperContentListElementStyle = "warning"
)

func (s WhisperContentListElementStyle) ToProto() (proto.WhisperListElement_Style, error) {
	switch s {
	case WhisperContentListElementStyleNone:
		return proto.WhisperListElement_STYLE_NONE, nil
	case WhisperContentListElementStyleError:
		return proto.WhisperListElement_STYLE_ERROR, nil
	case WhisperContentListElementStyleSuccess:
		return proto.WhisperListElement_STYLE_SUCCESS, nil
	case WhisperContentListElementStyleWarning:
		return proto.WhisperListElement_STYLE_WARN, nil
	default:
		return proto.WhisperListElement_STYLE_NONE, fmt.Errorf("unexpected style option %s", s)
	}
}

func WhisperContentListElementStyleFromProto(s proto.WhisperListElement_Style) (WhisperContentListElementStyle, error) {
	switch s {
	case proto.WhisperListElement_STYLE_NONE:
		return WhisperContentListElementStyleNone, nil
	case proto.WhisperListElement_STYLE_ERROR:
		return WhisperContentListElementStyleError, nil
	case proto.WhisperListElement_STYLE_SUCCESS:
		return WhisperContentListElementStyleSuccess, nil
	case proto.WhisperListElement_STYLE_WARN:
		return WhisperContentListElementStyleWarning, nil
	default:
		return WhisperContentListElementStyleNone, fmt.Errorf("unexpected style option %s", s)
	}
}
