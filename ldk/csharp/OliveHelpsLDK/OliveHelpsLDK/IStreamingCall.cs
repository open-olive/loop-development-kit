using System;
using System.Threading.Tasks;

namespace OliveHelpsLDK
{
    /// <summary>
    /// The IStreamingCall interface represents an iterable call that users can iterate over.
    /// Call <see cref="IStreamingCall{TOutput}.MoveNext">MoveNext</see> to begin accessing values.
    /// .
    /// </summary>
    /// <example>
    /// Task.Run(async () =>
    /// {
    ///    while (await streamingCall.MoveNext())
    ///    {
    ///        Console.WriteLine(streamingCall.Current());
    ///    }
    /// });
    /// </example>
    /// <typeparam name="TOutput"></typeparam>
    public interface IStreamingCall<TOutput> : IDisposable
    {
        /// <summary>
        /// Get the current value.
        /// </summary>
        /// <returns></returns>
        TOutput Current();

        /// <summary>
        /// Reads the next value. Should be called on first read as well.
        /// </summary>
        /// <returns>
        /// A Task resolving with true if there is a next value, with false
        /// if there isn't.
        /// </returns>
        Task<bool> MoveNext();
    }
}