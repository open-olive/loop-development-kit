export enum StringOptions {
    IgnoreCase
}

export const areStringsEqual = (param1: string, param2: string, options?: StringOptions) => {
    if (param1 == null || param2 == null) {
        throw new Error(`Parameters can't be null`);
    }
    if (options === StringOptions.IgnoreCase) {
        return param1.toLocaleLowerCase() === param2.toLocaleLowerCase();
    }

    return param1 === param2;
}