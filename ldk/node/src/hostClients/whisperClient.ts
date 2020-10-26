import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import messages from '../grpc/whisper_pb';
import { WhisperClient as WhisperGRPCClient } from '../grpc/whisper_grpc_pb';
import {
  Whisper,
  WhisperConfirmConfig,
  WhisperFormConfig,
  WhisperFormSubmitEvent,
  WhisperFormUpdateEvent,
  WhisperService,
} from './whisperService';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { StoppableStream, StreamListener } from './stoppableStream';
import { TransformingStream } from './transformingStream';
import { transformResponse } from './whisperMessageParser';
import {
  buildWhisperConfirmMessage,
  buildWhisperMarkdownRequest,
  generateWhisperForm,
} from './whisperMessageBuilder';

/**
 * Class responsible for abstracting Whisper requests to Olive Helps.
 *
 * @internal
 */
class WhisperClient
  extends BaseClient<WhisperGRPCClient>
  implements WhisperService {
  /**
   * Send a Whisper to the host process.
   *
   * @async
   * @param whisper - An object defining the contents of the Whisper.
   * @returns Promise resolving when the server responds to the command.
   */
  markdownWhisper(whisper: Whisper): Promise<void> {
    return this.buildQuery<messages.WhisperMarkdownRequest, Empty, void>(
      (message, callback) => this.client.whisperMarkdown(message, callback),
      () => buildWhisperMarkdownRequest(whisper),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  confirmWhisper(whisper: WhisperConfirmConfig): Promise<boolean> {
    return this.buildQuery<
      messages.WhisperConfirmRequest,
      messages.WhisperConfirmResponse,
      boolean
    >(
      (message, callback) => {
        this.client.whisperConfirm(message, callback);
      },
      () => buildWhisperConfirmMessage(whisper),
      (response) => response.getResponse(),
    );
  }

  formWhisper(
    whisper: WhisperFormConfig,
    listener: StreamListener<WhisperFormUpdateEvent | WhisperFormSubmitEvent>,
  ): StoppableStream<WhisperFormUpdateEvent | WhisperFormSubmitEvent> {
    const msg = generateWhisperForm(whisper);
    const stream = this.client.whisperForm(msg);
    return new TransformingStream<
      messages.WhisperFormStreamResponse,
      WhisperFormSubmitEvent | WhisperFormUpdateEvent
    >(stream, (response) => transformResponse(response), listener);
  }

  protected generateClient(): GRPCClientConstructor<WhisperGRPCClient> {
    return WhisperGRPCClient;
  }
}

export default WhisperClient;
