/**
 * The Network Aptitude provides access to network calls through Olive Helps
 */
export interface Network {
  /**
   * Generates a HTTP request with the provided configuration.
   *
   * @param request - The HTTP request to make.
   * @returns A Promise resolving with the response.
   */
  httpRequest(req: OliveHelps.HTTPRequest): Promise<OliveHelps.HTTPResponse>;
}

function httpRequest(req: OliveHelps.HTTPRequest): Promise<OliveHelps.HTTPResponse> {
  return new Promise<OliveHelps.HTTPResponse>((resolve, reject) => {
    try {
      oliveHelps.network.httpRequest(req, (val: OliveHelps.HTTPResponse) => {
        resolve(val);
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

export const network: Network = {
  httpRequest,
};
