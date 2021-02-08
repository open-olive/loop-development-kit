package main

import (
	"context"
	"fmt"
	ldk "github.com/open-olive/loop-development-kit/ldk/go"
	"os"
	"path/filepath"
	"time"
)

func main() {
	logger := ldk.NewLogger("self-test-loop-go")
	loop := &Loop{
		logger: logger,
		statusReporter: NewStatusReporter(logger),
	}

	ldk.ServeLoopPlugin(logger, loop)
}

type Loop struct {
	ctx    context.Context
	cancel context.CancelFunc

	sidekick ldk.Sidekick
	logger   *ldk.Logger

	testData       TestData
	statusReporter *StatusReporter
}

type TestData struct {
	dirPath  string
	filePath string
	file     ldk.File
}

func (loop *Loop) LoopStart(sidekick ldk.Sidekick) error {
	loop.sidekick = sidekick
	loop.ctx, loop.cancel = context.WithCancel(context.Background())

	err := loop.prepareTestData()
	if err != nil {
		return err
	}

	err = loop.startListeners()
	if err != nil {
		return err
	}

	err = loop.emitPlaygroundWhisper()
	if err != nil {
		return err
	}

	return nil
}

func (loop *Loop) LoopStop() error {
	err := loop.cleanupTestData()
	if err != nil {
		return err
	}

	loop.statusReporter.cancel()
	loop.cancel()
	return nil
}

func (loop *Loop) startListeners() error {
	err := loop.listenToClipboard()
	if err != nil {
		return err
	}

	err = loop.listenToKeyboard()
	if err != nil {
		return err
	}

	// todo: not functioning; cursor listen position blocks forever
	//err = loop.listenToCursor()
	//if err != nil {
	//	loop.logger.Error(err.Error())
	//	return err
	//}

	err = loop.listenToWindow()
	if err != nil {
		return err
	}

	err = loop.listenToUI()
	if err != nil {
		return err
	}

	err = loop.listenToProcess()
	if err != nil {
		return err
	}

	err = loop.listenToFilesystem()
	if err != nil {
		return err
	}

	loop.logger.Info("all listeners started")
	return nil
}

func (loop *Loop) listenToClipboard() error {
	err := loop.sidekick.Clipboard().Listen(loop.ctx, loop.clipboardHandler())
	if err != nil {
		loop.logger.Error("clipboard listen error", err)
	}
	return err
}

func (loop *Loop) listenToKeyboard() error {
	err := loop.sidekick.Keyboard().ListenText(loop.ctx, loop.keyboardTextHandler())
	if err != nil {
		loop.logger.Error("keyboard text listen error", err)
		return err
	}

	err = loop.sidekick.Keyboard().ListenCharacter(loop.ctx, loop.keyboardCharacterHandler())
	if err != nil {
		loop.logger.Error("keyboard character listen error", err)
		return err
	}

	err = loop.sidekick.Keyboard().ListenHotkey(loop.ctx,
		ldk.Hotkey{Key: 'a', Modifiers: ldk.KeyModifierControl},
		loop.keyboardHotkeyHandler())
	if err != nil {
		loop.logger.Error("keyboard hotkey listen error", err)
		return err
	}

	err = loop.sidekick.Keyboard().ListenScancode(loop.ctx, loop.keyboardScancodeHandler())
	if err != nil {
		loop.logger.Error("keyboard scancode listen error", err)
	}

	return err
}

func (loop *Loop) listenToCursor() error {
	err := loop.sidekick.Cursor().ListenPosition(loop.ctx, loop.cursorPositionHandler())
	if err != nil {
		loop.logger.Error("cursor position listen error", err)
	}
	return err
}

func (loop *Loop) listenToWindow() error {
	err := loop.sidekick.Window().ListenActiveWindow(loop.ctx, loop.activeWindowHandler())
	if err != nil {
		loop.logger.Error("active window listen error", err)
		return err
	}

	err = loop.sidekick.Window().ListenState(loop.ctx, loop.windowStateHandler())
	if err != nil {
		loop.logger.Error("window state listen error", err)
	}

	return err
}

