package util

import (
	"context"
	"encoding/json"
	"fmt"
	ldk "github.com/open-olive/loop-development-kit/ldk/go"
	"os"
	"sort"
	"strings"
	"sync"
	"time"
)

const sleepTime = 1 * time.Second

type StatusReporter struct {
	aggregator chan handlerStatus
	wiper      chan string
	wipeAll    chan int
	ctx        context.Context
	cancel     context.CancelFunc
}

type handlerStatus struct {
	handler string
	status  string
}

func NewStatusReporter(logger *ldk.Logger) *StatusReporter {
	ctx, cancel := context.WithCancel(context.Background())
	aggregator := make(chan handlerStatus)
	wiper := make(chan string)
	wipeAll := make(chan int)

	sr := &StatusReporter{
		aggregator: aggregator,
		wiper:      wiper,
		wipeAll:    wipeAll,
		ctx:        ctx,
		cancel:     cancel,
	}
	go sr.worker(logger)
	return sr
}

func (sr *StatusReporter) Report(handlerName string, state interface{}) {
	go func() {
		sr.aggregator <- handlerStatus{
			handler: handlerName,
			status:  marshal(state),
		}
	}()
}

func (sr *StatusReporter) Wipe(handlerName string) {
	go func() {
		sr.wiper <- handlerName
	}()
}

func (sr *StatusReporter) WipeAll() {
	go func() {
		sr.wipeAll <- 0
	}()
}

func (sr *StatusReporter) Stop() {
	sr.cancel()
}

func (sr *StatusReporter) worker(logger *ldk.Logger) {
	aggregation := make(map[string]string)
	aggregationMutex := sync.RWMutex{}

	printerCtx, printerCancel := context.WithCancel(sr.ctx)
	printer := func() {
		for {
			select {
			case <-printerCtx.Done():
				return
			default:
				lines := func() []string {
					aggregationMutex.RLock()
					defer aggregationMutex.RUnlock()

					var lines []string
					for k, v := range aggregation {
						lines = append(lines, fmt.Sprintf("  - %s: %s", k, v))
					}
					return lines
				}()

				sort.Strings(lines)
				logger.Info(fmt.Sprintf("HANDLER STATUS:\n%s\n", strings.Join(lines, "\n")))

				time.Sleep(sleepTime)
			}
		}
	}

	go printer()
	for {
		select {
		case s := <-sr.aggregator:
			func() {
				aggregationMutex.Lock()
				defer aggregationMutex.Unlock()
				aggregation[s.handler] = s.status
			}()
		case keyToWipe := <-sr.wiper:
			func() {
				aggregationMutex.Lock()
				defer aggregationMutex.Unlock()
				delete(aggregation, keyToWipe)
			}()
		case <-sr.wipeAll:
			func() {
				aggregationMutex.Lock()
				defer aggregationMutex.Unlock()
				aggregation = make(map[string]string)
			}()
		case <-sr.ctx.Done():
			logger.Info("status reporter stopping")
			printerCancel()
			return
		}
	}
}

func marshal(t interface{}) string {
	type fileInfo struct {
		Name    string
		Size    int64
		Mode    os.FileMode
		ModTime time.Time
		IsDir   bool
	}

	type marshalableFileEvent struct {
		FileInfo fileInfo
		Action   ldk.FileAction
	}

	switch t.(type) {
	case bool:
		if t.(bool) {
			return "true"
		} else {
			return "false"
		}
	case string:
		return fmt.Sprintf("\"%s\"", t.(string))
	case ldk.FileEvent:
		fe := t.(ldk.FileEvent)
		b, _ := json.Marshal(marshalableFileEvent{
			FileInfo: fileInfo{
				Name:    fe.Info.Name(),
				Size:    fe.Info.Size(),
				Mode:    fe.Info.Mode(),
				ModTime: fe.Info.ModTime(),
				IsDir:   fe.Info.IsDir(),
			},
			Action: fe.Action,
		})
		return string(b)
	default:
		b, _ := json.Marshal(t)
		return string(b)
	}
}
