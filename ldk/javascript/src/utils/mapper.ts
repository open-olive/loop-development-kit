import { HTTPResponse } from '../network';

export const mapToUint8Array = (data: ArrayBuffer): Uint8Array => (new Uint8Array(data));

export const mapToHttpResponse = (response: OliveHelps.HTTPResponse): HTTPResponse => ({
    statusCode: response.statusCode,
    body: new Uint8Array(response.body),
    headers: response.headers,
  });