func (loop *Loop) listenToUI() error {
	err := loop.sidekick.UI().ListenGlobalSearch(loop.ctx, loop.globalSearchHandler())
	if err != nil {
		loop.logger.Error("global search listen error", err)
		return err
	}

	err = loop.sidekick.UI().ListenSearchbar(loop.ctx, loop.searchbarHandler())
	if err != nil {
		loop.logger.Error("searchbar listen error", err)
	}
	return err
}

func (loop *Loop) listenToProcess() error {
	err := loop.sidekick.Process().ListenState(loop.ctx, loop.processStateHandler())
	if err != nil {
		loop.logger.Error("process state listen error", err)
	}
	return err
}

func (loop *Loop) listenToFilesystem() error {
	err := loop.sidekick.Filesystem().ListenFile(loop.ctx, loop.testData.filePath, loop.fileHandler())
	if err != nil {
		loop.logger.Error("file listen error", err)
		return err
	}

	//err = loop.sidekick.Filesystem().ListenDir(loop.ctx, loop.testData.dirPath, loop.dirHandler())
	//if err != nil {
	//	loop.logger.Error("dir listen error", err)
	//}

	return err
}

func (loop *Loop) clipboardHandler() ldk.ReadListenHandler {
	return func(text string, err error) {
		if err != nil {
			loop.logger.Error("clipboard callback error", err)
			return
		}

		loop.statusReporter.Report("clipboard", text)
	}
}

func (loop *Loop) keyboardTextHandler() ldk.ListenTextHandler {
	return func(text string, err error) {
		if err != nil {
			loop.logger.Error("keyboard text callback error", err)
			return
		}

		loop.statusReporter.Report("keyboardText", text)
	}
}

func (loop *Loop) keyboardCharacterHandler() ldk.ListenCharacterHandler {
	return func(char rune, err error) {
		if err != nil {
			loop.logger.Error("keyboard character callback error", err)
			return
		}

		loop.statusReporter.Report("keyboardCharacter", string(char))
	}
}

func (loop *Loop) keyboardHotkeyHandler() ldk.ListenHotkeyHandler {
	return func(scanned bool, err error) {
		if err != nil {
			loop.logger.Error("keyboard hotkey callback error", err)
			return
		}

		loop.statusReporter.Report("keyboardHotkey", scanned)
	}
}

func (loop *Loop) keyboardScancodeHandler() ldk.ListenScancodeHandler {
	return func(event ldk.ScancodeEvent, err error) {
		if err != nil {
			loop.logger.Error("keyboard scancode callback error", err)
			return
		}

		loop.statusReporter.Report("keyboardScancode", event)
	}
}

func (loop *Loop) cursorPositionHandler() ldk.ListenPositionHandler {
	return func(position ldk.CursorPosition, err error) {
		if err != nil {
			loop.logger.Error("cursor position callback error", err)
			return
		}

		loop.statusReporter.Report("cursorPosition", position)
	}
}

func (loop *Loop) activeWindowHandler() ldk.ListenActiveWindowHandler {
	return func(windowInfo ldk.WindowInfo, err error) {
		if err != nil {
			loop.logger.Error("active window callback error", err)
			return
		}

		loop.statusReporter.Report("activeWindow", windowInfo)
	}
}

func (loop *Loop) windowStateHandler() ldk.ListenWindowStateHandler {
	return func(event ldk.WindowEvent, err error) {
		if err != nil {
			loop.logger.Error("window state callback error", err)
			return
		}

		loop.statusReporter.Report("windowState", event)
	}
}

func (loop *Loop) globalSearchHandler() ldk.ListenSearchHandler {
	return func(query string, err error) {
		if err != nil {
			loop.logger.Error("global search callback error", err)
			return
		}

		loop.statusReporter.Report("globalSearch", query)
	}
}

func (loop *Loop) searchbarHandler() ldk.ListenSearchHandler {
	return func(query string, err error) {
		if err != nil {
			loop.logger.Error("searchbar callback error", err)
			return
		}

		loop.statusReporter.Report("searchbar", query)
	}
}

func (loop *Loop) processStateHandler() ldk.ListenProcessStateHandler {
	return func(event ldk.ProcessEvent, err error) {
		if err != nil {
			loop.logger.Error("process state callback error", err)
			return
		}

		loop.statusReporter.Report("processState", event)
	}
}

