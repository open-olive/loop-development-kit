import structpb from 'google-protobuf/google/protobuf/struct_pb';
import jspb from 'google-protobuf';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { NetworkClient as NetworkGRPCClient } from '../grpc/network_grpc_pb';
import { NetworkService, HttpRequest, HttpResponse } from './networkService';
import messages from '../grpc/network_pb';

/**
 * @param values - a PB struct ListValue (list of Values)
 * @internal
 */
function parseHeaderValues(values: structpb.ListValue): Array<string> {
  return values.getValuesList().map((value) => {
    return value.getStringValue();
  });
}

/**
 * @param headersMap - A map of headers
 * @internal
 */
function parseHeadersMap(
  headersMap: jspb.Map<string, structpb.ListValue>,
): Map<string, Array<string>> {
  const headerEntries: Array<[
    string,
    Array<string>,
  ]> = headersMap.getEntryList().map(([key, value]) => {
    return [key, parseHeaderValues(value)];
  });

  return new Map(headerEntries);
}

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
        headers: parseHeadersMap(response.getHeadersMap()),
      }),
    );
  }
}
