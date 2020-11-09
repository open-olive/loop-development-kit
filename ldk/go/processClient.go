package ldk

import (
	"context"
	"errors"
	"io"

	"github.com/open-olive/loop-development-kit/ldk/go/proto"
)

type ProcessClient struct {
	client  proto.ProcessClient
	session *Session
}

func convertToProcessInfo(pi *proto.ProcessInfo) ProcessInfo {
	return ProcessInfo{
		Arguments: pi.Arguments,
		Command:   pi.Command,
		PID:       int(pi.Pid),
	}
}

func convertToProcessEvent(pi *proto.ProcessStateStreamResponse) ProcessEvent {
	return ProcessEvent{
		Process: convertToProcessInfo(pi.Process),
		Action:  ProcessAction(pi.Action),
	}
}

func (p *ProcessClient) State() ([]ProcessInfo, error) {
	msg := &proto.ProcessStateRequest{Session: p.session.ToProto()}
	ctx, cancel := context.WithTimeout(context.Background(), grpcTimeout)
	defer cancel()
	resp, err := p.client.ProcessState(ctx, msg)
	if err != nil {
		return nil, err
	}
	processes := resp.GetProcesses()
	var pis []ProcessInfo
	for _, pi := range processes {
		pis = append(pis, convertToProcessInfo(pi))
	}
	return pis, err
}

func (p *ProcessClient) ListenState(ctx context.Context, handler ListenProcessStateHandler) error {
	msg := &proto.ProcessStateStreamRequest{Session: p.session.ToProto()}
	client, err := p.client.ProcessStateStream(ctx, msg)
	if err != nil {
		return err
	}

	go func() {
		for {
			resp, err := client.Recv()
			if err == io.EOF {
				break
			}
			if err != nil {
				handler(convertToProcessEvent(resp), err)
				return
			}
			if resp.GetError() != "" {
				err = errors.New(resp.GetError())
			}
			handler(convertToProcessEvent(resp), err)
		}
	}()

	return nil
}
