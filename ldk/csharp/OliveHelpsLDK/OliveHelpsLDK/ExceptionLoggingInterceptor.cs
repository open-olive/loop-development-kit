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
            
            var logger = new MethodExceptionLogger<TRequest, TResponse>(context, _logger);

            return WrapCall(call, logger);
        }

        public override AsyncServerStreamingCall<TResponse> AsyncServerStreamingCall<TRequest, TResponse>(
            TRequest request,
            ClientInterceptorContext<TRequest, TResponse> context,
            AsyncServerStreamingCallContinuation<TRequest, TResponse> continuation)
        {
            var call = base.AsyncServerStreamingCall(request, context, continuation);
            
            var logger = new MethodExceptionLogger<TRequest, TResponse>(context, _logger);
            
            return WrapCall(call, logger);
        }

        private static AsyncUnaryCall<TResponse> WrapCall<TResponse>(AsyncUnaryCall<TResponse> call, ILogger logger)
        {
            return new AsyncUnaryCall<TResponse>(WrapContinueHandler(call.ResponseAsync, logger), call.ResponseHeadersAsync, call.GetStatus, call.GetTrailers, call.Dispose);
        }
        
        private static AsyncServerStreamingCall<TResponse> WrapCall<TResponse>(AsyncServerStreamingCall<TResponse> call, ILogger logger)
        {
            return new AsyncServerStreamingCall<TResponse>(WrapStreamHandler(call.ResponseStream, logger), call.ResponseHeadersAsync, call.GetStatus, call.GetTrailers, call.Dispose);
        }

        private static Task<TResponse> WrapContinueHandler<TResponse>(Task<TResponse> task, ILogger logger)
        {
            return task.ContinueWith((action) =>
            {
                if (action.Exception == null) return action.Result;
                action.Exception.Handle((exception) =>
                {
                    if (exception is RpcException)
                    {
                        logger.Error(exception.Message);
                    }

                    return exception is RpcException;
                });
                return action.Result;
            });
        }

        private static IAsyncStreamReader<TResponse> WrapStreamHandler<TResponse>(IAsyncStreamReader<TResponse> call, ILogger logger)
        {
            return new AsyncStreamReaderWrapper<TResponse>(call, logger);
        }

        private class MethodExceptionLogger<TRequest, TResponse> : ILogger where TRequest : class where TResponse : class
        {
            private readonly ClientInterceptorContext<TRequest, TResponse> _context;
            private readonly ILogger _logger;
            
            public MethodExceptionLogger(ClientInterceptorContext<TRequest, TResponse> context, ILogger logger)
            {
                _logger = logger;
                _context = context;
            }

            public void Error(string message, IDictionary<string, object> fields = null)
            {
                var details = new Dictionary<string, object>
                {
                    {"method", _context.Method.Name},
                    {"service", _context.Method.ServiceName},
                    {"error", message}
                };
                _logger.Error("Client exception", details);
            }

            public void Trace(string message, IDictionary<string, object> fields = null)
            {
                _logger.Trace(message, fields);
            }

            public void Debug(string message, IDictionary<string, object> fields = null)
            {
                _logger.Debug(message, fields);
            }

            public void Info(string message, IDictionary<string, object> fields = null)
            {
                _logger.Info(message, fields);
            }

            public void Warn(string message, IDictionary<string, object> fields = null)
            {
                _logger.Warn(message, fields);
            }

            public ILogger WithFields(IDictionary<string, object> fields)
            {
                return _logger.WithFields(fields);
            }

            public IDictionary<string, object> DefaultFields => _logger.DefaultFields;
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