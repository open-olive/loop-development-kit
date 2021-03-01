/**
 * The HTTP Request configuration.
 */
export interface HttpRequest {
  url: string;
  method: string;
  body: string | Uint8Array;
  headers?: Record<string, Array<string>>;
}

/**
 * The HTTP Response data.
 */
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
  /**
   * Generates a HTTP request with the provided configuration.
   *
   * @param request - The HTTP request to make.
   * @returns A Promise resolving with the response.
   */
  httpRequest(request: HttpRequest): Promise<HttpResponse>;
}
