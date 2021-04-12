export interface Clipboard {
  read(): Promise<string>;
  write(val: string): Promise<void>;
  listen(cb: (val: string) => void): void;
}

function listen(cb: (val: string) => void): void {
  return oliveHelps.clipboard.listen(cb);
}

function read(): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      oliveHelps.clipboard.read((val: string) => resolve(val));
    } catch (e) {
      reject(e);
      // TODO: add console log
    }
  });
}

function write(val: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      oliveHelps.clipboard.write(val, () => resolve());
    } catch (e) {
      reject(e);
    }
  });
}

export const clipboard: Clipboard = {
  read,
  write,
  listen
};