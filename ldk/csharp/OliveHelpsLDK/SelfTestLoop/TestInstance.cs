using System;
using System.Collections.Generic;
using System.Reflection;
using System.Threading.Tasks;
using OliveHelpsLDK.Logging;

namespace SelfTestLoop
{
    public class TestInstance : ITest
    {
        public ILogger Logger { get; set; }
        public string ID { get; set; }
        public string Name { get; set; }
        public TestStatus Status { get; set; }
        public string ErrorMessage { get; set; }
        public Exception Exception { get; set; }

        public Func<Task> RunAction
        {
            get { return () => { return RunMethod(); }; }
        }

        public TestAttribute Attribute { get; set; }

        public MethodInfo MethodInfo { get; set; }

        public Task RunMethod()
        {
            try
            {
                var result = MethodInfo.Invoke(TestFixture, null);
                if (result is Task task)
                {
                    Logger.Trace("Received Invoke result as task");
                    return task;
                }

                if (result == null)
                {
                    Logger.Trace("Invoke Result Is Null");
                }

                Logger.Trace("Invoke Result Is Not Task, Returning Completed",
                    new Dictionary<string, object>() {{"type", result.GetType()}});
                return Task.CompletedTask;
            }
            catch (Exception e)
            {
                Logger.Error("Received Error During RunMethod", e);
                return Task.FromException(e);
            }
        }

        public object TestFixture { get; set; }
    }
}