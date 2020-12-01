using System;
using System.Threading.Tasks;

namespace OliveHelpsLDK
{
    public interface IStreamingCall<TOutput> : IDisposable
    {
        TOutput Current();

        Task<bool> MoveNext();
    }
}