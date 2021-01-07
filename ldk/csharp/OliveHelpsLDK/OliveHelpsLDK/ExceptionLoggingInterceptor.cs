using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;
using Grpc.Core.Interceptors;
using OliveHelpsLDK.Logging;

namespace OliveHelpsLDK
{
    public class ExceptionLoggingInterceptor : Interceptor
    {
        private readonly ILogger _logger;

        internal ExceptionLoggingInterceptor(ILogger logger)
        {
            _logger = logger;
        }

        public override AsyncUnaryCall<TResponse> AsyncUnaryCall<TRequest, TResponse>(TRequest request,
            ClientInterceptorContext<TRequest, TResponse> context,
            AsyncUnaryCallContinuation<TRequest, TResponse> continuation)
        {
            var call = base.AsyncUnaryCall(request, context, continuation);

            var fields = FieldsFromContext(context);
            var logger = _logger.WithFields(fields);

            return WrapCall(call, logger, context.Options.CancellationToken);
        }

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

        public override AsyncDuplexStreamingCall<TRequest, TResponse> AsyncDuplexStreamingCall<TRequest, TResponse>(ClientInterceptorContext<TRequest, TResponse> context,
            AsyncDuplexStreamingCallContinuation<TRequest, TResponse> continuation)
        {
            var call = base.AsyncDuplexStreamingCall(context, continuation);

            var fields = FieldsFromContext(context);
            var logger = _logger.WithFields(fields);

            return WrapCall(call, logger, context.Options.CancellationToken);
        }

        private static AsyncUnaryCall<TResponse> WrapCall<TResponse>(AsyncUnaryCall<TResponse> call, ILogger logger,
            CancellationToken token)
        {
            return new AsyncUnaryCall<TResponse>(WrapContinueHandler(call.ResponseAsync, logger, token),
                call.ResponseHeadersAsync, call.GetStatus, call.GetTrailers, call.Dispose);
        }

        private static AsyncServerStreamingCall<TResponse> WrapCall<TResponse>(AsyncServerStreamingCall<TResponse> call,
            ILogger logger)
        {
            return new AsyncServerStreamingCall<TResponse>(WrapStreamHandler(call.ResponseStream, logger),
                call.ResponseHeadersAsync, call.GetStatus, call.GetTrailers, call.Dispose);
        }
        
        private static AsyncDuplexStreamingCall<TRequest, TResponse> WrapCall<TRequest, TResponse>(AsyncDuplexStreamingCall<TRequest, TResponse> call,
            ILogger logger, CancellationToken token)
        {
            return new AsyncDuplexStreamingCall<TRequest, TResponse>(WrapStreamHandler(call.RequestStream, logger, token),
                WrapStreamHandler(call.ResponseStream, logger), call.ResponseHeadersAsync, call.GetStatus, call.GetTrailers, call.Dispose);
        }

        private static Task<TResponse> WrapContinueHandler<TResponse>(Task<TResponse> task, ILogger logger,
            CancellationToken token)
        {
            return task.ContinueWith(action =>
            {
                if (action.Exception == null) return action.Result;
                token.Register(() => throw action.Exception);
                action.Exception.Handle(exception =>
                {
                    logger.Error("Client exception", exception);
                    return true;
                });

                return action.Result;
            }, token, TaskContinuationOptions.OnlyOnFaulted, TaskScheduler.Current);
        }
        
        private static Task WrapContinueHandler(Task task, ILogger logger,
            CancellationToken token)
        {
            return task.ContinueWith(action =>
            {
                if (action.Exception == null) return;
                token.Register(() => throw action.Exception);
                action.Exception.Handle(exception =>
                {
                    logger.Error("Client exception", exception);
                    return true;
                });
            }, token, TaskContinuationOptions.OnlyOnFaulted, TaskScheduler.Current);
        }

        private static IAsyncStreamReader<TResponse> WrapStreamHandler<TResponse>(IAsyncStreamReader<TResponse> call,
            ILogger logger)
        {
            return new AsyncStreamReaderWrapper<TResponse>(call, logger);
        }
        
        private static IClientStreamWriter<TRequest> WrapStreamHandler<TRequest>(IClientStreamWriter<TRequest> call,
            ILogger logger, CancellationToken token)
        {
            return new ClientStreamWriterWrapper<TRequest>(call, logger, token);
        }

        private static IDictionary<string, object> FieldsFromContext<TRequest, TResponse>(
            ClientInterceptorContext<TRequest, TResponse> context) where TResponse : class where TRequest : class
        {
            return new Dictionary<string, object>
            {
                {"method", context.Method.Name},
                {"service", context.Method.ServiceName.Replace("proto.", "")}
            };
        }

        private class AsyncStreamReaderWrapper<TResponse> : IAsyncStreamReader<TResponse>
        {
            private readonly ILogger _logger;
            private readonly IAsyncStreamReader<TResponse> _wrapped;

            public AsyncStreamReaderWrapper(IAsyncStreamReader<TResponse> wrapped, ILogger logger)
            {
                _wrapped = wrapped;
                _logger = logger;
            }

            public TResponse Current => _wrapped.Current;

            public Task<bool> MoveNext(CancellationToken token)
            {
                var moved = _wrapped.MoveNext(token);

                return WrapContinueHandler(moved, _logger, token);
            }
        }
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

            public Task WriteAsync(TRequest message)
            {
                var written = _wrapped.WriteAsync(message);
                
                return WrapContinueHandler(written, _logger, _token);
            }

            WriteOptions IAsyncStreamWriter<TRequest>.WriteOptions
            {
                get => _wrapped.WriteOptions;
                set => _wrapped.WriteOptions = value;
            }

            public Task CompleteAsync()
            {
                var completed = _wrapped.CompleteAsync();

                return WrapContinueHandler(completed, _logger, _token);
            }
        }
    }
}