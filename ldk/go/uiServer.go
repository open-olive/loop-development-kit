package ldk

import (
	"context"
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type UIServer struct {
	Impl UIService
}

func (u *UIServer) GlobalSearchStream(req *proto.GlobalSearchStreamRequest, server proto.UI_GlobalSearchStreamServer) error {
	handler := func(search string, err error) {
		var errText string
		if err != nil {
			errText = err.Error()
		}
		if err := server.Send(&proto.GlobalSearchStreamResponse{
			Text:  search,
			Error: errText,
		}); err != nil {
			fmt.Println("error => ", err.Error())
		}
	}
	go func() {
		err := u.Impl.ListenGlobalSearch(
			context.WithValue(server.Context(), Session{}, NewSessionFromProto(req.Session)),
			handler)
		if err != nil {
			fmt.Println("error => ", err.Error())
		}
	}()
	<-server.Context().Done()
	return nil
}

func (u *UIServer) SearchbarStream(req *proto.SearchbarStreamRequest, server proto.UI_SearchbarStreamServer) error {
	handler := func(search string, err error) {
		var errText string
		if err != nil {
			errText = err.Error()
		}
		if err := server.Send(&proto.SearchbarStreamResponse{
			Text:  search,
			Error: errText,
		}); err != nil {
			fmt.Println("error => ", err.Error())
		}
	}
	go func() {
		err := u.Impl.ListenSearchbar(
			context.WithValue(server.Context(), Session{}, NewSessionFromProto(req.Session)),
			handler,
		)
		if err != nil {
			fmt.Println("error => ", err.Error())
		}
	}()
	<-server.Context().Done()
	return nil
}
