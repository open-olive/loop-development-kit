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
import { StoppableStream, StreamListener } from './stoppables';
import { TransformingStream } from './transformingStream';

/**
 * @param info - The process info to parse.
 * @internal
 */
function parseProcessInfo(info: Messages.ProcessInfo): ProcessInfoResponse {
  return info.toObject();
}

/**
 * @param action - The action to process.
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

  streamProcesses(
    listener: StreamListener<ProcessStreamResponse>,
  ): StoppableStream<ProcessStreamResponse> {
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
      listener,
    );
  }
}
