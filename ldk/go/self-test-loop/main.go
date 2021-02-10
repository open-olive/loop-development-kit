package main

import (
	"context"
	"crypto/rand"
	"errors"
	"fmt"
	ldk "github.com/open-olive/loop-development-kit/ldk/go"
	"os"
	"path/filepath"
	"strconv"
	"time"
)

const storageTestKey = "TEST_KEY"
const storageTestValue = "TEST_VALUE"
const testFileSize = 512

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
	playgroundCancel context.CancelFunc
}

type TestData struct {
	dirPath  string
	filePath string
	file     ldk.File
}

func (loop *Loop) LoopStart(sidekick ldk.Sidekick) error {
	loop.sidekick = sidekick
	loop.ctx, loop.cancel = context.WithCancel(context.Background())

	err := loop.testFileWrite()
	if err != nil {
		return err
	}

	err = loop.startListeners()
	if err != nil {
		return err
	}

	playgroundCtx, playgroundCancel := context.WithCancel(loop.ctx)
	loop.playgroundCancel = playgroundCancel
	loop.emitPlaygroundWhisper(playgroundCtx)

	return nil
}

func (loop *Loop) LoopStop() error {
	err := loop.cleanupTestData()
	if err != nil {
		return err
	}

	loop.playgroundCancel()
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

func (loop *Loop) testFileWrite() error {
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

	loop.statusReporter.Report("testFileWrite", filePath)

	randomBuffer := make([]byte, testFileSize)
	bn, err := rand.Read(randomBuffer)
	if err != nil {
		return err
	}

	nw, err := file.Write(randomBuffer)
	if err != nil {
		loop.logger.Error("file write error")
		return err
	}
	if bn != nw {
		loop.logger.Error("num bytes written differs from num bytes generated", map[string]string{
			"generated": strconv.Itoa(bn),
			"written": strconv.Itoa(nw),
		})
	}

	rFile, err := loop.sidekick.Filesystem().Open(loop.ctx, filePath)
	if err != nil {
		loop.logger.Error("file open error")
		return err
	}

	buffer := make([]byte, testFileSize)
	nr, err := rFile.Read(buffer)
	if err != nil {
		loop.logger.Error("file read error")
		return err
	}
	if nr != nw {
		loop.logger.Error("num bytes read differs from num bytes written", map[string]string{
			"read": strconv.Itoa(nr),
			"written": strconv.Itoa(nw),
		})
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

func (loop *Loop) emitPlaygroundWhisper(ctx context.Context) {
	go func() {
		restarted := false
		for {
			select {
				case <-ctx.Done():
					return
				default:
					if restarted {
						loop.logger.Info("RESTARTING PLAYGROUND WHISPER")
					}
					_, err := loop.sidekick.Whisper().Disambiguation(loop.ctx, &ldk.WhisperContentDisambiguation{
						Label:    "Actions",
						Elements: map[string]ldk.WhisperContentDisambiguationElement{
							"CLEAR_ALL": &ldk.WhisperContentDisambiguationElementOption{
								Label:    "CLEAR ALL",
								Order:    0,
								OnChange: onClickClear(loop),
							},
							"NETWORK_HEADER": &ldk.WhisperContentDisambiguationElementText{
								Body:  "Network",
								Order: 1,
							},
							"NETWORK_HTTP_REQUEST": &ldk.WhisperContentDisambiguationElementOption{
								Label:    "Network: HTTP Request",
								Order:    2,
								OnChange: onClickNetworkHttpRequest(loop),
							},
							"CLIPBOARD_HEADER": &ldk.WhisperContentDisambiguationElementText{
								Body:  "Clipboard",
								Order: 3,
							},
							"CLIPBOARD_READ": &ldk.WhisperContentDisambiguationElementOption{
								Label:    "Clipboard: Read",
								Order:    4,
								OnChange: onClickClipboardRead(loop),
							},
							"CLIPBOARD_WRITE": &ldk.WhisperContentDisambiguationElementOption{
								Label:    "Clipboard: Write",
								Order:    5,
								OnChange: onClickClipboardWrite(loop),
							},
							"STORAGE_HEADER": &ldk.WhisperContentDisambiguationElementText{
								Body:  "Storage",
								Order: 6,
							},
							"STORAGE_READ": &ldk.WhisperContentDisambiguationElementOption{
								Label:    "Storage: Read",
								Order:    7,
								OnChange: onClickStorageRead(loop),
							},
							"STORAGE_WRITE": &ldk.WhisperContentDisambiguationElementOption{
								Label:    "Storage: Write",
								Order:    8,
								OnChange: onClickStorageWrite(loop),
							},
							"STORAGE_EXISTS": &ldk.WhisperContentDisambiguationElementOption{
								Label:    "Storage: Exists",
								Order:    9,
								OnChange: onClickStorageExists(loop),
							},
							"STORAGE_DELETE": &ldk.WhisperContentDisambiguationElementOption{
								Label:    "Storage: Delete",
								Order:    10,
								OnChange: onClickStorageDelete(loop),
							},
							"WINDOW_HEADER": &ldk.WhisperContentDisambiguationElementText{
								Body:  "Window",
								Order: 11,
							},
							"WINDOW_ACTIVE_WINDOW": &ldk.WhisperContentDisambiguationElementOption{
								Label:    "Window: Active Window",
								Order:    12,
								OnChange: onClickActiveWindow(loop),
							},
							"WINDOW_STATE": &ldk.WhisperContentDisambiguationElementOption{
								Label:    "Window: State",
								Order:    13,
								OnChange: onClickWindowState(loop),
							},
							"PROCESS_HEADER": &ldk.WhisperContentDisambiguationElementText{
								Body:  "Process",
								Order: 14,
							},
							"PROCESS_STATE": &ldk.WhisperContentDisambiguationElementOption{
								Label:    "Process: State",
								Order:    15,
								OnChange: onClickProcessState(loop),
							},
							"CURSOR_HEADER": &ldk.WhisperContentDisambiguationElementText{
								Body:  "Cursor",
								Order: 16,
							},
							"CURSOR_POSITION": &ldk.WhisperContentDisambiguationElementOption{
								Label:    "Cursor: Position",
								Order:    17,
								OnChange: onClickCursorPosition(loop),
							},
							"UTILITIES_HEADER": &ldk.WhisperContentDisambiguationElementText{
								Body:  "Utilities",
								Order: 18,
							},
							"FILESYSTEM": &ldk.WhisperContentDisambiguationElementOption{
								Label:    "Filesystem (Opens Form Whisper)",
								Order:    19,
								OnChange: onClickFilesystem(loop),
							},
							"WHISPER": &ldk.WhisperContentDisambiguationElementOption{
								Label:    "Whisper (Opens Disambiguation Whisper)",
								Order:    20,
								OnChange: onClickWhisper(loop),
							},
						},
					})
					if err != nil {
						loop.logger.Error("action disambiguation whisper error", err)
					}
					restarted = true
			}
		}
	}()
}

func onClickClear(loop *Loop) func(string) {
	return func(_ string) {
		loop.statusReporter.WipeAll()
	}
}

func onClickNetworkHttpRequest(loop *Loop) func(string) {
	return func(_ string) {
		response, err := loop.sidekick.Network().HTTPRequest(loop.ctx, &ldk.HTTPRequest{
			URL:     "http://oliveai.com",
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

func onClickClipboardRead(loop *Loop) func(string) {
	return func(_ string) {
		text, err := loop.sidekick.Clipboard().Read(loop.ctx)
		if err != nil {
			loop.logger.Error("clipboard read error", err)
		}
		loop.statusReporter.Report("onClickClipboardRead", text)
	}
}

func onClickClipboardWrite(loop *Loop) func(string) {
	return func(_ string) {
		str := "PASTE ME"
		err := loop.sidekick.Clipboard().Write(loop.ctx, str)
		if err != nil {
			loop.logger.Error("clipboard write error", err)
		}
		loop.statusReporter.Wipe("onClickClipboardRead")
		loop.statusReporter.Report("onClickClipboardWrite", str)
	}
}

func onClickStorageRead(loop *Loop) func(string) {
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

func onClickStorageWrite(loop *Loop) func(string) {
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

func onClickStorageExists(loop *Loop) func(string) {
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

func onClickStorageDelete(loop *Loop) func(string) {
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

func onClickActiveWindow(loop *Loop) func(string) {
	return func(_ string) {
		info, err := loop.sidekick.Window().ActiveWindow(loop.ctx)
		if err != nil {
			loop.logger.Error("active window error", err)
		}
		loop.statusReporter.Report("onClickActiveWindow", info)
	}
}

func onClickWindowState(loop *Loop) func(string) {
	return func(_ string) {
		info, err := loop.sidekick.Window().State(loop.ctx)
		if err != nil {
			loop.logger.Error("window state error", err)
		}
		loop.statusReporter.Report("onClickWindowState", info)
	}
}

func onClickProcessState(loop *Loop) func(string) {
	return func(_ string) {
		info, err := loop.sidekick.Process().State(loop.ctx)
		if err != nil {
			loop.logger.Error("process state error", err)
		}
		loop.statusReporter.Report("onClickProcessState", info)
	}
}

func onClickCursorPosition(loop *Loop) func(string) {
	return func(_ string) {
		position, err := loop.sidekick.Cursor().Position(loop.ctx)
		if err != nil {
			loop.logger.Error("cursor position error", err)
		}
		loop.statusReporter.Report("onClickCursorPosition", position)
	}
}

func onClickFilesystem(loop *Loop) func(string) {
	return func(_ string) {
		go func() {
			_, output, err := loop.sidekick.Whisper().Form(loop.ctx, &ldk.WhisperContentForm{
				Label: "Filesystem Operation Tester",
				Markdown: "Pair an operation with a target file",
				Inputs: map[string]ldk.WhisperContentFormInput{
					"Operation": &ldk.WhisperContentFormInputSelect{
						Label: "Operation",
						Options: []string{
							"Dir",
							"Open",
							"Create",
							"MakeDir",
							"Copy",
							"Move",
							"Remove",
						},
						Order: 0,
					},
					"Target": &ldk.WhisperContentFormInputText{
						Label: "Target",
						Order: 1,
					},
					"Destination": &ldk.WhisperContentFormInputText{
						Label: "Destination (Optional)",
						Order: 2,
					},
					"Recursive": &ldk.WhisperContentFormInputCheckbox{
						Label: "Recursive (Optional)",
						Order: 3,
					},
				},
				SubmitLabel: "Submit",
				CancelLabel: "Cancel",
			})
			if err != nil {
				loop.logger.Error("filesystem operation error", err)
			}
			loop.statusReporter.Report("onClickFilesystem", output)

			operation, ok := output["Operation"].(*ldk.WhisperContentFormOutputSelect)
			if !ok {
				loop.logger.Info("no operation provided", err)
				return
			}
			target, ok := output["Target"].(*ldk.WhisperContentFormOutputText)
			if !ok {
				loop.logger.Info("no target provided", err)
				return
			}

			switch operation.Value {
			case "Dir":
				// todo: no actual file metadata returned here either; though it is aware of files
				info, err := loop.sidekick.Filesystem().Dir(loop.ctx, target.Value)
				if err != nil {
					loop.logger.Error("filesystem dir error", err)
				}
				loop.statusReporter.Report("filesystemTestDir", info)
			case "Open":
				file, err := loop.sidekick.Filesystem().Open(loop.ctx, target.Value)
				if err != nil {
					loop.logger.Error("filesystem open error", err)
				}
				loop.statusReporter.Report("filesystemTestOpen", file)
			case "Create":
				// todo: no actual file metadata returned?
				file, err := loop.sidekick.Filesystem().Create(loop.ctx, target.Value)
				if err != nil {
					loop.logger.Error("filesystem create error", err)
				}
				stat, _ := file.Stat()
				loop.statusReporter.Report("filesystemTestCreate", stat)
			case "MakeDir":
				err := loop.sidekick.Filesystem().MakeDir(loop.ctx, target.Value, 0755)
				if err != nil {
					loop.logger.Error("filesystem make dir error", err)
					return
				}
				loop.statusReporter.Report("filesystemTestMakeDir", "OK")
			case "Copy":
				destination, ok := output["Destination"].(*ldk.WhisperContentFormOutputText)
				if !ok {
					loop.logger.Error("filesystem copy error", errors.New("no destination provided"))
				}
				err := loop.sidekick.Filesystem().Copy(loop.ctx, target.Value, destination.Value)
				if err != nil {
					loop.logger.Error("filesystem copy error", err)
					return
				}
				loop.statusReporter.Report("filesystemTestCopy", "OK")
			case "Move":
				destination, ok := output["Destination"].(*ldk.WhisperContentFormOutputText)
				if !ok {
					loop.logger.Error("filesystem move error", errors.New("no destination provided"))
				}
				err := loop.sidekick.Filesystem().Move(loop.ctx, target.Value, destination.Value)
				if err != nil {
					loop.logger.Error("filesystem move error", err)
					return
				}
				loop.statusReporter.Report("filesystemTestMove", "OK")
			case "Remove":
				recursive, ok := output["Recursive"].(*ldk.WhisperContentFormOutputCheckbox)
				if !ok {
					loop.logger.Error("filesystem remove error", errors.New("no recursive provided"))
				}
				err := loop.sidekick.Filesystem().Remove(loop.ctx, target.Value, recursive.Value)
				if err != nil {
					loop.logger.Error("filesystem remove error", err)
					return
				}
				loop.statusReporter.Report("filesystemTestRemove", "OK")
			}
		}()
	}
}

func onClickWhisper(loop *Loop) func(string) {
	return func(_ string) {
		go func() {
			_, err := loop.sidekick.Whisper().Disambiguation(loop.ctx, &ldk.WhisperContentDisambiguation{
				Label:    "Whispers",
				Elements: map[string]ldk.WhisperContentDisambiguationElement{
					"CONFIRM": &ldk.WhisperContentDisambiguationElementOption{
						Label:    "Confirm Whisper",
						Order:    0,
						OnChange: onClickConfirmWhisper(loop),
					},
					"DISAMBIGUATION": &ldk.WhisperContentDisambiguationElementOption{
						Label:    "Disambiguation Whisper",
						Order:    1,
						OnChange: onClickDisambiguationWhisper(loop),
					},
					"FORM": &ldk.WhisperContentDisambiguationElementOption{
						Label:    "Form Whisper",
						Order:    2,
						OnChange: onClickFormWhisper(loop),
					},
					"MARKDOWN": &ldk.WhisperContentDisambiguationElementOption{
						Label:    "Markdown Whisper",
						Order:    3,
						OnChange: onClickMarkdownWhisper(loop),
					},
					"LIST": &ldk.WhisperContentDisambiguationElementOption{
						Label:    "List Whisper",
						Order:    4,
						OnChange: onClickListWhisper(loop),
					},
				},
			})

			if err != nil {
				loop.logger.Error("whisper disambiguation whisper error", err)
			}
		}()
	}
}

func onClickConfirmWhisper(loop *Loop) func(string) {
	return func(_ string) {
		go func() {
			confirm, err := loop.sidekick.Whisper().Confirm(loop.ctx, &ldk.WhisperContentConfirm{
				Label:        "Confirmation Whisper",
				Markdown:     "Please **reject** or **resolve**!",
				RejectLabel:  "Reject",
				ResolveLabel: "Resolve",
			})
			if err != nil {
				loop.logger.Error("confirm whisper error", err)
			}
			loop.statusReporter.Report("onClickConfirmWhisper", confirm)
		}()
	}
}

func onClickDisambiguationWhisper(loop *Loop) func(string) {
	return func(_ string) {
		go func() {
			reportClick := func(_ string) {
				loop.statusReporter.Report("onClickDisambiguationWhisperOption", "clicked")
			}

			_, err := loop.sidekick.Whisper().Disambiguation(loop.ctx, &ldk.WhisperContentDisambiguation{
				Label: "Disambiguation",
				Elements: map[string]ldk.WhisperContentDisambiguationElement{
					"TEXT": &ldk.WhisperContentDisambiguationElementText{
						Body:  "Disambiguation Text Body",
						Order: 0,
					},
					"OPTION": &ldk.WhisperContentDisambiguationElementOption{
						Label:    "Report",
						Order:    1,
						OnChange: reportClick,
					},
				},
			})
			if err != nil {
				loop.logger.Error("disambiguation test whisper error", err)
			}
		}()
	}
}

func onClickFormWhisper(loop *Loop) func(string) {
	return func(_ string) {
		go func() {
			submitted, output, err := loop.sidekick.Whisper().Form(loop.ctx, &ldk.WhisperContentForm{
				Label:       "Form Whisper",
				Markdown:    "This is a form whisper test.",
				Inputs:      map[string]ldk.WhisperContentFormInput{
					"CHECKBOX": &ldk.WhisperContentFormInputCheckbox{
						Label:    "Checkbox",
						Value:    false,
						OnChange: func(value bool) {
							loop.statusReporter.Report("onClickFormWhisperCheckbox", value)
						},
						Order:    0,
					},
					"EMAIL": &ldk.WhisperContentFormInputEmail{
						Label:    "Email",
						Value:    "test@example.com",
						OnChange: func(value string) {
							loop.statusReporter.Report("onClickFormWhisperEmail", value)
						},
						Order:    1,
					},
					"MARKDOWN": &ldk.WhisperContentFormInputMarkdown{
						Label:    "Markdown",
						Value:    "**Hello** I am *Markdown.*",
						OnChange: func(value string) {
							loop.statusReporter.Report("onClickFormWhisperMarkdown", value)
						},
						Order:    2,
					},
					"NUMBER": &ldk.WhisperContentFormInputNumber{
						Label:    "Number",
						Min:      0,
						Max:      9001,
						Value:    9000.1,
						OnChange: func(value float32) {
							loop.statusReporter.Report("onClickFormWhisperNumber", value)
						},
						Order:    3,
					},
					// todo: password not submitted if you don't wait a few seconds
					"PASSWORD": &ldk.WhisperContentFormInputPassword{
						Label:    "Password",
						OnChange: func(value string) {
							loop.statusReporter.Report("onClickFormWhisperPassword", value)
						},
						Order:    4,
					},
					"RADIO": &ldk.WhisperContentFormInputRadio{
						Label:    "Radio",
						Options:  []string{
							"AM",
							"FM",
						},
						OnChange: func(value string) {
							loop.statusReporter.Report("onClickFormWhisperRadio", value)
						},
						Order:    5,
					},
					"SELECT": &ldk.WhisperContentFormInputSelect{
						Label:    "Select",
						Options:  []string{
							"Red",
							"Blue",
						},
						OnChange: func(value string) {
							loop.statusReporter.Report("onClickFormWhisperSelect", value)
						},
						Order:    6,
					},
					"TEL": &ldk.WhisperContentFormInputTel{
						Label:    "Tel",
						Pattern:  "\\+?1? ?\\(?[0-9]{3}\\)? ?[0-9]{3}-?[0-9]{4}",
						Value:    "1 (555) 555-5555",
						OnChange: func(value string) {
							loop.statusReporter.Report("onClickFormWhisperTel", value)
						},
						Order:    7,
					},
					"TEXT": &ldk.WhisperContentFormInputText{
						Label:    "Text",
						Value:    "Text!",
						OnChange: func(value string) {
							loop.statusReporter.Report("onClickFormWhisperText", value)
						},
						Order:    8,
					},
					"TIME": &ldk.WhisperContentFormInputTime{
						Label:    "Time",
						Value:    time.Now(),
						OnChange: func(value time.Time) {
							loop.statusReporter.Report("onClickFormWhisperTime", value)
						},
						Order:    9,
					},
				},
				CancelLabel: "Cancel",
				SubmitLabel: "Submit",
			})
			if err != nil {
				loop.logger.Error("form test whisper error", err)
			}
			loop.statusReporter.Report("onClickFormWhisperOutput", output)
			loop.statusReporter.Report("onClickFormWhisperSubmitted", submitted)
		}()
	}
}

func onClickMarkdownWhisper(loop *Loop) func(string) {
	return func(_ string) {
		go func() {
			err := loop.sidekick.Whisper().Markdown(loop.ctx, &ldk.WhisperContentMarkdown{
				Label:    "Markdown",
				Markdown: "**Hello!**  This is some *Markdown.*",
			})
			if err != nil {
				loop.logger.Error("markdown test whisper error")
			}
		}()
	}
}

func onClickListWhisper(loop *Loop) func(string) {
	return func(_ string) {
		go func() {
			err := loop.sidekick.Whisper().List(loop.ctx, &ldk.WhisperContentList{
				Label:    "List",
				Elements: map[string]ldk.WhisperContentListElement{
					"MESSAGE": &ldk.WhisperContentListElementMessage{
						Align:  "left",
						Body:   "Message Element",
						Extra:  false,
						Header: "Message Element Header",
						Order:  0,
						// todo: style is not applied
						Style:  "color: green;",
					},
					"DIVIDER": &ldk.WhisperContentListElementDivider{
						Extra: false,
						Order: 1,
						Style: "color: green;",
					},
					"PAIR": &ldk.WhisperContentListElementPair{
						Copyable: true,
						Extra:    false,
						Label:    "Pair Element",
						Order:    2,
						Style:    "color: green;",
						Value:    "Pair Element Value",
					},
					"LINK": &ldk.WhisperContentListElementLink{
						Align: "",
						Extra: true,
						Href:  "http://oliveai.com",
						Order: 3,
						Style: "color: green;",
						Text:  "Link to Olive AI Website",
					},
				},
			})
			if err != nil {
				loop.logger.Error("list test whisper error")
			}
		}()
	}
}