func (loop *Loop) fileHandler() ldk.ListenFileHandler {
	return func(event ldk.FileEvent, err error) {
		if err != nil {
			loop.logger.Error("file callback error", err)
			return
		}

		loop.statusReporter.Report("file", event)
	}
}

func (loop *Loop) dirHandler() ldk.ListenDirHandler {
	return func(event ldk.FileEvent, err error) {
		if err != nil {
			loop.logger.Error("dir callback error", err)
			return
		}

		loop.statusReporter.Report("dir", event)
	}
}

func (loop *Loop) prepareTestData() error {
	dirName := fmt.Sprintf("loop_example_%d", time.Now().UnixNano())
	dirPath := filepath.Join(os.TempDir(), dirName)
	err := loop.sidekick.Filesystem().MakeDir(loop.ctx, dirPath, 0755)
	if err != nil {
		return err
	}

	filePath := filepath.Join(dirPath, "example_file")
	file, err := loop.sidekick.Filesystem().Create(loop.ctx, filePath)
	if err != nil {
		loop.logger.Error("create file error")
		return err
	}
	// todo: this will block forever
	// defer file.Close()

	_, err = file.Write([]byte("data\n"))
	if err != nil {
		return err
	}

	loop.testData = TestData{
		dirPath:  dirPath,
		filePath: filePath,
		file:     file,
	}

	return nil
}

func (loop *Loop) cleanupTestData() error {
	err := loop.sidekick.Filesystem().Remove(loop.ctx, loop.testData.filePath, false)
	if err != nil {
		return err
	}

	err = loop.sidekick.Filesystem().Remove(loop.ctx, loop.testData.dirPath, true)
	if err != nil {
		return err
	}

	return nil
}

type OnChangeFn func(string)
type OnChangeGenerator func(loop *Loop) OnChangeFn
func (loop *Loop) emitPlaygroundWhisper() error {
	var order uint32 = 0
	makeLink := func(label string, fn OnChangeGenerator) ldk.WhisperContentDisambiguationElement {
		order++
		return &ldk.WhisperContentDisambiguationElementOption{
			Label:    label,
			Order:    order,
			OnChange: fn(loop),
		}
	}

	_, err := loop.sidekick.Whisper().Disambiguation(loop.ctx, &ldk.WhisperContentDisambiguation{
		Label:    "Actions",
		Elements: map[string]ldk.WhisperContentDisambiguationElement{
			"CLEAR":                makeLink("CLEAR", onClickClear),
			"NETWORK_HTTP_REQUEST": makeLink("Network: HTTPRequest", onClickNetworkHttpRequest),
			"CLIPBOARD_READ":       makeLink("Clipboard: Read", onClickClipboardRead),
			"CLIPBOARD_WRITE":      makeLink("Clipboard: Write", onClickClipboardWrite),
			"STORAGE_READ":         makeLink("Storage: Read", onClickStorageRead),
			"STORAGE_WRITE":        makeLink("Storage: Write", onClickStorageWrite),
			"STORAGE_EXISTS":       makeLink("Storage: Exists", onClickStorageExists),
			"STORAGE_DELETE":       makeLink("Storage: Delete", onClickStorageDelete),
			"WINDOW_ACTIVE_WINDOW": makeLink("Window: Active Window", onClickActiveWindow),
			"WINDOW_STATE":         makeLink("Window: State", onClickWindowState),
			"PROCESS_STATE":        makeLink("Process: State", onClickProcessState),
			"CURSOR_POSITION":      makeLink("Cursor: Position", onClickCursorPosition),
		},
	})

	return err
}

func onClickClear(loop *Loop) OnChangeFn {
	return func(_ string) {
		loop.statusReporter.WipeAll()
	}
}

func onClickNetworkHttpRequest(loop *Loop) OnChangeFn {
	return func(_ string) {
		response, err := loop.sidekick.Network().HTTPRequest(loop.ctx, &ldk.HTTPRequest{
			URL:     "http://www.google.com",
			Method:  "GET",
		})
		if err != nil {
			loop.logger.Error("http request error", err)
		}

		type truncatedResponse struct {
			ResponseCode int
			Headers      map[string][]string
		}
		loop.statusReporter.Report("onClickHttpRequest", truncatedResponse{
			ResponseCode: response.ResponseCode,
			Headers: response.Headers,
		})
	}
}

