import { Cancellable } from './cancellable';

export function promisify<T>(arg: OliveHelps.Readable<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    try {
      arg((cb: T) => resolve(cb));
    } catch (e) {
      console.log(e);
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
      console.log(e);
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
      console.log(e);
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
