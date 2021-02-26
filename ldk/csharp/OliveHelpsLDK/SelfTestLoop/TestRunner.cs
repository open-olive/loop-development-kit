using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OliveHelpsLDK;
using OliveHelpsLDK.Logging;
using OliveHelpsLDK.Whispers;
using OliveHelpsLDK.Whispers.List;

namespace SelfTestLoop
{
    public interface ITestRunner
    {
        void Start();

        void Stop();
    }

    public class TestRunner : ITestRunner
    {
        public const string TextTrigger = "runselftest";
        public ILoopServices Services { get; set; }

        public ILogger Logger { get; set; }

        public IStreamingCall<string> Stream { get; set; }


        public void Start()
        {
            Stream = Services.Keyboard.StreamText();
            Task.Run(async () =>
            {
                await foreach (var text in Stream.ToAsyncEnumerable())
                {
                    if (text == TextTrigger)
                    {
                        try
                        {
                            RunTests();
                        }
                        catch (Exception e)
                        {
                            Logger.Error("Test Execution Failed", e);
                        }
                    }
                }
            });
        }

        public void Stop()
        {
            Stream.Dispose();
        }

        private void RunTests()
        {
            Logger.Info("Building Tests");
            var tests = BuildTests();
            Logger.Info("Running Tests");
            foreach (var test in tests)
            {
                test.Status = TestStatus.Running;
                try
                {
                    Logger.Debug($"Test Starting: {test.ID}");
                    var task = test.RunAction();
                    task.ContinueWith(_ =>
                        {
                            test.Status = TestStatus.Completed;
                            Logger.Debug($"Test Successful: {test.ID}");
                        },
                        TaskContinuationOptions.OnlyOnRanToCompletion);
                    task.ContinueWith(cont =>
                    {
                        test.Status = TestStatus.Failed;
                        test.Exception = cont.Exception;
                        Logger.Warn($"Test Failed: {test.ID}");
                        if (cont.Exception != null) test.ErrorMessage = cont.Exception.Message;
                    }, TaskContinuationOptions.OnlyOnFaulted);
                    task.Wait();
                }
                catch (Exception e)
                {
                    Logger.Error($"Test Excepted: {test.ID}", e);
                    test.Status = TestStatus.Failed;
                    test.Exception = e;
                    test.ErrorMessage = e.Message;
                }
            }

            Logger.Info("Tests Completed, Presenting Results");
            PresentResults(tests);
        }

        private IEnumerable<ITest> BuildTests()
        {
            var builder = new TestBuilder(Logger);
            return builder.BuildTests(Services);
        }

        private void PresentResults(IEnumerable<ITest> tests)
        {
            Services.Whisper.ListAsync(RenderResults(tests));
        }

        private WhisperList RenderResults(IEnumerable<ITest> tests)
        {
            ListBase ElementSelector(IGrouping<string, ITest> g)
            {
                var test = g.First();
                return new ListPair()
                {
                    Label = test.Name, Value = test.Status == TestStatus.Completed ? "Pass" : "Fail",
                    Style = test.Status == TestStatus.Completed ? Style.Success : Style.Error
                };
            }

            var items = tests.ToList().ToLookup(kp => kp.Name)
                .ToDictionary(g => g.Key, (Func<IGrouping<string, ITest>, ListBase>) ElementSelector);

            return new WhisperList()
            {
                Config = new WhisperConfig()
                {
                    Label = "Test Results"
                },
                Elements = items
            };
        }
    }
}