func onClickClipboardRead(loop *Loop) OnChangeFn {
	return func(_ string) {
		text, err := loop.sidekick.Clipboard().Read(loop.ctx)
		if err != nil {
			loop.logger.Error("clipboard read error", err)
		}
		loop.statusReporter.Report("onClickClipboardRead", text)
	}
}

func onClickClipboardWrite(loop *Loop) OnChangeFn {
	str := "PASTE ME"
	return func(_ string) {
		err := loop.sidekick.Clipboard().Write(loop.ctx, str)
		if err != nil {
			loop.logger.Error("clipboard write error", err)
		}
		loop.statusReporter.Wipe("onClickClipboardRead")
		loop.statusReporter.Report("onClickClipboardWrite", str)
	}
}

const storageTestKey = "TEST_KEY"
const storageTestValue = "TEST_VALUE"
func onClickStorageRead(loop *Loop) OnChangeFn {
	return func(_ string) {
		value, err := loop.sidekick.Storage().Read(loop.ctx, storageTestKey)
		if err != nil {
			loop.logger.Error("storage read error", err)
		}
		loop.statusReporter.Report("onClickStorageRead", map[string]string{
			storageTestKey: value,
		})
	}
}

func onClickStorageWrite(loop *Loop) OnChangeFn {
	return func(_ string) {
		err := loop.sidekick.Storage().Write(loop.ctx, storageTestKey, storageTestValue)
		if err != nil {
			loop.logger.Error("storage write error", err)
		}

		loop.statusReporter.Wipe("onClickStorageDelete")
		loop.statusReporter.Wipe("onClickStorageExists")
		loop.statusReporter.Wipe("onClickStorageRead")
		loop.statusReporter.Report("onClickStorageWrite", map[string]string{
			storageTestKey: storageTestValue,
		})
	}
}

func onClickStorageExists(loop *Loop) OnChangeFn {
	return func(_ string) {
		exists, err := loop.sidekick.Storage().Exists(loop.ctx, storageTestKey)
		if err != nil {
			loop.logger.Error("storage exists error", err)
		}
		loop.statusReporter.Wipe("onClickStorageDelete")
		loop.statusReporter.Wipe("onClickStorageRead")
		loop.statusReporter.Wipe("onClickStorageWrite")
		loop.statusReporter.Report("onClickStorageExists", exists)
	}
}

func onClickStorageDelete(loop *Loop) OnChangeFn {
	return func(_ string) {
		err := loop.sidekick.Storage().Delete(loop.ctx, storageTestKey)
		if err != nil {
			loop.logger.Error("storage delete error", err)
		}
		loop.statusReporter.Wipe("onClickStorageExists")
		loop.statusReporter.Wipe("onClickStorageRead")
		loop.statusReporter.Wipe("onClickStorageWrite")
		loop.statusReporter.Report("onClickStorageDelete", storageTestKey + " deleted")
	}
}

func onClickActiveWindow(loop *Loop) OnChangeFn {
	return func(_ string) {
		info, err := loop.sidekick.Window().ActiveWindow(loop.ctx)
		if err != nil {
			loop.logger.Error("active window error", err)
		}
		loop.statusReporter.Report("onClickActiveWindow", info)
	}
}

func onClickWindowState(loop *Loop) OnChangeFn {
	return func(_ string) {
		info, err := loop.sidekick.Window().State(loop.ctx)
		if err != nil {
			loop.logger.Error("window state error", err)
		}
		loop.statusReporter.Report("onClickWindowState", info)
	}
}

func onClickProcessState(loop *Loop) OnChangeFn {
	return func(_ string) {
		info, err := loop.sidekick.Process().State(loop.ctx)
		if err != nil {
			loop.logger.Error("process state error", err)
		}
		loop.statusReporter.Report("onClickProcessState", info)
	}
}

func onClickCursorPosition(loop *Loop) OnChangeFn {
	return func(_ string) {
		position, err := loop.sidekick.Cursor().Position(loop.ctx)
		if err != nil {
			loop.logger.Error("cursor position error", err)
		}
		loop.statusReporter.Report("onClickCursorPosition", position)
	}
}
