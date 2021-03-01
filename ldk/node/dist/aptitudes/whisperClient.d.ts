import { WhisperClient as WhisperGRPCClient } from '../grpc/whisper_grpc_pb';
import { Whisper, WhisperConfirmConfig, WhisperDisambiguationConfig, WhisperDisambiguationEvent, WhisperFormConfig, WhisperFormSubmitEvent, WhisperFormUpdateEvent, WhisperListConfig, WhisperConfig } from './whisper';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { StoppableMessage, StoppableStream, StreamListener } from './stoppables';
/**
 * Class responsible for abstracting Whisper requests to Olive Helps.
 *
 * @internal
 */
declare class WhisperClient extends BaseClient<WhisperGRPCClient> implements Whisper {
    /**
     * Send a Whisper to the host process.
     *
     * @async
     * @param whisper - An object defining the contents of the Whisper.
     * @returns Promise resolving when the server responds to the command.
     */
    markdown(whisper: WhisperConfig): StoppableMessage<void>;
    list(whisper: WhisperListConfig): StoppableMessage<void>;
    confirm(whisper: WhisperConfirmConfig): StoppableMessage<boolean>;
    disambiguation(whisper: WhisperDisambiguationConfig, listener: StreamListener<WhisperDisambiguationEvent>): StoppableStream<WhisperDisambiguationEvent>;
    form(whisper: WhisperFormConfig, listener: StreamListener<WhisperFormUpdateEvent | WhisperFormSubmitEvent>): StoppableStream<WhisperFormUpdateEvent | WhisperFormSubmitEvent>;
    protected generateClient(): GRPCClientConstructor<WhisperGRPCClient>;
    protected serviceName(): string;
}
export default WhisperClient;
