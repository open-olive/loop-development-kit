using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Threading;
using System.Threading.Tasks;
using Grpc.Core;

namespace OliveHelpsLDK
{
    public class StreamingCall<TResponse, TOutput> : IStreamingCall<TOutput>
        where TResponse : class
    {
        private readonly AsyncServerStreamingCall<TResponse> _call;
        private readonly Func<TResponse, TOutput> _transformer;

        public StreamingCall(AsyncServerStreamingCall<TResponse> call, Func<TResponse, TOutput> transformer)
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

        public async IAsyncEnumerable<TOutput> ToAsyncEnumerable(
            [EnumeratorCancellation] CancellationToken cancellationToken = default)
        {
            await foreach (var output in _call.ResponseStream.ReadAllAsync(cancellationToken).ConfigureAwait(false))
            {
                yield return _transformer(output);
            }
        }
    }
}