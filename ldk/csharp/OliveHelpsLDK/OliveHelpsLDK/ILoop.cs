using System.Threading.Tasks;

namespace OliveHelpsLDK
{
    /// <summary>
    /// Contains the lifecycle methods that Loops need to respond to.
    /// </summary>
    public interface ILoop
    {
        /// <summary>
        /// This message is sent when the Loop is started.
        /// </summary>
        /// <remarks>
        /// As a best practice we recommend that you start long-running processes only once you
        /// receive this message.
        /// </remarks>
        /// <param name="services">The services object; Loops should store this object.</param>
        /// <returns>A Task returning when all of your loop services have successfully started</returns>
        Task Start(ILoopServices services);

        /// <summary>
        /// This message is sent when the Loop is being stopped.
        /// You should stop all your long running processes when this message has been received and
        /// expect that the process will be terminated shortly.
        /// </summary>
        /// <returns>A Task resolving when all of your long running processes have been stopped.</returns>
        Task Stop();
    }
}