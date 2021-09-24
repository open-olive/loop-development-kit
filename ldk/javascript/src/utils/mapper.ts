import { TextEncoder } from 'text-encoding-shim';

export const mapToUint8Array = (data: ArrayBuffer): Uint8Array => new Uint8Array(data);

// converting to a simplified array to satisfy sidekick contract as goja has major issues with regular Uint8Array
export const mapToBinaryData = (message: string | Uint8Array): Array<number> =>
  typeof message === 'string' ? [...new TextEncoder().encode(message)] : [...message];

export const mapToDate = (date: number): Date => new Date(date);
