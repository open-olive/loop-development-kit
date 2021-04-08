import { Example2 } from './example2'

export class Example {
    example2: Example2 = new Example2()

    multiply(number: number) : number {
        return number * 2
    }

    exampleDependency() : string {
        return this.example2.getString();
    }
}