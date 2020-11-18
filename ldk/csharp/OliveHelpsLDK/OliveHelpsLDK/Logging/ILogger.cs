using System.Collections.Generic;

namespace OliveHelpsLDK.Logging
{
    public interface ILogger
    {
        void Trace(string message, IDictionary<string, object> fields = null);
        void Debug(string message, IDictionary<string, object> fields = default);
        void Info(string message, IDictionary<string, object> fields = default);
        void Warn(string message, IDictionary<string, object> fields = default);
        void Error(string message, IDictionary<string, object> fields = default);

        ILogger WithFields(IDictionary<string, object> fields);
    }
}