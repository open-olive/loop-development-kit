using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading;
using System.Threading.Tasks;
using OliveHelpsLDK;
using OliveHelpsLDK.Logging;
using OliveHelpsLDK.Whispers;
using OliveHelpsLDK.Whispers.List;
using SelfTestLoop.Tests;

namespace SelfTestLoop
{
    public interface ITestRunner
    {
        void Start();

        void Stop();
    }

    public enum TestStatus
    {
        NotExecuted,
        Running,
        Completed,
        Failed
    }

    public interface ITest
    {
        string Name { get; set; }

        string ID { get; set; }

        TestStatus Status { get; set; }

        string ErrorMessage { get; set; }

        Exception Exception { get; set; }

        public Func<Task> RunAction { get; set; }
    }

    public struct TestInstance : ITest
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public TestStatus Status { get; set; }
        public string ErrorMessage { get; set; }
        public Exception Exception { get; set; }
        public Func<Task> RunAction { get; set; }
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
                        RunTests();
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
                    Logger.Warn($"Test Excepted: {test.ID}");
                    test.Status = TestStatus.Failed;
                    test.Exception = e;
                    test.ErrorMessage = e.Message;
                }
            }

            Logger.Info("Tests Completed, Presenting Results");
            PresentResults(tests);
        }

        public ITest[] BuildTests()
        {
            var testClass = new WhisperTests();
            return new ITest[]
            {
                new TestInstance()
                {
                    ID = "successfulTest",
                    Name = "Successful Test",
                    Status = TestStatus.NotExecuted,
                    RunAction = (() => testClass.PassingTest(Services))
                },
                new TestInstance()
                {
                    ID = "failingTest",
                    Name = "Failing Test",
                    Status = TestStatus.NotExecuted,
                    RunAction = (() => testClass.FailingTest(Services))
                }
            };
        }

        private void PresentResults(ITest[] tests)
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