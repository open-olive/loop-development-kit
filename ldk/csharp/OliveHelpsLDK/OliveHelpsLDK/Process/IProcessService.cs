using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Process
{
    /// <summary>
    /// Provides access to process information on this system.
    /// </summary>
    public interface IProcessService
    {
        /// <summary>
        /// Gets a list of all the active processes.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<ProcessInfo[]> Query(CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a stream receiving updates whenever a process starts or stops.
        /// </summary>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        IStreamingCall<ProcessEvent> Stream(CancellationToken cancellationToken = default);
    }

    /// <summary>
    /// Contains information about the process.
    /// </summary>
    public struct ProcessInfo
    {
        /// <summary>
        /// The Process ID
        /// </summary>
        public int Pid;

        /// <summary>
        /// The Command string.
        /// </summary>
        public string Command;

        /// <summary>
        /// The arguments used in the command, if available.
        /// </summary>
        public string Arguments;
    }

    /// <summary>
    /// Represents the type of process event.
    /// </summary>
    public enum ProcessEventAction
    {
        /// <summary>
        /// Unexpected/unknown process action. Should not be expected in production.
        /// </summary>
        Unknown,

        /// <summary>
        /// The process was started.
        /// </summary>
        Started,

        /// <summary>
        /// The process was stopped.
        /// </summary>
        Stopped,
    }

    /// <summary>
    /// Represents a process event.
    /// </summary>
    public struct ProcessEvent
    {
        /// <summary>
        /// Information about the process in question.
        /// </summary>
        public ProcessInfo Process;

        /// <summary>
        /// What happened to the process in question.
        /// </summary>
        public ProcessEventAction Action;
    }
}