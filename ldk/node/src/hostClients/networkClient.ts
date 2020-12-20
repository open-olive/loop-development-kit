import jspb from 'google-protobuf';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { NetworkClient as NetworkGRPCClient } from '../grpc/network_grpc_pb';
import { NetworkService, HttpRequest, HttpResponse } from './networkService';
import messages, { HTTPHeader } from '../grpc/network_pb';

/**
 * @param headersMap - A map of headers
 * @internal
 */
function parseHeadersMap(
  headersMap: jspb.Map<string, HTTPHeader>,
): Record<string, Array<string>> {
  const record: Record<string, Array<string>> = {};

  headersMap.forEach((values, key) => {
    record[key] = values.getValuesList();
  });

  return record;
}

/**
 * Adds headers to a request message
 *
 * @param message - the message that will be sent via gRPC - modified in place
 * @param headers - the headers to add to the request as a map
 * @internal
 */
function addHeadersToMessage(
  message: messages.HTTPRequestMsg,
  headers: Record<string, Array<string>>,
): messages.HTTPRequestMsg {
  Object.entries(headers).forEach(([key, values]) => {
    message.getHeadersMap().set(key, new HTTPHeader().setValuesList(values));
  });

  return message;
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
        if (req.headers) {
          addHeadersToMessage(msg, req.headers);
        }
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
