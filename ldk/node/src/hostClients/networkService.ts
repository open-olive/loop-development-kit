export interface HttpRequest {
  url: string;
  method: string;
  body: string | Uint8Array;

  headers?: Record<string, Array<string>>;
}

export interface HttpResponse {
  statusCode: number;
  /**
   * The HTTP response as a byte array. To decode into a UTF-8 string you can:
   * ```
   * import * as util from 'util';
   * ...
   * var string = new TextDecoder("utf-8").decode(uint8array);
   * ```
   */
  data: Uint8Array;
  headers: Record<string, Array<string>>;
}

export interface NetworkService {
  httpRequest(req: HttpRequest): Promise<HttpResponse>;
}
