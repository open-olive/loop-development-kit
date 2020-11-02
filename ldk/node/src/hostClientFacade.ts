import { ConnInfo } from './grpc/broker_pb';
import { Session } from './grpc/session_pb';
import { HostServices } from './hostServices';
import WhisperClient from './hostClients/whisperClient';
import StorageClient from './hostClients/storageClient';
import KeyboardClient from './hostClients/keyboardClient';
import { ClipboardClient } from './hostClients/clipboardClient';
import { CursorClient } from './hostClients/cursorClient';
import { HoverClient } from './hostClients/hoverClient';
import { FileSystemClient } from './hostClients/fileSystemClient';
import { ProcessClient } from './hostClients/processClient';
import { WindowClient } from './hostClients/windowClient';
import { BrowserClient } from './hostClients/browserClient';
import { UIClient } from './hostClients/uiClient';

/**
 * @internal
 */
export default class HostClientFacade implements HostServices {
  public whisper: WhisperClient = new WhisperClient();

  public storage: StorageClient = new StorageClient();

  public keyboard: KeyboardClient = new KeyboardClient();

  public clipboard: ClipboardClient = new ClipboardClient();

  public cursor: CursorClient = new CursorClient();

  public hover: HoverClient = new HoverClient();

  public fileSystem: FileSystemClient = new FileSystemClient();

  public process: ProcessClient = new ProcessClient();

  public window: WindowClient = new WindowClient();

  public browser: BrowserClient = new BrowserClient();

  public ui: UIClient = new UIClient();

  public connect(
    connInfo: ConnInfo.AsObject,
    session: Session.AsObject,
  ): Promise<void[]> {
    return Promise.all([
      this.whisper.connect(connInfo, session),
      this.storage.connect(connInfo, session),
      this.keyboard.connect(connInfo, session),
      this.clipboard.connect(connInfo, session),
      this.cursor.connect(connInfo, session),
      this.hover.connect(connInfo, session),
      this.fileSystem.connect(connInfo, session),
      this.process.connect(connInfo, session),
      this.window.connect(connInfo, session),
      this.browser.connect(connInfo, session),
      this.ui.connect(connInfo, session),
    ]);
  }
}
