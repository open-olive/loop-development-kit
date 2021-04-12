export interface Network {
  httpRequest(req: OliveHelps.HTTPRequest): Promise<OliveHelps.HTTPResponse>;
}

export class NetworkImpl implements Network {
  httpRequest(req: OliveHelps.HTTPRequest): Promise<OliveHelps.HTTPResponse> {
    return new Promise<OliveHelps.HTTPResponse>((resolve, reject) => {
      try {
        oliveHelps.network.httpRequest(req, (val: OliveHelps.HTTPResponse) => {
          resolve(val);
        });
      } catch (e) {
        reject(e);
        // TODO: add console log
      }
    });
  }
}
