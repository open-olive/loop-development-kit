using System;
using System.Threading.Tasks;
using Grpc.Core;

namespace OliveHelpsLDK
{
    /// <summary>
    /// The StreamingCall class wraps around GRPC AsyncServerStreamingCalls and transforms the result.
    /// </summary>
    /// <typeparam name="TResponse">The GRPC Response type.</typeparam>
    /// <typeparam name="TOutput">The output type.</typeparam>
    internal class StreamingCall<TResponse, TOutput> : IStreamingCall<TOutput>
        where TResponse : class
    {
        private readonly AsyncServerStreamingCall<TResponse> _call;
        private readonly Func<TResponse, TOutput> _transformer;

        internal StreamingCall(AsyncServerStreamingCall<TResponse> call, Func<TResponse, TOutput> transformer)
        {
            _call = call;
            _transformer = transformer;
        }

        public void Dispose()
        {
            _call.Dispose();
        }

        public TOutput Current()
        {
            return _transformer(_call.ResponseStream.Current);
        }

        public Task<bool> MoveNext()
        {
            return _call.ResponseStream.MoveNext();
        }
    }
}