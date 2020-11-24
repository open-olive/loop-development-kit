package ldk

import (
	"encoding/json"
	"reflect"
	"testing"
)

func TestWhisperContentForm_MarshalJSON(t *testing.T) {
	type fields struct {
		Icon  string
		Label string

		Markdown string
		Inputs   map[string]WhisperContentFormInput

		CancelLabel string
		SubmitLabel string
	}
	tests := []struct {
		name    string
		fields  fields
		want    []byte
		wantErr bool
	}{
		{
			name: "simple example with one text element",
			fields: fields{
				Icon:        "bathtub",
				Label:       "The Label",
				Markdown:    "Some markdown.",
				CancelLabel: "Cancel",
				SubmitLabel: "Submit",
				Inputs: map[string]WhisperContentFormInput{
					"favoriteFood": &WhisperContentFormInputText{
						Label:   "Favorite Food",
						Tooltip: "Enter you favorite food.",
					},
				},
			},
			want:    []byte("{\"icon\":\"bathtub\",\"label\":\"The Label\",\"markdown\":\"Some markdown.\",\"inputs\":{\"favoriteFood\":{\"label\":\"Favorite Food\",\"tooltip\":\"Enter you favorite food.\",\"value\":\"\",\"order\":0,\"type\":\"text\"}},\"cancelLabel\":\"Cancel\",\"submitLabel\":\"Submit\"}"),
			wantErr: false,
		},
		{
			name: "one of each input type",
			fields: fields{
				Icon:        "bathtub",
				Label:       "The Label",
				Markdown:    "Some markdown.",
				CancelLabel: "Cancel",
				SubmitLabel: "Submit",
				Inputs: map[string]WhisperContentFormInput{
					"checkbox": &WhisperContentFormInputCheckbox{
						Label:   "Checkbox",
						Tooltip: "Checkboxes have two states.",
					},
					"email": &WhisperContentFormInputEmail{
						Label:   "Email",
						Tooltip: "This is a field for entering an email address.",
					},
					"markdown": &WhisperContentFormInputMarkdown{
						Label:   "Markdown",
						Tooltip: "This is a field for entering markdown.",
					},
					"number": &WhisperContentFormInputNumber{
						Label:   "Number",
						Max:     100,
						Min:     0,
						Tooltip: "This field is for picking a number from a range.",
					},
					"password": &WhisperContentFormInputPassword{
						Label:   "Password",
						Tooltip: "This is a protected field for entering passwords.",
					},
					"radio": &WhisperContentFormInputRadio{
						Label:   "Radio",
						Tooltip: "This input allows for selecting from multiple choices.",
						Options: []string{
							"Option A",
							"Option B",
							"Option C",
						},
					},
					"select": &WhisperContentFormInputSelect{
						Label:   "Select",
						Tooltip: "This input allows for selecting from multiple choices in a drop down menu.",
						Options: []string{
							"Option A",
							"Option B",
							"Option C",
						},
					},
					"tel": &WhisperContentFormInputTel{
						Label:   "Telephone",
						Tooltip: "This is a field for entering a telephone number.",
						Pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
					},
					"text": &WhisperContentFormInputText{
						Label:   "Text",
						Tooltip: "This is a field for entering plain text.",
					},
					"time": &WhisperContentFormInputTime{
						Label:   "Time",
						Tooltip: "This is a field for entering a time.",
					},
				},
			},
			want:    []byte("{\"icon\":\"bathtub\",\"label\":\"The Label\",\"markdown\":\"Some markdown.\",\"inputs\":{\"checkbox\":{\"label\":\"Checkbox\",\"tooltip\":\"Checkboxes have two states.\",\"value\":false,\"order\":0,\"type\":\"checkbox\"},\"email\":{\"label\":\"Email\",\"tooltip\":\"This is a field for entering an email address.\",\"value\":\"\",\"order\":0,\"type\":\"email\"},\"markdown\":{\"label\":\"Markdown\",\"tooltip\":\"This is a field for entering markdown.\",\"value\":\"\",\"order\":0,\"type\":\"markdown\"},\"number\":{\"label\":\"Number\",\"tooltip\":\"This field is for picking a number from a range.\",\"min\":0,\"max\":100,\"value\":0,\"order\":0,\"type\":\"number\"},\"password\":{\"label\":\"Password\",\"tooltip\":\"This is a protected field for entering passwords.\",\"order\":0,\"type\":\"password\"},\"radio\":{\"label\":\"Radio\",\"tooltip\":\"This input allows for selecting from multiple choices.\",\"options\":[\"Option A\",\"Option B\",\"Option C\"],\"order\":0,\"type\":\"radio\"},\"select\":{\"label\":\"Select\",\"tooltip\":\"This input allows for selecting from multiple choices in a drop down menu.\",\"options\":[\"Option A\",\"Option B\",\"Option C\"],\"order\":0,\"type\":\"select\"},\"tel\":{\"label\":\"Telephone\",\"tooltip\":\"This is a field for entering a telephone number.\",\"pattern\":\"[0-9]{3}-[0-9]{3}-[0-9]{4}\",\"value\":\"\",\"order\":0,\"type\":\"tel\"},\"text\":{\"label\":\"Text\",\"tooltip\":\"This is a field for entering plain text.\",\"value\":\"\",\"order\":0,\"type\":\"text\"},\"time\":{\"label\":\"Time\",\"tooltip\":\"This is a field for entering a time.\",\"value\":\"0001-01-01T00:00:00Z\",\"order\":0,\"type\":\"time\"}},\"cancelLabel\":\"Cancel\",\"submitLabel\":\"Submit\"}"),
			wantErr: false,
		},
	}

	for _, tt := range tests {
		tt := tt
		t.Run(tt.name, func(t *testing.T) {
			c := &WhisperContentForm{
				Icon:        tt.fields.Icon,
				Label:       tt.fields.Label,
				Markdown:    tt.fields.Markdown,
				Inputs:      tt.fields.Inputs,
				CancelLabel: tt.fields.CancelLabel,
				SubmitLabel: tt.fields.SubmitLabel,
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
