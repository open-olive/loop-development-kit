using System.Threading;
using System.Threading.Tasks;

namespace OliveHelpsLDK.Process
{
    public interface IProcessService
    {
        Task<ProcessInfo[]> Query(CancellationToken cancellationToken = default);

        IStreamingCall<ProcessEvent> Stream(CancellationToken cancellationToken = default);
    }

    public struct ProcessInfo
    {
        public int Pid;
        public string Command;
        public string Arguments;
    }

    public enum ProcessEventAction
    {
        Unknown,
        Started,
        Stopped,
    }

    public struct ProcessEvent
    {
        public ProcessInfo Process;
        public ProcessEventAction Action;
    }
}