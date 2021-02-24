package loop

import (
	"context"

	ldk "github.com/open-olive/loop-development-kit/ldk/go"
)

func Serve() error {
	l := ldk.NewLogger("example-whisper-list")
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
	c.logger.Info("loopStart called")
	c.ctx, c.cancel = context.WithCancel(context.Background())
	c.sidekick = sidekick

	go func() {
		err := c.sidekick.Whisper().List(c.ctx, &ldk.WhisperContentList{
			Label: "MCMG Location",
			Markdown: "MCMG Location",
			Elements: map[string]ldk.WhisperContentListElement{
				"topMessage": &ldk.WhisperContentListElementMessage{
					Style:  ldk.WhisperContentListElementStyleNone,
					Header: "Hello World, I am a subitle",
					Body:   "This is what body copy looks like. Just a bit, don’t overdo it!",
					Align:  ldk.WhisperContentListElementAlignLeft,
					Order:  0,
				},
				"successMessage": &ldk.WhisperContentListElementMessage{
					Align:  ldk.WhisperContentListElementAlignCenter,
					Header: "This is an alert message!",
					Body:   "It should be highlighted green.",
					Style:  ldk.WhisperContentListElementStyleSuccess,
					Order:  1,
				},
				"sectionDivider": &ldk.WhisperContentListElementDivider{
					Order: 2,
				},
				"sectionTitle": &ldk.WhisperContentListElementMessage{
					Style:  ldk.WhisperContentListElementStyleNone,
					Header: "Let’s set the table",
					Align:  ldk.WhisperContentListElementAlignCenter,
					Order:  3,
				},
				"name": &ldk.WhisperContentListElementPair{
					Label: "Name",
					Order: 4,
					Value: "David Simon MD",
				},
				"shoeSize": &ldk.WhisperContentListElementPair{
					Label: "Shoe Size",
					Order: 5,
					Value: "38",
				},
				"birthDate": &ldk.WhisperContentListElementPair{
					Style: ldk.WhisperContentListElementStyleWarning,
					Label: "Birth Date",
					Order: 6,
					Value: "Feb 30th, 1999",
				},
				"favoriteColor": &ldk.WhisperContentListElementPair{
					Extra: true,
					Label: "FavoriteColor",
					Order: 7,
					Value: "Greige",
				},
				"favoriteAnimal": &ldk.WhisperContentListElementPair{
					Extra: true,
					Label: "Dogs or Cats",
					Order: 8,
					Value: "Bats",
				},
				"streetName": &ldk.WhisperContentListElementPair{
					Extra: true,
					Label: "Street Name",
					Order: 9,
					Value: "Main Street",
				},
				"zipCode": &ldk.WhisperContentListElementPair{
					Extra: true,
					Label: "Zip Code",
					Order: 10,
					Value: "10000",
				},
				"city": &ldk.WhisperContentListElementPair{
					Extra: true,
					Label: "City",
					Order: 11,
					Value: "Townsville",
				},
				"phone": &ldk.WhisperContentListElementPair{
					Extra: true,
					Label: "Phone",
					Order: 12,
					Value: "123-456-7890",
				},
				"favoriteCondiment": &ldk.WhisperContentListElementPair{
					Style: ldk.WhisperContentListElementStyleWarning,
					Extra: true,
					Label: "Favorite Condiment",
					Order: 13,
					Value: "Pizza",
				},
				"100MeterDashTime": &ldk.WhisperContentListElementPair{
					Extra: true,
					Label: "100m Dash Time",
					Order: 14,
					Value: "4 minutes",
				},
				"nickname": &ldk.WhisperContentListElementPair{
					Extra: true,
					Label: "Nickname",
					Order: 15,
					Value: "Old Greg",
				},
				"notes": &ldk.WhisperContentListElementPair{
					Extra: true,
					Label: "Notes",
					Order: 16,
					Value: "Lorem ipsum sit amet dolor why does this always feel like a decree by the ancient Romans? It’s just filler text.",
				},
				"failureMessage": &ldk.WhisperContentListElementMessage{
					Align:  ldk.WhisperContentListElementAlignCenter,
					Body:   "It should be highlighted red.",
					Extra:  true,
					Header: "This is an alert message!",
					Order:  17,
					Style:  ldk.WhisperContentListElementStyleError,
				},
				"link": &ldk.WhisperContentListElementLink {
					Align:  ldk.WhisperContentListElementAlignCenter,
					Extra: 	true,
					Href: 	"https://isitchristmas.com/",
					Order: 	18,
					Style:  ldk.WhisperContentListElementStyleNone,
					Text:	"IsItChristmas.com",
				},	
			},
		})
		if err != nil {
			c.logger.Error("failed to emit whisper", "error", err)
		}
	}()

	return nil
}

// LoopStop is called by the host when the plugin is stopped
func (c *Loop) LoopStop() error {
	c.logger.Info("loopStop called")
	c.cancel()

	return nil
}
