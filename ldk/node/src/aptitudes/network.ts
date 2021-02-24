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
  data: string | Uint8Array;
  headers: Record<string, Array<string>>;
}

export interface Network {
  /**
   * Generates a HTTP request with the provided configuration.
   *
   * @param request - The HTTP request to make.
   * @returns A Promise resolving with the response.
   */
  httpRequest(request: HttpRequest): Promise<HttpResponse>;
}
