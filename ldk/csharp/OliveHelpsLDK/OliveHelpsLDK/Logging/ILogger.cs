using System;
using System.Collections.Generic;

namespace OliveHelpsLDK.Logging
{
    public interface ILogger
    {
        IDictionary<string, object> DefaultFields { get; }
        void Trace(string message, IDictionary<string, object> fields = null);
        void Debug(string message, IDictionary<string, object> fields = null);
        void Info(string message, IDictionary<string, object> fields = null);
        void Warn(string message, IDictionary<string, object> fields = null);
        void Error(string message, IDictionary<string, object> fields = null);

        void Error(string message, Exception exception);

        ILogger WithFields(IDictionary<string, object> fields);
    }
}