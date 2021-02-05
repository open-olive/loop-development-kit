import { ConnInfo } from './grpc/broker_pb';
import { Session } from './grpc/session_pb';
import { LoopSensors } from './loopSensors';
import WhisperClient from './loopClients/whisperClient';
import StorageClient from './loopClients/storageClient';
import KeyboardClient from './loopClients/keyboardClient';
import { ClipboardClient } from './loopClients/clipboardClient';
import { CursorClient } from './loopClients/cursorClient';
// import { HoverClient } from './loopClients/hoverClient';
import { FileSystemClient } from './loopClients/fileSystemClient';
import { ProcessClient } from './loopClients/processClient';
// import { WindowClient } from './loopClients/windowClient';
// import { BrowserClient } from './loopClients/browserClient';
import { NetworkClient } from './loopClients/networkClient';
import { UIClient } from './loopClients/uiClient';
import { Logger } from './logging';

/**
 * @internal
 */
export default class LoopSensorFacade implements LoopSensors {
  private logger: Logger;

  public whisper: WhisperClient = new WhisperClient();

  public storage: StorageClient = new StorageClient();

  public keyboard: KeyboardClient = new KeyboardClient();

  public clipboard: ClipboardClient = new ClipboardClient();

  public cursor: CursorClient = new CursorClient();

  public fileSystem: FileSystemClient = new FileSystemClient();

  public process: ProcessClient = new ProcessClient();

  public ui: UIClient = new UIClient();

  // These sensors are not yet implemented.
  // public hover: HoverClient = new HoverClient();

  // public window: WindowClient = new WindowClient();

  // public browser: BrowserClient = new BrowserClient();

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public network: NetworkClient = new NetworkClient();

  public connect(
    connInfo: ConnInfo.AsObject,
    session: Session.AsObject,
  ): Promise<void[]> {
    return Promise.all([
      // These sensors are not yet implemented.
      // this.browser.connect(connInfo, session, this.logger),
      // this.hover.connect(connInfo, session, this.logger),
      // this.window.connect(connInfo, session, this.logger),
      this.whisper.connect(connInfo, session, this.logger),
      this.storage.connect(connInfo, session, this.logger),
      this.clipboard.connect(connInfo, session, this.logger),
      this.keyboard.connect(connInfo, session, this.logger),
      this.process.connect(connInfo, session, this.logger),
      this.cursor.connect(connInfo, session, this.logger),
      this.fileSystem.connect(connInfo, session, this.logger),
      this.network.connect(connInfo, session, this.logger),
    ]);
  }
}
