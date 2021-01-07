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
            TaskScheduler.UnobservedTaskException += (sender, eventArgs) => { eventArgs.SetObserved(); };
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

            public Task<bool> MoveNext(CancellationToken token)
            {
                var moved = _wrapped.MoveNext(token);

                return WrapContinueHandler(moved, _logger, token);
            }
        }
    }
}