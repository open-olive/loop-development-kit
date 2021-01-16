using System;
using System.Threading.Tasks;
using OliveHelpsLDK;

namespace SelfTestLoop.Tests
{
    public class WhisperTests
    {
        public Task PassingTest(ILoopServices services)
        {
            return Task.CompletedTask;
        }

        public Task FailingTest(ILoopServices services)
        {
            throw new NotImplementedException("Intended to fail");
        }
    }
}