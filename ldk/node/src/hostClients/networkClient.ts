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
): Record<string, Array<string>> {
  const record: Record<string, Array<string>> = {};

  headersMap.forEach((values, key) => {
    record[key] = parseHeaderValues(values);
  })

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
  headers: Record<string, string>,
): messages.HTTPRequestMsg {
  Object.entries(headers).forEach(([key, value]) => {
    message.getHeadersMap().set(key, value);
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
        addHeadersToMessage(msg, req.headers);
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
