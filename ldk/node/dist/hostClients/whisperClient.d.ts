import { WhisperClient as WhisperGRPCClient } from '../grpc/whisper_grpc_pb';
import { Whisper, WhisperConfirmConfig, WhisperDisambiguationConfig, WhisperDisambiguationEvent, WhisperFormConfig, WhisperFormSubmitEvent, WhisperFormUpdateEvent, WhisperListConfig, WhisperService } from './whisperService';
import BaseClient, { GRPCClientConstructor } from './baseClient';
import { StoppableMessage, StoppableStream, StreamListener } from './stoppables';
/**
 * Class responsible for abstracting Whisper requests to Olive Helps.
 *
 * @internal
 */
declare class WhisperClient extends BaseClient<WhisperGRPCClient> implements WhisperService {
    /**
     * Send a Whisper to the host process.
     *
     * @async
     * @param whisper - An object defining the contents of the Whisper.
     * @returns Promise resolving when the server responds to the command.
     */
    markdownWhisper(whisper: Whisper): StoppableMessage<void>;
    listWhisper(whisper: WhisperListConfig): StoppableMessage<void>;
    confirmWhisper(whisper: WhisperConfirmConfig): StoppableMessage<boolean>;
    disambiguationWhisper(whisper: WhisperDisambiguationConfig, listener: StreamListener<WhisperDisambiguationEvent>): StoppableStream<WhisperDisambiguationEvent>;
    formWhisper(whisper: WhisperFormConfig, listener: StreamListener<WhisperFormUpdateEvent | WhisperFormSubmitEvent>): StoppableStream<WhisperFormUpdateEvent | WhisperFormSubmitEvent>;
    protected generateClient(): GRPCClientConstructor<WhisperGRPCClient>;
}
export default WhisperClient;
