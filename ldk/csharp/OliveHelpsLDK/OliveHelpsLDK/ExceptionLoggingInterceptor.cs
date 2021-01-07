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

            return WrapCall(call, logger);
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

        private static AsyncUnaryCall<TResponse> WrapCall<TResponse>(AsyncUnaryCall<TResponse> call, ILogger logger)
        {
            return new AsyncUnaryCall<TResponse>(WrapContinueHandler(call.ResponseAsync, logger),
                call.ResponseHeadersAsync, call.GetStatus, call.GetTrailers, call.Dispose);
        }

        private static AsyncServerStreamingCall<TResponse> WrapCall<TResponse>(AsyncServerStreamingCall<TResponse> call,
            ILogger logger)
        {
            return new AsyncServerStreamingCall<TResponse>(WrapStreamHandler(call.ResponseStream, logger),
                call.ResponseHeadersAsync, call.GetStatus, call.GetTrailers, call.Dispose);
        }

        private static Task<TResponse> WrapContinueHandler<TResponse>(Task<TResponse> task, ILogger logger)
        {
            return task.ContinueWith(action =>
            {
                if (action.Exception == null) return action.Result;
                action.Exception.Handle(exception =>
                {
                    if (exception is RpcException) logger.Error("Client exception", exception);

                    return exception is RpcException;
                });
                return action.Result;
            });
        }

        private static IAsyncStreamReader<TResponse> WrapStreamHandler<TResponse>(IAsyncStreamReader<TResponse> call,
            ILogger logger)
        {
            return new AsyncStreamReaderWrapper<TResponse>(call, logger);
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

            public Task<bool> MoveNext(CancellationToken cancellationToken)
            {
                var moved = _wrapped.MoveNext(cancellationToken);

                return WrapContinueHandler(moved, _logger);
            }
        }
    }
}