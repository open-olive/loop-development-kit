package ldk

import (
	"encoding/json"
	"reflect"
	"testing"
)

func TestWhisperContentList_MarshalJSON(t *testing.T) {
	type fields struct {
		Label    string
		Elements map[string]WhisperContentListElement
	}
	tests := []struct {
		name    string
		fields  fields
		want    []byte
		wantErr bool
	}{
		{
			name: "simple example with one element",
			fields: fields{
				Label: "The Label",
				Elements: map[string]WhisperContentListElement{
					"favoriteFood": &WhisperContentListElementPair{
						Copyable: false,
						Extra:    false,
						Label:    "Favorite Food",
						Order:    0,
						Style:    "",
						Value:    "Bananas",
					},
				},
			},
			want:    []byte("{\"label\":\"The Label\",\"elements\":{\"favoriteFood\":{\"copyable\":false,\"extra\":false,\"label\":\"Favorite Food\",\"order\":0,\"style\":\"\",\"value\":\"Bananas\",\"type\":\"pair\"}}}"),
			wantErr: false,
		},
		{
			name: "one of each element type",
			fields: fields{
				Label: "The Label",
				Elements: map[string]WhisperContentListElement{
					"pairElement": &WhisperContentListElementPair{
						Copyable: false,
						Extra:    false,
						Label:    "Pair",
						Order:    0,
						Style:    WhisperContentListElementStyleNone,
						Value:    "Bananas",
					},
					"dividerElement": &WhisperContentListElementDivider{
						Extra: false,
						Order: 1,
						Style: WhisperContentListElementStyleNone,
					},
					"messageElement": &WhisperContentListElementMessage{
						Align:  WhisperContentListElementAlignCenter,
						Body:   "Message body.",
						Header: "Message Header",
						Extra:  false,
						Order:  2,
						Style:  WhisperContentListElementStyleSuccess,
					},
					"linkElement": &WhisperContentListElementLink{
						Align:  WhisperContentListElementAlignCenter,
						Extra:  false,
						Href:   "https://oliveai.com/",
						Order:  3,
						Style:  WhisperContentListElementStyleNone,
						Text:   "Click me!",
					},
				},
			},
			want:    []byte("{\"label\":\"The Label\",\"elements\":{\"dividerElement\":{\"extra\":false,\"order\":1,\"style\":\"none\",\"type\":\"divider\"},\"linkElement\":{\"align\":\"center\",\"extra\":false,\"href\":\"https://oliveai.com/\",\"order\":3,\"style\":\"none\",\"text\":\"Click me!\",\"type\":\"link\"},\"messageElement\":{\"align\":\"center\",\"body\":\"Message body.\",\"extra\":false,\"header\":\"Message Header\",\"order\":2,\"style\":\"success\",\"type\":\"message\"},\"pairElement\":{\"copyable\":false,\"extra\":false,\"label\":\"Pair\",\"order\":0,\"style\":\"none\",\"value\":\"Bananas\",\"type\":\"pair\"}}}"),
			wantErr: false,
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			c := &WhisperContentList{
				Label:    tt.fields.Label,
				Elements: tt.fields.Elements,
			}

			got, err := json.Marshal(c)
			if (err != nil) != tt.wantErr {
				t.Errorf("MarshalJSON() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(string(got), string(tt.want)) {
				t.Errorf("MarshalJSON() got = %v, want %v", string(got), string(tt.want))
			}
		})
	}
}
