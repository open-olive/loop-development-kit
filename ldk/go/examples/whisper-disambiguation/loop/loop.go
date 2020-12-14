package loop

import (
	"context"
	"encoding/json"
	"time"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

type recall struct {
	Address1       string `json:"address_1"`
	Address2       string `json:"address_2"`
	Codes          string `json:"code_info"`
	Country        string `json:"country"`
	City           string `json:"city"`
	Classification string `json:"classification"`
	Date           string `json:"recall_initiation_date"`
	Description    string `json:"product_description"`
	Distribution   string `json:"distribution_pattern"`
	Firm           string `json:"recalling_firm"`
	ID             string `json:"recall_number"`
	Quantity       string `json:"product_quantity"`
	Reason         string `json:"reason_for_recall"`
	RecallType     string `json:"voluntary_mandated"`
	State          string `json:"state"`
	Type           string `json:"product_type"`
	Zip            string `json:"postal_code"`
}

type apiResponse struct {
	Meta    interface{} `json:"meta"`
	Results []recall    `json:"results"`
}

// Serve allows Olive Helps to have access the loop
func Serve() error {
	l := ldk.NewLogger("example-whisper-disambiguation")
	loop, err := NewLoop(l)
	if err != nil {
		return err
	}
	ldk.ServeLoopPlugin(l, loop)
	return nil
}

// Loop is a structure for generating SideKick whispers
type Loop struct {
	ctx    context.Context
	cancel context.CancelFunc

	sidekick ldk.Sidekick
	logger   *ldk.Logger
}

// NewLoop returns a pointer to a loop
func NewLoop(logger *ldk.Logger) (*Loop, error) {
	return &Loop{
		logger: logger,
	}, nil
}

// LoopStart is called by the host when the plugin is started to provide access to the host process
func (c *Loop) LoopStart(sidekick ldk.Sidekick) error {
	c.logger.Info("Starting example whisper disambiguation loop")
	c.ctx, c.cancel = context.WithCancel(context.Background())

	c.sidekick = sidekick

	now := time.Now()

	response, err := sidekick.Network().HTTPRequest(c.ctx, &ldk.HTTPRequest{
		URL:    "https://api.fda.gov/food/enforcement.json?search=report_date:[" + now.AddDate(0, -3, 0).Format("20060102") + "+TO+" + now.Format("20060102") + "]&limit=10",
		Method: "GET",
		Body:   nil,
	})
	if err != nil {
		c.logger.Error("received error from callback", err)
		return err
	}

	if response.ResponseCode == 200 {
		var data apiResponse

		if err := json.Unmarshal(response.Data, &data); err != nil {
			c.logger.Error("Error unmarshaling response payload", err)
			return err
		}

		// recallItem := data.Results[0]

		go func() {
			_, err := c.sidekick.Whisper().Disambiguation(c.ctx, &ldk.WhisperContentDisambiguation{
				Label: "Latest FDA Recall dis",
				Elements: map[string]ldk.WhisperContentDisambiguationElement{
					"header1": &ldk.WhisperContentDisambiguationElementText{
						Body:  "# JB section text",
						Order: 0,
					},
					"option1": &ldk.WhisperContentDisambiguationElementOption{
						Label: "This is one option",
						Order: 1,
						OnChange: func(key string) {
							c.logger.Info("OnChange", "key", key)
							err = c.sidekick.Whisper().Markdown(c.ctx, &ldk.WhisperContentMarkdown{
								Label:    "Example Controller Go",
								Markdown: "Link pressed " + key,
							})
							if err != nil {
								c.logger.Error("failed to emit whisper", "error", err)
								return
							}
						},
					},
					"option2": &ldk.WhisperContentDisambiguationElementOption{
						Label: "This is two option",
						Order: 2,
						OnChange: func(key string) {
							c.logger.Info("OnChange", "key", key)
							err = c.sidekick.Whisper().Markdown(c.ctx, &ldk.WhisperContentMarkdown{
								Label:    "Example Controller Go",
								Markdown: "Link pressed " + key,
							})
							if err != nil {
								c.logger.Error("failed to emit whisper", "error", err)
								return
							}
						},
					},
					"header2": &ldk.WhisperContentDisambiguationElementText{
						Body:  "# JB section text two",
						Order: 3,
					},
					"option3": &ldk.WhisperContentDisambiguationElementOption{
						Label: "This is three option",
						Order: 4,
						OnChange: func(key string) {
							c.logger.Info("OnChange", "key", key)
							err = c.sidekick.Whisper().Markdown(c.ctx, &ldk.WhisperContentMarkdown{
								Label:    "Example Controller Go",
								Markdown: "Link pressed " + key,
							})
							if err != nil {
								c.logger.Error("failed to emit whisper", "error", err)
								return
							}
						},
					},
					"option4": &ldk.WhisperContentDisambiguationElementOption{
						Label: "This is four option",
						Order: 5,
						OnChange: func(key string) {
							c.logger.Info("OnChange", "key", key)
							err = c.sidekick.Whisper().Markdown(c.ctx, &ldk.WhisperContentMarkdown{
								Label:    "Example Controller Go",
								Markdown: "Link pressed " + key,
							})
							if err != nil {
								c.logger.Error("failed to emit whisper", "error", err)
								return
							}
						},
					},
				},
			})
			if err != nil {
				c.logger.Error("failed to emit whisper", "error", err)
			}
		}()

		return nil
	}

	c.logger.Error("received response code of", response.ResponseCode)
	return nil
}

// LoopStop is called by the host when the plugin is stopped
func (c *Loop) LoopStop() error {
	c.logger.Info("controller LoopStop called")
	c.cancel()

	return nil
}
