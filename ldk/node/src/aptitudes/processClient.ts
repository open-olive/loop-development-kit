import { ProcessClient as ProcessGRPCClient } from '../grpc/process_grpc_pb';
import Messages, { ProcessAction as ProcessActionPB } from '../grpc/process_pb';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import {
  Process,
  ProcessInfo,
  ProcessInfoList,
  ProcessAction,
  ProcessEvent,
} from './process';
import { StoppableStream, StreamListener } from './stoppables';
import { TransformingStream } from './transformingStream';

/**
 * @param info - The process info to parse.
 * @internal
 */
function parseProcessInfo(info: Messages.ProcessInfo): ProcessInfo {
  return info.toObject();
}

/**
 * @param action - The action to process.
 * @internal
 */
function parseProcessAction(action: ProcessActionPB): ProcessAction {
  switch (action) {
    case ProcessActionPB.PROCESS_ACTION_STARTED:
      return ProcessAction.Started;
    case ProcessActionPB.PROCESS_ACTION_STOPPED:
      return ProcessAction.Stopped;
    case ProcessActionPB.PROCESS_ACTION_UNKNOWN:
    default:
      return ProcessAction.Unknown;
  }
}

/**
 * @internal
 */
export class ProcessClient
  extends BaseClient<ProcessGRPCClient>
  implements Process {
  protected generateClient(): GRPCClientConstructor<ProcessGRPCClient> {
    return ProcessGRPCClient;
  }

  processes(): Promise<ProcessInfoList> {
    return this.buildQuery<
      Messages.ProcessStateRequest,
      Messages.ProcessStateResponse,
      ProcessInfoList
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

  listenProcesses(
    listener: StreamListener<ProcessEvent>,
  ): StoppableStream<ProcessEvent> {
    return new TransformingStream<
      Messages.ProcessStateStreamResponse,
      ProcessEvent
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

  protected serviceName(): string {
    return 'process';
  }
}
