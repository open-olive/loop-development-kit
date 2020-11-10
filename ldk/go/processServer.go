package ldk

import (
	"context"
	"fmt"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type ProcessServer struct {
	Impl ProcessService
}

func convertProcessInfo(pi ProcessInfo) *proto.ProcessInfo {
	return &proto.ProcessInfo{
		Pid:       int32(pi.PID),
		Command:   pi.Command,
		Arguments: "",
	}
}

func (p *ProcessServer) ProcessStateStream(req *proto.ProcessStateStreamRequest, stream proto.Process_ProcessStateStreamServer) error {
	handler := func(event ProcessEvent, err error) {
		var errText string
		if err != nil {
			errText = err.Error()
		}
		if err := stream.Send(&proto.ProcessStateStreamResponse{
			Process: convertProcessInfo(event.Process),
			Action:  proto.ProcessAction(event.Action),
			Error:   errText,
		}); err != nil {
			fmt.Println("error => ", err.Error())
		}
	}
	go func() {
		err := p.Impl.ListenState(
			context.WithValue(stream.Context(), Session{}, NewSessionFromProto(req.Session)),
			handler,
		)
		if err != nil {
			fmt.Println("error => ", err.Error())
		}
	}()
	<-stream.Context().Done()
	return nil
}

func (p *ProcessServer) ProcessState(ctx context.Context, req *proto.ProcessStateRequest) (*proto.ProcessStateResponse, error) {
	processes, err := p.Impl.State(
		context.WithValue(ctx, Session{}, NewSessionFromProto(req.Session)),
	)
	if err != nil {
		return nil, err
	}
	var processPointers []*proto.ProcessInfo
	for _, pi := range processes {
		process := convertProcessInfo(pi)
		processPointers = append(processPointers, process)
	}
	return &proto.ProcessStateResponse{Processes: processPointers}, nil
}
