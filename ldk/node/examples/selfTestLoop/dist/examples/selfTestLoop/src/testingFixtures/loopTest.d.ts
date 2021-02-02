export declare enum Status {
    PASS = "pass",
    FAIL = "fail"
}
export declare class LoopTest {
    private id;
    private methodToExecute;
    private logger;
    constructor(name: string, methodToExecute: () => void);
    runTest(): Status;
}
