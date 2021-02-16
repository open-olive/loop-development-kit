import { LoopTest } from './loopTest';
export default class TestGroup {
    private id;
    private tests;
    constructor(name: string, tests: LoopTest[]);
    getId(): string;
    getTests(): LoopTest[];
}
