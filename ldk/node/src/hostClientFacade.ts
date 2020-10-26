import { ConnInfo } from './grpc/broker_pb';
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

  public connect(connInfo: ConnInfo.AsObject): Promise<void[]> {
    return Promise.all([
      this.whisper.connect(connInfo),
      this.storage.connect(connInfo),
      this.keyboard.connect(connInfo),
      this.clipboard.connect(connInfo),
      this.cursor.connect(connInfo),
      this.hover.connect(connInfo),
      this.fileSystem.connect(connInfo),
      this.process.connect(connInfo),
      this.window.connect(connInfo),
      this.browser.connect(connInfo),
    ]);
  }
}
