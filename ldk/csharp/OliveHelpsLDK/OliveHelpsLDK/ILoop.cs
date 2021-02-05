using System.Threading.Tasks;

namespace OliveHelpsLDK
{
    public interface ILoop
    {
        Task Start(ILoopSensors sensors);

        Task Stop();
    }
}