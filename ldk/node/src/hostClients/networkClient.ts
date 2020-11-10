import BaseClient, { GRPCClientConstructor } from './baseClient';
import { NetworkClient as NetworkGRPCClient } from '../grpc/network_grpc_pb';
import { NetworkService, HttpRequest, HttpResponse } from './networkService';
import messages from '../grpc/network_pb';

export class NetworkClient
  extends BaseClient<NetworkGRPCClient>
  implements NetworkService {
  protected generateClient(): GRPCClientConstructor<NetworkGRPCClient> {
    return NetworkGRPCClient;
  }

  httpRequest(req: HttpRequest): Promise<HttpResponse> {
    return this.buildQuery<
      messages.HTTPRequestMsg,
      messages.HTTPResponseMsg,
      HttpResponse
    >(
      (message, callback) => this.client.hTTPRequest(message, callback),
      () => {
        const msg = new messages.HTTPRequestMsg();
        msg.setUrl(req.url);
        msg.setMethod(req.method);
        msg.setBody(req.body);
        return msg;
      },
      (response: messages.HTTPResponseMsg) => ({
        statusCode: response.getResponsecode(),
        data: response.getData(),
      }),
    );
  }
}
