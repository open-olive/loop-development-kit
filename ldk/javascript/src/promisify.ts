import { Cancellable } from './cancellable';

type Mapper<TIn, TOut> = (param: TIn) => TOut;

export function promisifyMapped<TParam, TInternalOut, TExternalOut>(
  param: TParam,
  map: Mapper<TInternalOut, TExternalOut>,
  arg: OliveHelps.ReadableWithParam<TParam, TInternalOut>,
): Promise<TExternalOut> {
  return new Promise((resolve, reject) => {
    try {
      arg(param, (cb: TInternalOut) => resolve(map(cb)));
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

export function promisify<T>(arg: OliveHelps.Readable<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      arg((cb: T) => resolve(cb));
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

export function promisifyWithParam<TParam, TOut>(
  param: TParam,
  arg: OliveHelps.ReadableWithParam<TParam, TOut>,
): Promise<TOut> {
  return new Promise((resolve, reject) => {
    try {
      arg(param, (cb: TOut) => resolve(cb));
    } catch (e) {
      console.error(e);
      reject(e);
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
      arg(param, param2, (cb: TOut) => resolve(cb));
    } catch (e) {
      console.error(e);
      reject(e);
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
      arg(p1, p2, p3, p4, (cb: TOut) => resolve(cb));
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

export function promisifyListenable<T>(
  cb: (v: T) => void,
  arg: OliveHelps.Listenable<T>,
): Promise<Cancellable> {
  return new Promise((resolve, reject) => {
    try {
      arg(cb, (obj) => {
        resolve(obj);
      });
    } catch (e) {
      console.error('Received error making request', e);
      reject(e);
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
      arg(param, cb, (obj) => {
        resolve(obj);
      });
    } catch (e) {
      console.error('Received error making request', e);
      reject(e);
    }
  });
}

export function promisifyMappedListenableWithParam<TParam, TInternalOut, TExternalOut>(
  param: TParam,
  cb: (v: TExternalOut) => void,
  map: Mapper<TInternalOut, TExternalOut>,
  arg: OliveHelps.ListenableWithParam<TParam, TInternalOut>,
  ): Promise<Cancellable> {
    return new Promise((resolve, reject) => {
      try {
        arg(param, (callbackValue: TInternalOut) => cb(map(callbackValue)), (obj) => { resolve(obj); });
      } catch (e) {
        console.error('Received error making request', e);
        reject(e);
      }
    });
  }
  