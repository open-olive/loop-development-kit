using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK
{
    public interface IStreamingCall<TOutput> : IDisposable
    {
        TOutput Current();

        Task<bool> MoveNext();

        IAsyncEnumerable<TOutput> ToAsyncEnumerable(CancellationToken cancellationToken = default);
    }
}