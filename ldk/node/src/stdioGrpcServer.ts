import { GRPCStdioService } from './grpc/stdio_grpc_pb';

/**
 * @internal
 */
class StdioGrpcServer {
  streamStdio(): void {
    // This appears to be used in Go, but we're not quite sure how to use
    // it in JS.
  }
}

export { GRPCStdioService as StdioService, StdioGrpcServer };
