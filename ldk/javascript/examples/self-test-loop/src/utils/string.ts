export enum StringOptions {
  IgnoreCase,
}

// TODO: Required as windows filesystem create converts file path to lower case. Remove after sidekick is fixed. Ian is working on it.
export const areStringsEqual = (
  param1: string,
  param2: string,
  options?: StringOptions,
): boolean => {
  if (param1 == null || param2 == null) {
    throw new Error(`Parameters can't be null`);
  }
  if (options === StringOptions.IgnoreCase) {
    return param1.toLocaleLowerCase() === param2.toLocaleLowerCase();
  }

  return param1 === param2;
};
