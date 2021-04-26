import { LoopTest } from './loopTest';

export default class TestGroup {
  private id: string;

  private tests: LoopTest[];

  constructor(name: string, tests: LoopTest[]) {
    this.id = name;
    this.tests = tests;
  }

  public getId(): string {
    return this.id;
  }

  public getTests(): LoopTest[] {
    return this.tests;
  }
}
