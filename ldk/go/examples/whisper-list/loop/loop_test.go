package loop_test

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/google/go-cmp/cmp"
	loop "github.com/open-olive/loop-development-kit/ldk/go/examples/whisper-list/loop"
	ldk "github.com/open-olive/loop-development-kit/ldk/go/v2"
	ldktest "github.com/open-olive/loop-development-kit/ldk/go/v2/ldk-test"
)

func TestLoop(t *testing.T) {
	type listRequest struct {
		ctx context.Context
		w   *ldk.WhisperContentList
	}
	type listResponse struct {
		err error
	}
	listRequestChan := make(chan listRequest)
	listResponseChan := make(chan listResponse)

	sidekick := &ldktest.Sidekick{
		WhisperService: &ldktest.WhisperService{
			Listf: func(ctx context.Context, w *ldk.WhisperContentList) error {
				listRequestChan <- listRequest{ctx, w}
				res := <-listResponseChan
				return res.err
			},
		},
	}

	l := ldk.NewLogger("example-whisper-list")
	c, err := loop.NewLoop(l)
	if err != nil {
		t.Fatal(err)
	}
	if err := c.LoopStart(sidekick); err != nil {
		t.Fatal(err)
	}

	defer func() {
		if err := c.LoopStop(); err != nil {
			t.Fatal(err)
		}
	}()

	// stage 1: get list whisper
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case req := <-listRequestChan:
			exp := &ldk.WhisperContentList{
				Label: "MCMG Location",
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
					"link": &ldk.WhisperContentListElementLink{
						Align: ldk.WhisperContentListElementAlignCenter,
						Extra: true,
						Href:  "https://isitchristmas.com/",
						Order: 18,
						Style: ldk.WhisperContentListElementStyleNone,
						Text:  "IsItChristmas.com",
					},
				},
			}
			if got := req.w; !cmp.Equal(got, exp) {
				t.Errorf("unexpected whisper content:\n%s\n", cmp.Diff(got, exp))
			}
			return nil
		}
	}()); err != nil {
		t.Errorf("stage 1 failed\n%v", err)
		return
	}

	// stage 2: simulate closing list whisper
	if err := (func() error {
		timeout := time.NewTimer(time.Second)
		defer timeout.Stop()
		select {
		case <-timeout.C:
			return errors.New("timeout")
		case listResponseChan <- listResponse{
			err: nil,
		}:
			return nil
		}
	}()); err != nil {
		t.Errorf("stage 2 failed\n%v", err)
		return
	}
}
