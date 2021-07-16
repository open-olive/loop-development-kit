import { Cancellable } from './cancellable';

type Mapper<TIn, TOut> = (param: TIn) => TOut;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleCaughtError(reject: (reason?: any) => void, error: Error) {
  console.error(`Received error calling service ${error.message}`);
  reject(error);
}

export function promisifyMappedBothWithParams<TParamIn, TParamOut, TInternalOut, TExternalOut>(
  param: TParamIn,
  paramMap: Mapper<TParamIn, TParamOut>,
  map: Mapper<TInternalOut, TExternalOut>,
  arg: OliveHelps.ReadableWithParam<TParamOut, TInternalOut>,
): Promise<TExternalOut> {
  return new Promise((resolve, reject) => {
    try {
      arg(paramMap(param), (error, value) => {
        if (error) {
          console.error(`Received error on result: ${error.message}`);
          reject(error);
          return;
        }
        resolve(map(value));
      });
    } catch (e) {
      handleCaughtError(reject, e);
    }
  });
}

export function promisifyMappedWithParam<TParam, TInternalOut, TExternalOut>(
  param: TParam,
  map: Mapper<TInternalOut, TExternalOut>,
  arg: OliveHelps.ReadableWithParam<TParam, TInternalOut>,
): Promise<TExternalOut> {
  return promisifyMappedBothWithParams(param, (x) => x, map, arg);
}

function promiseResolver<T>(
  resolve: (value: T | PromiseLike<T>) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (reason?: any) => void,
): (error: Error | undefined, value: T) => void {
  return (error, value) => {
    if (error) {
      console.error(`Received error on result: ${error.message}`);
      reject(error);
      return;
    }
    resolve(value);
  };
}

export function promisify<T>(arg: OliveHelps.Readable<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      arg(promiseResolver(resolve, reject));
    } catch (e) {
      handleCaughtError(reject, e);
    }
  });
}

export function promisifyWithParamAfterCallback<TParam, TOut>(
  param: TParam,
  arg: OliveHelps.ReadableWithParamAfterCallback<TOut, TParam>,
): Promise<TOut> {
  return new Promise((resolve, reject) => {
    try {
      arg(promiseResolver(resolve, reject), param);
    } catch (e) {
      handleCaughtError(reject, e);
    }
  });
}

export function promisifyWithParam<TParam, TOut>(
  param: TParam,
  arg: OliveHelps.ReadableWithParam<TParam, TOut>,
): Promise<TOut> {
  return new Promise((resolve, reject) => {
    try {
      arg(param, promiseResolver(resolve, reject));
    } catch (e) {
      handleCaughtError(reject, e);
    }
  });
}

export function promisifyWithTwoParams<TParam1, TParam2, TOut>(
  param: TParam1,
  param2: TParam2,
  arg: OliveHelps.ReadableWithTwoParams<TParam1, TParam2, TOut>,
): Promise<TOut> {
  return new Promise((resolve, reject) => {
    try {
      arg(param, param2, promiseResolver(resolve, reject));
    } catch (e) {
      handleCaughtError(reject, e);
    }
  });
}

export function promisifyWithFourParams<TParam1, TParam2, TParam3, TParam4, TOut>(
  p1: TParam1,
  p2: TParam2,
  p3: TParam3,
  p4: TParam4,
  arg: OliveHelps.ReadableWithFourParams<TParam1, TParam2, TParam3, TParam4, TOut>,
): Promise<TOut> {
  return new Promise((resolve, reject) => {
    try {
      arg(p1, p2, p3, p4, promiseResolver(resolve, reject));
    } catch (e) {
      handleCaughtError(reject, e);
    }
  });
}

function handleListenerCallback<T>(cb: (v: T) => void): OliveHelps.Callback<T> {
  return (error, value) => {
    if (error) {
      console.error('Received error in listener', error);
    } else {
      cb(value);
    }
  };
}

export function promisifyListenable<T>(
  cb: (v: T) => void,
  arg: OliveHelps.Listenable<T>,
): Promise<Cancellable> {
  return new Promise((resolve, reject) => {
    try {
      arg(handleListenerCallback(cb), (obj) => resolve(obj));
    } catch (e) {
      handleCaughtError(reject, e);
    }
  });
}

export function promisifyListenableWithParam<TParam, TOut>(
  param: TParam,
  cb: (v: TOut) => void,
  arg: OliveHelps.ListenableWithParam<TParam, TOut>,
): Promise<Cancellable> {
  return new Promise((resolve, reject) => {
    try {
      arg(param, handleListenerCallback(cb), (obj) => {
        resolve(obj);
      });
    } catch (e) {
      handleCaughtError(reject, e);
    }
  });
}

export function promisifyMappedListenableWithParam<TParam, TInternalOut, TExternalOut>(
  param: TParam,
  map: Mapper<TInternalOut, TExternalOut>,
  cb: (v: TExternalOut) => void,
  arg: OliveHelps.ListenableWithParam<TParam, TInternalOut>,
): Promise<Cancellable> {
  return new Promise((resolve, reject) => {
    try {
      arg(
        param,
        handleListenerCallback((value) => cb(map(value))),
        (obj) => {
          resolve(obj);
        },
      );
    } catch (e) {
      handleCaughtError(reject, e);
    }
  });
}
