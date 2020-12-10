package loop

import (
	"context"
	"encoding/json"
	"net/http"
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
	l := ldk.NewLogger("example-network")
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
	c.logger.Info("Starting example network controller loop")
	c.ctx, c.cancel = context.WithCancel(context.Background())

	c.sidekick = sidekick

	now := time.Now()

	response, err := sidekick.Network().HTTPRequest(c.ctx, &ldk.HTTPRequest{
		URL:    "https://api.fda.gov/food/enforcement.json?search=report_date:[" + now.AddDate(0, -3, 0).Format("20060102") + "+TO+" + now.Format("20060102") + "]&limit=1",
		Method: "GET",
		Body:   nil,
		Headers: map[string]string{
			"A-Header-Name": "a header value",
		},
	})
	if err != nil {
		c.logger.Error("received error from callback", err)
		return err
	}

	if response.ResponseCode == 200 {
		var headers http.Header
		var data apiResponse

		if err := json.Unmarshal(response.Headers, &headers); err != nil {
			c.logger.Error("Error unmarshaling response headers", err)
			return err
		}

		c.logger.Info("Response headers", headers)

		if err := json.Unmarshal(response.Data, &data); err != nil {
			c.logger.Error("Error unmarshaling response payload", err)
			return err
		}

		recallItem := data.Results[0]

		go func() {
			err := c.sidekick.Whisper().List(c.ctx, &ldk.WhisperContentList{
				Label: "Latest FDA Recall",
				Elements: map[string]ldk.WhisperContentListElement{
					"topMessage": &ldk.WhisperContentListElementMessage{
						Style:  ldk.WhisperContentListElementStyleNone,
						Header: recallItem.Firm,
						Body:   recallItem.Description,
						Align:  ldk.WhisperContentListElementAlignLeft,
						Order:  0,
					},
					"sectionDivider": &ldk.WhisperContentListElementDivider{
						Order: 1,
					},
					"reason": &ldk.WhisperContentListElementPair{
						Label: "Reason",
						Order: 2,
						Value: recallItem.Reason,
					},
					"distribution": &ldk.WhisperContentListElementPair{
						Label: "Distribution",
						Order: 3,
						Value: recallItem.Distribution,
					},
					"quantity": &ldk.WhisperContentListElementPair{
						Label: "Quantity",
						Order: 4,
						Value: recallItem.Quantity,
					},
					"codes": &ldk.WhisperContentListElementPair{
						Extra: true,
						Label: "Codes",
						Order: 5,
						Value: recallItem.Codes,
					},
					"id": &ldk.WhisperContentListElementPair{
						Extra: true,
						Label: "Recall number",
						Order: 6,
						Value: recallItem.ID,
					},
					"date": &ldk.WhisperContentListElementPair{
						Extra: true,
						Label: "Date initiated",
						Order: 7,
						Value: recallItem.Date,
					},
					"recallType": &ldk.WhisperContentListElementPair{
						Extra: true,
						Label: "Recall type",
						Order: 8,
						Value: recallItem.RecallType,
					},
					"type": &ldk.WhisperContentListElementPair{
						Extra: true,
						Label: "Product type",
						Order: 9,
						Value: recallItem.Type,
					},
					"classification": &ldk.WhisperContentListElementPair{
						Extra: true,
						Label: "Classification",
						Order: 10,
						Value: recallItem.Classification,
					},
					"address": &ldk.WhisperContentListElementPair{
						Extra: true,
						Label: "Company address",
						Order: 11,
						Value: recallItem.Address1 + " " + recallItem.Address2 + " " + recallItem.City + ", " + recallItem.State + " " + recallItem.Zip + " " + recallItem.Country,
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
