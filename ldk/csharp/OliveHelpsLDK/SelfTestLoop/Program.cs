using OliveHelpsLDK;
using OliveHelpsLDK.Logging;

namespace SelfTestLoop
{
    class Program
    {
        static void Main(string[] args)
        {
            ILogger logger = new Logger("csharp-clipboard-example");
            LoopServer.Start(new Loop
            {
                Logger = logger
            }, logger);
        }
    }
}