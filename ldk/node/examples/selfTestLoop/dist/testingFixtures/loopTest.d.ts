import { Logger } from '../../../../dist/logging';
import { HostServices } from '../../../../dist';
export declare enum Status {
    PASS = "pass",
    FAIL = "fail",
    NOT_STARTED = "not_started"
}
export declare class LoopTest {
    private id;
    private methodToExecute;
    private status;
    private timeout;
    private timeoutTime;
    private promptMarkdown;
    constructor(name: string, methodToExecute: (host: HostServices) => Promise<boolean>, timeoutTime: number, promptMarkdown: string);
    runTest(host: HostServices, logger: Logger): Promise<Status>;
    private testWrapper;
    getStatus(): Status;
    getId(): string;
}
