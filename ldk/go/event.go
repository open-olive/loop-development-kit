package ldk

// Event is a structure that defines a sensor event
type Event struct {
	Data   map[string]string `json:"data"`
	Source Source            `json:"source"`
}

// NewTextEvent generates a new event with the given text
func NewTextEvent(text string) Event {
	return Event{
		Data: map[string]string{
			"text": text,
		},
	}
}

// Text is a shortcut for returning Event.Data["text"]
func (e *Event) Text() string {
	return e.Data["text"]
}
