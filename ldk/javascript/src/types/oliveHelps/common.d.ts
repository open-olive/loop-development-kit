declare namespace Common {
  interface Cancellable {
    cancel(): void;
  }

  type Callback<T> = (error: Error | undefined, value: T) => void;

  type ReturnCallback = (obj: Cancellable) => void;

  type Readable<T> = (callback: Callback<T>) => void;

  type ReadableWithParam<TParam, TOut> = (param: TParam, callback: Callback<TOut>) => void;
  type ReadableWithParamAfterCallback<TOut, TParam> = (
    callback: Callback<TOut>,
    param: TParam,
  ) => void;

  type ReadableWithTwoParams<TParam1, TParam2, TOut> = (
    param: TParam1,
    param2: TParam2,
    callback: Callback<TOut>,
  ) => void;

  type ReadableWithThreeParams<TParam1, TParam2, TParam3, TOut> = (
    param: TParam1,
    param2: TParam2,
    param3: TParam3,
    callback: Callback<TOut>,
  ) => void;

  type ReadableWithFourParams<TParam1, TParam2, TParam3, TParam4, TOut> = (
    param: TParam1,
    param2: TParam2,
    param3: TParam3,
    param4: TParam4,
    callback: Callback<TOut>,
  ) => void;

  type Listenable<T> = (callback: Callback<T>, returnCb: ReturnCallback) => void;

  type ListenableWithParam<TParam, TOut> = (
    param: TParam,
    callback: Callback<TOut>,
    returnCb: ReturnCallback,
  ) => void;
}
