import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { ProcessClient as ProcessGRPCClient } from '../grpc/process_grpc_pb';
import Messages, { ProcessAction } from '../grpc/process_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import {
  ProcessService,
  ProcessInfoResponse,
  ProcessListResponse,
  ProcessStreamAction,
  ProcessStreamResponse,
} from './processService';
import { StoppableStream } from './stoppableStream';
import { TransformingStream } from './transformingStream';

/**
 * @param info
 * @internal
 */
function parseProcessInfo(info: Messages.ProcessInfo): ProcessInfoResponse {
  return info.toObject();
}

/**
 * @param action
 * @internal
 */
function parseProcessAction(
  action: Messages.ProcessAction,
): ProcessStreamAction {
  switch (action) {
    case ProcessAction.PROCESS_ACTION_STARTED:
      return ProcessStreamAction.Started;
    case ProcessAction.PROCESS_ACTION_STOPPED:
      return ProcessStreamAction.Stopped;
    case ProcessAction.PROCESS_ACTION_UNKNOWN:
    default:
      return ProcessStreamAction.Unknown;
  }
}

/**
 * @internal
 */
export class ProcessClient
  extends BaseClient<ProcessGRPCClient>
  implements ProcessService {
  protected generateClient(): GRPCClientConstructor<ProcessGRPCClient> {
    return ProcessGRPCClient;
  }

  queryProcesses(): Promise<ProcessListResponse> {
    return this.buildQuery<
      Messages.ProcessStateRequest,
      Messages.ProcessStateResponse,
      ProcessListResponse
    >(
      (message, callback) => {
        this.client.processState(message, callback);
      },
      () => new Messages.ProcessStateRequest(),
      (response) => ({
        processes: response
          .getProcessesList()
          .map((processInfo) => parseProcessInfo(processInfo)),
      }),
    );
  }

  streamProcesses(): StoppableStream<ProcessStreamResponse> {
    return new TransformingStream<
      Messages.ProcessStateStreamResponse,
      ProcessStreamResponse
    >(
      this.client.processStateStream(
        new Messages.ProcessStateStreamRequest().setSession(
          this.createSessionMessage(),
        ),
      ),
      (message) => {
        const processRaw = message.getProcess();
        if (processRaw == null) {
          return undefined;
        }
        return {
          process: parseProcessInfo(processRaw),
          action: parseProcessAction(message.getAction()),
        };
      },
    );
  }
}
