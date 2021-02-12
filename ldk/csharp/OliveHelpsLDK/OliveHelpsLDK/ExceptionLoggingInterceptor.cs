using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Core.Interceptors;
using OliveHelpsLDK.Logging;

namespace OliveHelpsLDK
{
    /// <summary>
    /// The ExceptionLoggingInterceptor extension of an Interceptor logs and passes along any errors occurring in asynchronous gRPC client calls
    /// </summary>
    public class ExceptionLoggingInterceptor : Interceptor
    {
        private readonly ILogger _logger;

        internal ExceptionLoggingInterceptor(ILogger logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Makes an asynchronous request for a single value via gRPC and logs any errors that occur.
        /// </summary>
        /// <param name="request">The gRPC request message.</param>
        /// <param name="context">The gRPC context (service, method, etc.).</param>
        /// <param name="continuation">The actual client method implementation function.</param>
        /// <returns>A wrapped asynchronous call.</returns>
        public override AsyncUnaryCall<TResponse> AsyncUnaryCall<TRequest, TResponse>(TRequest request,
            ClientInterceptorContext<TRequest, TResponse> context,
            AsyncUnaryCallContinuation<TRequest, TResponse> continuation)
        {
            var call = base.AsyncUnaryCall(request, context, continuation);

            var fields = FieldsFromContext(context);
            var logger = _logger.WithFields(fields);

            return WrapCall(call, logger, context.Options.CancellationToken);
        }

        /// <summary>
        /// Makes an asynchronous request for a stream of values via gRPC and logs any errors that occur.
        /// </summary>
        /// <param name="request">The gRPC request message.</param>
        /// <param name="context">The gRPC context (service, method, etc.).</param>
        /// <param name="continuation">The actual client method implementation function.</param>
        /// <returns>A wrapped asynchronous call.</returns>
        public override AsyncServerStreamingCall<TResponse> AsyncServerStreamingCall<TRequest, TResponse>(
            TRequest request,
            ClientInterceptorContext<TRequest, TResponse> context,
            AsyncServerStreamingCallContinuation<TRequest, TResponse> continuation)
        {
            var call = base.AsyncServerStreamingCall(request, context, continuation);

            var fields = FieldsFromContext(context);
            var logger = _logger.WithFields(fields);

            return WrapCall(call, logger);
        }

        /// <summary>
        /// Makes an asynchronous connection for a read and write stream via gRPC and logs any errors that occur.
        /// </summary>
        /// <param name="context">The gRPC context (service, method, etc.).</param>
        /// <param name="continuation">The actual client method implementation function.</param>
        /// <returns>A wrapped asynchronous call.</returns>
        public override AsyncDuplexStreamingCall<TRequest, TResponse> AsyncDuplexStreamingCall<TRequest, TResponse>(ClientInterceptorContext<TRequest, TResponse> context,
            AsyncDuplexStreamingCallContinuation<TRequest, TResponse> continuation)
        {
            var call = base.AsyncDuplexStreamingCall(context, continuation);

            var fields = FieldsFromContext(context);
            var logger = _logger.WithFields(fields);

            return WrapCall(call, logger, context.Options.CancellationToken);
        }

        /// <summary>
        /// Wraps a gRPC call object in exception logging.
        /// </summary>
        /// <param name="call">A call which will have any internal Tasks wrapped in logging.</param>
        /// <param name="logger">A logger to use for logging exceptions in Tasks.</param>
        /// <param name="token">A cancellation token to wire into the async logging continuations.</param>
        /// <returns>A wrapped asynchronous call.</returns>
        private static AsyncUnaryCall<TResponse> WrapCall<TResponse>(AsyncUnaryCall<TResponse> call, ILogger logger,
            CancellationToken token)
        {
            return new AsyncUnaryCall<TResponse>(WrapContinueHandler(call.ResponseAsync, logger, token),
                call.ResponseHeadersAsync, call.GetStatus, call.GetTrailers, call.Dispose);
        }

        /// <summary>
        /// Wraps a gRPC call object in exception logging.
        /// </summary>
        /// <param name="call">A call which will have any internal Tasks wrapped in logging.</param>
        /// <param name="logger">A logger to use for logging exceptions in Tasks.</param>
        /// <returns>A wrapped asynchronous call.</returns>
        private static AsyncServerStreamingCall<TResponse> WrapCall<TResponse>(AsyncServerStreamingCall<TResponse> call,
            ILogger logger)
        {
            return new AsyncServerStreamingCall<TResponse>(WrapStreamHandler(call.ResponseStream, logger),
                call.ResponseHeadersAsync, call.GetStatus, call.GetTrailers, call.Dispose);
        }
        
        /// <summary>
        /// Wraps a gRPC call object in exception logging.
        /// </summary>
        /// <param name="call">A call which will have any internal Tasks wrapped in logging.</param>
        /// <param name="logger">A logger to use for logging exceptions in Tasks.</param>
        /// <param name="token">A cancellation token to wire into the async logging continuations.</param>
        /// <returns>A wrapped asynchronous call.</returns>
        private static AsyncDuplexStreamingCall<TRequest, TResponse> WrapCall<TRequest, TResponse>(AsyncDuplexStreamingCall<TRequest, TResponse> call,
            ILogger logger, CancellationToken token)
        {
            return new AsyncDuplexStreamingCall<TRequest, TResponse>(WrapStreamHandler(call.RequestStream, logger, token),
                WrapStreamHandler(call.ResponseStream, logger), call.ResponseHeadersAsync, call.GetStatus, call.GetTrailers, call.Dispose);
        }

        /// <summary>
        /// Adds an exception logging continuation to a task.
        /// </summary>
        /// <remarks>This is where the bulk of the exception handling and logging work actually occurs.</remarks>
        /// <param name="task">A task, to which an exception logging continuation will be added.</param>
        /// <param name="logger">The logger used in exception handling.</param>
        /// <param name="token">A cancellation token to attach to the logging continuation.</param>
        /// <returns>The exception logging continuation.</returns>
        private static Task<TResponse> WrapContinueHandler<TResponse>(Task<TResponse> task, ILogger logger,
            CancellationToken token)
        {
            return task.ContinueWith(action =>
            {
                if (action.Exception == null) return action.Result;
                HandleException(action.Exception, logger, token);
                return action.Result;
            }, token);
        }
        
        /// <summary>
        /// Adds an exception logging continuation to a task.
        /// </summary>
        /// <remarks>Non-generic version of this function.</remarks>
        private static Task WrapContinueHandler(Task task, ILogger logger,
            CancellationToken token)
        {
            return task.ContinueWith(action =>
            {
                if (action.Exception == null) return;
                HandleException(action.Exception, logger, token);
            }, token);
        }

        /// <summary>
        /// Handles and logs an exception.
        /// </summary>
        /// <param name="aex">A Task's aggregate exception.</param>
        /// <param name="logger">The logger used in exception handling.</param>
        /// <param name="token">A cancellation token to which this will register a re-throw.</param>
        private static void HandleException(AggregateException aex, ILogger logger, CancellationToken token)
        {
                token.Register(() => throw aex);
                aex.Handle(exception =>
                {
                    logger.Error("Client exception", exception);
                    return false;
                });
        }

        /// <summary>
        /// Wraps a client read stream with a logging wrapper class.
        /// </summary>
        /// <param name="call">A stream reader.</param>
        /// <param name="logger">A logger to use for logging exceptions in Tasks.</param>
        /// <returns>A wrapped stream reader.</returns>
        private static IAsyncStreamReader<TResponse> WrapStreamHandler<TResponse>(IAsyncStreamReader<TResponse> call,
            ILogger logger)
        {
            return new AsyncStreamReaderWrapper<TResponse>(call, logger);
        }

        /// <summary>
        /// Wraps a client write stream with a logging wrapper class.
        /// </summary>
        /// <param name="call">A stream writer.</param>
        /// <param name="logger">A logger to use for logging exceptions in Tasks.</param>
        /// <param name="token">A cancellation token to add to any wrapped Tasks.</param>
        /// <returns>A wrapped stream writer.</returns>
        private static IClientStreamWriter<TRequest> WrapStreamHandler<TRequest>(IClientStreamWriter<TRequest> call,
            ILogger logger, CancellationToken token)
        {
            return new ClientStreamWriterWrapper<TRequest>(call, logger, token);
        }

        /// <summary>
        /// Extracts logging fields from the gRPC invocation context.
        /// </summary>
        /// <param name="context">An invocation context.</param>
        /// <returns>A dictionary of fields.</returns>
        private static IDictionary<string, object> FieldsFromContext<TRequest, TResponse>(
            ClientInterceptorContext<TRequest, TResponse> context) where TResponse : class where TRequest : class
        {
            return new Dictionary<string, object>
            {
                {"method", context.Method.Name},
                {"service", context.Method.ServiceName.Replace("proto.", "")}
            };
        }

        /// <summary>
        /// Wraps a client read stream in exception logging.
        /// </summary>
        private class AsyncStreamReaderWrapper<TResponse> : IAsyncStreamReader<TResponse>
        {
            private readonly ILogger _logger;
            private readonly IAsyncStreamReader<TResponse> _wrapped;

            public AsyncStreamReaderWrapper(IAsyncStreamReader<TResponse> wrapped, ILogger logger)
            {
                _wrapped = wrapped;
                _logger = logger;
            }

            /// <summary>
            /// Gets the current item in the read stream.
            /// </summary>
            /// <returns>The current item in the read stream.</returns>
            public TResponse Current => _wrapped.Current;

            /// <summary>
            /// Requests the next item in the read stream.
            /// </summary>
            /// <returns>A Task with a boolean representing a successful or failed move.</returns>
            public Task<bool> MoveNext(CancellationToken token)
            {
                var moved = _wrapped.MoveNext(token);

                return WrapContinueHandler(moved, _logger, token);
            }
        }
        /// <summary>
        /// Wraps a client write stream in exception logging.
        /// </summary>
        private class ClientStreamWriterWrapper<TRequest> : IClientStreamWriter<TRequest>
        {
            private readonly ILogger _logger;
            private readonly IClientStreamWriter<TRequest> _wrapped;
            private readonly CancellationToken _token;

            public ClientStreamWriterWrapper(IClientStreamWriter<TRequest> wrapped, ILogger logger, CancellationToken token)
            {
                _wrapped = wrapped;
                _logger = logger;
                _token = token;
            }

            /// <summary>
            /// Writes an item to the write stream.
            /// </summary>
            /// <returns>A void Task to await.</returns>
            public Task WriteAsync(TRequest message)
            {
                var written = _wrapped.WriteAsync(message);
                
                return WrapContinueHandler(written, _logger, _token);
            }

            /// <summary>
            /// Sets or gets the stream writing options.
            /// </summary>
            WriteOptions IAsyncStreamWriter<TRequest>.WriteOptions
            {
                get => _wrapped.WriteOptions;
                set => _wrapped.WriteOptions = value;
            }

            /// <summary>
            /// Ends the write stream.
            /// </summary>
            /// <returns>A void Task to await.</returns>
            public Task CompleteAsync()
            {
                var completed = _wrapped.CompleteAsync();

                return WrapContinueHandler(completed, _logger, _token);
            }
        }
    }
}