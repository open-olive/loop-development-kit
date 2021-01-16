using System;
using System.Threading.Tasks;
using OliveHelpsLDK;
using OliveHelpsLDK.Logging;

namespace SelfTestLoop
{
    public class Loop : ILoop
    {
        public ILogger Logger { get; set; }

        public TestRunner Runner { get; set; }

        public Task Start(ILoopServices services)
        {
            Runner = new TestRunner {Services = services, Logger = Logger};
            Runner.Start();
            return Task.CompletedTask;
        }

        public Task Stop()
        {
            Runner.Stop();
            return Task.CompletedTask;
        }
    }
}