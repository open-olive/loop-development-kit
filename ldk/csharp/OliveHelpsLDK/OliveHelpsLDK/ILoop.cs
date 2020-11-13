using System.Threading.Tasks;

namespace OliveHelpsLDK
{
    public interface ILoop
    {
        Task Start(ILoopServices services);

        Task Stop();
    }
}