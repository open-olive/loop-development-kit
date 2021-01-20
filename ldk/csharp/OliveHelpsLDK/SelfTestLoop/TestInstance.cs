using System;
using System.Reflection;
using System.Threading.Tasks;

namespace SelfTestLoop
{
    public class TestInstance : ITest
    {
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
                if (result is Task)
                {
                    return result as Task;
                }

                return Task.CompletedTask;
            }
            catch (Exception e)
            {
                return Task.FromException(e);
            }
        }

        public object TestFixture { get; set; }
    }
}