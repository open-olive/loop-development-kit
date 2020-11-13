using System.Collections.Generic;

namespace OliveHelpsLDK.Logging
{
    public interface ILogger
    {
        void Trace(string message, Dictionary<string, object> fields = null);
        void Debug(string message, Dictionary<string, object> fields = default);
        void Info(string message, Dictionary<string, object> fields = default);
        void Warn(string message, Dictionary<string, object> fields = default);
        void Error(string message, Dictionary<string, object> fields = default);
    }
}