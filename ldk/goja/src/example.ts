import { getString } from './example2'

export class Example {
    multiply(number: number) : number {
        return number * 2
    }

    exampleDependency() : string {
        return getString();
    }
}