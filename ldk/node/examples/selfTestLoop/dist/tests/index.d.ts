import { HostServices } from '../../../../dist';
import { WhisperDisambiguationElements } from '../../../../dist/hostClients/whisperService';
export interface Element {
    [key: string]: WhisperDisambiguationElements;
}
export declare const clipboardWriteAndQuery: (host: HostServices) => Promise<boolean>;
export declare const clipboardStream: (host: HostServices) => Promise<boolean>;
export declare const windowTest: (host: HostServices) => Promise<boolean>;
export declare const hotkeyTest: (host: HostServices) => Promise<boolean>;
export declare const charTest: (host: HostServices) => Promise<boolean>;
export declare const charStreamTest: (host: HostServices) => Promise<boolean>;
export declare const charScancodeTest: (host: HostServices) => Promise<boolean>;
export declare const cursorPosition: (host: HostServices) => Promise<boolean>;
export declare const streamCursorPosition: (host: HostServices) => Promise<boolean>;
export declare const queryFileDirectory: (host: HostServices) => Promise<boolean>;
export declare const createAndDeleteFile: (host: HostServices) => Promise<boolean>;
export declare const updateAndReadFile: (host: HostServices) => Promise<boolean>;
export declare const streamFileInfo: (host: HostServices) => Promise<boolean>;
export declare const vaultReadWrite: (host: HostServices) => Promise<boolean>;
export declare const confirmWhisper: (host: HostServices) => Promise<boolean>;
export declare const processQuery: (host: HostServices) => Promise<boolean>;
export declare const processStream: (host: HostServices) => Promise<boolean>;
export declare const formWhisper: (host: HostServices) => Promise<boolean>;
export declare const networkAndListWhisper: (host: HostServices) => Promise<boolean>;
export declare const disambiguationWhisper: (host: HostServices) => Promise<boolean>;
