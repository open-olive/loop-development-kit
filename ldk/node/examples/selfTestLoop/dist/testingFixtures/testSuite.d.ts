import { LoopTest } from './loopTest';
import { Logger } from '../../../../dist/logging';
import { HostServices } from '../../../../dist';
import { WhisperListElements } from '../../../../dist/hostClients/whisperService';
export interface Element {
    [key: string]: WhisperListElements;
}
export default class TestSuite {
    private tests;
    private logger;
    constructor(tests: LoopTest[], logger: Logger);
    start(host: HostServices): Promise<boolean>;
}
