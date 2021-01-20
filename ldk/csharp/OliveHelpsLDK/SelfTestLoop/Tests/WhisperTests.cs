using System;
using System.Threading.Tasks;
using OliveHelpsLDK;

namespace SelfTestLoop.Tests
{
    public class WhisperTests
    {
        public ILoopServices Services { get; set; }

        [Test("Passing Test")]
        public Task PassingTest()
        {
            return Task.CompletedTask;
        }

        [Test("Failing Test")]
        public Task FailingTest()
        {
            throw new NotImplementedException("Intended to fail");
        }
    }
}