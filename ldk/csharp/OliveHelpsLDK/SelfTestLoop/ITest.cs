using System;
using System.Threading.Tasks;

namespace SelfTestLoop
{
    public interface ITest
    {
        string Name { get; set; }

        string ID { get; set; }

        TestStatus Status { get; set; }

        string ErrorMessage { get; set; }

        Exception Exception { get; set; }

        public Func<Task> RunAction { get; }
    }
}