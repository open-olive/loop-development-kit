package main

import (
	"context"
	"encoding/json"
	"fmt"
	ldk "github.com/open-olive/loop-development-kit/ldk/go"
	"sort"
	"strings"
	"sync"
	"time"
)

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
		wiper: wiper,
		wipeAll: wipeAll,
		ctx: ctx,
		cancel: cancel,
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

func (sr *StatusReporter) worker(logger *ldk.Logger) {
	aggregation := make(map[string]string)
	aggregationMutex := sync.RWMutex{}

	printerCtx, printerCancel := context.WithCancel(sr.ctx)
	go func() {
		for {
			select {
			case <-printerCtx.Done():
				return
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

				time.Sleep(1 * time.Second)
			}
		}
	}()

	for {
		select {
		case s := <-sr.aggregator:
			func() {
				aggregationMutex.Lock()
				defer aggregationMutex.Unlock()

				aggregation[s.handler] = s.status
			}()
		case <-sr.ctx.Done():
			logger.Info("status reporter stopping")
			printerCancel()
			return
		}
	}
}

func marshal(t interface{}) string {
	switch t.(type) {
	case bool:
		if t.(bool) {
			return "true"
		} else {
			return "false"
		}
	case string:
		return fmt.Sprintf("\"%s\"", t.(string))
	default:
		b, _ := json.Marshal(t)
		return string(b)
	}
}