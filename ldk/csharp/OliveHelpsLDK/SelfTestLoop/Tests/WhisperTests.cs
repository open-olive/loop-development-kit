using System;
using System.Threading;
using System.Threading.Tasks;
using OliveHelpsLDK.Logging;
using OliveHelpsLDK.Whispers;

namespace SelfTestLoop.Tests
{
    public class WhisperTests
    {
        public ITestServices Services { get; set; }

        [Test("Confirm Whisper Test")]
        public async Task ConfirmWhisperTest()
        {
            var timeout = new CancellationTokenSource();
            timeout.CancelAfter(TimeSpan.FromSeconds(30));
            var result = await Services.Whisper.ConfirmAsync(new WhisperConfirm()
            {
                Config = new WhisperConfig() {Label = "Confirm Whisper "},
                Markdown = "Click the Approve Button",
                RejectLabel = "DO NOT CLICK",
                ResolveLabel = "CLICK"
            }, timeout.Token);
            if (result != true)
            {
                throw new Exception("Unexpected Value Returned");
            }

            timeout = new CancellationTokenSource();
            timeout.CancelAfter(TimeSpan.FromSeconds(30));
            result = await Services.Whisper.ConfirmAsync(new WhisperConfirm()
            {
                Config = new WhisperConfig() {Label = "Confirm Whisper To Reject "},
                Markdown = "Click the Reject Button",
                RejectLabel = "CLICK",
                ResolveLabel = "DO NOT CLICK",
            }, timeout.Token);
            if (result)
            {
                throw new Exception($"Expected False, Got True");
            }

            timeout = new CancellationTokenSource();
            timeout.CancelAfter(100);
            var cancelledTask = Services.Whisper.ConfirmAsync(new WhisperConfirm()
            {
                Config = new WhisperConfig() {Label = "Closing Whisper"},
                Markdown = "Do Nothing",
                RejectLabel = "DO NOT CLICK",
                ResolveLabel = "DO NOT CLICK",
            }, timeout.Token);
            try
            {
                cancelledTask.Wait();
            }
            catch (AggregateException)
            {
                Services.Logger.Trace("Caught Exception on Wait as Expected");
            }

            if (!cancelledTask.IsCanceled)
            {
                throw new Exception($"Task Was Not Cancelled");
            }
        }

        [Test("Failing Test")]
        public Task FailingTest()
        {
            throw new NotImplementedException("Intended to fail");
        }
    }
}