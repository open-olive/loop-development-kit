import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import * as messages from '../grpc/whisper_pb';
import { WhisperClient as WhisperGRPCClient } from '../grpc/whisper_grpc_pb';
import {
  Whisper,
  WhisperConfirmConfig,
  WhisperDisambiguationConfig,
  WhisperDisambiguationEvent,
  WhisperFormConfig,
  WhisperFormSubmitEvent,
  WhisperFormUpdateEvent,
  WhisperListConfig,
  WhisperService,
} from './whisperService';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import {
  StoppableMessage,
  StoppableStream,
  StreamListener,
} from './stoppables';
import { TransformingStream } from './transformingStream';
import { transformDisambiguationResponse, transformResponse } from './whisperMessageParser';
import {
  buildWhisperConfirmMessage,
  buildWhisperListRequest,
  buildWhisperMarkdownRequest,
  generateWhisperDisambiguation,
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
  markdownWhisper(whisper: Whisper): StoppableMessage<void> {
    return this.buildStoppableMessage<
      messages.WhisperMarkdownRequest,
      Empty,
      void
    >(
      (message, callback) => this.client.whisperMarkdown(message, callback),
      () => buildWhisperMarkdownRequest(whisper),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  listWhisper(whisper: WhisperListConfig): StoppableMessage<void> {
    return this.buildStoppableMessage<messages.WhisperListRequest, Empty, void>(
      (message, callback) => this.client.whisperList(message, callback),
      () => buildWhisperListRequest(whisper),
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
  }

  confirmWhisper(whisper: WhisperConfirmConfig): StoppableMessage<boolean> {
    return this.buildStoppableMessage<
      messages.WhisperConfirmRequest,
      messages.WhisperConfirmResponse,
      boolean
    >(
      (message, callback) => this.client.whisperConfirm(message, callback),
      () => buildWhisperConfirmMessage(whisper),
      (response) => response.getResponse(),
    );
  }

  disambiguationWhisper(
    whisper: WhisperDisambiguationConfig,
    listener: StreamListener<WhisperDisambiguationEvent>,
  ): StoppableStream<WhisperDisambiguationEvent> {
    const msg = generateWhisperDisambiguation(whisper);
    const stream = this.client.whisperDisambiguation(msg);
    return new TransformingStream<
      messages.WhisperDisambiguationStreamResponse,
      WhisperDisambiguationEvent
    >(stream, (response) => transformDisambiguationResponse(response), listener);
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
